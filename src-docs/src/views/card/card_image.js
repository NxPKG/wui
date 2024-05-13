import React from 'react';

import {
  WuiButton,
  WuiCard,
  WuiFlexGroup,
  WuiFlexItem,
  WuiIcon,
} from '../../../../src/components';

const cardFooterContent = (
  <WuiFlexGroup justifyContent="flexEnd">
    <WuiFlexItem grow={false}>
      <WuiButton>Go for it</WuiButton>
    </WuiFlexItem>
  </WuiFlexGroup>
);

export default () => (
  <WuiFlexGroup gutterSize="l">
    <WuiFlexItem>
      <WuiCard
        textAlign="left"
        image={
          <div>
            <img
              src="https://source.unsplash.com/400x200/?Nature"
              alt="Nature"
            />
          </div>
        }
        title="Wazuh in Nature"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent}
      />
    </WuiFlexItem>
    <WuiFlexItem>
      <WuiCard
        textAlign="left"
        image="https://source.unsplash.com/400x200/?Water"
        title="Wazuh in Water"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent}
      />
    </WuiFlexItem>
    <WuiFlexItem>
      <WuiCard
        textAlign="left"
        href="https://wazuh.github.io/wui/"
        image="https://source.unsplash.com/400x200/?City"
        icon={<WuiIcon size="xxl" type="logoWazuh" />}
        title={'Beats in the City'}
        description="This card has an href and should be a link."
      />
    </WuiFlexItem>
  </WuiFlexGroup>
);
