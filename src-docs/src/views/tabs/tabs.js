import React, { useState, Fragment } from 'react';

import {
  WuiIcon,
  WuiTabs,
  WuiTab,
  WuiSpacer,
} from '../../../../src/components';

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
  {
    id: 'wazuh_link',
    name: 'Wazuh Website',
    disabled: false,
    href: 'https://www.wazuh.com/',
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
        {...(tab.href && { href: tab.href, target: '_blank' })}
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        key={index}>
        {tab.name}
      </WuiTab>
    ));
  };

  return (
    <Fragment>
      <WuiTabs>{renderTabs()}</WuiTabs>

      <WuiSpacer />

      <WuiTabs size="s">{renderTabs()}</WuiTabs>
    </Fragment>
  );
};
