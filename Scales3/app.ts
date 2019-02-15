import { Product } from './Product';
import Scales from './Scales';
import { IStorageEngine } from './storageEngines/IStorageEngine';
import { ScalesStorageEngineArray } from './storageEngines/ScalesStorageEngineArray';
import { ScalesStorageEngineLocalStorage } from './storageEngines/ScalesStorageEngineLocalStorage';

let apple: Product = new Product(100, 'Apple');
let apple1: Product = new Product(20, 'Apple');
let apple2: Product = new Product(10, 'Apple');
let apple3: Product = new Product(10, 'Apple');

let tomato: Product = new Product(10, 'Tomato');
let tomato1: Product = new Product(20, 'Tomato');
let tomato2: Product = new Product(1, 'Tomato');
let tomato3: Product = new Product(10, 'Tomato');

let engine1: IStorageEngine = new ScalesStorageEngineArray();
let engine2: IStorageEngine = new ScalesStorageEngineLocalStorage();

var scales: Scales = new Scales(engine1);

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

var scales1: Scales = new Scales(engine2);

scales1.add(apple);
scales1.add(apple1);
scales1.add(apple2);
scales1.add(apple3);
scales1.add(tomato);
scales1.add(tomato1);
scales1.add(tomato2);
scales1.add(tomato3);

console.log(scales1.getSumScale());
console.log(scales1.getNameList());
