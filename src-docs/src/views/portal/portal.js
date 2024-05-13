import React, { useState } from 'react';

import { WuiPortal, WuiButton, WuiBottomBar } from '../../../../src/components';

export const Portal = () => {
  const [isPortalVisible, setIsPortalVisible] = useState(false);

  const togglePortal = () => {
    setIsPortalVisible(!isPortalVisible);
  };

  let portal;

  if (isPortalVisible) {
    portal = (
      <WuiPortal>
        <WuiBottomBar>
          <p>This element is appended to the body in the DOM if you inspect</p>
        </WuiBottomBar>
      </WuiPortal>
    );
  }
  return (
    <div>
      <WuiButton onClick={togglePortal}>Toggle portal</WuiButton>

      {portal}
    </div>
  );
};
