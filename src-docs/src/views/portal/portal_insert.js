import React, { useState } from 'react';

import { WuiPortal, WuiButton } from '../../../../src/components';
import { WuiSpacer } from '../../../../src/components/spacer/spacer';

let buttonRef = null;

export const PortalInsert = () => {
  const [isPortalVisible, setIsPortalVisible] = useState(false);

  const setButtonRef = node => (buttonRef = node);

  const togglePortal = () => {
    setIsPortalVisible(!isPortalVisible);
  };

  let portal;

  if (isPortalVisible) {
    portal = (
      <WuiPortal insert={{ sibling: buttonRef, position: 'after' }}>
        <WuiSpacer />
        <p>This element is appended immediately after the button.</p>
      </WuiPortal>
    );
  }
  return (
    <div>
      <WuiButton onClick={togglePortal} buttonRef={setButtonRef}>
        Toggle portal
      </WuiButton>
      {portal}
    </div>
  );
};
