import React, { Fragment, useState } from 'react';

import {
  WuiButton,
  WuiIcon,
  WuiTabbedContent,
  WuiTitle,
  WuiText,
  WuiSpacer,
} from '../../../../src/components';

const tabs = [
  {
    id: 'cobalt',
    name: 'Cobalt',
    content: (
      <Fragment>
        <WuiSpacer />
        <WuiTitle>
          <h3>Cobalt</h3>
        </WuiTitle>
        <WuiText>
          Cobalt is a chemical element with symbol Co and atomic number 27. Like
          nickel, cobalt is found in the Earth&rsquo;s crust only in chemically
          combined form, save for small deposits found in alloys of natural
          meteoric iron. The free element, produced by reductive smelting, is a
          hard, lustrous, silver-gray metal.
        </WuiText>
      </Fragment>
    ),
  },
  {
    id: 'dextrose',
    name: 'Dextrose',
    content: (
      <Fragment>
        <WuiSpacer />
        <WuiTitle>
          <h3>Dextrose</h3>
        </WuiTitle>
        <WuiText>
          Intravenous sugar solution, also known as dextrose solution, is a
          mixture of dextrose (glucose) and water. It is used to treat low blood
          sugar or water loss without electrolyte loss.
        </WuiText>
      </Fragment>
    ),
  },
  {
    id: 'hydrogen',
    name: (
      <span>
        <WuiIcon type="heatmap" />
        &nbsp;Hydrogen
      </span>
    ),
    content: (
      <Fragment>
        <WuiSpacer />
        <WuiTitle>
          <h3>Hydrogen</h3>
        </WuiTitle>
        <WuiText>
          Hydrogen is a chemical element with symbol H and atomic number 1. With
          a standard atomic weight of 1.008, hydrogen is the lightest element on
          the periodic table
        </WuiText>
      </Fragment>
    ),
  },
  {
    id: 'monosodium_glutammate',
    name: 'Monosodium Glutamate',
    content: (
      <Fragment>
        <WuiSpacer />
        <WuiTitle>
          <h3>Monosodium Glutamate</h3>
        </WuiTitle>
        <WuiText>
          Monosodium glutamate (MSG, also known as sodium glutamate) is the
          sodium salt of glutamic acid, one of the most abundant naturally
          occurring non-essential amino acids. Monosodium glutamate is found
          naturally in tomatoes, cheese and other foods.
        </WuiText>
      </Fragment>
    ),
  },
];

export default () => {
  const [selectedTab, setSelectedTab] = useState(tabs[1]);

  const onTabClick = selectedTab => {
    setSelectedTab(selectedTab);
  };

  const cycleTab = () => {
    const selectedTabIndex = tabs.indexOf(selectedTab);
    const nextTabIndex =
      selectedTabIndex < tabs.length - 1 ? selectedTabIndex + 1 : 0;
    setSelectedTab(tabs[nextTabIndex]);
  };

  return (
    <Fragment>
      <WuiButton iconType="arrowRight" iconSide="right" onClick={cycleTab}>
        Cycle through the tabs
      </WuiButton>

      <WuiSpacer size="m" />

      <WuiTabbedContent
        tabs={tabs}
        selectedTab={selectedTab}
        onTabClick={onTabClick}
      />
    </Fragment>
  );
};
