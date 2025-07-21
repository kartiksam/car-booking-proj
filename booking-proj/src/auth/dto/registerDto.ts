import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserRole } from "src/enums/user.role";


export class RegisterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;




    @ApiProperty({ enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @ApiProperty()
    @IsNotEmpty()

    contact: number;

}