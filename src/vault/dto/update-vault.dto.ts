import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateVaultDto {
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  data: string;
}
