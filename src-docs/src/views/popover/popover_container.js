import React, { useState } from 'react';

import {
  WuiButton,
  WuiCode,
  WuiPanel,
  WuiPopover,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [panelRef, setPanelRef] = useState(null);

  const onButtonClick = () =>
    setIsPopoverOpen(isPopoverOpen1 => !isPopoverOpen1);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <WuiButton
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}
      style={{ position: 'relative', left: 50 }}>
      Show constrained popover
    </WuiButton>
  );

  return (
    <WuiPanel panelRef={setPanelRef}>
      <WuiPopover
        ownFocus
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        container={panelRef}>
        <div>
          Popover is positioned <WuiCode>downCenter</WuiCode> but constrained to
          fit within the panel.
        </div>
      </WuiPopover>

      {/* create adequate room for the popover */}
      <WuiSpacer size="xxl" />
      <WuiSpacer size="xxl" />
    </WuiPanel>
  );
};
