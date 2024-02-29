import { Body, Controller, Logger, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { RegisterUserDto } from 'src/dto/registerUserDto';
import { LoginUserDto } from 'src/dto/loginUserDto';
import { NotFoundError } from 'rxjs';

@Controller('auth')
export class UserAuthController {
    private readonly logger = new Logger(UserAuthService.name);

    constructor(private readonly userAuthService: UserAuthService) { }

    @Post('register')
    async register(@Body() user: RegisterUserDto): Promise<{ message: string }> {
        try {
            return await this.userAuthService.register(user);
        }
        catch (err) {
            throw new Error('An error occurred while registering the user');
        }
    }

    @Post('login')
    async login(@Body() user: LoginUserDto): Promise<{ message: string, token: string }> {
        try {
            const token = await this.userAuthService.login(user.usernameOrEmail, user.password);
            return { message: 'Login successful', token };
        }
        catch (err) {
            if (err instanceof UnauthorizedException || err instanceof NotFoundException) {
                throw err;
            }
            this.logger.error(err);
            throw new UnauthorizedException('An error occurred while logging in');
        }

    }

}
