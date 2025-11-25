import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Track } from '../entities/track.entity';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsOptional()
  albumId?: string | null;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  duration: number;

  constructor(track: Track) {
    Object.assign(this, track);
  }
}
