export class Product {
  constructor(private scale: number, private name: string) {}

  getName() {
    return this.name;
  }

  getScale() {
    return this.scale;
  }
}
