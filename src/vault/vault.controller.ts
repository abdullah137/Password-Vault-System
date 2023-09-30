import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VaultService } from './vault.service';
import { CreateVaultDto } from './dto/create-vault.dto';
@Controller('vault')
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}
}
