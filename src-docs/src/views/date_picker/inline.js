import React, { useState } from 'react';

import moment from 'moment';

import { WuiDatePicker } from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = date => {
    setStartDate(date);
  };

  return (
    <div>
      <WuiDatePicker
        selected={startDate}
        onChange={handleChange}
        inline
        showTimeSelect
      />
      <WuiDatePicker
        selected={startDate}
        onChange={handleChange}
        inline
        showTimeSelect
        shadow={false}
      />
    </div>
  );
};
