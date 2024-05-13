import React, { useState } from 'react';

import { WuiFilterGroup, WuiFilterButton } from '../../../../src/components';

export default () => {
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

  return (
    <WuiFilterGroup>
      <WuiFilterButton hasActiveFilters={isFilterOn} onClick={toggleFilter}>
        Single filter
      </WuiFilterButton>
      <WuiFilterButton
        withNext
        hasActiveFilters={isOnFilterOn}
        onClick={toggleOnFilter}>
        On
      </WuiFilterButton>
      <WuiFilterButton
        hasActiveFilters={isOffFilterOn}
        onClick={toggleOffFilter}>
        Off
      </WuiFilterButton>
    </WuiFilterGroup>
  );
};
