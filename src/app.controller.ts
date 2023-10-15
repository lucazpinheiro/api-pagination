import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { APIResponse } from '@/types/api.response';
import { QueryParams } from '@/types/query.params';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/products')
  async findAll(@Query() query: QueryParams) {
    const [pagiantionInfo, products] = await this.appService.readOperation(
      query?.limit,
      query?.page,
    );

    const response: APIResponse = {
      data: products,
      pagination: pagiantionInfo,
    };
    return response;
  }
}
