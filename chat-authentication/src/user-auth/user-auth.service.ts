import { Injectable, NotFoundException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user-auth.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) { }

    async register(username: string, email: string, password: string): Promise<{ message: string }> {
            const hash = await bcrypt.hash(password, 10);
            await this.userModel.create({ username, email, password: hash });

            return { message: 'User registered successfully' };

    }

    async login(usernameOrEmail: string, password: string): Promise<string> {
        const user = await this.userModel.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        })

        if (!user) {
            throw new NotFoundException(`User ${usernameOrEmail} not found`);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid user password');
        }

        const payload = { userId: user._id }
        const token = this.jwtService.sign(payload);
        return token;
    }
}


//todo: get users with pagination/ajax

