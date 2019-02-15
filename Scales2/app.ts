import { IScalable, Apple, Tomato } from './Product';
import Scales from './Scales';

let apple: IScalable = new Apple(100);
let apple1: IScalable = new Apple(20);
let apple2: IScalable = new Apple(10);
let apple3: IScalable = new Apple(10);

let tomato: IScalable = new Tomato(10);
let tomato1: IScalable = new Tomato(20);
let tomato2: IScalable = new Tomato(1);
let tomato3: IScalable = new Tomato(10);

var scales: Scales = new Scales();

scales.add(apple);
scales.add(apple1);
scales.add(apple2);
scales.add(apple3);
scales.add(tomato);
scales.add(tomato1);
scales.add(tomato2);
scales.add(tomato3);

console.log(scales.getSumScale());
console.log(scales.getNameList());
