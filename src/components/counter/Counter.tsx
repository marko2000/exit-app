import React, {useEffect, useState} from "react";
import CounterField from "./CounterField";
import {IonToolbar} from "@ionic/react";

const exitDate = new Date(2022, 7, 7);

const calculateCounters = (currentDate: Date, exitDate: Date) => {
    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minute = 1000 * 60;
    const second = 1000;

    const leftMilliseconds = exitDate.getTime() - currentDate.getTime();
    const leftDays = Math.floor(leftMilliseconds / day);
    const leftHours = Math.floor((leftMilliseconds % day) / hour);
    const leftMinutes = Math.floor(((leftMilliseconds % day) % hour) / minute);
    const leftSeconds = Math.floor(
        (((leftMilliseconds % day) % hour) % minute) / second
    );

    return [
        {
            period: "Days",
            value: leftDays.toString(),
        },
        {
            period: "Hours",
            value: leftHours < 10 ? "0" + leftHours : leftHours.toString(),
        },
        {
            period: "Minutes",
            value: leftMinutes < 10 ? "0" + leftMinutes : leftMinutes.toString(),
        },
        {
            period: "Seconds",
            value: leftSeconds < 10 ? "0" + leftSeconds : leftSeconds.toString(),
        },
    ];
};

const Counter: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const counters = calculateCounters(currentDate, exitDate);

    useEffect(() => {
        setTimeout(() => {
            setCurrentDate(new Date());
        }, 1000);
    }, [currentDate]);

    return (
        <IonToolbar>
            <div
                style={{
                    background: "linear-gradient(-45deg,#EE7752,#E73C7E,#23A6D5,#23D5AB)",
                    display: "flex",
                    justifyContent: "space-evenly"
                }}
            >
                {counters.map((field) => {
                    return <CounterField period={field.period} value={field.value}/>;
                })}
            </div>
        </IonToolbar>
    );
};

export default Counter;
