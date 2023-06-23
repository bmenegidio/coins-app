import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { firstValueFrom, of } from 'rxjs';

import { AssetsRo } from '../../modules/assets/dto/assets.ro';

import { CoinApiAssetsResponseRo } from './dto/assets-response.ro';
import { CoinApiService } from './coin-api.service';

describe('CoinApiService', () => {
  let service: CoinApiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoinApiService,
        { provide: HttpService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    service = module.get<CoinApiService>(CoinApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(httpService).toBeDefined();
  });

  it('should return normalized assets', async () => {
    const coinApiAssetsResponse: AxiosResponse<CoinApiAssetsResponseRo> = {
      data: [
        {
          asset_id: 'BTC',
          name: 'Bitcoin',
          type_is_crypto: 1,
          data_start: '2010-07-17',
          data_end: '2019-11-03',
          data_quote_start: '2014-02-24T17:43:05.0000000Z',
          data_quote_end: '2019-11-03T17:55:07.6724523Z',
          data_orderbook_start: '2014-02-24T17:43:05.0000000Z',
          data_orderbook_end: '2019-11-03T17:55:17.8592413Z',
          data_trade_start: '2010-07-17T23:09:17.0000000Z',
          data_trade_end: '2019-11-03T17:55:11.8220000Z',
          data_symbols_count: 22711,
          volume_1hrs_usd: 102894431436.49,
          volume_1day_usd: 2086392323256.16,
          volume_1mth_usd: 57929168359984.54,
          price_usd: 9166,
        },
      ],
    } as AxiosResponse;
    const assetsNormalizedResults: AssetsRo[] = [
      {
        id: 'BTC',
        label: 'Bitcoin (BTC)',
        name: 'Bitcoin',
        priceUsd: '$9,166.000',
        volume1HrsUsd: 102894431436.49,
      },
    ];

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(coinApiAssetsResponse));
    const assets = await firstValueFrom(service.getAssets());
    expect(assets).toEqual(assetsNormalizedResults);
  });

  it('should return instance of BadRequestException when coinApiAssetsResponse is null', async () => {
    const coinApiAssetsResponse: AxiosResponse<CoinApiAssetsResponseRo> = {
      data: null,
    } as AxiosResponse;

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(coinApiAssetsResponse));
    await expect(firstValueFrom(service.getAssets())).rejects.toThrow(
      BadRequestException
    );
  });
});
