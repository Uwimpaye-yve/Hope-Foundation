import { IsOptional, IsString, IsIn, IsInt, Min } from 'class-validator';

export class UpdateProgramDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['education', 'mental-health', 'community'])
  category?: string;

  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive', 'completed'])
  status?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxCapacity?: number;
}