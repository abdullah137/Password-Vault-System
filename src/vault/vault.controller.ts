import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { VaultService } from './vault.service';
import { UpdateVaultDto } from './dto/update-vault.dto';
import { User } from '@prisma/client';
import { GetUser } from '../user/decorator/get-user.decorator';
import { JwtGuard } from '../user/guard';
import { VaultLogic } from './logic/vault.logic';
@UseGuards(JwtGuard)
@Controller('vault')
export class VaultController {
  constructor(private vaultLogic: VaultLogic) {}

  @Put()
  async updateVault(@Body() payload: UpdateVaultDto, @GetUser() user: User) {
    return this.vaultLogic.updateVault(payload, user);
  }
}
