import React, { useState, Fragment } from 'react';

import {
  WuiRange,
  WuiSpacer,
  WuiTitle,
  WuiDualRange,
} from '../../../../src/components';

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
        step={10}
        value={value}
        onChange={onChange}
        showTicks
        aria-label="An example of WuiRange with ticks"
      />

      <WuiSpacer size="xl" />

      <WuiTitle size="xxs">
        <h3>Custom tick interval</h3>
      </WuiTitle>

      <WuiSpacer size="l" />

      <WuiRange
        id={htmlIdGenerator()()}
        value={value}
        onChange={onChange}
        showInput
        showRange
        showTicks
        tickInterval={20}
        aria-label="An example of WuiRange with custom tickInterval"
      />

      <WuiSpacer size="xl" />

      <WuiTitle size="xxs">
        <h3>Custom ticks object</h3>
      </WuiTitle>

      <WuiSpacer size="l" />

      <WuiDualRange
        id={htmlIdGenerator()()}
        value={dualValue}
        onChange={onDualChange}
        showTicks
        ticks={[
          { label: '20kb', value: 20 },
          { label: '100kb', value: 100 },
        ]}
        showInput
        aria-label="An example of WuiDualRange with ticks"
      />
    </Fragment>
  );
};
