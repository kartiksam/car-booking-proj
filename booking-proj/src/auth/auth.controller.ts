import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import { KartikAuth } from './auth';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from './role.guard.service';


import { Request } from 'express';
import { OtpsService } from 'src/otps/otps.service';
import { VerifyOtpDto } from 'src/otps/dto/otp.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/user.role';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private otpService: OtpsService) { }
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Req() req: Request) {
        const user = await this.authService.validateUser(loginDto, req);
        return this.authService.generateToken(user);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('verify-otp')
    async verifyOtp(@Body() dto: VerifyOtpDto) {
        return this.authService.verifyOtp(dto);
    }

    @Get('me')
    @UseGuards(KartikAuth, RolesGuard)
    @Roles(UserRole.USER)
    @ApiBearerAuth()
    getProfile(@Req() request: Request) {
        // This will return whatever you put in request['user'] in your guard
        return {
            message: 'Token payload attached to request',
            user: request['user'],
        };
    }
}
