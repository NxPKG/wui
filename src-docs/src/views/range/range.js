import React, { useState, Fragment } from 'react';

import { WuiRange, WuiSpacer } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState('120');

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <Fragment>
      <WuiRange
        id={htmlIdGenerator()()}
        min={100}
        max={200}
        step={0.05}
        value={value}
        onChange={onChange}
        showLabels
        aria-label="An example of WuiRange with showLabels prop"
      />

      <WuiSpacer size="xl" />

      <WuiRange
        id={htmlIdGenerator()()}
        min={100}
        max={200}
        value={value}
        onChange={onChange}
        showLabels
        showValue
        aria-label="An example of WuiRange with showValue prop"
      />

      <WuiSpacer size="xl" />

      <WuiRange
        id={htmlIdGenerator()()}
        min={100}
        max={200}
        value={value}
        onChange={onChange}
        showLabels
        showRange
        showValue
        valuePrepend="100 - "
        aria-label="An example of WuiRange with valuePrepend prop"
      />
    </Fragment>
  );
};
