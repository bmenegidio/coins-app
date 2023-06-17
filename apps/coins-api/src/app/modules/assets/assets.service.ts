import { Injectable } from '@nestjs/common';

import { CoinApiService } from '@/services/coin-api/coin-api.service';

@Injectable()
export class AssetsService {
  constructor(private coinApiService: CoinApiService) {}

  getAssets() {
    return this.coinApiService.getAssets();
  }
}
