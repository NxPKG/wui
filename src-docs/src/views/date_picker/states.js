import React, { useState } from 'react';

import {
  WuiDatePicker,
  WuiSpacer,
  WuiFormRow,
} from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

export default () => {
  const [startDate, setStartDate] = useState(null);

  const handleChange = date => {
    setStartDate(date);
  };

  const errors = [
    "Here's an example of an error",
    'You might have more than one error, so pass an array.',
  ];

  return (
    /* DisplayToggles wrapper for Docs only */
    <div>
      <DisplayToggles canCompressed={false}>
        <WuiDatePicker
          showTimeSelect
          selected={startDate}
          onChange={handleChange}
          placeholder="Placeholder text"
        />
      </DisplayToggles>

      <WuiSpacer size="l" />

      <WuiDatePicker
        showTimeSelect
        selected={startDate}
        onChange={handleChange}
        onClear={() => handleChange(null)}
        placeholder="Clearable"
      />

      <WuiSpacer size="m" />

      <WuiFormRow label="Form row validation" isInvalid error={errors}>
        <WuiDatePicker
          showTimeSelect
          isInvalid
          selected={startDate}
          onChange={handleChange}
          placeholder="Example of an error"
        />
      </WuiFormRow>
    </div>
  );
};
