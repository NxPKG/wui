import React, { useState } from 'react';

import { WuiButton, WuiPopover } from '../../../../src/components';

export default () => {
  const [isExampleShown, setIsExampleShown] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const toggleExample = () =>
    setIsExampleShown(isExampleShown => !isExampleShown);

  const onButtonClick = () => setIsPopoverOpen(isPopoverOpen => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <WuiButton
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}
      style={{ background: 'white' }}>
      Show fixed popover
    </WuiButton>
  );

  return (
    <React.Fragment>
      <WuiButton onClick={toggleExample}>Toggle Example</WuiButton>
      {isExampleShown && (
        <WuiPopover
          ownFocus
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          style={{ position: 'fixed', bottom: 50, right: 50, zIndex: 10 }}
          repositionOnScroll={true}>
          <div>This popover scrolls with the button element!</div>
        </WuiPopover>
      )}
    </React.Fragment>
  );
};
