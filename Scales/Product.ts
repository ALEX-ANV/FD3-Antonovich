export class Product {
  constructor(private scale: number, private name: string) {}

  getName() {
    return this.name;
  }

  getScale() {
    return this.scale;
  }
}

export class Apple extends Product {
  private nameApple: string = 'Apple';

  constructor(private scaleApple: number) {
    super(scaleApple, 'Apple');
  }
  getName() {
    return this.nameApple;
  }
  getScale() {
    return this.scaleApple;
  }
}

export class Tomato extends Product {
  private nameTomato: string = 'Tomato';

  constructor(private scaleTomato: number) {
    super(scaleTomato, 'Tomato');
  }
  getName() {
    return this.nameTomato;
  }
  getScale() {
    return this.scaleTomato;
  }
}
