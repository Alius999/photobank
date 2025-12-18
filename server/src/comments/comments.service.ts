import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCommentDto, authorId: number) {
    return this.prisma.comment.create({
      data: {
        content: dto.content,
        author: { connect: { id: authorId } },
        photo: { connect: { id: dto.photoId } },
      },
    });
  }

  async getAllComments() {
    return this.prisma.comment.findMany({
      include: { author: true },
    })
  }
}
