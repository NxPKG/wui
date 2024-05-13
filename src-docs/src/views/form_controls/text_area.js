import React, { useState } from 'react';

import { WuiTextArea } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default () => {
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canLoading={false}>
      <WuiTextArea
        placeholder="Placeholder text"
        aria-label="Use aria labels when no actual label is in use"
        value={value}
        onChange={e => onChange(e)}
      />
    </DisplayToggles>
  );
};
