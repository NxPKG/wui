import React from 'react';

import { WuiControlBar, WuiLink } from '../../../../src/components';

export default () => {
  const soundTheAlarms = () => {
    alert('You clicked a button!');
  };

  const controls = [
    {
      controlType: 'button',
      id: 'controls_button',
      label: 'Button',
      onClick: soundTheAlarms,
    },
    {
      controlType: 'spacer',
    },
    {
      controlType: 'icon',
      id: 'controls_icon',
      iconType: 'flag',
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'icon',
      id: 'controls_icon_button',
      iconType: 'bell',
      onClick: soundTheAlarms,
      color: 'primary',
      'aria-label': 'Bell',
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'text',
      id: 'controls_text',
      text: 'Some text',
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'tab',
      id: 'controls_tab',
      label: 'Tab',
      onClick: () => {},
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'text',
      id: 'some_text',
      text: <WuiLink>A sample link</WuiLink>,
    },
    {
      controlType: 'spacer',
    },
    {
      controlType: 'breadcrumbs',
      id: 'controls_breadcrumbs',
      breadcrumbs: [
        {
          text: 'Breadcrumbs',
        },
        {
          text: 'Item',
        },
      ],
    },
  ];

  return <WuiControlBar controls={controls} position="relative" showOnMobile />;
};
