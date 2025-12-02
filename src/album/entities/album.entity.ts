import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column('int')
  @IsInt()
  year: number;

  @Column()
  @IsString()
  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  constructor(album: Album) {
    Object.assign(this, album);
  }
}
