import { Controller, Post, Body, Req, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto'
import { FileInterceptor } from '@nestjs/platform-express';
import { multerStorage } from 'src/interceptors/image.intercptor';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Express } from 'express'
import { KartikAuth } from 'src/auth/auth';
import { RolesGuard } from 'src/auth/role.guard.service';
import { UserRole } from 'src/enums/user.role';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('user-details')

export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) { }


  @UseGuards(KartikAuth, RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @Post('/profile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create user with profile image',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        address: {
          type: 'string',
        },
        contact: {
          type: 'number',
        },
        dateOfBirth: {
          type: 'string',
          format: 'date',
        },
        status: {
          type: 'string',
          enum: ['ACTIVE', 'INACTIVE'],
        },
      },
    },
  })

  async create(@Req() req: Request, @Body() createUserDetailDto: CreateUserDetailDto, @UploadedFile() file: Express.Multer.File) {
    return this.userDetailsService.create(req, createUserDetailDto, file);
  }
}