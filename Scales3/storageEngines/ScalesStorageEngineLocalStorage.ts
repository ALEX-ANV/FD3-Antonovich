import { IStorageEngine } from './IStorageEngine';
import { Product } from '../Product';

const name = 'StotageEngineProducts';

export class ScalesStorageEngineLocalStorage implements IStorageEngine {
  constructor() {
    localStorage.removeItem(name);
  }

  addItem(item: Product): void {
    let items = JSON.parse(localStorage.getItem(name));
    if (items instanceof Array) {
      items.push(item);
    } else {
      items = new Array<Product>(item);
    }
    localStorage.setItem(name, JSON.stringify(items));
  }

  getItem(index: number): Product {
    let items = JSON.parse(localStorage.getItem(name));
    if (items instanceof Array && items.length > index) {
      let elem = items[index];
      elem.__proto__ = Product.prototype;
      return elem;
    }
    return null;
  }

  getCount(): number {
    let items = JSON.parse(localStorage.getItem(name));
    if (items instanceof Array) {
      return items.length;
    }
    return 0;
  }
}
