import { IStorageEngine } from './IStorageEngine';
import { Product } from '../Product';

export class ScalesStorageEngineArray implements IStorageEngine {
  private items: Array<Product>;

  constructor() {
    this.items = new Array<Product>();
  }

  addItem(item: Product): void {
    this.items.push(item);
  }
  getItem(index: number): Product {
    if (this.items.length > index) {
      return this.items[index];
    }
    return null;
  }
  getCount(): number {
    return this.items.length;
  }
}
