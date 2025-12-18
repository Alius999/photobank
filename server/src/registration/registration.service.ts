import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegistrationService {
  constructor(private readonly prisma: PrismaService) {}

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(data: CreateRegistrationDto) {
    const age = Number(data.age);

    if (Number.isNaN(age)) {
      throw new BadRequestException('Возраст должен быть числом');
    }

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: await this.hashPassword(data.password),
        age,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }
}
