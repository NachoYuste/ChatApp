import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user-auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { secretKey } from './config';

@Module({
  providers: [UserAuthService],
  controllers: [UserAuthController],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
      secret: secretKey.secret,
      signOptions: {expiresIn: '1h'}
    })
  ]
})
export class UserAuthModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      
  }
}
