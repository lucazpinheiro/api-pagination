import { Product } from './product';

export type Pagination = {
  total_records: number;
  current_page?: number;
  total_pages?: number;
  next_page?: number;
  prev_page?: number;
};

export type APIResponse = {
  data: Product[];
  pagination: Pagination;
};
