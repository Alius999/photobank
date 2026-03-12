import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { posix as path } from 'path';

@Injectable()
export class PhotosService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadPhoto(
    file: Express.Multer.File,
    userId?: number,
    albumId?: number,
  ) {
    if (!userId) {
      throw new UnauthorizedException('User is not authenticated');
    }

    // Сохраняем относительный путь, чтобы не зависеть от домена окружения
    const relativeUrl = `/${path.join('uploads', 'photos', file.filename)}`;

    return this.prisma.photo.create({
      data: {
        description: file.originalname,
        photoUrl: relativeUrl,
        author: {
          connect: {
            id: userId,
          },
        },
        ...(albumId
          ? {
              album: {
                connect: {
                  id: albumId,
                },
              },
            }
          : {}),
      },
    });
  }

  async uploadPhotos(
    files: Express.Multer.File[],
    userId?: number,
    albumId?: number,
  ) {
    if (!files || files.length === 0) {
      return [];
    }
    const results = await Promise.all(
      files.map((file) => this.uploadPhoto(file, userId, albumId)),
    );
    return results;
  }

  async getAllPhotos() {
    return this.prisma.photo.findMany({
      include: { author: true },
    })
  }

  async getPhotoWithComments(id: number) {
    return this.prisma.photo.findUnique({
      where: { id },
      include: {
        author: true,
        album: true,
        comments: {
          include: { author: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  /**
   * Рекомендации по «хэштегу» — название альбома.
   * Если альбом не задан, возвращает до 4 случайных фото вообще.
   * В обоих случаях текущее фото исключается.
   */
  async getRelatedByTag(photoId: number, limit = 4) {
    const photo = await this.prisma.photo.findUnique({
      where: { id: photoId },
      include: { album: true },
    });
    let candidates;

    // Если у фото есть альбом — подбираем по названию альбома (как по хэштегу)
    if (photo?.albumId && photo.album) {
      const albumName = photo.album.name;
      const albumIds = await this.prisma.album
        .findMany({
          where: { name: albumName },
          select: { id: true },
        })
        .then((rows) => rows.map((r) => r.id));

      if (albumIds.length === 0) {
        return [];
      }

      candidates = await this.prisma.photo.findMany({
        where: {
          albumId: { in: albumIds },
          id: { not: photoId },
        },
        include: { author: true },
        take: 50,
      });
    } else {
      // Альбома нет — просто  берём случайные фото из всех остальных
      candidates = await this.prisma.photo.findMany({
        where: {
          id: { not: photoId },
        },
        include: { author: true },
        take: 50,
      });
    }

    const shuffled = [...candidates].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  }
}
