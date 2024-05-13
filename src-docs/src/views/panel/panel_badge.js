import React from 'react';

import {
  WuiPanel,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

const badges = [null, 'Beta', 'Lab'];

const panelNodes = badges.map(function(item, index) {
  return (
    <WuiFlexItem key={index}>
      <WuiPanel
        betaBadgeLabel={badges[index]}
        betaBadgeTooltipContent={
          badges[index]
            ? 'This module is not GA. Please help us by reporting any bugs.'
            : undefined
        }
        onClick={() => window.alert('Card clicked')}>
        I am some panel content
      </WuiPanel>
    </WuiFlexItem>
  );
});

export default () => <WuiFlexGroup gutterSize="l">{panelNodes}</WuiFlexGroup>;
