"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var buttons_1 = require("./buttons");
var clock_1 = require("./clock");
var colors_1 = require("./colors");
var inputData_1 = require("./inputData");
var App = function () {
    var style = { display: "flex", flexDirection: "column" };
    var _a = React.useState(["red", "green", "blue", "yellow", "brown"]), colors = _a[0], setColors = _a[1];
    var _b = React.useState("Asia/Jerusalem"), timeZone = _b[0], setTZ = _b[1];
    var _c = React.useState(0), btnNum = _c[0], setBtn = _c[1];
    return React.createElement("div", { style: style },
        React.createElement(buttons_1.default, { changeBtn: setBtn }),
        btnNum == 1 && React.createElement(inputData_1.default, { colorsFn: setColors, timeZoneFn: setTZ }),
        btnNum == 2 && React.createElement(colors_1.default, { colors: colors }),
        btnNum == 3 && React.createElement(clock_1.default, { timeZone: timeZone }));
};
exports.default = App;
