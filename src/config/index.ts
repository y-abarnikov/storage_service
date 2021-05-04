import { IConfig } from './config.interface';
import redisConfig from './redis.config';
import socketPostgresConfig from './socketPotgres.config';

export default (): IConfig => ({
  redis: redisConfig(),
  socketPostgres: socketPostgresConfig(),
});
