import { IsNotEmpty, isNotEmpty } from "class-validator";

export class LoginUserDto{
    @IsNotEmpty()
    usernameOrEmail: string;
    @IsNotEmpty()
    password: string;
}