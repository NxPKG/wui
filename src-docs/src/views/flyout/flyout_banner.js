import React, { useState } from 'react';

import {
  WuiCallOut,
  WuiFlexGroup,
  WuiFlexItem,
  WuiFlyout,
  WuiFlyoutHeader,
  WuiFlyoutBody,
  WuiIcon,
  WuiLink,
  WuiButton,
  WuiText,
  WuiTextColor,
  WuiTitle,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = () => setIsFlyoutVisible(true);

  let flyout;

  const callOut = (
    <WuiCallOut>
      <WuiFlexGroup>
        <WuiFlexItem grow={false}>
          <WuiIcon type="help" />
        </WuiFlexItem>
        <WuiFlexItem>
          {' '}
          <WuiTextColor color="subdued">
            Here&rsquo;s some stuff that you need to know. This banner helps
            highlight important information.
          </WuiTextColor>
          <WuiLink href="#">View docs</WuiLink>
        </WuiFlexItem>
      </WuiFlexGroup>
    </WuiCallOut>
  );

  if (isFlyoutVisible) {
    flyout = (
      <WuiFlyout
        ownFocus
        onClose={closeFlyout}
        aria-labelledby="flyoutWithBannerTitle">
        <WuiFlyoutHeader hasBorder>
          <WuiTitle size="m">
            <h2 id="flyoutWithBannerTitle">A flyout with a banner</h2>
          </WuiTitle>
        </WuiFlyoutHeader>
        <WuiFlyoutBody banner={callOut}>
          <WuiText>
            <p>
              This flyout is using the banner prop in{' '}
              <strong>WuiFlyoutBody</strong>.
            </p>
          </WuiText>
        </WuiFlyoutBody>
      </WuiFlyout>
    );
  }
  return (
    <div>
      <WuiButton onClick={showFlyout}>Show flyout with banner</WuiButton>
      {flyout}
    </div>
  );
};
