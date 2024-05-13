import React, { useState } from 'react';

import {
  WuiFlyout,
  WuiFlyoutBody,
  WuiFlyoutHeader,
  WuiButton,
  WuiText,
  WuiTitle,
  WuiCodeBlock,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  let flyout;

  const htmlCode = `<WuiFlyout ...>
  <WuiFlyoutHeader hasBorder>
    <WuiTitle size="m">
      <h2></h2>
    </WuiTitle>
  </WuiFlyoutHeader>
  <WuiFlyoutBody>
    ...
  </WuiFlyoutBody>
</WuiFlyout>
`;

  if (isFlyoutVisible) {
    flyout = (
      <WuiFlyout
        ownFocus
        onClose={() => setIsFlyoutVisible(false)}
        aria-labelledby="flyoutTitle">
        <WuiFlyoutHeader hasBorder>
          <WuiTitle size="m">
            <h2 id="flyoutTitle">A typical flyout</h2>
          </WuiTitle>
        </WuiFlyoutHeader>
        <WuiFlyoutBody>
          <WuiText>
            <p>
              For consistency across the many flyouts, please utilize the
              following code for implementing the flyout with a header.
            </p>
          </WuiText>
          <WuiCodeBlock language="html">{htmlCode}</WuiCodeBlock>
        </WuiFlyoutBody>
      </WuiFlyout>
    );
  }

  return (
    <div>
      <WuiButton onClick={() => setIsFlyoutVisible(true)}>
        Show flyout
      </WuiButton>
      {flyout}
    </div>
  );
};
