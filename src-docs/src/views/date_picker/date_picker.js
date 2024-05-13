import React, { useState } from 'react';

import moment from 'moment';

import { WuiDatePicker, WuiFormRow } from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = date => {
    setStartDate(date);
  };

  return (
    <WuiFormRow label="Select a date">
      <WuiDatePicker selected={startDate} onChange={handleChange} />
    </WuiFormRow>
  );
};
