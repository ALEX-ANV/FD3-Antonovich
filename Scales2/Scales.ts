import { IScalable } from './Product';

export default class Scales {
  private products: IScalable[];

  constructor() {
    this.products = [];
  }

  add(product: IScalable) {
    this.products.push(product);
  }

  getSumScale() {
    return this.products.reduce((scale, product) => {
      return (scale += product.getScale());
    }, 0);
  }

  getNameList() {
    return this.products.map(t => t.getName());
  }
}
