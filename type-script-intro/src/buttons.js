"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Buttons = function (props) {
    return React.createElement("div", null,
        React.createElement("button", { onClick: props.changeBtn.bind(_this, 1) }, "Show Input"),
        React.createElement("button", { onClick: props.changeBtn.bind(_this, 2) }, "Show Colors"),
        React.createElement("button", { onClick: props.changeBtn.bind(_this, 3) }, "Show Timer"));
};
exports.default = Buttons;
