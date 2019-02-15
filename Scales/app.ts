import { Product, Apple, Tomato } from './Product';
import Scales from './Scales';

let apple: Product = new Apple(100);
let apple1: Product = new Apple(20);
let apple2: Product = new Apple(10);
let apple3: Product = new Apple(10);

let tomato: Product = new Tomato(10);
let tomato1: Product = new Tomato(20);
let tomato2: Product = new Tomato(1);
let tomato3: Product = new Tomato(10);

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
