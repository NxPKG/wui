import React from 'react';

import {
  WuiCard,
  WuiIcon,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

const icons = ['Wazuh', 'Wazuh', 'Wazuh', 'Wazuh'];

const cardNodes = icons.map(function(item, index) {
  return (
    <WuiFlexItem key={index}>
      <WuiCard
        icon={<WuiIcon size="xxl" type={`logo${item}`} />}
        title={`${item} example`}
        isDisabled={!index}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => window.alert('Card clicked')}
      />
    </WuiFlexItem>
  );
});

export default () => <WuiFlexGroup gutterSize="l">{cardNodes}</WuiFlexGroup>;
