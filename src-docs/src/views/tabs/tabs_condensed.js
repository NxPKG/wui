import React, { useState } from 'react';

import { WuiIcon, WuiTabs, WuiTab } from '../../../../src/components';

const tabs = [
  {
    id: 'cobalt',
    name: 'Cobalt',
    disabled: false,
  },
  {
    id: 'dextrose',
    name: 'Dextrose',
    disabled: false,
  },
  {
    id: 'hydrogen',
    name: (
      <span>
        <WuiIcon type="heatmap" />
        &nbsp;Hydrogen
      </span>
    ),
    disabled: true,
  },
  {
    id: 'monosodium_glutammate',
    name: 'Monosodium Glutamate',
    disabled: false,
  },
];

export default () => {
  const [selectedTabId, setSelectedTabId] = useState('cobalt');

  const onSelectedTabChanged = id => {
    setSelectedTabId(id);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <WuiTab
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        key={index}>
        {tab.name}
      </WuiTab>
    ));
  };

  return <WuiTabs display="condensed">{renderTabs()}</WuiTabs>;
};
