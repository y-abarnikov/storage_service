import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import Identity from '@interfaces/identity.interface';

@Injectable()
export class SocketStateService {
  private socketState = new Map<Identity, Socket[]>();

  public remove(identity: Identity, socket: Socket): boolean {
    const existingSockets = this.socketState.get(identity);

    if (!existingSockets) {
      return true;
    }

    const sockets = existingSockets.filter(s => s.id !== socket.id);

    if (!sockets.length) {
      this.socketState.delete(identity);
    } else {
      this.socketState.set(identity, sockets);
    }

    return true;
  }

  public async add(identity: Identity, socket: Socket): Promise<boolean> {
    const existingSockets = this.socketState.get(identity) || [];

    const sockets = [...existingSockets, socket];

    this.socketState.set(identity, sockets);

    return true;
  }

  public get(identity: Identity): Socket[] {
    return this.socketState.get(identity) || [];
  }

  public getAll(): Socket[] {
    const all = [];

    this.socketState.forEach(sockets => all.push(sockets));

    return all;
  }
}
