import { ApiProperty } from "@nestjs/swagger";
import { VehicleType } from "src/enums/vehicle.type";

export class VehicleDto {

    @ApiProperty()
    vehicleName: string;

    @ApiProperty()
    vehicleNumber: string;

    @ApiProperty()
    vehicleModel: string;



    @ApiProperty()
    vehicleType: VehicleType;

    @ApiProperty()
    driverId?: string; // Optional, as it may not be assigned at creation time
}