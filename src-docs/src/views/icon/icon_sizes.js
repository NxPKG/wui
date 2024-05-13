// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS

// This example JS is overly complex for simple icon usage
// and is set up this way for ease of use in our docs.
//
// Check the snippet tab for a more common usage.

import React from 'react';

import {
  WuiFlexGrid,
  WuiFlexItem,
  WuiIcon,
  WuiPanel,
  WuiText,
} from '../../../../src/components';

const iconSizes = ['s', 'm', 'l', 'xl', 'xxl', 'original'];

export default () => (
  <WuiFlexGrid columns={4}>
    {iconSizes.map(iconSize => (
      <WuiFlexItem
        className="guideDemo__icon"
        key={iconSize}
        style={{ width: '340px' }}>
        <WuiPanel>
          <WuiIcon type="logoWazuh" size={iconSize} />
          <WuiText size="s">
            <p>{iconSize}</p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
    ))}
  </WuiFlexGrid>
);
