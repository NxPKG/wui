import React, { useState } from 'react';

import {
  WuiButtonEmpty,
  WuiContextMenuPanel,
  WuiContextMenuItem,
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
    <WuiButtonEmpty
      size="s"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}>
      Rows per page: 50
    </WuiButtonEmpty>
  );

  const items = [
    <WuiContextMenuItem
      key="10 rows"
      icon="empty"
      onClick={() => {
        closePopover();
        window.alert('10 rows');
      }}>
      10 rows
    </WuiContextMenuItem>,
    <WuiContextMenuItem
      key="20 rows"
      icon="empty"
      onClick={() => {
        closePopover();
        window.alert('20 rows');
      }}>
      20 rows
    </WuiContextMenuItem>,
    <WuiContextMenuItem
      key="50 rows"
      icon="check"
      onClick={() => {
        closePopover();
        window.alert('50 rows');
      }}>
      50 rows
    </WuiContextMenuItem>,
    <WuiContextMenuItem
      key="100 rows"
      icon="empty"
      onClick={() => {
        closePopover();
        window.alert('100 rows');
      }}>
      100 rows
    </WuiContextMenuItem>,
  ];

  return (
    <WuiPopover
      id="singlePanel"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downLeft">
      <WuiContextMenuPanel items={items} />
    </WuiPopover>
  );
};
