import { DriverStatus } from "src/enums/driver.status";

export function toRegisterDriver(dto: any): any {
    return {
        phoneNumber: dto.phoneNumber,
        licenseNumber: dto.licenseNumber,
        status: dto.status // Default to ACTIVE if not provided

    }
}