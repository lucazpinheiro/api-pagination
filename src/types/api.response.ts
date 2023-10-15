import { Product } from './product';

export type Pagination = {
  total_records: number;
  total_pages?: number;
  current_page?: number;
  current_page_total_records?: number;
  next_page?: string;
  prev_page?: string;
};

export type APIResponse = {
  data: Product[];
  pagination: Pagination;
};
