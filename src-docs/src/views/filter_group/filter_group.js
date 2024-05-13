import React, { useState } from 'react';

import {
  WuiPopover,
  WuiFilterGroup,
  WuiFilterButton,
  WuiIcon,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [isOnFilterOn, setIsOnFilterOn] = useState(false);
  const [isOffFilterOn, setIsOffFilterOn] = useState(false);

  const toggleFilter = () => {
    setIsFilterOn(!isFilterOn);
  };

  const toggleOnFilter = () => {
    setIsOnFilterOn(!isOnFilterOn);
    setIsOffFilterOn(isOffFilterOn && !isOnFilterOn ? false : isOffFilterOn);
  };

  const toggleOffFilter = () => {
    setIsOffFilterOn(!isOffFilterOn);
    setIsOnFilterOn(isOnFilterOn && !isOffFilterOn ? false : isOnFilterOn);
  };

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const button = (
    <WuiFilterButton
      iconType="arrowDown"
      onClick={onButtonClick}
      isSelected={isPopoverOpen}
      numFilters={12}
      hasActiveFilters={true}
      numActiveFilters={2}>
      Composers
    </WuiFilterButton>
  );

  return (
    <WuiFilterGroup fullWidth={true}>
      <WuiFilterButton
        grow={false}
        hasActiveFilters={isFilterOn}
        onClick={toggleFilter}>
        Filter
      </WuiFilterButton>
      <WuiFilterButton
        withNext
        grow={false}
        hasActiveFilters={isOnFilterOn}
        onClick={toggleOnFilter}>
        On
      </WuiFilterButton>
      <WuiFilterButton
        grow={false}
        hasActiveFilters={isOffFilterOn}
        onClick={toggleOffFilter}>
        Off
      </WuiFilterButton>
      <WuiPopover
        id="popover"
        ownFocus
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
        withTitle>
        <div className="wuiFilterSelect__note">
          <div className="wuiFilterSelect__noteContent">
            <WuiIcon type="minusInCircle" />
            <WuiSpacer size="xs" />
            <p>No filters found</p>
          </div>
        </div>
      </WuiPopover>
      <WuiFilterButton
        numFilters={12}
        hasActiveFilters={isFilterOn}
        onClick={toggleFilter}>
        Filter with a very long name
      </WuiFilterButton>
    </WuiFilterGroup>
  );
};
