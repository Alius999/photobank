import { Controller, Post, Get, UseInterceptors, UploadedFile, UseGuards, Req, Param, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { multerConfig } from 'src/multer.config';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import type { Request } from 'express';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const userId = (req as Request & { user?: { id: number } })?.user?.id;
    return this.photosService.uploadPhoto(file, userId);
  }

  @Get()
  getAll() {
    return this.photosService.getAllPhotos()
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.photosService.getPhotoWithComments(id);
  }
}

