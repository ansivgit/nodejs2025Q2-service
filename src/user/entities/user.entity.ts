import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';

export class User {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsOptional()
  version: number;

  @IsInt()
  @IsOptional()
  createdAt: number;

  @IsInt()
  @IsOptional()
  updatedAt: number;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
