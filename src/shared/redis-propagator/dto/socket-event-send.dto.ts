import { RedisSocketEventEmitDTO } from './socket-event-emit.dto';
import Identity from '@interfaces/identity.interface';

export class RedisSocketEventSendDTO extends RedisSocketEventEmitDTO {
  public readonly auth: Identity;
  public readonly socketId: string;
}
