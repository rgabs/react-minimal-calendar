import React, { Component} from 'react';
import moment from 'moment';
import uuid from 'short-uuid';

class Calendar extends Component {
    state = {
        momentInstance: moment()
    }

    days = moment.weekdaysShort();
    months = moment.months();

    getFirstDay = () => moment(this.state.momentInstance).startOf('month').format('d')

    getBlankDays = () => {
        const blanks = [];
        const firstDay = this.getFirstDay();
        for(let i = 0; i<firstDay; i++) {
            blanks.push(<td key={uuid.generate()}></td>)
        }
        return blanks;
    }

    getMonthDates = () => {
        const dates = [];
        const today = this.state.momentInstance.date();
        const totalDaysInMonth = this.state.momentInstance.daysInMonth();
        for (let i = 0; i < totalDaysInMonth; i++) {
            dates.push(<td key={uuid.generate()} className={i === today ? 'active' : ''}>{i}</td>)
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

    render() {
        const daysHeader = this.days.map((day, i) => <th key={i}>{day}</th>);
        const blanks = this.getBlankDays();
        const dates = this.getMonthDates();
        const slots = this.groupDaysByWeeks([...blanks, ...dates]);

        return (
            <div>
                <select>
                    {this.months.map((month) => <option key={uuid.generate()}>{month}</option>)}
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