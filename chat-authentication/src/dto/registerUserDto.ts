import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserDto{
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
    @IsEmail()
    email: string;
}