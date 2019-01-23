import React from "react";
import "./CalendarPane.css";

const CalendarPane = ({ daysHeader, slots }) => (
  <table>
    <thead className="calendar-header">
      <tr className="calendar-row">
        {daysHeader.map((day, i) => (
          <th key={i}>{day}</th>
        ))}
      </tr>
    </thead>
    <tbody>{slots}</tbody>
  </table>
);

export default CalendarPane;
