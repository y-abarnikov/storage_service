import { Socket } from 'socket.io';
import { of, Observable } from 'rxjs';
import { UseInterceptors } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import * as REDIS_EVENTS from '@shared/redis-propagator/redis-propagator.constants';
import { RedisPropagatorInterceptor } from '@shared/redis-propagator/redis-propagator.interceptor';

@UseInterceptors(RedisPropagatorInterceptor)
@WebSocketGateway()
export class EventsGateway {
  @SubscribeMessage('test')
  public ping(_client: Socket, data: string): Observable<any> {
    return of({
      clientEvent: 'test',
      redisEvent: REDIS_EVENTS.REDIS_SOCKET_EVENT_SEND,
      data: data,
    });
  }

  @SubscribeMessage('postData')
  public postData(_client: Socket, data: string): Observable<any> {
    return of({
      clientEvent: 'test',
      redisEvent: REDIS_EVENTS.REDIS_SOCKET_EVENT_SEND,
      data: data,
    });
  }

  @SubscribeMessage('setFacility')
  public setFacility(_client: Socket, data: string): Observable<any> {
    return of({
      clientEvent: 'test',
      redisEvent: REDIS_EVENTS.REDIS_SOCKET_EVENT_SEND,
      data: data,
    });
  }
}
