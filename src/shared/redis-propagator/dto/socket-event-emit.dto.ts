export class RedisSocketEventEmitDTO {
  public readonly redisEvent: string;
  public readonly clientEvent: string;
  public readonly data: unknown;
}
