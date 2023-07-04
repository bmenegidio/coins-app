import { Controller, Get, Param } from '@nestjs/common';

import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private assetsService: AssetsService) {}

  @Get()
  getAssets() {
    return this.assetsService.getAssets();
  }

  @Get(':assetId')
  getById(@Param('assetId') assetId: string) {
    return this.assetsService.getById(assetId);
  }
}
