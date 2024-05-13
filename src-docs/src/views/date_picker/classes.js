import React, { useState } from 'react';

import moment from 'moment';

import {
  WuiDatePicker,
  WuiFormRow,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = date => {
    setStartDate(date);
  };

  return (
    <div>
      <WuiFormRow label="className example">
        <WuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          className="dpTest__purpleInput"
        />
      </WuiFormRow>

      <WuiSpacer size="m" />

      <WuiFormRow label="calendarClassName example">
        <WuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          calendarClassName="dpTest__purpleCal"
        />
      </WuiFormRow>

      <WuiSpacer size="m" />

      <WuiFormRow label="dayClassName example">
        <WuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          dayClassName={date =>
            date.date() < Math.random() * 31 ? 'dpTest__purpleDay' : undefined
          }
        />
      </WuiFormRow>

      <WuiSpacer size="m" />

      <WuiFormRow label="popperClassName example">
        <WuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          popperClassName="dpTest__purplePopper"
        />
      </WuiFormRow>
    </div>
  );
};
