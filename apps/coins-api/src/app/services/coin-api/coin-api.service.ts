import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';

import { AssetsRo } from '../../modules/assets/dto/assets.ro';

import { CoinApiAssetsResponseRo } from './dto/assets-response.ro';

@Injectable()
export class CoinApiService {
  constructor(private httpService: HttpService) {}

  getAssets(): Observable<AssetsRo[]> {
    const dollarString = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 3,
    });
    return this.httpService
      .get<CoinApiAssetsResponseRo[]>('/assets')
      .pipe(
        map((res) =>
          res.data
            .filter((asset) => asset.type_is_crypto === 1)
            .map((asset) => ({
              id: asset.asset_id,
              label: `${asset.name} (${asset.asset_id})`,
              name: asset.name,
              priceUsd: asset.price_usd
                ? dollarString.format(asset.price_usd)
                : '',
              volume1HrsUsd: asset.volume_1hrs_usd,
            }))
        )
      )
      .pipe(
        catchError((error) => {
          throw new BadRequestException(error);
        })
      );
  }
}
