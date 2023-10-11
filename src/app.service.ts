import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Product } from './types/product';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async listProducts(limit?: number, offset?: number): Promise<Product[]> {
    const queryOptions: Prisma.ProductFindManyArgs = {};
    if (limit && offset) {
      queryOptions.skip = Number(offset);
      queryOptions.take = Number(limit);
    }

    const parsedProducts = (
      await this.prisma.product.findMany(queryOptions)
    ).map((p) => {
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
}
