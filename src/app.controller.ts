import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { APIResponse } from '@/types/api.response';
import { QueryParams } from '@/types/query.params';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/products')
  async findAll(@Query() query: QueryParams) {
    const products = await this.appService.listProducts(
      query?.limit,
      query?.offset,
    );
    const response: APIResponse = {
      data: products,
      pagination: {
        total_records: products.length,
      },
    };
    return response;
  }
}
