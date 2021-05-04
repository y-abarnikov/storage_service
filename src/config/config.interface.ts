import { ConnectionOptions } from 'typeorm';

export interface IRedisConfig {
  host: string;
  port: number;
}

export interface IConfig {
  redis: IRedisConfig;
  socketPostgres: ConnectionOptions;
}
