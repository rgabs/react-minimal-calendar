import React, { PureComponent } from "react";
import moment from "moment";
import uuid from "short-uuid";
import "./Calendar.css";

class Calendar extends PureComponent {
  state = {
    momentInstance: moment()
  };

  days = moment.weekdaysShort();
  months = moment.months();

  years = (() => {
    const years = [];
    for (let i = moment().year() - 20; i < moment().year() + 20; i++) {
      years.push(i);
    }
    return years;
  })();

  getOverflowDays = () => {
    const blanks = [];
    const firstDay = moment(this.state.momentInstance)
      .startOf("month")
      .format("d");
    let daysInPreviousMonth = moment(this.state.momentInstance)
      .subtract(1, "months")
      .daysInMonth();
    for (let i = firstDay - 1; i >= 0; i--) {
      blanks.push(
        <td className="overflow-days" key={uuid.generate()}>
          {daysInPreviousMonth - i}
        </td>
      );
    }
    return blanks;
  };

  getMonthDates = () => {
    const dates = [];
    const isToday = dayOfMonth =>
      moment().isSame(this.state.momentInstance, "year") &&
      moment().isSame(this.state.momentInstance, "month") &&
      dayOfMonth === this.state.momentInstance.date();

    const totalDaysInMonth = this.state.momentInstance.daysInMonth();
    for (let i = 1; i <= totalDaysInMonth; i++) {
      dates.push(
        <td key={uuid.generate()} className={isToday(i) ? "date-active" : ""}>
          {i}
        </td>
      );
    }
    return dates;
  };

  groupDaysByWeeks = allDays => {
    const overflowedDays = [...allDays];
    const totalRequiredSlots = Math.ceil(allDays.length / 7) * 7;
    for (let j = 1; j <= totalRequiredSlots - allDays.length; j++) {
      overflowedDays.push(
        <td className="overflow-days" key={uuid.generate()}>
          {j}
        </td>
      );
    }
    const numOfWeeks = Math.ceil(overflowedDays.length / 7);
    const groupedDays = [];
    for (let i = 0; i < numOfWeeks; i++) {
      const daysInWeek = overflowedDays.slice(i * 7, (i + 1) * 7);
      groupedDays.push(<tr key={uuid.generate()}>{daysInWeek}</tr>);
    }
    return groupedDays;
  };

  setMonth = e => {
    const newInstance = moment({ ...this.state.momentInstance }).set(
      "month",
      e.target.value
    );
    this.setState({ momentInstance: newInstance });
  };

  setYear = e => {
    const newInstance = moment({ ...this.state.momentInstance }).set(
      "year",
      e.target.value
    );
    this.setState({ momentInstance: newInstance });
  };

  setPreviousMonth = () => {
    const newInstance = moment({ ...this.state.momentInstance }).subtract(
      1,
      "months"
    );
    this.setState({ momentInstance: newInstance });
  };

  setNextMonth = () => {
    const newInstance = moment({ ...this.state.momentInstance }).add(
      1,
      "months"
    );
    this.setState({ momentInstance: newInstance });
  };

  isNextMonthBtnDisabled = () =>
    moment(this.state.momentInstance).month() === 11 &&
    moment(this.state.momentInstance).year() ===
      this.years[this.years.length - 1];

  isPrevMonthBtnDisabled = () =>
    moment(this.state.momentInstance).month() === 0 &&
    moment(this.state.momentInstance).year() === this.years[0];

  render() {
    const daysHeader = this.days.map((day, i) => <th key={i}>{day}</th>);
    const monthDates = this.getMonthDates();
    const overflowDays = this.getOverflowDays(monthDates);
    const slots = this.groupDaysByWeeks([...overflowDays, ...monthDates]);
    return (
      <div>
        <button
          disabled={this.isPrevMonthBtnDisabled()}
          onClick={this.setPreviousMonth}
        >
          {"<"}
        </button>
        <select
          value={this.state.momentInstance.month()}
          onChange={this.setMonth}
        >
          {this.months.map((month, i) => (
            <option value={i} key={i}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={this.state.momentInstance.year()}
          onChange={this.setYear}
        >
          {this.years.map((year, i) => (
            <option value={year} key={i}>
              {year}
            </option>
          ))}
        </select>
        <button
          disabled={this.isNextMonthBtnDisabled()}
          onClick={this.setNextMonth}
        >
          {">"}
        </button>
        <table>
          <thead className="calendar-header">
            <tr className="calendar-row">{daysHeader}</tr>
          </thead>
          <tbody>{slots}</tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
