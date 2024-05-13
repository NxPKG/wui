import React, { Component } from 'react';

import moment from 'moment';

import {
  WuiDatePicker,
  WuiFormRow,
  WuiSpacer,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      startDate2: moment(),
      startDate3: moment().add(1, 'days'),
      startDate4: moment().add(1, 'days'),
      startDate5: moment(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  handleChange2(date) {
    this.setState({
      startDate2: date,
    });
  }

  handleChange3(date) {
    this.setState({
      startDate3: date,
    });
  }

  handleChange4(date) {
    this.setState({
      startDate4: date,
    });
  }

  handleChange5(date) {
    this.setState({
      startDate5: date,
    });
  }

  isWeekday(date) {
    const day = date.day();
    return day !== 0 && day !== 6;
  }

  render() {
    return (
      <div>
        <WuiFormRow label="Only allow a certain range of dates">
          <WuiDatePicker
            showTimeSelect
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={moment().subtract(2, 'days')}
            maxDate={moment().add(5, 'days')}
          />
        </WuiFormRow>

        <WuiSpacer />

        <WuiFormRow label="Only allow a certain range of times">
          <WuiDatePicker
            showTimeSelect
            selected={this.state.startDate2}
            onChange={this.handleChange2}
            minTime={moment()
              .hours(17)
              .minutes(0)}
            maxTime={moment()
              .hours(20)
              .minutes(30)}
          />
        </WuiFormRow>

        <WuiSpacer />

        <WuiFormRow label="Exclude yesterday and today">
          <WuiDatePicker
            showTimeSelect
            selected={this.state.startDate3}
            onChange={this.handleChange3}
            excludeDates={[moment(), moment().subtract(1, 'days')]}
          />
        </WuiFormRow>

        <WuiSpacer />

        <WuiFormRow label="Exclude 12AM and 5PM from selection">
          <WuiDatePicker
            showTimeSelect
            selected={this.state.startDate4}
            onChange={this.handleChange4}
            excludeTimes={[
              moment()
                .hours(0)
                .minutes(0),
              moment()
                .hours(17)
                .minutes(0),
            ]}
          />
        </WuiFormRow>

        <WuiSpacer />

        <WuiFormRow label="Filter so only weekdays are selectable">
          <WuiDatePicker
            showTimeSelect
            selected={this.state.startDate5}
            onChange={this.handleChange5}
            filterDate={this.isWeekday}
          />
        </WuiFormRow>
      </div>
    );
  }
}
