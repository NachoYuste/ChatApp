import { Injectable, NotFoundException, Logger, UnauthorizedException, Inject } from '@nestjs/common';
import { User } from './entities/user-auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RegisterUserDto } from 'src/dto/registerUserDto';

@Injectable()
export class UserAuthService {
    constructor(@Inject('USER_REPOSITORY') private userRepository: Repository<User>, private jwtService: JwtService) { }

    async register(userDto : RegisterUserDto): Promise<{ message: string }> {
            const hash = await bcrypt.hash(userDto.password, 10);

            try {
                const user = this.userRepository.create({
                    username : userDto.username, 
                    email : userDto.email, 
                    password: hash
                });
                
            this.userRepository.save(user);
            return { message: 'User registered successfully' };

            } catch (error) {
                console.log(error)
                throw error;
            }
            
    }

    async login(usernameOrEmail: string, password: string): Promise<string> {
        const user = await this.userRepository.findOne({
            where: [
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

        const payload = { userId: user.id }
        const token = this.jwtService.sign(payload);
        return token;
    }
}


//todo: get users with pagination/ajax

