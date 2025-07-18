import { Body, Controller, Post, Req, Get, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dtos/booking.dto';
import { Booking } from 'src/schemas/booking.schema';
import { KartikAuth } from 'src/auth/auth';
import { RolesGuard } from 'src/auth/role.guard.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/user.role';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('booking')
export class BookingController {

    constructor(private readonly bookingService: BookingService) { }

    @UseGuards(KartikAuth, RolesGuard)
    @Roles(UserRole.USER)
    @ApiBearerAuth()
    @Post('/create')
    async createBooking(@Req() req: Request, @Body() bookingDto: BookingDto): Promise<Booking> {
        return await this.bookingService.createBooking(req, bookingDto);
    }

    @UseGuards(KartikAuth, RolesGuard)
    @Roles(UserRole.DRIVER)
    @ApiBearerAuth()
    @Get('/bookings/driver')
    async getDriverBookings(@Req() req: Request): Promise<Booking[]> {
        return this.bookingService.getDriverBookings(req);
    }

}
