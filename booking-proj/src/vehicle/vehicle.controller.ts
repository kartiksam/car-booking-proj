import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleDto } from './dtos/vehicle.dto';
import { KartikAuth } from 'src/auth/auth';
import { RolesGuard } from 'src/auth/role.guard.service';
import { UserRole } from 'src/enums/user.role';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('vehicle')
export class VehicleController {

    constructor(private vehicleService: VehicleService) { }


    @UseGuards(KartikAuth, RolesGuard)
    @Roles(UserRole.DRIVER)
    @ApiBearerAuth()
    @Post('/register')
    async registerVehicle(@Body() dto: VehicleDto, @Req() req: Request) {
        return this.vehicleService.regsiterVehicle(dto, req);

    }
}
