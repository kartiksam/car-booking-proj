import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { DriverStatus } from "src/enums/driver.status";
import { Type } from 'class-transformer';

class LocationDto {
    @IsString()
    type: string = 'Point';

    @IsArray()
    @ArrayMinSize(2)
    coordinates: [number, number];
}


export class DriverDto {



    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    licenseNumber: string;

    @ApiProperty()
    status: DriverStatus

    @IsOptional()
    @ValidateNested()
    @Type(() => LocationDto)
    location?: LocationDto;


}