import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwt.guard';
import { Request } from 'express';
import type { Response } from 'express';
import { CreateAuthDto } from './dto/create-auth.dto';
 
type AuthenticatedRequest = Request & { user: { email: string, id: number } };

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post()
  async login(@Body() dto: CreateAuthDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(dto.email, dto.password);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,      // в проде true + HTTPS
      maxAge: 60 * 60 * 1000,
    });
    return { success: true };
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  async profile(@Req() req: AuthenticatedRequest) {
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Get('profile/photos')
  async getProfilesPhotos(@Req() req: AuthenticatedRequest) {
    return this.authService.getProfilesPhotos(req.user.id);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax', path: '/' });
    return res.sendStatus(200);
  }

}
