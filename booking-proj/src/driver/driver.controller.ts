import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { DriverDto } from './dtos/driver.dto';
import { DriverService } from './driver.service';
import { KartikAuth } from 'src/auth/auth';
import { RolesGuard } from 'src/auth/role.guard.service';
import { UserRole } from 'src/enums/user.role';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

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
}
