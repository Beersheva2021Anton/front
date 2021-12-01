// let a = 10;
// console.log(`JS welcome with ${a}`);

// *** Primitives ***
let a = 12.5; // number
a = "Hello"; // string
a = true; // boolean

// *** Wrapper classes ***
let b = new String("Hello");
b = new Number(12.5);
b = new Boolean(true);

// *** Classes ***
let d = new Date();
d = new Object();
d = new Function();

// Primitives values; classes - references
// console.log(`new Number(12.5) == new Number(12.5) is ${new Number(12.5) == new Number(12.5)}`);
// console.log(`12.5 == new Number(12.5) is ${12.5 == new Number(12.5)}`);
// console.log(`12.5 === new Number(12.5) is ${12.5 === new Number(12.5)}`);
// console.log(`new Number(12.5) == new Number(12.5) is ${JSON.stringify(new Number(12.5)) == JSON.stringify(new Number(12.5))}`);
// console.log(`20 + '20' is ${20 + '20'}`);
// console.log(`20 * '20' is ${20 * '20'}`);
// console.log(`20 * 'a' is ${20 * 'a'}`);

// Conversion to string
// console.log(12.5.toString());
// console.log(12.5 + '');
// // Conversion to number
// console.log(+ '1abc');
// console.log(parseInt('1abc'));
// console.log('a' + parseInt('a') + 'as');
// Conversion to boolean
// let aa = 0;
// console.log(aa ? aa : 'undefined'); // BUG
// function fun(num) {
//     if (num != undefined) {
//         console.log('some task is performed');
//     }
//     else {
//         console.log('task is not performed')
//     }
// }
// fun(NaN);
// console.log(!!new String(""));

// Array
const ar = [];
ar[1000000] = 10;
ar.blabla = "test";
// console.log(ar.length);
// console.log(ar.blabla);
// ar[0] = 123;
// console.log(ar.sort((a, b) => b - a));

const person = {id: 123, name: "Vasya", country: "USA", getCountry: function() {return this.country}};
console.log(person.getCountry());
function createPerson(id, name, country) {
    return {id: id, name: name, country: country, getCountry: function() {return country}}
}
let p1 = createPerson(111, "John", "Canada");
let p2 = createPerson(222, "Mary", "Israel");
// console.log(JSON.stringify(p1) + JSON.stringify(p2));
// // getting object keys
// console.log(Object.keys(person));
// // getting object values
// console.log(Object.values(person));
// // getting object entries
// console.log(Object.entries(person));
// field access
// console.log(person.id); // access through point
// console.log(person['id']); // access through brackets
// person.age = 25;
// console.log(person.age);

// Distinct function properties
// function sum(op1=10, op2=20) {
//     return op1 + op2;
// }
// function sum(op1, op2){
//     op1 = op1 == undefined ? 10 : op1;
//     op2 = op2 == undefined ? 20 : op2;
//     return op1 + op2;
// }
function sum (op1, op2) {
    op1 = op1 ?? 10;
    op2 = op2 ?? 20;
    return op1 + op2;
}

// console.log(sum()); // 30
// console.log(sum(30)); // 50
// console.log(sum(undefined, 80)); // 90
// console.log(sum(0,15)); // 15

const array = [
    'abc', 'ab', 'a', 'lpm', 'abc', 'lpm', 'lpm'
];
function displayOccurrencies(array) {
    let map = new Object();
    for (let i = 0; i < array.length; i++) {
        map[array[i]] = map[array[i]] ? map[array[i]] + 1 : 1;
    }
    Object.entries(map)
        .sort((e1, e2) => {
            let res = e2[1] - e1[1];
            if (res == 0) {
                res = e1[0].localeCompare(e2[0]);
            };
            return res;
        })
        .forEach(e => console.log(e[0] + ' => ' + e[1]));
}
displayOccurrencies(array);