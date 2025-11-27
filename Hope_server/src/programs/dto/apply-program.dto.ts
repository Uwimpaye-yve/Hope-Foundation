import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class ApplyProgramDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsNumber()
  age: number;

  @IsString()
  programType: string;

  @IsString()
  @IsOptional()
  message?: string;
}
