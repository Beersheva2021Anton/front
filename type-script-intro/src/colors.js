"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Colors = function (props) {
    var colors = props.colors;
    return React.createElement("div", null,
        React.createElement("ul", null, colors.map(function (col, index) { return React.createElement("li", { key: index, style: { color: "grey", backgroundColor: col } }, col); })));
};
exports.default = Colors;
