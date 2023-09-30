import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { VaultModule } from './vault/vault.module';
import { PrismaModule } from './prisma/prisma.module';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VaultModule,
    PrismaModule,
  ],
})
export class AppModule {}
