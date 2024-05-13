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
      <WuiFormRow label="US with fractional seconds">
        <WuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          dateFormat="YYYY-MM-DD hh:mm:ss:SSS A"
        />
      </WuiFormRow>

      <WuiSpacer size="m" />

      <WuiFormRow label="China">
        <WuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          dateFormat="YYYY-MM-DD hh:mm A"
          locale="zh-cn"
        />
      </WuiFormRow>

      <WuiSpacer size="m" />

      <WuiFormRow label="Korea">
        <WuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          locale="ko"
          dateFormat="YYYY-MM-DD hh:mm A"
        />
      </WuiFormRow>

      <WuiSpacer size="m" />

      <WuiFormRow label="Germany on 24 hour clock">
        <WuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          dateFormat="DD-MM-YYYY HH:mm"
          timeFormat="HH:mm"
          locale="de-de"
        />
      </WuiFormRow>
    </div>
  );
};
