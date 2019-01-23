import React, { Component} from 'react';
import moment from 'moment';
import uuid from 'short-uuid';

class Calendar extends Component {
    state = {
        momentInstance: moment()
    }

    days = moment.weekdaysShort();
    months = moment.months();
    years = (function() {
        const years = [];
        for (let i = moment().year() - 20; i < moment().year() + 20; i++) {
            years.push(i);
        }
        return years;
    })()


    getFirstDay = () => moment(this.state.momentInstance).startOf('month').format('d')

    getBlankDays = (monthDates) => {
        const blanks = [];
        const firstDay = this.getFirstDay();
        for(let i = 0; i<firstDay; i++) {
            blanks.push(<td key={uuid.generate()}></td>)
        }
        return blanks;
    }

    

    getMonthDates = () => {
        const dates = [];
        const today = this.state.momentInstance.format("D");
        const totalDaysInMonth = this.state.momentInstance.daysInMonth();
        for (let i = 1; i <= totalDaysInMonth; i++) {
            dates.push(<td key={uuid.generate()} className={i.toString() === today ? 'active' : ''}>{i}</td>)
        }
        return dates;
    }

    groupDaysByWeeks = (allDays) => {
        const numOfWeeks = Math.ceil(allDays.length / 7);
        const groupedDays = [];
        for (let i = 0; i < numOfWeeks; i++) {
            const daysInWeek = allDays.slice(i * 7, ((i + 1) * 7));
            groupedDays.push(<tr key={uuid.generate()}>{daysInWeek}</tr>);
        }
        return groupedDays;
    }

    setMonth = (e) => {
        const newInstance = moment({ ...this.state.momentInstance }).set('month', e.target.value);
        this.setState({ momentInstance: newInstance});
    }

    setYear = (e) => {
        const newInstance = moment({ ...this.state.momentInstance }).set('year', e.target.value);
        this.setState({ momentInstance: newInstance });
    }

    render() {
        const daysHeader = this.days.map((day, i) => <th key={i}>{day}</th>);
        const monthDates = this.getMonthDates();
        const blanks = this.getBlankDays(monthDates);
        const slots = this.groupDaysByWeeks([...blanks, ...monthDates]);
        return (
            <div>
                <select value={this.state.momentInstance.month()} onChange={this.setMonth}>
                    {this.months.map((month, i) => (
                        <option value={i} key={i}>{month}</option>
                    ))}
                </select>
                <select value={this.state.momentInstance.year()} onChange={this.setYear}>
                    {this.years.map((year, i) => (
                        <option value={year} key={i}>{year}</option>
                    ))}
                </select>
                <table>
                    <thead className="calendar-header">
                        <tr className="calendar-row">
                            {daysHeader}
                        </tr>
                    </thead>
                    <tbody>
                        {slots}
                    </tbody>
                </table>
            </div>
            
        )
    }
}

export default Calendar;