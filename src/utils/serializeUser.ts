import { User } from 'src/user/entities/user.entity';
import type { UserResponse } from 'src/user/interfaces/user.interface';

export const serializeUser = (user: User): Omit<UserResponse, 'password'> => {
  return {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: user.createdAt.getTime(),
    updatedAt: user.updatedAt.getTime(),
  };
};
