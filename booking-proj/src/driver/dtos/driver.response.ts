import { DriverStatus } from "src/enums/driver.status";

export class DriverResponseDto {

    id: string;
    status: DriverStatus;
    isOnline: boolean;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
}