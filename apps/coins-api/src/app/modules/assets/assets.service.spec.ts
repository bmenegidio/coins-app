import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';

import { AssetsService } from '@/modules/assets/assets.service';
import { CoinApiService } from '@/services/coin-api/coin-api.service';

import { AssetsRo } from './dto/assets.ro';

describe('AssetsService', () => {
  let assetsService: AssetsService;
  let coinApiService: CoinApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsService,
        { provide: CoinApiService, useValue: { getAssets: jest.fn() } },
      ],
    }).compile();

    assetsService = module.get<AssetsService>(AssetsService);
    coinApiService = module.get<CoinApiService>(CoinApiService);
  });

  it('should be defined', () => {
    expect(coinApiService).toBeDefined();
  });

  it('should return an empty array of assets', async () => {
    jest
      .spyOn(coinApiService, 'getAssets')
      .mockImplementationOnce(() => of([]));
    const assets = await firstValueFrom(assetsService.getAssets());
    expect(coinApiService.getAssets).toBeCalledTimes(1);
    expect(assets).toEqual([]);
  });

  it('should return an array of assets that contains an item', async () => {
    const assetsMock: AssetsRo[] = [
      {
        id: 'ETH',
        name: 'Ethereum',
        label: 'Ethereum (ETH)',
        priceUsd: '$9,385.00',
        volume1HrsUsd: 1268,
      },
    ];
    jest
      .spyOn(coinApiService, 'getAssets')
      .mockImplementationOnce(() => of(assetsMock));
    const assetsResponse = await firstValueFrom(assetsService.getAssets());
    expect(coinApiService.getAssets).toBeCalledTimes(1);
    expect(assetsResponse).toEqual(assetsMock);
  });
});
