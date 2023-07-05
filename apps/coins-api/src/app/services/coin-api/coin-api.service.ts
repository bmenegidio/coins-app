import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';

import { AssetsRo } from '../../modules/assets/dto/assets.ro';

import { CoinApiAssetsResponseRo } from './dto/assets-response.ro';

@Injectable()
export class CoinApiService {
  constructor(private httpService: HttpService) {}

  dollarString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,
  });

  private normalizeCoinData(coinData: CoinApiAssetsResponseRo): AssetsRo {
    return {
      id: coinData.asset_id,
      label: `${coinData.name} (${coinData.asset_id})`,
      name: coinData.name,
      priceUsd: coinData.price_usd
        ? this.dollarString.format(coinData.price_usd)
        : '',
      volume1HrsUsd: coinData.volume_1hrs_usd
        ? this.dollarString.format(coinData.volume_1hrs_usd)
        : '',
    };
  }

  getAssets(): Observable<AssetsRo[]> {
    return this.httpService.get<CoinApiAssetsResponseRo[]>('/assets').pipe(
      map((res) =>
        res.data
          .filter((asset) => asset.type_is_crypto === 1)
          .map((coinData) => this.normalizeCoinData(coinData))
      ),
      catchError((error) => {
        throw new BadRequestException(error);
      })
    );
  }

  getById(assetId: string): Observable<AssetsRo> {
    return this.httpService
      .get<CoinApiAssetsResponseRo[]>(`/assets/${assetId}`)
      .pipe(
        catchError((error) => {
          throw new BadRequestException(error);
        }),
        map((res) => {
          if (res.data.length === 0)
            throw new NotFoundException('Asset not found.');

          const asset = res.data[0];
          return this.normalizeCoinData(asset);
        })
      );
  }
}
