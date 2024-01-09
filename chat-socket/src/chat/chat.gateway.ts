import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  
  @WebSocketServer() server: Server;
  
  handleConnection(client: any, ...args: any[]) {
  }
  handleDisconnect(client: any) {
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    
    this.server.emit('message', data); 
  }
}
