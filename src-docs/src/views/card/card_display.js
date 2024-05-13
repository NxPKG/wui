import React from 'react';

import {
  WuiCard,
  WuiFlexGroup,
  WuiFlexItem,
  WuiIcon,
  WuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <WuiSpacer size="s" />
    <WuiFlexGroup gutterSize="l">
      <WuiFlexItem>
        <WuiCard
          layout="horizontal"
          icon={<WuiIcon size="xl" type="logoWazuh" />}
          onClick={() => {}}
          title="Logs"
          display="plain"
          description="Wazuh is the most popular open source security platform."
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          icon={<WuiIcon size="xl" type="logoWazuh" />}
          title="Logs"
          display="plain"
          description="Wazuh is the most popular open source security platform."
          onClick={() => {}}
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          layout="horizontal"
          icon={<WuiIcon size="xl" type="logoWazuh" />}
          title="Logs"
          display="plain"
          description="Wazuh is the most popular open source security platform."
          betaBadgeLabel="Beta"
          betaBadgeTooltipContent="This module is not GA. Please help us by reporting any bugs."
          onClick={() => {}}
        />
      </WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
