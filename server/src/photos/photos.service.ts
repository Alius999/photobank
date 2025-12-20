import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { posix as path } from 'path';

@Injectable()
export class PhotosService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadPhoto(file: Express.Multer.File, userId?: number) {
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
      },
    });
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
        comments: {
          include: { author: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }
}
