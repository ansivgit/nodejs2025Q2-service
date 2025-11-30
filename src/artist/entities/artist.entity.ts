import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class Artist {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  grammy?: boolean;

  constructor(artist: Artist) {
    Object.assign(this, artist);
  }
}
