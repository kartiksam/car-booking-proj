import { UserRole } from "src/enums/user.role";

export class ResponseUserDto {
    _id: string;
    name: string;
    email: string;
    role?: UserRole;

}