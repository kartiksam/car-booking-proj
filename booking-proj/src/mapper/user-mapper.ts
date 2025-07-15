import { ResponseUserDto } from "src/dtos/user.response";
import { UserDocument } from "src/schemas/user.schema";

export function toResponseDto(user: any): ResponseUserDto {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,


    };
}
