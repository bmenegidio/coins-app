import { Test } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';

import { AssetsController } from '@/coins-api/modules/assets/assets.controller';
import { AssetsService } from '@/coins-api/modules/assets/assets.service';

describe('AssetsController', () => {
  let assetsController: AssetsController;
  let assetsService: AssetsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AssetsController],
      providers: [
        {
          provide: AssetsService,
          useValue: {
            getAssets: jest.fn(),
          },
        },
      ],
    }).compile();

    assetsController = moduleRef.get<AssetsController>(AssetsController);
    assetsService = moduleRef.get<AssetsService>(AssetsService);
  });

  it('should be defined', () => {
    expect(assetsController).toBeDefined();
    expect(assetsService).toBeDefined();
  });

  it('should return an empty array of assets', async () => {
    jest.spyOn(assetsService, 'getAssets').mockImplementationOnce(() => of([]));
    expect(await firstValueFrom(assetsController.getAssets())).toEqual([]);
    expect(assetsService.getAssets).toBeCalledTimes(1);
  });
});
