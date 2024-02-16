import { Body, OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { GatewayEvents } from "src/model/gatewayEvents";
import { Message } from "src/model/message";

@WebSocketGateway(3001, {
    cors:{
        origin: '*',
        methods: ['GET', 'POST'],
        transports: ['websocket', 'polling'],
        credentials: false,
    },
    allowEIO3: true
})
export class MyGateway implements OnModuleInit {

    @WebSocketServer()
    private readonly server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log("Connected: " + socket.id);
        });
    }

    @SubscribeMessage(GatewayEvents.ReceiveMessage)
    onNewMessage(@MessageBody() body: Message) {
        console.log(body);
        this.server.to(body.room).emit(GatewayEvents.EmitMessage, {
            msg: body.message
        })
    }

    @SubscribeMessage(GatewayEvents.JoinRoom)
    onJoinRoom(@MessageBody() room: any, @ConnectedSocket() socket: Socket) {
        console.log(socket.id + " joining room: " + room);
        socket.join(room);
    }

    @SubscribeMessage(GatewayEvents.LeaveRoom)
    onLeaveRoom(@MessageBody() room: any, @ConnectedSocket() socket: Socket) {
        console.log(socket.id + ' leaving room: ' + room);
        socket.leave(room);
    }
}