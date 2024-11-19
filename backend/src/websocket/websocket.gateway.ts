import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ProcessedData } from '../shared/interfaces/data.interface';

@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  broadcastData(data: ProcessedData) {
    console.log('Enviando para o cliente: ', data);
    this.server.emit('pump-update', data);
  }
}
