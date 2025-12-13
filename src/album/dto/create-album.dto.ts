import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  Min,
  Max,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(1900)
  @Max(2025)
  year: number;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsOptional()
  artistId?: string | null;
}
