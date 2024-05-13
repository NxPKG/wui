import React, { useState } from 'react';

import { WuiToggle } from '../../../../src/components';

export default function() {
  const [toggleOn, setToggleValue] = useState(false);

  const onToggleChange = e => {
    setToggleValue(e.target.checked);
  };

  return (
    <div>
      <WuiToggle onChange={e => onToggleChange(e)} label="Is toggle on?">
        {toggleOn ? 'On' : 'Off'}
      </WuiToggle>
    </div>
  );
}
