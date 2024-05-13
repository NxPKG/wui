import React from 'react';

import { WuiFacetButton, WuiIcon, WuiAvatar } from '../../../../src/components';

export default () => (
  <div>
    <WuiFacetButton quantity={6}>Simple, no icon</WuiFacetButton>
    <br />
    <WuiFacetButton quantity={6} isSelected>
      Simple, selected
    </WuiFacetButton>
    <br />
    <WuiFacetButton
      quantity={6}
      icon={<WuiIcon type="dot" color="secondary" />}>
      Label or color indicator
    </WuiFacetButton>
    <br />
    <WuiFacetButton quantity={6} isDisabled>
      Disabled
    </WuiFacetButton>
    <br />
    <WuiFacetButton
      quantity={6}
      icon={<WuiAvatar size="s" name="Avatar Jones" />}>
      Avatar as icon
    </WuiFacetButton>
    <br />
    <WuiFacetButton quantity={6} isLoading>
      Loading
    </WuiFacetButton>
  </div>
);
