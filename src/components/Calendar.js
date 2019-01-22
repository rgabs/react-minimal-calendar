import React, { Component} from 'react';
import moment from 'moment';

class Calendar extends Component {
    state = {
        momentInstance: moment()
    }

    days = moment.weekdaysShort();
    months = moment.months();

    getFirstDay = () => moment(this.state.momentInstance).startOf('month').format('d')

    render() {
        const daysHeader = this.days.map((day, i) => <th key={i}>{day}</th>);
        return (
            <table>
                <thead class="calendar-header">
                    <tr class="calendar-row">
                        {daysHeader}
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                </tbody>
            </table>
        )
    }
}

export default Calendar;