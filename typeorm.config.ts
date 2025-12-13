import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  // synchronize: true,
  synchronize: process.env.NODE_ENV === 'development',
  entities: [
    process.env.NODE_ENV === 'development'
      ? './src/**/entities/*.entity.ts'
      : './dist/**/entities/*.entity.js',
  ],
  migrations: [
    process.env.NODE_ENV === 'development'
      ? './src/migrations/*.ts'
      : './dist/migrations/*.js',
  ],
});
