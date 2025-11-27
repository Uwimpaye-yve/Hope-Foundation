import { IsString, IsOptional } from 'class-validator';

export class CreateStoryDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  author: string;

  @IsString()
  @IsOptional()
  image?: string;
}