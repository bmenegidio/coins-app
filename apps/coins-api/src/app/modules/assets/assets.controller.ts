import { Controller, Get } from '@nestjs/common';

import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private assetsService: AssetsService) {}

  @Get()
  getAssets() {
    return this.assetsService.getAssets();
  }
}
