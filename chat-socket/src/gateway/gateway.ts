import { Body, OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Message } from "src/model/message";

@WebSocketGateway()
export class MyGateway implements OnModuleInit {

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id)
            console.log("Connected")
        })
    }

    @WebSocketServer()
    private readonly server: Server;

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: Message) {
        console.log(body);
        this.server.to(body.room).emit('onMessage', {
            msg: body.message
        })
    }

    @SubscribeMessage('joinRoom')
    onJoinRoom(@MessageBody() room: any, @ConnectedSocket() socket: Socket) {
        console.log(socket.id + " joining room: " + room);
        socket.join(room);
    }

    @SubscribeMessage('leaveRoom')
    onLeaveRoom(@MessageBody() room: any, @ConnectedSocket() socket: Socket) {
        console.log(socket.id + ' leaving room: ' + room);
        socket.leave(room);
    }
}