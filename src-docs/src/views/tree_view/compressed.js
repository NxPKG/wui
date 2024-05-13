import React from 'react';

import { WuiTreeView, WuiToken } from '../../../../src/components';

export default () => {
  const items = [
    {
      label: 'transporter',
      id: 'transporter',
      icon: <WuiToken size="xs" iconType="tokenObject" />,
      children: [
        {
          label: 'service',
          id: 'service',
          icon: <WuiToken size="xs" iconType="tokenString" />,
        },
        {
          label: 'auth',
          id: 'auth',
          icon: <WuiToken size="xs" iconType="tokenObject" />,
          children: [
            {
              label: 'user',
              id: 'user',
              icon: <WuiToken size="xs" iconType="tokenVariable" />,
            },
            {
              label: 'pass',
              id: 'pass',
              icon: <WuiToken size="xs" iconType="tokenVariable" />,
            },
          ],
        },
      ],
    },
    {
      label: 'getContact',
      id: 'getContact',
      icon: <WuiToken size="xs" iconType="tokenFunction" />,
      children: [
        {
          label: 'render',
          id: 'render',
          icon: <WuiToken size="xs" iconType="tokenFunction" />,
          children: [
            {
              label: 'title',
              id: 'title',
              icon: <WuiToken size="xs" iconType="tokenString" />,
            },
          ],
        },
      ],
    },
    {
      label: 'postContact',
      id: 'postContact',
      icon: <WuiToken size="xs" iconType="tokenFunction" />,
      children: [
        {
          label: 'errors',
          id: 'errors',
          icon: <WuiToken size="xs" iconType="tokenConstant" />,
        },
        {
          label: 'A custom class is on this one',
          id: 'cutomClass',
          icon: <WuiToken size="xs" iconType="tokenObject" />,
          className: 'wuiTreeView__nodeInnerExample',
        },
      ],
    },
    {
      label: 'smokeMonster',
      id: 'smokeMonster',
      icon: <WuiToken size="xs" iconType="tokenMethod" />,
    },
  ];

  return (
    <div style={{ width: '20rem' }}>
      <WuiTreeView
        items={items}
        display="compressed"
        expandByDefault
        showExpansionArrows
        aria-label="Document Outline"
      />
    </div>
  );
};
