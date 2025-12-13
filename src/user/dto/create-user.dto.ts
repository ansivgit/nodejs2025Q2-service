import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, NotContains } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @NotContains(' ', { message: 'Login cannot contain spaces' })
  login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @NotContains(' ', { message: 'Password cannot contain spaces' })
  password: string;
}
