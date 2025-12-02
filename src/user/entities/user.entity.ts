import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';
import { NewUser } from '../interfaces/user.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  login: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column('int')
  @IsInt()
  @IsOptional()
  version: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  constructor(user: NewUser) {
    Object.assign(this, user);
  }
}
