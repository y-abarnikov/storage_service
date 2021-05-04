import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRedisConfig } from '@src/config/config.interface';
import Redis from 'ioredis';

import {
  REDIS_PUBLISHER_CLIENT,
  REDIS_SUBSCRIBER_CLIENT,
} from './redis.constants';

export type RedisClient = Redis.Redis;

export const redisProviders: Provider[] = [
  {
    useFactory: (configService: ConfigService): RedisClient => {
      return new Redis(configService.get<IRedisConfig>('redis'));
    },
    inject: [ConfigService],
    provide: REDIS_SUBSCRIBER_CLIENT,
  },
  {
    useFactory: (configService: ConfigService): RedisClient => {
      return new Redis(configService.get<IRedisConfig>('redis'));
    },
    inject: [ConfigService],
    provide: REDIS_PUBLISHER_CLIENT,
  },
];
