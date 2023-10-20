import { IDatabase } from '@/types/database.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@/types/product';
import { DatabaseQuery } from '@/types/db.query';

@Injectable()
export class DatabaseService implements IDatabase {
  constructor(private prisma: PrismaService) {}

  async getTotalCount(): Promise<number> {
    return await this.prisma.product.count();
  }

  async getAll(): Promise<Product[]> {
    const rawProducts = await this.prisma.product.findMany();

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

  async get(query: DatabaseQuery): Promise<Product[]> {
    const rawProducts = await this.prisma.product.findMany({
      skip: query.page,
      take: query.limit,
    });

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
}
