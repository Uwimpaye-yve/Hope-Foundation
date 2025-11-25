import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateSupportRequestDto {
  @IsString()
  @IsOptional()
  studentId?: string;

  @IsString()
  @IsIn(['Low', 'Medium', 'High', 'Urgent'])
  priority: string;

  @IsString()
  category: string;

  @IsString()
  subject: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: string;
}