"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Clock = function () {
    var _a = React.useState(new Date()), date = _a[0], setDate = _a[1];
    var timeZone = "Asia/Jerusalem";
    function tic() {
        console.log("tic");
        setDate(new Date());
    }
    React.useEffect(function () {
        var interval = setInterval(tic, 1000);
        return function () { return clearInterval(interval); }; // вызывается при размонтировании
    }, []); // [] - пустой массив отслеживаемых компонентов
    return React.createElement("div", null,
        React.createElement("h2", null,
            "DateTime ",
            timeZone,
            " time-zone"),
        React.createElement("h3", null, date.toLocaleString('ru', { timeZone: timeZone })));
};
exports.default = Clock;
