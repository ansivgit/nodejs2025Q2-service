import { Module } from '@nestjs/common';
import { DataBase } from './db';

@Module({
  exports: [DataBase],
  providers: [DataBase],
})
export class DbModule {}
