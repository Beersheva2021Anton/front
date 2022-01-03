"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var InputData = function (props) {
    var inputColorsEl;
    var inputTZEl;
    React.useEffect(function () {
        inputColorsEl = document.getElementById("input-colors");
        inputTZEl = document.getElementById("input-tz");
    }, []);
    function returnColors() {
        var colorsStr = inputColorsEl.value;
        props.colorsFn(colorsStr.split(' '));
    }
    function returnTimeZone() {
        props.timeZoneFn(inputTZEl.value);
    }
    return React.createElement("div", null,
        React.createElement("input", { id: "input-colors", placeholder: "Enter colors separated by space" }),
        React.createElement("button", { onClick: returnColors }, "GO"),
        React.createElement("input", { id: "input-tz", placeholder: "Enter time-zone" }),
        React.createElement("button", { onClick: returnTimeZone }, "GO"));
};
exports.default = InputData;
