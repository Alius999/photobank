import { Controller, Get, Post, Body, Req, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import type { Request } from 'express';

type AuthReq = Request & { user?: { id: number } };

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get('public/random')
  getPublicRandom() {
    return this.albumsService.findRandomPublic(4);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() dto: CreateAlbumDto, @Req() req: AuthReq) {
    const userId = req.user?.id;
    return this.albumsService.create(dto, userId!);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req: AuthReq) {
    const userId = req.user?.id;
    return this.albumsService.findAll(userId!);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.albumsService.findOneWithPhotos(id);
  }
}