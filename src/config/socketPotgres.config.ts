import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { ConnectionOptions } from 'typeorm';

const environment = process.env.NODE_ENV || 'development';
const fileConfigPath = `.env.${environment}`;
const env: any = fs.existsSync(fileConfigPath)
  ? dotenv.parse(fs.readFileSync(fileConfigPath))
  : dotenv.parse(fs.readFileSync('.env'));

export default (): ConnectionOptions => ({
  type: env.DB_TYPE || 'postgres',
  host: env.DB_HOST || 'socket-postgres',
  port: Number.parseInt(env.DB_PORT, 10) || 5432,
  // port: 5432,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE_NAME,
  entities: [path.join(process.cwd(), `dist/**/*.entity{.ts,.js}`)],

  // We are using migrations, synchronize should be set to false.
  synchronize: true,
});
