import React, { useState } from 'react';

import {
  WuiBottomBar,
  WuiFlexGroup,
  WuiFlexItem,
  WuiButton,
  WuiButtonEmpty,
} from '../../../../src/components';

export default () => {
  const [showBar, setShowBar] = useState(false);

  const button = (
    <WuiButton color="primary" onClick={() => setShowBar(!showBar)}>
      Toggle appearance of the bottom bar
    </WuiButton>
  );

  let bottomBar;
  if (showBar) {
    bottomBar = (
      <WuiBottomBar>
        <WuiFlexGroup justifyContent="spaceBetween">
          <WuiFlexItem grow={false}>
            <WuiFlexGroup gutterSize="s">
              <WuiFlexItem grow={false}>
                <WuiButton color="ghost" size="s" iconType="help">
                  Help
                </WuiButton>
              </WuiFlexItem>
              <WuiFlexItem grow={false}>
                <WuiButton color="ghost" size="s" iconType="user">
                  Add user
                </WuiButton>
              </WuiFlexItem>
            </WuiFlexGroup>
          </WuiFlexItem>
          <WuiFlexItem grow={false}>
            <WuiFlexGroup gutterSize="s">
              <WuiFlexItem grow={false}>
                <WuiButtonEmpty color="ghost" size="s" iconType="cross">
                  Discard
                </WuiButtonEmpty>
              </WuiFlexItem>
              <WuiFlexItem grow={false}>
                <WuiButton color="primary" fill size="s" iconType="check">
                  Save
                </WuiButton>
              </WuiFlexItem>
            </WuiFlexGroup>
          </WuiFlexItem>
        </WuiFlexGroup>
      </WuiBottomBar>
    );
  }

  return (
    <div>
      {button}
      {bottomBar}
    </div>
  );
};
