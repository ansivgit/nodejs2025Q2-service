import { IsNotEmpty, IsString, NotContains } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ', { message: 'Password cannot contain spaces' })
  newPassword: string;
}
