"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var clock_1 = require("./clock");
var colors_1 = require("./colors");
var inputData_1 = require("./inputData");
var App = function () {
    var style = { display: "flex", flexDirection: "column" };
    var _a = React.useState(["red", "green", "blue", "yellow", "brown"]), colors = _a[0], setColors = _a[1];
    function injectColors(colorsArr) {
        setColors(colorsArr);
    }
    var _b = React.useState("Asia/Jerusalem"), timeZone = _b[0], setTZ = _b[1];
    function injectTimeZone(timeZone) {
        setTZ(timeZone);
    }
    return React.createElement("div", { style: style },
        React.createElement(inputData_1.default, { colorsFn: injectColors, timeZoneFn: injectTimeZone }),
        React.createElement(colors_1.default, { colors: colors }),
        React.createElement(clock_1.default, { timeZone: timeZone }));
};
exports.default = App;
