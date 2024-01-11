import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}
