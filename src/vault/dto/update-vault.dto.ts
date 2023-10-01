import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateVaultDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  data?: string;
}
