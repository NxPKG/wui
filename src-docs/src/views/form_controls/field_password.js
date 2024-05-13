import React, { useState } from 'react';

import { WuiFieldPassword, WuiSwitch } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default function() {
  const [value, setValue] = useState('');
  const [dual, setDual] = useState(true);

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles
      canAppend
      canPrepend
      extras={[
        <WuiSwitch
          compressed
          label={'dual'}
          checked={dual}
          onChange={e => {
            setDual(e.target.checked);
          }}
        />,
      ]}>
      <WuiFieldPassword
        placeholder="Placeholder text"
        type={dual ? 'dual' : undefined}
        value={value}
        onChange={e => setValue(e.target.value)}
        aria-label="Use aria labels when no actual label is in use"
      />
    </DisplayToggles>
  );
}
