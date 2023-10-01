import { Injectable, NotFoundException } from '@nestjs/common';
import { VaultService } from '../vault.service';
import { UpdateVaultDto } from '../dto/update-vault.dto';
import { UserService } from '../../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class VaultLogic {
  constructor(
    private vaultService: VaultService,
    private userService: UserService,
  ) {}

  async updateVault(payload: UpdateVaultDto, user: User) {
    try {
      const checkUser = await this.userService.findUserByEmail(user.email);
      if (!checkUser) {
        throw new NotFoundException({
          error: 'USER_NOT_EMAIL_EXISTS',
          statusCode: 400,
          status: false,
          message: 'Sorry, user does not already exists.',
        });
      }

      const updateVault = await this.vaultService.updateVault(payload, user.id);

      if (updateVault) {
        return {
          message: 'VAULT_UPDATED_SUCCESSFULLY',
          status: true,
          data: updateVault,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
