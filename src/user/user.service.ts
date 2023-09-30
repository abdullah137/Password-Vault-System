import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { genHash } from 'src/utils/helper';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(payload: CreateUserDto) {
    try {
      const user = this.prisma.user.create({
        data: {
          ...payload,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmailAndPassword({
    email,
    hashPassword,
  }: {
    email: string;
    hashPassword: string;
  }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const hash = await genHash(hashPassword);

    if (!user || !argon.verify(user.password, hash)) {
      return null;
    }

    return user;
  }
}
