import React from 'react';

import { WuiBadge } from '../../../../src/components';

export default () => (
  <div>
    <WuiBadge color="hollow" iconType="cross" iconSide="right">
      Hollow
    </WuiBadge>

    <WuiBadge iconType="check">Default</WuiBadge>

    <WuiBadge iconType="returnKey" />
  </div>
);
