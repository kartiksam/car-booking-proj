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


}