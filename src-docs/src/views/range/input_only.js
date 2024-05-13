import React, { useState, Fragment } from 'react';

import { WuiRange, WuiSpacer, WuiDualRange } from '../../../../src/components';

import { DisplayToggles } from '../form_controls/display_toggles';
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

  const levels = [
    {
      min: 0,
      max: 20,
      color: 'danger',
    },
    {
      min: 20,
      max: 100,
      color: 'success',
    },
  ];

  return (
    <Fragment>
      <DisplayToggles canAppend canPrepend>
        <WuiRange
          id={htmlIdGenerator()()}
          value={value}
          onChange={onChange}
          showInput="inputWithPopover"
          showLabels
          aria-label="An example of WuiRange with showInput prop"
        />
      </DisplayToggles>

      <WuiSpacer size="xl" />

      <DisplayToggles canAppend canPrepend canLoading={false}>
        <WuiDualRange
          id={htmlIdGenerator()()}
          value={dualValue}
          onChange={onDualChange}
          showInput="inputWithPopover"
          showLabels
          levels={levels}
          aria-label="An example of WuiDualRange with showInput prop"
        />
      </DisplayToggles>
    </Fragment>
  );
};
