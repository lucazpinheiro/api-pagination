import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Product } from './types/product';
import { Pagination } from './types/api.response';

@Injectable()
export class AppService {
  private DEFAULT_PAGINATION_LIMIT = 20;
  constructor(private prisma: PrismaService) {}

  async countRecords(): Promise<number> {
    return await this.prisma.product.count();
  }

  async listProducts(limit?: number, page?: number): Promise<Product[]> {
    const queryOptions: Prisma.ProductFindManyArgs = {};

    if (limit) {
      queryOptions.take = limit;
    }

    if (page) {
      queryOptions.skip = page;
    }

    const rawProducts = await this.prisma.product.findMany(queryOptions);

    const parsedProducts = rawProducts.map((p) => {
      return {
        productID: p.productID,
        isAvailable: p.isAvailable,
        title: p.title,
        price: p.price,
        description: p.description,
      };
    });

    return parsedProducts;
  }

  async readOperation(
    queryLimit?: number,
    queryPage?: number,
  ): Promise<[Pagination, Product[]]> {
    const totalRecords = await this.countRecords();

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

    const products = await this.listProducts(limit, page);

    paginationInfo.current_page_total_records = products.length;
    paginationInfo.current_page = Number(queryPage);

    return [paginationInfo, products];
  }
}
