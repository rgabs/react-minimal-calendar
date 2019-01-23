import React, { PureComponent } from "react";
import moment from "moment";
import uuid from "short-uuid";
import setQueryString from "set-query-string";
import getQueryString from "query-string";
import CalendarControls from "../CalendarControls";
import CalendarPane from "../CalendarPane";

class Calendar extends PureComponent {
  state = {
    momentInstance: moment()
  };

  componentDidMount() {
    const monthIndex = getQueryString.parse(location.search).month;
    if (monthIndex) {
      this.setMonth(monthIndex);
    }
  }

  days = moment.weekdaysShort();
  months = moment.months();

  reset = () => {
    this.setState({ momentInstance: moment() });
    setQueryString({ month: "" });
    this.props.onChange(null);
  };

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

  isToday = dayOfMonth =>
    moment().isSame(this.state.momentInstance, "year") &&
    moment().isSame(this.state.momentInstance, "month") &&
    dayOfMonth === moment().date();

  getMonthDates = () => {
    const dates = [];
    const totalDaysInMonth = this.state.momentInstance.daysInMonth();
    for (let i = 1; i <= totalDaysInMonth; i++) {
      dates.push(
        <td
          key={uuid.generate()}
          onClick={this.onDateSelect(i)}
          className={this.isToday(i) ? "date-active" : ""}
        >
          {i}
        </td>
      );
    }
    return dates;
  };

  onDateSelect = dayOfMonth => () => {
    const newInstance = moment({ ...this.state.momentInstance }).set(
      "date",
      dayOfMonth
    );
    this.setState({ momentInstance: newInstance });
    this.props.onChange(newInstance);
  };

  groupDaysByWeeks = allDays => {
    const overflowedDays = [...allDays];
    const groupedDays = [];
    const totalRequiredSlots = Math.ceil(allDays.length / 7) * 7;
    for (let j = 1; j <= totalRequiredSlots - allDays.length; j++) {
      overflowedDays.push(
        <td className="overflow-days" key={uuid.generate()}>
          {j}
        </td>
      );
    }
    const numOfWeeks = Math.ceil(overflowedDays.length / 7);
    for (let i = 0; i < numOfWeeks; i++) {
      const daysInWeek = overflowedDays.slice(i * 7, (i + 1) * 7);
      groupedDays.push(<tr key={uuid.generate()}>{daysInWeek}</tr>);
    }
    return groupedDays;
  };

  setMonth = monthIndex => {
    const newInstance = moment({ ...this.state.momentInstance }).set(
      "month",
      monthIndex
    );
    this.setState({ momentInstance: newInstance });
    setQueryString({ month: monthIndex });
  };

  onMonthChange = e => this.setMonth(e.target.value);

  setYear = e => {
    const newInstance = moment({ ...this.state.momentInstance }).set(
      "year",
      e.target.value
    );
    this.setState({ momentInstance: newInstance });
  };

  setPreviousMonth = () => {
    const prevMonthIndex = moment({ ...this.state.momentInstance })
      .subtract(1, "months")
      .month();
    this.setMonth(prevMonthIndex);
  };

  setNextMonth = () => {
    const nextMonthIndex = moment({ ...this.state.momentInstance })
      .add(1, "months")
      .month();
    this.setMonth(nextMonthIndex);
  };

  isNextMonthBtnDisabled = () =>
    moment(this.state.momentInstance).month() === 11 &&
    moment(this.state.momentInstance).year() ===
      this.years[this.years.length - 1];

  isPrevMonthBtnDisabled = () =>
    moment(this.state.momentInstance).month() === 0 &&
    moment(this.state.momentInstance).year() === this.years[0];

  render() {
    const monthDates = this.getMonthDates();
    const overflowDays = this.getOverflowDays(monthDates);
    const slots = this.groupDaysByWeeks([...overflowDays, ...monthDates]);
    return (
      <div>
        <CalendarControls
          isPrevMonthBtnDisabled={this.isPrevMonthBtnDisabled()}
          setPreviousMonth={this.setPreviousMonth}
          month={this.state.momentInstance.month()}
          months={this.months}
          onMonthChange={this.onMonthChange}
          year={this.state.momentInstance.year()}
          onYearChange={this.setYear}
          years={this.years}
          isNextMonthBtnDisabled={this.isNextMonthBtnDisabled()}
          setNextMonth={this.setNextMonth}
          reset={this.reset}
        />
        <CalendarPane daysHeader={this.days} slots={slots} />
      </div>
    );
  }
}

Calendar.propTypes = {
  onChange: () => {}
};

export default Calendar;
