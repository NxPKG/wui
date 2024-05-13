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
      <WuiFormRow label="Time select on">
        <WuiDatePicker
          showTimeSelect
          selected={startDate}
          onChange={handleChange}
        />
      </WuiFormRow>

      <WuiSpacer />

      <WuiFormRow label="Only time select, 24 hour clock">
        <WuiDatePicker
          showTimeSelect
          showTimeSelectOnly
          selected={startDate}
          onChange={handleChange}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
        />
      </WuiFormRow>

      <WuiSpacer />

      <WuiFormRow label="Inject additional times into the list">
        <WuiDatePicker
          showTimeSelect
          showTimeSelectOnly
          selected={startDate}
          onChange={handleChange}
          dateFormat="hh:mm a"
          timeFormat="hh:mm a"
          injectTimes={[
            moment()
              .hours(0)
              .minutes(1),
            moment()
              .hours(0)
              .minutes(5),
            moment()
              .hours(23)
              .minutes(59),
          ]}
        />
      </WuiFormRow>
    </div>
  );
};
