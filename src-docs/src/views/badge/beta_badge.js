import React from 'react';

import { WuiBetaBadge, WuiSpacer, WuiTitle } from '../../../../src/components';

export default () => (
  <div>
    <WuiBetaBadge
      label="Beta"
      tooltipContent="This module is not GA. Please help us by reporting any bugs."
    />
    &emsp;
    <WuiBetaBadge
      label="Lab"
      title="Laboratory"
      tooltipContent="This module is not GA. Please help us by reporting any bugs."
    />
    &emsp;
    <WuiBetaBadge label="Lab" iconType="beaker" />
    <WuiSpacer />
    <WuiTitle size="s">
      <h3>
        Beta badges will also line up nicely with titles &nbsp;
        <WuiBetaBadge
          label="Lab"
          tooltipContent="This module is not GA. Please help us by reporting any bugs."
        />
      </h3>
    </WuiTitle>
  </div>
);
