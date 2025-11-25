import { IsString, IsNumber, IsOptional, IsDateString, Min, Max } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  userId: string;

  @IsNumber()
  @Min(5)
  @Max(100)
  age: number;

  @IsDateString()
  @IsOptional()
  joinDate?: Date;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  progress?: number;

  @IsString()
  @IsOptional()
  priority?: string;
}