import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CoinApiService } from './coin-api.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('COIN_API_BASE_URL'),
        headers: {
          'X-CoinAPI-Key': configService.get('COIN_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CoinApiService],
  exports: [HttpModule],
})
export class CoinApiModule {}
