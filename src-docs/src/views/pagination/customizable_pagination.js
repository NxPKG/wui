import React, { useState } from 'react';

import {
  WuiButtonEmpty,
  WuiContextMenuItem,
  WuiContextMenuPanel,
  WuiFlexGroup,
  WuiFlexItem,
  WuiPagination,
  WuiPopover,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activePage, setActivePage] = useState(0);

  const PAGE_COUNT = 10;

  const onButtonClick = () => setIsPopoverOpen(isPopoverOpen => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const goToPage = pageNumber => setActivePage(pageNumber);

  const button = (
    <WuiButtonEmpty
      size="s"
      color="text"
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
    <WuiFlexGroup justifyContent="spaceBetween" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiPopover
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          panelPaddingSize="none">
          <WuiContextMenuPanel items={items} />
        </WuiPopover>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiPagination
          aria-label="Custom pagination example"
          pageCount={PAGE_COUNT}
          activePage={activePage}
          onPageClick={goToPage}
        />
      </WuiFlexItem>
    </WuiFlexGroup>
  );
};
