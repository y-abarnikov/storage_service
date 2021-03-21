import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import Identity from '@interfaces/identity.interface';

@Injectable()
export class SocketStateService {
  private socketState = new Map<string, Socket[]>();

  public remove(identity: Identity, socket: Socket): boolean {
    const existingSockets = this.socketState.get(identity.id);

    if (!existingSockets) {
      return true;
    }

    const sockets = existingSockets.filter(s => s.id !== socket.id);

    if (!sockets.length) {
      this.socketState.delete(identity.id);
    } else {
      this.socketState.set(identity.id, sockets);
    }

    return true;
  }

  public add(identity: Identity, socket: Socket): boolean {
    const existingSockets = this.socketState.get(identity.id) || [];

    const sockets = [...existingSockets, socket];

    this.socketState.set(identity.id, sockets);

    return true;
  }

  public get(identity: Identity): Socket[] {
    return this.socketState.get(identity.id) || [];
  }

  public getAll(): Socket[] {
    const all = [];

    this.socketState.forEach(sockets => all.push(sockets));

    return all;
  }
}
