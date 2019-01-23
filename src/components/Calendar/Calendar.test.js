import React from 'react';
import Calendar from './Calendar';
import { shallow } from 'enzyme';
import uuid from 'short-uuid';
import renderer from 'react-test-renderer';
const snapshotDiff = require('snapshot-diff');

describe('Calendar component', () => {
    let wrapper, componentInstance;
    beforeEach(() => {
        wrapper = shallow(<Calendar  />);
        componentInstance = wrapper.instance();
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Calendar />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('groupDaysByWeeks: 21 days', () => {
        const input = [
            <td key={uuid.generate()}>1</td>, <td key={uuid.generate()}>1</td>, <td key={uuid.generate()}>1</td>, <td key={uuid.generate()}>1</td>, <td key={uuid.generate()}>1</td>, <td key={uuid.generate()}>1</td>, <td key={uuid.generate()}>1</td>,
            <td key={uuid.generate()}>2</td>, <td key={uuid.generate()}>2</td>, <td key={uuid.generate()}>2</td>, <td key={uuid.generate()}>2</td>, <td key={uuid.generate()}>2</td>, <td key={uuid.generate()}>2</td>, <td key={uuid.generate()}>2</td>,
            <td key={uuid.generate()}>3</td>, <td key={uuid.generate()}>3</td>, <td key={uuid.generate()}>3</td>, <td key={uuid.generate()}>3</td>, <td key={uuid.generate()}>3</td>, <td key={uuid.generate()}>3</td>, <td key={uuid.generate()}>3</td>,
        ];
        const output = [
            <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>,
            <tr><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td></tr>,
            <tr><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td></tr>
        ];
        expect(snapshotDiff(componentInstance.groupDaysByWeeks(input), output)).toBe(`Snapshot Diff:
Compared values have no visual difference.`);
    })

    it('groupDaysByWeeks: 18 days', () => {
        const input = [
            <td key={uuid.generate()}>1</td>, <td key={uuid.generate()}>1</td>, <td key={uuid.generate()}>1</td>, <td key={uuid.generate()}>1</td>, <td key={uuid.generate()}>1</td>, <td key={uuid.generate()}>1</td>, 
            <td key={uuid.generate()}>2</td>, <td key={uuid.generate()}>2</td>, <td key={uuid.generate()}>2</td>, <td key={uuid.generate()}>2</td>, <td key={uuid.generate()}>2</td>, <td key={uuid.generate()}>2</td>,
            <td key={uuid.generate()}>3</td>, <td key={uuid.generate()}>3</td>, <td key={uuid.generate()}>3</td>, <td key={uuid.generate()}>3</td>, <td key={uuid.generate()}>3</td>, <td key={uuid.generate()}>3</td>,
        ];
        const output = [
            <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>2</td></tr>,
            <tr><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>3</td><td>3</td></tr>,
            <tr><td>3</td><td>3</td><td>3</td><td>3</td></tr>
        ];
        expect(snapshotDiff(componentInstance.groupDaysByWeeks(input), output)).toBe(`Snapshot Diff:
Compared values have no visual difference.`);
    })
});