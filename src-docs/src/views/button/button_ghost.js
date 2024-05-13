import React, { useState } from 'react';

import {
  WuiButton,
  WuiButtonEmpty,
  WuiButtonIcon,
  WuiFlexGroup,
  WuiFlexItem,
  WuiButtonToggle,
  WuiPanel,
} from '../../../../src/components';

export default () => {
  const [toggle0On, setToggle0On] = useState(false);

  const onToggle0Change = e => {
    setToggle0On(e.target.checked);
  };

  return (
    <WuiPanel paddingSize="l" className="guideDemo__ghostBackground">
      <WuiFlexGroup wrap gutterSize="s" alignItems="center">
        <WuiFlexItem grow={false}>
          <WuiButton
            color="ghost"
            onClick={() => window.alert('Button clicked')}>
            Ghost
          </WuiButton>
        </WuiFlexItem>

        <WuiFlexItem grow={false}>
          <WuiButton
            fill
            color="ghost"
            size="s"
            iconType="check"
            onClick={() => window.alert('Button clicked')}>
            Filled
          </WuiButton>
        </WuiFlexItem>

        <WuiFlexItem grow={false}>
          <WuiButtonEmpty
            size="s"
            color="ghost"
            onClick={() => window.alert('Button clicked')}>
            small
          </WuiButtonEmpty>
        </WuiFlexItem>

        <WuiFlexItem grow={false}>
          <WuiButtonIcon
            size="s"
            color="ghost"
            iconType="user"
            onClick={() => window.alert('Button clicked')}
            aria-label="Your account"
          />
        </WuiFlexItem>

        <WuiFlexItem grow={false}>
          <WuiButton color="ghost" isLoading fill size="s">
            Loading&hellip;
          </WuiButton>
        </WuiFlexItem>

        <WuiFlexItem grow={false}>
          <WuiButton color="ghost" isLoading>
            Loading&hellip;
          </WuiButton>
        </WuiFlexItem>

        <WuiFlexItem grow={false}>
          <WuiButtonToggle
            color="ghost"
            label="Toggle Me"
            fill={toggle0On}
            onChange={onToggle0Change}
          />
        </WuiFlexItem>
      </WuiFlexGroup>
    </WuiPanel>
  );
};
