import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService as JwtServiceNest } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtServiceNest) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);


    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
  }

  async getProfilesPhotos(userId: number) {
    return this.prisma.photo.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: true,
      },
    });
  }

}
