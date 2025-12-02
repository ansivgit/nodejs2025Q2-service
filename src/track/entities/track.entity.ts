import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @Column()
  @IsString()
  @IsUUID()
  @IsOptional()
  albumId?: string | null;

  @Column('int')
  @IsInt()
  @IsNotEmpty()
  duration: number;

  constructor(track: Track) {
    Object.assign(this, track);
  }
}
