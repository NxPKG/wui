import React from 'react';

import {
  WuiCard,
  WuiIcon,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => (
  <WuiFlexGroup gutterSize="l">
    <WuiFlexItem>
      <WuiCard
        layout="horizontal"
        icon={<WuiIcon size="xl" type={'logoWazuh'} />}
        title={'Wazuh'}
        description="This card adds uses an 'xl' size icon which works well in a horizontal layout."
        onClick={() => window.alert('Card clicked')}
      />
    </WuiFlexItem>
    <WuiFlexItem>
      <WuiCard
        layout="horizontal"
        icon={<WuiIcon size="l" type={'logoWazuh'} />}
        titleSize="xs"
        title={'Wazuh Cloud'}
        description="This card uses an 'l' size icon but also shrinks the 'titleSize' to 'xs'."
        onClick={() => window.alert('Card clicked')}
      />
    </WuiFlexItem>
    <WuiFlexItem>
      <WuiCard
        layout="horizontal"
        title={'No icon example'}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => window.alert('Card clicked')}
        href="#"
      />
    </WuiFlexItem>
  </WuiFlexGroup>
);
