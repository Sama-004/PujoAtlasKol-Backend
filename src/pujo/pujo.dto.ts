import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreatePujoDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  lat?: number;

  @IsNumber()
  @IsOptional()
  lon?: number;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  zone: string;

  @IsUUID()
  @IsOptional()
  metro_id?: string;
}

export class UpdatePujoDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  lat?: number;

  @IsNumber()
  @IsOptional()
  lon?: number;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  zone?: string;

  @IsUUID()
  @IsOptional()
  metro_id?: string;
}

export class SearchPujoDto {
  @IsString()
  query: string;
}
