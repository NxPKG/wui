import React, { useState } from 'react';

import { WuiPopover, WuiButton } from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () => setIsPopoverOpen(isPopoverOpen => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <WuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Show popover
    </WuiButton>
  );

  return (
    <WuiPopover
      ownFocus
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}>
      <div style={{ width: '300px' }}>
        Popover content that&rsquo;s wider than the default width
      </div>
    </WuiPopover>
  );
};
