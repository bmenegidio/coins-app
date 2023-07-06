import { Injectable } from '@nestjs/common';

import { CoinApiService } from '@/coins-api/services/coin-api/coin-api.service';

@Injectable()
export class AssetsService {
  constructor(private coinApiService: CoinApiService) {}

  getAssets() {
    return this.coinApiService.getAssets();
  }

  getById(assetId: string) {
    return this.coinApiService.getById(assetId);
  }
}
