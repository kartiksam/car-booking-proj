import { ApiProperty } from "@nestjs/swagger";

export class BookingDto {

    @ApiProperty()
    pickupLocation: string;

    @ApiProperty()
    dropoffLocation: string;

    @ApiProperty()
    rideDate: Date;

    @ApiProperty()
    vehicleId: string;

    @ApiProperty()
    driverId: string;

    lat_lng?: string;
    created_at?: number;
    updated_at?: number;
}