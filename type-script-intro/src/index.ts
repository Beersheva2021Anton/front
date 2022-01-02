// const num: number = 10;
// for (let i = 0; i < 5; i++) {
//     setTimeout(() => console.log(i));
// }
// let str: string;

// let comparator: (a: number, b: number) => number;

// comparator = function (a: number, b: number) {
//     return a - b;
// }

// str = '13';
// console.log(comparator(str as any, 12));

// let a: any;
// a = 10;
// a = "10";

// ***************************

// interface Person {
//     id: number;
//     name: string;
//     getName?: () => string;
// }
// let person1: Person = {id: 31, name: "Alex", getName() {return this.name}};
// console.log(person1.getName());

// interface Employee extends Person {
//     salary: number;
// }
// let empl: Employee = { id: 22, name: "Anton", salary: 5000 };
// console.log(empl);

// ****************************

type Person = {
    id: number;
    name: string;
    getName?: () => string;
}
// let person1: Person = {id: 31, name: "Alex", getName() {return this.name}};
// console.log(person1.getName());

// type Employee = Person & {
//     salary: number;
// }
// let empl: Employee = { id: 22, name: "Anton", salary: 5000 };
// console.log(empl);

// **************************

type Comparator<T> = (a: T, b: T) => number;
function comparator_func<T>(a: T, b: T) : number { 
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}
const comparatorStr: Comparator<string> = comparator_func;
console.log(comparatorStr("abc", "def"));
const comparatorNum: Comparator<number> = comparator_func;
console.log(comparatorNum(7, 4));

// ***************************

interface IComparator<T> {
    compareTo(a: T, b: T): number;
}
class ComparatorPerson implements IComparator<Person> {
    compareTo(a: Person, b: Person): number {
        return a.name.localeCompare(b.name);
    }
}

// ****************************

type Point = {
    x: number;
    y: number;
}
interface Shape {
    draw(): void;
}
class Line implements Shape {
    constructor(private p1: Point, private p2: Point) {}
    draw(): void {
        console.log(`{${JSON.stringify(this.p1)}}--{${JSON.stringify(this.p2)}}`);
    }    
}
class Square implements Shape {
    constructor(private _p: Point, private _width: number) {}
    draw(): void {
        console.log(`${JSON.stringify(this._p)}[${this._width}]`);
    }    
}

const p: Point = { x:10, y: 20 };
const line = new Line(p, p);
const rect = new Square(p, 5);
line.draw();
rect.draw();