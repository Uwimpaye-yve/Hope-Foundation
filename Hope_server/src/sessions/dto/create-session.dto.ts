import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsDateString()
  @IsNotEmpty()
  scheduledTime: Date;

  @IsString()
  @IsOptional()
  sessionType?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateSessionDto {
  @IsString()
  @IsOptional()
  topic?: string;

  @IsDateString()
  @IsOptional()
  scheduledTime?: Date;

  @IsString()
  @IsOptional()
  sessionType?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
