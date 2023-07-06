import { Module } from '@nestjs/common';

import { CoinApiModule } from '@/coins-api/services/coin-api/coin-api.module';
import { CoinApiService } from '@/coins-api/services/coin-api/coin-api.service';

import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';

@Module({
  imports: [CoinApiModule],
  controllers: [AssetsController],
  providers: [AssetsService, CoinApiService],
})
export class AssetsModule {}
