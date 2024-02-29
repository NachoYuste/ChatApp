import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';

import { User } from './entities/user-auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { secretKey } from './config';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user-auth.provider';

@Module({
  providers: [UserAuthService, ...userProviders],
  controllers: [UserAuthController],
  imports: [
    DatabaseModule,
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
