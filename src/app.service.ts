import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Product } from '@/types/product';
import { Pagination } from '@/types/api.response';
import { IDatabase } from '@/types/database.interface';
import { DATABASE_SERVICE, PRISMA_SERVICE } from './constants';
import { DatabaseService } from './modules/database/database.service';

@Injectable()
export class AppService {
  private DEFAULT_PAGINATION_LIMIT = 20;
  constructor(private databaseService: DatabaseService) {}

  async readOperation(
    queryLimit?: number,
    queryPage?: number,
  ): Promise<[Pagination, Product[]]> {
    const totalRecords = await this.databaseService.getTotalCount();

    const totalPages = Math.ceil(
      totalRecords / (queryLimit || this.DEFAULT_PAGINATION_LIMIT),
    );

    const paginationInfo: Pagination = {
      total_records: totalRecords,
      total_pages: totalPages,
    };

    const limit = Number(queryLimit);
    const page = (Number(queryPage) - 1) * limit;

    if (Number(queryPage) < totalPages) {
      paginationInfo.next_page = `/api/products?limit=${limit}&page=${
        Number(queryPage) + 1
      }`;
    }

    if (page >= 1) {
      paginationInfo.prev_page = `/api/products?limit=${limit}&page=${
        Number(queryPage) - 1
      }`;
    }

    const products = await this.databaseService.get({
      limit,
      page,
    });

    paginationInfo.current_page_total_records = products.length;
    paginationInfo.current_page = Number(queryPage);

    return [paginationInfo, products];
  }
}
