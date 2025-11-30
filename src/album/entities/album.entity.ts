import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class Album {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  constructor(album: Album) {
    Object.assign(this, album);
  }
}
