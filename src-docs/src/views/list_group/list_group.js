import React, { useState, Fragment } from 'react';

import {
  WuiListGroup,
  WuiListGroupItem,
  WuiSpacer,
  WuiSwitch,
  WuiCode,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [flushWidth, setFlushWidth] = useState(false);
  const [showBorder, setShowBorder] = useState(false);

  const handleOnClick = () => {
    alert('Item was clicked');
  };

  return (
    <Fragment>
      <WuiFlexGroup alignItems="center">
        <WuiFlexItem grow={false}>
          <WuiSwitch
            label={
              <span>
                Show as <WuiCode>flush</WuiCode>
              </span>
            }
            checked={flushWidth}
            onChange={() => setFlushWidth(!flushWidth)}
          />
        </WuiFlexItem>
        <WuiFlexItem grow={false}>
          <WuiSwitch
            label={
              <span>
                Show as <WuiCode>bordered</WuiCode>
              </span>
            }
            checked={showBorder}
            onChange={() => {
              setShowBorder(!showBorder);
            }}
          />
        </WuiFlexItem>
      </WuiFlexGroup>

      <WuiSpacer size="l" />

      <WuiListGroup flush={flushWidth} bordered={showBorder}>
        <WuiListGroupItem onClick={handleOnClick} label="First item" />

        <WuiListGroupItem onClick={handleOnClick} label="Second item" />

        <WuiListGroupItem onClick={handleOnClick} label="Third item" isActive />

        <WuiListGroupItem
          onClick={handleOnClick}
          label="Fourth item"
          isDisabled
        />
      </WuiListGroup>
    </Fragment>
  );
};
