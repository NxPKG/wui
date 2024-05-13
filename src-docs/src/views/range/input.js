import React, { useState, Fragment } from 'react';

import { WuiRange, WuiSpacer, WuiDualRange } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState('20');
  const [dualValue, setDualValue] = useState([20, 100]);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onDualChange = value => {
    setDualValue(value);
  };

  return (
    <Fragment>
      <WuiRange
        id={htmlIdGenerator()()}
        value={value}
        onChange={onChange}
        showInput
        aria-label="An example of WuiRange"
      />

      <WuiSpacer size="xl" />

      <WuiDualRange
        id={htmlIdGenerator()()}
        value={dualValue}
        onChange={onDualChange}
        showInput
        minInputProps={{ 'aria-label': 'Min value' }}
        maxInputProps={{ 'aria-label': 'Max value' }}
        aria-label="An example of WuiDualRange with inputs"
      />
    </Fragment>
  );
};
