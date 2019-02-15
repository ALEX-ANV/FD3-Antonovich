import { Product } from './Product';
import { IStorageEngine } from './storageEngines/IStorageEngine';

export default class Scales {
  constructor(private engine: IStorageEngine) {}

  add(product: Product) {
    this.engine.addItem(product);
  }

  getSumScale() {
    let sum: number = 0;
    for (let index = 0; index < this.engine.getCount(); index++) {
      const element = this.engine.getItem(index);
      sum += element.getScale();
    }
    return sum;
  }

  getNameList() {
    let names: string[] = [];
    for (let index = 0; index < this.engine.getCount(); index++) {
      const element = this.engine.getItem(index);
      names.push(element.getName());
    }
    return names;
  }
}
