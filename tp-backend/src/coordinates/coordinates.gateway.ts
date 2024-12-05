import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CoordinatesService } from './coordinates.service';
import { CreateCoordinateDto } from "./dto/create-coordinates.dto";
import { ErrorCode } from '../utils/error';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CoordinateGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly coordinatesService: CoordinatesService) {}

  @SubscribeMessage('updateUserLocation')
  async handleUpdateUserLocation(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('Received updateUserLocation event with data:', data);
    
    try {

      const createCoordinateDto = new CreateCoordinateDto();
      createCoordinateDto.date = data.date;
      createCoordinateDto.latitude = data.lastLatitude;
      createCoordinateDto.longitude = data.lastLongitude;
      createCoordinateDto.user = data.userId;
  
      console.log('Parsed values:', createCoordinateDto);
  
      await this.coordinatesService.create(createCoordinateDto);
      
      const response = {
        id: data.userId,
        lastLatitude: data.lastLatitude,
        lastLongitude: data.lastLongitude,
      };
      console.log(response.lastLatitude);
      client.emit('locationUpdated', { status: 'success', data: response });
      return { status: 'success', data: response };
    } catch (error) {
      console.error('Error in handleUpdateUserLocation:', error);
      const errorResponse = { 
        status: ErrorCode.INVALID_DATA_FORMAT, 
        message: error.message || 'An unexpected error occurred'
      };
      client.emit('locationUpdated', errorResponse);
      return errorResponse;
    }
  }

  @SubscribeMessage('getUserLocation')
  async handleGetUserLocation(@MessageBody() data: any){
    console.log('Received updateUserLocation event with data:', data);
    console.log('Parsed values:', { data });

    const user = await this.coordinatesService.findLastCoordinates(data);
    console.log(user);
    this.server.emit('userLocation', user);
    return user;
  }

  @SubscribeMessage('getUserRoute')
  async handleGetUserRoute(@MessageBody() data: any){
    console.log('Received updateUserRoute event with data:', data);

    const coordinates = await this.coordinatesService.findByUserIdAndDate(data.userId, data.date);
    console.log(coordinates);
    console.log(coordinates);
    this.server.emit('userRoute', coordinates);
    return coordinates;
  }

  afterInit(server: Server) {
    console.log('WebSocketGateway initialized');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
}
