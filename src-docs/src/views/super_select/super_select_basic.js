import React, { useState } from 'react';

import { WuiSuperSelect, WuiHealth } from '../../../../src/components';

export default () => {
  const options = [
    {
      value: 'warning',
      inputDisplay: (
        <WuiHealth color="subdued" style={{ lineHeight: 'inherit' }}>
          Warning
        </WuiHealth>
      ),
      'data-test-subj': 'option-warning',
      disabled: true,
    },
    {
      value: 'minor',
      inputDisplay: (
        <WuiHealth color="warning" style={{ lineHeight: 'inherit' }}>
          Minor
        </WuiHealth>
      ),
      'data-test-subj': 'option-minor',
    },
    {
      value: 'critical',
      inputDisplay: (
        <WuiHealth color="danger" style={{ lineHeight: 'inherit' }}>
          Critical
        </WuiHealth>
      ),
      'data-test-subj': 'option-critical',
    },
  ];
  const [value, setValue] = useState(options[1].value);

  const onChange = value => {
    setValue(value);
  };

  return (
    <WuiSuperSelect
      options={options}
      valueOfSelected={value}
      onChange={value => onChange(value)}
    />
  );
};
