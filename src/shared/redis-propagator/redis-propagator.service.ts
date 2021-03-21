import { Injectable } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Server } from 'socket.io';

import { RedisService } from '@src/shared/redis/redis.service';
import { SocketStateService } from '@src/shared/socket-state/socket-state.service';

import { RedisSocketEventEmitDTO } from './dto/socket-event-emit.dto';
import { RedisSocketEventSendDTO } from './dto/socket-event-send.dto';
import {
  REDIS_SOCKET_EVENT_EMIT_ALL,
  REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED,
  REDIS_SOCKET_EVENT_SEND,
} from './redis-propagator.constants';

@Injectable()
export class RedisPropagatorService {
  private socketServer: Server;

  public constructor(
    private readonly socketStateService: SocketStateService,
    private readonly redisService: RedisService,
  ) {
    this.redisService
      .fromEvent<RedisSocketEventSendDTO>(REDIS_SOCKET_EVENT_SEND)
      .pipe(tap(this.consumeSendEvent))
      .subscribe();

    this.redisService
      .fromEvent<RedisSocketEventEmitDTO>(REDIS_SOCKET_EVENT_EMIT_ALL)
      .pipe(tap(this.consumeEmitToAllEvent))
      .subscribe();

    this.redisService
      .fromEvent<RedisSocketEventEmitDTO>(REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED)
      .pipe(tap(this.consumeEmitToAuthenticatedEvent))
      .subscribe();
  }

  public injectSocketServer(server: Server): RedisPropagatorService {
    this.socketServer = server;

    return this;
  }

  private consumeSendEvent = (eventInfo: RedisSocketEventSendDTO): void => {
    const { auth, clientEvent, data, socketId } = eventInfo;

    this.socketStateService
      .get(auth)
      // .filter((socket) => socket.id !== socketId)
      .forEach((socket) => socket.emit(clientEvent, data));
  };

  private consumeEmitToAllEvent = (
    eventInfo: RedisSocketEventEmitDTO,
  ): void => {
    this.socketServer.emit(eventInfo.clientEvent, eventInfo.data);
  };

  private consumeEmitToAuthenticatedEvent = (
    eventInfo: RedisSocketEventEmitDTO,
  ): void => {
    const { clientEvent, data } = eventInfo;

    return this.socketStateService
      .getAll()
      .forEach((socket) => socket.emit(clientEvent, data));
  };

  public propagateEvent(eventInfo: RedisSocketEventSendDTO): boolean {
    if (!eventInfo.auth) {
      return false;
    }

    this.redisService.publish(eventInfo.redisEvent, eventInfo);

    return true;
  }

  public emitToAuthenticated(eventInfo: RedisSocketEventEmitDTO): boolean {
    this.redisService.publish(
      REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED,
      eventInfo,
    );

    return true;
  }

  public emitToAll(eventInfo: RedisSocketEventEmitDTO): boolean {
    this.redisService.publish(REDIS_SOCKET_EVENT_EMIT_ALL, eventInfo);

    return true;
  }
}
