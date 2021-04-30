import socketIO from 'socket.io';
import {
  INestApplicationContext,
  UnauthorizedException,
  WebSocketAdapter,
} from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import AuthenticatedSocket from '@interfaces/authenticatedSocket.interface';

import { RedisPropagatorService } from '@src/shared/redis-propagator/redis-propagator.service';

import { SocketStateService } from './socket-state.service';

export class SocketStateAdapter extends IoAdapter implements WebSocketAdapter {
  public constructor(
    private readonly app: INestApplicationContext,
    private readonly socketStateService: SocketStateService,
    private readonly redisPropagatorService: RedisPropagatorService,
  ) {
    super(app);
  }

  public create(
    port: number,
    options: socketIO.ServerOptions = {},
  ): socketIO.Server {
    const server = super.createIOServer(port, options);
    this.redisPropagatorService.injectSocketServer(server);

    server.use(async (socket: AuthenticatedSocket, next) => {
      const token =
        socket.handshake.query?.token ||
        socket.handshake.headers?.authorization;

      if (!token) {
        throw new UnauthorizedException();
        // socket.auth = null;
        //
        // // not authenticated connection is still valid
        // // thus no error
        // return next();
      }

      try {
        // TODO:!!
        // fake auth
        socket.auth = {
          id: '1234',
          role: 'facility',
          token: 'someToken',
        };

        return next();
      } catch (e) {
        return next(e);
      }
    });

    return server;
  }

  public bindClientConnect(server: socketIO.Server, callback: Function): void {
    server.on('connection', (socket: AuthenticatedSocket) => {
      if (socket.auth) {
        this.socketStateService.add(socket.auth, socket);

        socket.on('disconnect', () => {
          this.socketStateService.remove(socket.auth, socket);

          socket.removeAllListeners('disconnect');
        });
      }

      callback(socket);
    });
  }
}
