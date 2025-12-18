import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import type { Request } from 'express';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() dto: CreateCommentDto, @Req() req: Request) {
    const userId = (req as Request & { user?: { id: number } })?.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User is not authenticated');
    }
    return this.commentsService.create(dto, userId);
  }

  @Get() 
  getAll() {
    return this.commentsService.getAllComments();
  }
}
