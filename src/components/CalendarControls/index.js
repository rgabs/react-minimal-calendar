import React from "react";
import "./CalendarControls.css";

const CalendarControls = ({
    isPrevMonthBtnDisabled,
    setPreviousMonth,
    month,
    months,
    onMonthChange,
    year,
    onYearChange,
    years,
    isNextMonthBtnDisabled,
    setNextMonth,
    reset
}) => {
    return (
        <div className="calendar-control">
            <button
                className="calendar-control__month-arrow"
                disabled={isPrevMonthBtnDisabled}
                onClick={setPreviousMonth}
            >
                {"<"}
            </button>
            <select value={month} onChange={onMonthChange}>
                {months.map((month, i) => (
                    <option value={i} key={i}>
                        {month}
                    </option>
                ))}
            </select>
            <select value={year} onChange={onYearChange}>
                {years.map((year, i) => (
                    <option value={year} key={i}>
                        {year}
                    </option>
                ))}
            </select>
            <button
                className="calendar-control__month-arrow"
                disabled={isNextMonthBtnDisabled}
                onClick={setNextMonth}
            >
                {">"}
            </button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default CalendarControls;
