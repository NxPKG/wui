import React, { useState } from 'react';

import { WuiPopover, WuiButton } from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () => setIsPopoverOpen(isPopoverOpen => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  return (
    <WuiPopover
      ownFocus
      button={
        <WuiButton
          iconType="arrowDown"
          iconSide="right"
          onClick={onButtonClick}>
          Turn padding off and apply a custom class
        </WuiButton>
      }
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelClassName="yourClassNameHere"
      panelPaddingSize="none">
      This should have no padding, and if you inspect, also a custom class.
    </WuiPopover>
  );
};
