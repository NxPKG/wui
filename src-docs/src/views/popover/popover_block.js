import React, { useState } from 'react';

import { WuiButton, WuiPopover } from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () => setIsPopoverOpen(isPopoverOpen => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <WuiButton onClick={onButtonClick} fullWidth>
      This button is expanded
    </WuiButton>
  );

  return (
    <WuiPopover
      ownFocus
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      display="block">
      <div>This is a popover</div>
    </WuiPopover>
  );
};
