import React, { useState } from 'react';

import {
  WuiFlyout,
  WuiFlyoutHeader,
  WuiFlyoutBody,
  WuiButton,
  WuiText,
  WuiTitle,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = () => setIsFlyoutVisible(true);

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <WuiFlyout
        ownFocus
        onClose={closeFlyout}
        size="l"
        aria-labelledby="flyoutLargeTitle">
        <WuiFlyoutHeader hasBorder>
          <WuiTitle size="m">
            <h2 id="flyoutLargeTitle">A large flyout</h2>
          </WuiTitle>
        </WuiFlyoutHeader>
        <WuiFlyoutBody>
          <WuiText>
            <p>The large flyout is very wide.</p>
          </WuiText>
        </WuiFlyoutBody>
      </WuiFlyout>
    );
  }
  return (
    <div>
      <WuiButton onClick={showFlyout}>Show large flyout</WuiButton>
      {flyout}
    </div>
  );
};
