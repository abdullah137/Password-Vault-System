import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVaultDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  salt: string;

  @IsNotEmpty()
  @IsString()
  data: string;
}
