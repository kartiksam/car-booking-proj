import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { DriverService } from 'src/driver/driver.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class DriverLocationGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly driverService: DriverService) { }


  @WebSocketServer()
  server: Server

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected:', client.id);
  }
  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }


  @SubscribeMessage('updateDriverLocation')
  async handleDriverLocationUpdate(@MessageBody() data: {
    driverId: string,
    coordinates: [number, number];
  }) {

    await this.driverService.updateLocation(data.driverId, {
      coordinates: data.coordinates,
    });
    console.log('Driver location updated:', data);

  }



}
