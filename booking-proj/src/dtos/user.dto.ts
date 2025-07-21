import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "src/enums/user.role";

export class UserDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;


    @ApiProperty()
    password: string;

    @ApiProperty({ enum: UserRole, required: false })
    role?: UserRole;

}