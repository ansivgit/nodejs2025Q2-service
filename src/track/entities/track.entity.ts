import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';

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

  @ManyToOne(() => Artist, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'artistId' })
  artist?: Artist | null;

  @Column({ type: 'uuid', nullable: true })
  @IsString()
  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @ManyToOne(() => Album, { onDelete: 'SET NULL', nullable: true })
  album?: Album | null;

  @Column({ type: 'uuid', nullable: true })
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
