import React from 'react';

import {
  WuiCard,
  WuiIcon,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

const icons = ['dashboard', 'monitoring', 'watches'];
const badges = [null, 'Beta', 'Lab'];

const cardNodes = icons.map(function(item, index) {
  return (
    <WuiFlexItem key={index}>
      <WuiCard
        icon={<WuiIcon size="xxl" type={`${item}App`} />}
        title={`Wazuh ${item}`}
        description="Example of a card's description. Stick to one or two sentences."
        betaBadgeLabel={badges[index]}
        betaBadgeTooltipContent={
          badges[index]
            ? 'This module is not GA. Please help us by reporting any bugs.'
            : undefined
        }
        onClick={() => window.alert('Card clicked')}
      />
    </WuiFlexItem>
  );
});

export default () => <WuiFlexGroup gutterSize="l">{cardNodes} </WuiFlexGroup>;
