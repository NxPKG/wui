import React, { useState } from 'react';

import { WuiSwitch, WuiStat, WuiSpacer } from '../../../../src/components';

export default () => {
  const [isLoading, setLoading] = useState(true);

  const onToggleChange = e => {
    setLoading(e.target.checked);
  };

  return (
    <div>
      <WuiStat
        title="7,600 mm"
        description="Total People"
        isLoading={isLoading}
      />
      <WuiSpacer />
      <WuiSwitch
        label="Show as loading"
        checked={isLoading}
        onChange={onToggleChange}
      />
    </div>
  );
};
