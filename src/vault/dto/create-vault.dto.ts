import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVaultDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  salt: string;
}
