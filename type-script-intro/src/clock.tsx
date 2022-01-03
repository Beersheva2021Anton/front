import _ = require("lodash");
import * as React from "react";
import timeZones from "./time-zones";

const Clock: React.FC<{ timeZone: string }> = (props) => {
    const [date, setDate] = React.useState<Date>(new Date());
    const timeZonesParsed: string[] = getTimeZones(props.timeZone);
    function tic() {
        console.log("tic");
        setDate(new Date());
    }
    React.useEffect(() => {
        const interval = setInterval(tic, 1000);
        return () => clearInterval(interval); // вызывается при размонтировании
    }, []) // [] - пустой массив отслеживаемых компонентов

    return <div>
        {timeZonesParsed.map((tz, index) => <div key={index}>
            <h2>DateTime {tz} time-zone</h2>
            <h3>{date.toLocaleString('ru', { timeZone: tz })}</h3>
        </div>)}
    </div>
}

export default Clock;

function getTimeZones(timeZoneStr: string): string[] {
    let res = []
    const dataArr = timeZones;    
    const inputArr = timeZoneStr.split('|');
    inputArr.forEach(i => {
        let fRes = _.find(dataArr, function(obj){
            return obj.name === i || obj.alternativeName === i || obj.countryName === i ||
            obj.countryCode === i || obj.mainCities.includes(i);
        });
        if (fRes) {
            res.push(fRes['name']);
        }        
    })
    return res;
}
