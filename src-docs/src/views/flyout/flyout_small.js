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
        onClose={closeFlyout}
        size="s"
        aria-labelledby="flyoutSmallTitle">
        <WuiFlyoutHeader hasBorder>
          <WuiTitle size="s">
            <h2 id="flyoutSmallTitle">A small flyout</h2>
          </WuiTitle>
        </WuiFlyoutHeader>
        <WuiFlyoutBody>
          <WuiText>
            <p>
              In small flyouts, it is ok to reduce the header size to{' '}
              <code>s</code>.
            </p>
          </WuiText>
        </WuiFlyoutBody>
      </WuiFlyout>
    );
  }
  return (
    <div>
      <WuiButton onClick={showFlyout}>Show small flyout</WuiButton>

      {flyout}
    </div>
  );
};
