import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class BookingDto {

    @IsNotEmpty()
    @ApiProperty()
    pickupLocation: {
        lat: number;
        lng: number;
    };

    @ApiProperty()
    @IsNotEmpty()
    dropLocation: {
        lat: number;
        lng: number;
    };


    @ApiProperty()
    rideDate: Date;



    lat_lng?: string;
    created_at?: number;
    updated_at?: number;
}