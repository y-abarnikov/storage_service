import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { IRedisConfig } from './config.interface';

const environment = process.env.NODE_ENV || 'development';
const fileConfigPath = `.env.${environment}`;
const env: any = fs.existsSync(fileConfigPath)
  ? dotenv.parse(fs.readFileSync(fileConfigPath))
  : dotenv.parse(fs.readFileSync('.env'));

export default (): IRedisConfig => ({
  host: env.REDIS_HOST || 'sessionRedis',
  port: Number.parseInt(env.REDIS_PORT, 10) || 6379,
});
