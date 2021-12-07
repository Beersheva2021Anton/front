let array1 = [1, 2, 3, -10, 9];
// const array2 = array1;
// array2[0] = 80;
// console.log(array1[0]);

// const array3 = array1.sort((a,b) => a - b);
// console.log("array sorted");
// console.log(array2);
// console.log(array1.push(40));

const array4 = [10, 15];
// array1.push(array4);
// console.log(array1);

// using spread operator
// array1.push(...array4);
// console.log(array1);

// add to beginning
// array1.unshift(...array4);
// console.log(array1);
// concat
// console.log(array1.concat(array4));
// console.log(array1 + array4);
// join
console.log(array1.join('|'));

// add to middle
array1.splice(2, 1, "hi", 'qq');
console.log(array1);

// slice
const array5 = array1.slice(2, 4);
console.log(array5);
console.log(array1);

// remove first element
array1.shift();
// remove last element
console.log(array1.pop());
console.log(array1);

array1 = [3, {n: 4}];
console.log(array1.indexOf(3));
console.log(array1.findIndex(e => e.n == 4));

// map, filter, reduce
array1 = [1, 2, 3];
var array6 = array1.map(e => e ** 2);
console.log(array6);
console.log(array1.filter(e => e%2 == 0));
console.log(array1.reduce((r,e) => r + e));

array1 = [1, 2, 3, 4, 5];
function maxMinAvg(array) {
    let res = {min: array1[0], max: array1[0], total: 0};
    res.total = array1.reduce((r, e) => {
        res.min = res.min < e ? res.min : e;
        res.max = res.max > e ? res.max : e;
        return r += e;
    });
    return `maximal value is ${res.max}, minimum value is ${res.min}, average value is ${res.total/array1.length}`;
}
console.log(maxMinAvg(array1));
/*
maximal value is 5, minimum value is 1, average value is 3
*/

array1 = [1, 2, 3];
Array.prototype.map = function(action) {
    console.log(this);
    let newArr = [];
    for (let i = 0; i < this.length; i++){
        newArr[i] = action(this[i]);
    }
    return newArr;
}
const array = array1.map(e => e * 2);
// array - [2, 4, 6];
console.log(array);
console.log(array1.map(e => e ** 3));

// destructuring
array1 = [1, 2, 3];
const [a, b, c] = array1;
console.log(a, b, c);
let d = 4;
let g = 5;
[d, g] = [g, d];
console.log(`d = ${d}; g = ${g}`);

let { h, v } = { h: 10, v: function(){console.log('hello')}};
v();

function toBinary(num) {
    const res = [];
    do {
        let rem = num % 2;
        num = (num - rem) / 2;
        res.unshift(rem);
    } while (num != 0);
    return res.join('');
}
console.log(toBinary(8));

function toOctal(num) {
    const res = [];
    do {
        let rem = num % 8;
        num = (num - rem) / 8;
        res.unshift(rem);
    } while (num != 0);
    return res.join('');
}
console.log(toOctal(8));