import { ResponseUserDto } from "src/dtos/user.response";

export function createUserMapper(user: any): ResponseUserDto {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

    }
}