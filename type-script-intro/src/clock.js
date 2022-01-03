"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var React = require("react");
var time_zones_1 = require("./time-zones");
var Clock = function (props) {
    var _a = React.useState(new Date()), date = _a[0], setDate = _a[1];
    var timeZonesParsed = getTimeZones(props.timeZone);
    function tic() {
        console.log("tic");
        setDate(new Date());
    }
    React.useEffect(function () {
        var interval = setInterval(tic, 1000);
        return function () { return clearInterval(interval); }; // вызывается при размонтировании
    }, []); // [] - пустой массив отслеживаемых компонентов
    return React.createElement("div", null, timeZonesParsed.map(function (tz, index) { return React.createElement("div", { key: index },
        React.createElement("h2", null,
            "DateTime ",
            tz,
            " time-zone"),
        React.createElement("h3", null, date.toLocaleString('ru', { timeZone: tz }))); }));
};
exports.default = Clock;
function getTimeZones(timeZoneStr) {
    var res = [];
    var dataArr = time_zones_1.default;
    var inputArr = timeZoneStr.split('|');
    inputArr.forEach(function (i) {
        var fRes = _.find(dataArr, function (obj) {
            return obj.name === i || obj.alternativeName === i || obj.countryName === i ||
                obj.countryCode === i || obj.mainCities.includes(i);
        });
        if (fRes) {
            res.push(fRes['name']);
        }
    });
    return res;
}
