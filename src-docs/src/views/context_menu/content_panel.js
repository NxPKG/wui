import React, { useState } from 'react';

import {
  WuiButton,
  WuiContextMenuPanel,
  WuiPopover,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const button = (
    <WuiButton
      size="s"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}>
      Click to show some content
    </WuiButton>
  );

  return (
    <WuiPopover
      id="contentPanel"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="s"
      anchorPosition="downLeft">
      <WuiContextMenuPanel>
        This context menu doesn&#39;t render items, it passes a child instead.
      </WuiContextMenuPanel>
    </WuiPopover>
  );
};
