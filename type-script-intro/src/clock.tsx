import * as React from "react";

const Clock: React.FC<{timeZone: string}> = () => {
    const [date, setDate] = React.useState<Date>(new Date())  
    const timeZone = "Asia/Jerusalem";
    function tic() {
        console.log("tic");
        setDate(new Date());
    }
    React.useEffect(() => {
        const interval = setInterval(tic, 1000);
        return () => clearInterval(interval); // вызывается при размонтировании
    }, []) // [] - пустой массив отслеживаемых компонентов
    return <div>
        <h2>DateTime {timeZone} time-zone</h2>
        <h3>{date.toLocaleString('ru', {timeZone})}</h3>
    </div>
}

export default Clock;