// const person = {id: 123, name: "Vasya", country: "USA", 
//     getCountry: function() { return this.country }};
// function createPerson(id, name, country) {
//     return {id: id, name: name, country: country, 
//         toString: function() { return `type Person: [id=${id} name=${name} country=${country}]` }};
// };
function Person(id, name, country) {
    this.id = id;
    this.name = name;
    this.country = country;    
}
Person.prototype.toString = function() {
    return `type Person: [id=${this.id} name=${this.name} country=${this.country}]`;
}
const person = new Person(123, "Vasya", "USA");
// console.log(`${person}`);
console.log(person.constructor.name);

class Employee extends Person {
    constructor(id, name, country, hours, wage) {
        super(id, name, country);
        this.hours = hours;
        this.wage = wage;
    }
}
Employee.prototype.computeSalary = function() {
    return this.hours * this.wage;
}
Employee.prototype.toString = function() {
    return `type Employee: [${Person.prototype.toString.call(this)} salary=${this.computeSalary()}]`
}
const empl = new Employee(124, "Moshe", "Canada", 50, 500);
// console.log(empl + '');

function displaySalary() {
    console.log(`salary of employee ${this.name} is ${this.computeSalary()}`);
}
// displaySalary.call(empl);
Employee.prototype.displaySalary = function() {
    return displaySalary.call(this);
}

const employees = [
    new Employee(111, "Vasily", "Israel", 100, 40),
    new Employee(222, "John", "USA", 150, 50)
]

// employees.forEach(e => console.log(e.toString()));
employees.forEach(e => e.displaySalary());

function Deferred() {
    this.arr = [];
}
Deferred.prototype.then = function(fun) {
    this.arr.push(fun);
}
Deferred.prototype.resolve = function(value) {
    this.arr.forEach(fun => {
        value = fun(value);
    });
}

const dd = new Deferred();
dd.then(function (res) { console.log('1 ', res); return 'a'; });
dd.then(function (res) { console.log('2 ', res); return 'b'; });
dd.then(function (res) { console.log('3 ', res); return 'c'; });
dd.resolve('hello');

/*
1  hello
2  a
3  b
*/