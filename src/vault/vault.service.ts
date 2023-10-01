import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';

@Injectable()
export class VaultService {
  constructor(private prismaService: PrismaService) {}

  async create(createVaultDto: CreateVaultDto) {
    try {
      const vault = await this.prismaService.vault.create({
        data: {
          ...createVaultDto,
        },
      });
      return vault;
    } catch (error) {
      throw error;
    }
  }

  async updateVault({ userId, data }: UpdateVaultDto) {
    try {
      const update = await this.prismaService.vault.update({
        data: {
          data,
        },
        where: {
          id: userId,
        },
      });
      return update;
    } catch (error) {
      throw error;
    }
  }

  async findVaultByUser(userId: number) {
    try {
      const user = await this.prismaService.vault.findMany({
        where: {
          userId,
        },
      });
      return user[0];
    } catch (error) {
      throw error;
    }
  }
}
