import React, { useState, Fragment } from 'react';

import {
  WuiRange,
  WuiSpacer,
  WuiFormHelpText,
  WuiDualRange,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setvalue] = useState('20');
  const [dualValue, setDualValue] = useState([20, 100]);

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

  const onChange = e => {
    setvalue(e.target.value);
  };

  const onDualChange = value => {
    setDualValue(value);
  };

  return (
    <Fragment>
      <WuiRange
        id={htmlIdGenerator()()}
        value={value}
        onChange={e => onChange(e)}
        showTicks
        tickInterval={20}
        levels={levels}
        aria-label="An example of WuiRange with levels prop"
        aria-describedby="levelsHelp2"
      />
      <WuiFormHelpText id="levelsHelp2">
        Recommended levels are {levels[1].min} and above.
      </WuiFormHelpText>

      <WuiSpacer size="xl" />
      <WuiDualRange
        id={htmlIdGenerator()()}
        value={dualValue}
        onChange={value => onDualChange(value)}
        showTicks
        ticks={[
          { label: '20kb', value: 20 },
          { label: '100kb', value: 100 },
        ]}
        showInput
        levels={levels}
        aria-label="An example of WuiDualRange with levels prop"
        aria-describedby="levelsHelp3"
      />
      <WuiFormHelpText id="levelsHelp3">
        Recommended size is {levels[1].min}kb and above.
      </WuiFormHelpText>
    </Fragment>
  );
};
