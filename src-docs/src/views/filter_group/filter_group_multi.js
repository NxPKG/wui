import React, { useState } from 'react';

import {
  WuiPopover,
  WuiPopoverTitle,
  WuiFieldSearch,
  WuiFilterSelectItem,
  WuiLoadingChart,
  WuiSpacer,
  WuiIcon,
  WuiFilterGroup,
  WuiFilterButton,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const items = [
    { name: 'Johann Sebastian Bach', checked: 'on' },
    { name: 'Wolfgang Amadeus Mozart', checked: 'on' },
    { name: 'Antonín Dvořák', checked: 'off' },
    { name: 'Dmitri Shostakovich' },
    { name: 'Felix Mendelssohn-Bartholdy' },
    { name: 'Franz Liszt' },
    { name: 'Franz Schubert' },
    { name: 'Frédéric Chopin' },
    { name: 'Georg Friedrich Händel' },
    { name: 'Giuseppe Verdi' },
    { name: 'Gustav Mahler' },
    { name: 'Igor Stravinsky' },
    { name: 'Johannes Brahms' },
    { name: 'Joseph Haydn' },
    { name: 'Ludwig van Beethoven' },
    { name: 'Piotr Illitch Tchaïkovsky' },
    { name: 'Robert Schumann' },
    { name: 'Sergej S. Prokofiew' },
    { name: 'Wolfgang Amadeus Mozart' },
  ];

  const button = (
    <WuiFilterButton
      iconType="arrowDown"
      onClick={onButtonClick}
      isSelected={isPopoverOpen}
      numFilters={items.length}
      hasActiveFilters={true}
      numActiveFilters={2}>
      Composers
    </WuiFilterButton>
  );

  return (
    <WuiFilterGroup>
      <WuiPopover
        id="popoverExampleMultiSelect"
        ownFocus
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
        withTitle>
        <WuiPopoverTitle>
          <WuiFieldSearch />
        </WuiPopoverTitle>
        <div className="wuiFilterSelect__items">
          {items.map((item, index) => (
            <WuiFilterSelectItem checked={item.checked} key={index}>
              {item.name}
            </WuiFilterSelectItem>
          ))}
          {/*
              Use when loading items initially
            */}
          <div className="wuiFilterSelect__note">
            <div className="wuiFilterSelect__noteContent">
              <WuiLoadingChart size="m" />
              <WuiSpacer size="xs" />
              <p>Loading filters</p>
            </div>
          </div>
          {/*
              Use when no results are returned
            */}
          <div className="wuiFilterSelect__note">
            <div className="wuiFilterSelect__noteContent">
              <WuiIcon type="minusInCircle" />
              <WuiSpacer size="xs" />
              <p>No filters found</p>
            </div>
          </div>
        </div>
      </WuiPopover>
    </WuiFilterGroup>
  );
};
