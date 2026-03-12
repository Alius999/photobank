import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { multerConfig } from 'src/multer.config';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import type { Request } from 'express';

type AuthReq = Request & { user?: { id: number }; body?: Record<string, any> };

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('photos', 20, multerConfig))
  uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: AuthReq,
  ) {
    const userId = req.user?.id;

    // Поле из формы загрузки: <select name="album">...</select>
    const rawAlbum = req.body?.album ?? req.body?.albumId;
    const albumId =
      rawAlbum !== undefined && rawAlbum !== null && rawAlbum !== ''
        ? Number(rawAlbum)
        : undefined;

    return this.photosService.uploadPhotos(files ?? [], userId, albumId);
  }

  @Get()
  getAll() {
    return this.photosService.getAllPhotos()
  }

  @Get('related/:id')
  getRelated(@Param('id', ParseIntPipe) id: number) {
    return this.photosService.getRelatedByTag(id, 4);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.photosService.getPhotoWithComments(id);
  }
}

