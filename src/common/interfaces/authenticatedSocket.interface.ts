import socketIo from 'socket.io';
import Identity from '@interfaces/identity.interface';

export default interface AuthenticatedSocket extends socketIo.Socket {
  auth: Identity;
}
