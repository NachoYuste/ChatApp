import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserAuthModule } from './user-auth/user-auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'db_des.env',
      isGlobal: true
    }),
    UserAuthModule,
    DatabaseModule
  ],
})
export class AppModule {}
