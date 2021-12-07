class X {
    constructor(array, factor) {
        this.array = array;
        this.factor = factor;
    }
    displayOne(element) {
        console.log(element * this.factor);
    }
    displayAll() {
        this.array.forEach(this.displayOne.bind(this));
    }
}
const arr = [1, 2, 3];
const x = new X(arr, 10);
x.displayAll();

Array.prototype.forEach = function(func) {
    console.log('qq');
    for (let i = 0; i < this.length; i++) {
        func(this[i]);
    }
}
arr.forEach(e => console.log(e));

const point = {
    x: 3,
    y: 4
};
function pointInSpaceTime(z, t) {
    console.log(`x: ${this.x}, y: ${this.y}, z: ${z} t: ${t}`);
}
let pointInSpaceTimeMethod = pointInSpaceTime.bind(point);
pointInSpaceTimeMethod(10, 20);
pointInSpaceTime.bind(point, 10, 20)();

pointInSpaceTimeMethod = pointInSpaceTime.bind(point, 10);
pointInSpaceTimeMethod(20);

Function.prototype.myBind = function(thisObj, ...args) {
    return (...params) => {
        thisObj.thisMethod = this;
        thisObj.thisMethod(...args.concat(params));
    }
}

/* myBynd */
pointInSpaceTimeMethod = pointInSpaceTime.myBind(point);
pointInSpaceTimeMethod(10, 20);
pointInSpaceTime.myBind(point, 10, 20)();

pointInSpaceTimeMethod = pointInSpaceTime.myBind(point, 10);
pointInSpaceTimeMethod(20);
