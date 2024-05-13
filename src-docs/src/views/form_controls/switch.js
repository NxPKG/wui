import React, { useState, Fragment } from 'react';

import { WuiSwitch, WuiSpacer } from '../../../../src/components';

export default () => {
  const [checked, setChecked] = useState(false);

  const onChange = e => {
    setChecked(e.target.checked);
  };

  return (
    <Fragment>
      <WuiSwitch
        label="I am a switch"
        checked={checked}
        onChange={e => onChange(e)}
      />

      <WuiSpacer size="m" />

      <WuiSwitch
        label="I am a disabled switch"
        checked={checked}
        onChange={e => onChange(e)}
        disabled
      />

      <WuiSpacer size="m" />

      <WuiSwitch
        showLabel={false}
        label="I am a switch without a visible label"
        checked={checked}
        onChange={e => onChange(e)}
      />

      <WuiSpacer size="m" />

      <WuiSwitch
        label="I am a compressed switch"
        checked={checked}
        onChange={e => onChange(e)}
        compressed
      />

      <WuiSpacer size="m" />

      <WuiSwitch
        label="I am a compressed, disabled switch"
        checked={checked}
        onChange={e => onChange(e)}
        compressed
        disabled
      />

      <WuiSpacer size="m" />

      <WuiSwitch
        showLabel={false}
        label="I am a compressed switch without a visible label"
        checked={checked}
        onChange={e => onChange(e)}
        compressed
      />
    </Fragment>
  );
};
