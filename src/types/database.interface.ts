import { DatabaseQuery } from './db.query';
import { Product } from './product';

export interface IDatabase {
  getAll(): Promise<Product[]>;
  get(query: DatabaseQuery): Promise<Product[]>;
}
