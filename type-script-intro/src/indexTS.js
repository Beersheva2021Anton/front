// const num: number = 10;
// for (let i = 0; i < 5; i++) {
//     setTimeout(() => console.log(i));
// }
// let str: string;
function comparator_func(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    else {
        return 0;
    }
}
var comparatorStr = comparator_func;
console.log(comparatorStr("abc", "def"));
var comparatorNum = comparator_func;
console.log(comparatorNum(7, 4));
var ComparatorPerson = /** @class */ (function () {
    function ComparatorPerson() {
    }
    ComparatorPerson.prototype.compareTo = function (a, b) {
        return a.name.localeCompare(b.name);
    };
    return ComparatorPerson;
}());
var Line = /** @class */ (function () {
    function Line(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    Line.prototype.draw = function () {
        console.log("{".concat(JSON.stringify(this.p1), "}--{").concat(JSON.stringify(this.p2), "}"));
    };
    return Line;
}());
var Square = /** @class */ (function () {
    function Square(_p, _width) {
        this._p = _p;
        this._width = _width;
    }
    Square.prototype.draw = function () {
        console.log("".concat(JSON.stringify(this._p), "[").concat(this._width, "]"));
    };
    return Square;
}());
var p = { x: 10, y: 20 };
var line = new Line(p, p);
var rect = new Square(p, 5);
line.draw();
rect.draw();
// ***************************
var map = new Map([["123", 456]]);
var keys = Array.from(map.keys());
