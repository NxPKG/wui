import React, { useState } from 'react';

import {
  WuiOverlayMask,
  WuiButton,
  WuiFlyout,
  WuiTitle,
  WuiFlyoutHeader,
} from '../../../../src/components';

export default () => {
  const [flyOut, changeFlyOut] = useState(false);

  const toggleFlyOut = () => {
    changeFlyOut(!flyOut);
  };

  let flyout;
  if (flyOut) {
    flyout = (
      <React.Fragment>
        <WuiOverlayMask onClick={toggleFlyOut} headerZindexLocation="below" />
        <WuiFlyout size="s" onClose={toggleFlyOut}>
          <WuiFlyoutHeader>
            <WuiTitle>
              <h1>Click outside this flyout to close overlay. </h1>
            </WuiTitle>
          </WuiFlyoutHeader>
        </WuiFlyout>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <WuiButton onClick={() => toggleFlyOut()}>
        Overlay as a sibling of a flyout
      </WuiButton>
      {flyout}
    </React.Fragment>
  );
};
