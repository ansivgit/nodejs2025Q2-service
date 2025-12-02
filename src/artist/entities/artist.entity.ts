import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

@Entity()
export class Artist {
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
  @IsBoolean()
  @IsOptional()
  grammy?: boolean;

  constructor(artist: Artist) {
    Object.assign(this, artist);
  }
}
