import { DataSource } from 'typeorm';
import { User } from './src/user/entities/user.entity';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.NODE_ENV === 'development' ? 'localhost' : 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User],
  // migrations: ['src/migrations/*.ts'],
  synchronize: true,
  // synchronize: false,
});
