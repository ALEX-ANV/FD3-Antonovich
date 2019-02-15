export interface IScalable {
  getName(): string;
  getScale(): number;
}

export class Apple implements IScalable {
  constructor(private scale: number, private name: string = 'Apple') {}
  getName() {
    return this.name;
  }
  getScale() {
    return this.scale;
  }
}

export class Tomato implements IScalable {
  constructor(private scale: number, private name: string = 'Tomato') {}
  getName() {
    return this.name;
  }
  getScale() {
    return this.scale;
  }
}
