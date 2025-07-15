import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/dtos/user.dto';
import { UsersService } from './users.service';
import { loginDto } from 'src/dtos/login.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }




}