import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDetailDto {

    @ApiProperty()
    address: string;

    @ApiProperty()
    contact: number;

    @ApiProperty()
    dateOfBirth: Date;

    @ApiProperty()
    imageUrl: string;


    @ApiProperty({ enum: ['ACTIVE', 'INACTIVE'] })
    status: string;






}
