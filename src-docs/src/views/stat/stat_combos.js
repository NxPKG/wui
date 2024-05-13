import React, { useState } from 'react';

import {
  WuiStat,
  WuiFlexItem,
  WuiFlexGroup,
  WuiPanel,
  WuiIcon,
  WuiSwitch,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isLoading, setLoading] = useState(false);

  const onToggleChange = e => {
    setLoading(e.target.checked);
  };

  return (
    <div>
      <WuiFlexGroup>
        <WuiFlexItem>
          <WuiPanel>
            <WuiStat
              title="8,888"
              description="Total widgets"
              textAlign="right"
              isLoading={isLoading}>
              <WuiIcon type="empty" />
            </WuiStat>
          </WuiPanel>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiPanel>
            <WuiStat
              title="2,000"
              description="Pending widgets"
              titleColor="accent"
              textAlign="right"
              isLoading={isLoading}>
              <WuiIcon type="clock" color="accent" />
            </WuiStat>
          </WuiPanel>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiPanel>
            <WuiStat
              title="6,800"
              description="Success widgets"
              titleColor="secondary"
              textAlign="right"
              isLoading={isLoading}>
              <WuiIcon type="check" color="secondary" />
            </WuiStat>
          </WuiPanel>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiPanel>
            <WuiStat
              title="88"
              description="Error widgets"
              titleColor="danger"
              textAlign="right"
              isLoading={isLoading}>
              <WuiIcon type="alert" color="danger" />
            </WuiStat>
          </WuiPanel>
        </WuiFlexItem>
      </WuiFlexGroup>
      <WuiSpacer />
      <WuiSwitch
        label="Show as loading"
        checked={isLoading}
        onChange={onToggleChange}
      />
    </div>
  );
};
