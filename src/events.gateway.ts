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
    return of({ clientEvent: 'test', redisEvent: REDIS_EVENTS.REDIS_SOCKET_EVENT_SEND, data: data })
  }

  // @SubscribeMessage('facilityData')
  // public facilityData(socket: Socket, data: string): Observable<any> {
  //   // TODO get owners of facilities and send to them
  //   // TODO: add savinf of the data
  //   return from([1, 2, 3]).pipe(
  //     map((item) => {
  //       return { event: 'message', data: item };
  //     }),
  //   );
  // }
}
