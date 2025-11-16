import { IsString, IsEnum, IsOptional, IsNumber, IsBoolean, MaxLength, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ListingType } from '../entities/listing.entity';

export class CreateListingDto {
  @ApiProperty({ enum: ListingType })
  @IsEnum(ListingType)
  type: ListingType;

  @ApiProperty({ maxLength: 500 })
  @IsString()
  @MaxLength(500)
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  base_price?: number;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  location_city?: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  location_state?: string;

  @ApiPropertyOptional({ maxLength: 100, default: 'India' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  location_country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  location_lat?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  location_lng?: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  is_online?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expires_at?: Date;
}
