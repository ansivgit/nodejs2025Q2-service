import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class Track {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @IsString()
  @IsUUID()
  @IsOptional()
  albumId?: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;

  constructor(track: Track) {
    Object.assign(this, track);
  }
}
