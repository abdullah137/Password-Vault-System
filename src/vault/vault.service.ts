import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVaultDto } from './dto/create-vault.dto';

@Injectable()
export class VaultService {
  constructor(private prismaService: PrismaService) {}

  create(createVaultDto: CreateVaultDto) {
    // try {
    //   const vault = this.prismaService.vault.create({
    //     data: {
    //       ...createVaultDto,
    //     },
    //   });
    //   return vault;
    // } catch (error) {
    //   throw error;
    // }
  }
}
