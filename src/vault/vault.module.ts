import { Module } from '@nestjs/common';
import { VaultService } from './vault.service';
import { VaultController } from './vault.controller';
import { VaultLogic } from './logic/vault.logic';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [VaultController],
  providers: [VaultService, UserService, VaultLogic],
})
export class VaultModule {}
