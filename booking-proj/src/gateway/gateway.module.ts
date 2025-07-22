import { forwardRef, Module } from '@nestjs/common';
// import { BookingGateway } from './gateway.service';
import { BookingModule } from 'src/booking/booking.module';


@Module({
    imports: [forwardRef(() => BookingModule)],
    // providers: [BookingGateway],
    // exports: [BookingGateway]
})
export class GatewayModule { }
