import { Body, Controller, Post } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  async create(@Body() data: { id: string; symbol: string; price: number }) {
    return this.assetsService.create(data);
  }
}
