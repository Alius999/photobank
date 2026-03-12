import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateAlbumDto, userId: number) {
    return this.prisma.album.create({
      data: {
        name: dto.name,
        description: dto.description ?? null,
        authorId: userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.album.findMany({
      where: { authorId: userId },
        include: { photos: true },
    });
  }

  findOne(id: number, userId: number) {
    return this.prisma.album.findFirst({
      where: { id, authorId: userId },
      include: { photos: true },
    });
  }

  async findOneWithPhotos(id: number) {
    return this.prisma.album.findUnique({
      where: { id },
      include: { 
        photos: {
          orderBy: { createdAt: 'desc' },
        }
      },
    });
  }

  /**
   * Публичные альбомы для главной страницы:
   * выбираем до 4 случайных альбомов с фотографиями,
   * у каждого альбома берём до 4 последних фото.
   */
  async findRandomPublic(limit = 4) {
    const albums = await this.prisma.album.findMany({
      where: {
        photos: {
          some: {},
        },
      },
      include: {
        photos: {
          orderBy: { createdAt: 'desc' },
          take: 4,
        },
      },
      take: 50,
    });

    const shuffled = [...albums].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  }
}
