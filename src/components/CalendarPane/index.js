import React from "react";
import "./CalendarPane.css";

const CalendarPane = ({ daysHeader, slots }) => (
    <table className="calendar-pane">
        <thead className="calendar-pane__header">
            <tr>
                {daysHeader.map((day, i) => (
                    <th key={i}>{day}</th>
                ))}
            </tr>
        </thead>
        <tbody className="calendar-pane__body">{slots}</tbody>
    </table>
);

export default CalendarPane;
