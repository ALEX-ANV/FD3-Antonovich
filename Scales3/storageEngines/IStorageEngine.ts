import { Product } from '../Product';

export interface IStorageEngine {
  addItem(item: Product): void;
  getItem(index: number): Product;
  getCount(): number;
}
