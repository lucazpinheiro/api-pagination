import { DatabaseQuery } from './db.query';
import { Product } from './product';

export interface IDatabase {
  getTotalCount(): Promise<number>;
  getAll(): Promise<Product[]>;
  get(query: DatabaseQuery): Promise<Product[]>;
}
