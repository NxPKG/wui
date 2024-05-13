import React, { useState } from 'react';

import { WuiFieldSearch, WuiSwitch } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default () => {
  const [isClearable, setIsClearable] = useState(true);
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles
      canPrepend
      canAppend
      extras={[
        <WuiSwitch
          compressed
          label={'clearable'}
          checked={isClearable}
          onChange={e => {
            setIsClearable(e.target.checked);
          }}
        />,
      ]}>
      <WuiFieldSearch
        placeholder="Search this"
        value={value}
        onChange={e => onChange(e)}
        isClearable={isClearable}
        aria-label="Use aria labels when no actual label is in use"
      />
    </DisplayToggles>
  );
};
