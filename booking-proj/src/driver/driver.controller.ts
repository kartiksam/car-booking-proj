import { Body, Controller, Get, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { DriverDto } from './dtos/driver.dto';
import { DriverService } from './driver.service';
import { KartikAuth } from 'src/auth/auth';
import { RolesGuard } from 'src/auth/role.guard.service';
import { UserRole } from 'src/enums/user.role';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DriverResponseDto } from './dtos/driver.response';

@Controller('driver')
export class DriverController {

    constructor(private readonly driverService: DriverService) { }

    @UseGuards(KartikAuth, RolesGuard)
    @Roles(UserRole.DRIVER)
    @ApiBearerAuth()
    @Post('/regsiter')
    async registerDriver(@Req() req: Request, @Body() dto: DriverDto) {

        return await this.driverService.registerDriver(req, dto);

    }

    @UseGuards(KartikAuth, RolesGuard)
    @Roles(UserRole.USER, UserRole.ADMIN)
    @ApiBearerAuth()
    @Get('/drivers/available')
    async availableDrivers(): Promise<DriverResponseDto[]> {
        return this.driverService.getAvailableDrivers();
    }

    @UseGuards(KartikAuth, RolesGuard)
    @Roles(UserRole.DRIVER)
    @ApiBearerAuth()
    @Patch('/update')
    async updateDriver(@Req() req: Request): Promise<string> {
        return this.driverService.updateDriver(req);
    }



}
