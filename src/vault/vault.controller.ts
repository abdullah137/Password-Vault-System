import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { VaultService } from './vault.service';
import { UpdateVaultDto } from './dto/update-vault.dto';
import { User } from '@prisma/client';
import { GetUser } from '../user/decorator/get-user.decorator';
import { JwtGuard } from '../user/guard';
@Controller('vault')
@UseGuards(JwtGuard)
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @Put()
  async updateVault(@Body() paylod: UpdateVaultDto, @GetUser() user: User) {
    console.log(user);
  }
}
