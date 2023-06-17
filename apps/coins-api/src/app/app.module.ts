import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AssetsModule } from '@/modules/assets/assets.module';
import { CoinApiModule } from '@/services/coin-api/coin-api.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoinApiModule,
    AssetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
