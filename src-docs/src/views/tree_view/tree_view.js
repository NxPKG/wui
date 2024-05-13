import React from 'react';

import { WuiIcon, WuiTreeView, WuiToken } from '../../../../src/components';

export default () => {
  const showAlert = () => {
    alert('You squashed a bug!');
  };

  const items = [
    {
      label: 'Item One',
      id: 'item_one',
      icon: <WuiIcon type="folderClosed" />,
      iconWhenExpanded: <WuiIcon type="folderOpen" />,
      isExpanded: true,
      children: [
        {
          label: 'Item A',
          id: 'item_a',
          icon: <WuiIcon type="document" />,
        },
        {
          label: 'Item B',
          id: 'item_b',
          icon: <WuiIcon type="arrowRight" />,
          iconWhenExpanded: <WuiIcon type="arrowDown" />,
          children: [
            {
              label: 'A Cloud',
              id: 'item_cloud',
              icon: <WuiToken iconType="tokenConstant" />,
            },
            {
              label: "I'm a Bug",
              id: 'item_bug',
              icon: <WuiToken iconType="tokenEnum" />,
              callback: showAlert,
            },
          ],
        },
        {
          label: 'Item C',
          id: 'item_c',
          icon: <WuiIcon type="arrowRight" />,
          iconWhenExpanded: <WuiIcon type="arrowDown" />,
          children: [
            {
              label: 'Another Cloud',
              id: 'item_cloud2',
              icon: <WuiToken iconType="tokenConstant" />,
            },
            {
              label:
                'This one is a really long string that we will check truncates correctly',
              id: 'item_bug2',
              icon: <WuiToken iconType="tokenEnum" />,
              callback: showAlert,
            },
          ],
        },
      ],
    },
    {
      label: 'Item Two',
      id: 'item_two',
    },
  ];

  return (
    <div style={{ width: '20rem' }}>
      <WuiTreeView items={items} aria-label="Sample Folder Tree" />
    </div>
  );
};
