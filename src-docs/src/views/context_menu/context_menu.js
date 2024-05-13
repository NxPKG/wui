import React, { useState } from 'react';

import {
  WuiButton,
  WuiContextMenu,
  WuiFormRow,
  WuiIcon,
  WuiPopover,
  WuiSwitch,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const panels = [
    {
      id: 0,
      title: 'This is a context menu',
      items: [
        {
          name: 'Handle an onClick',
          icon: <WuiIcon type="search" size="m" />,
          onClick: () => {
            closePopover();
            window.alert('Show fullscreen');
          },
        },
        {
          name: 'Go to a link',
          icon: 'user',
          href: 'http://wazuh.com',
          target: '_blank',
        },
        {
          name: 'Nest panels',
          icon: 'user',
          panel: 1,
        },
        {
          name: 'You can add a tooltip',
          icon: 'user',
          toolTipTitle: 'Optional tooltip',
          toolTipContent: 'Optional content for a tooltip',
          toolTipPosition: 'right',
          onClick: () => {
            closePopover();
            window.alert('Display options');
          },
        },
        {
          name: 'Disabled option',
          icon: 'user',
          toolTipContent: 'For reasons, this item is disabled',
          toolTipPosition: 'right',
          disabled: true,
          onClick: () => {
            closePopover();
            window.alert('Disabled option');
          },
        },
      ],
    },
    {
      id: 1,
      title: 'Nest panels',
      items: [
        {
          name: 'PDF reports',
          icon: 'user',
          onClick: () => {
            closePopover();
            window.alert('PDF reports');
          },
        },
        {
          name: 'Embed code',
          icon: 'user',
          panel: 2,
        },
        {
          name: 'Permalinks',
          icon: 'user',
          onClick: () => {
            closePopover();
            window.alert('Permalinks');
          },
        },
      ],
    },
    {
      id: 2,
      title: 'Embed code',
      content: (
        <div style={{ padding: 16 }}>
          <WuiFormRow label="Generate a public snapshot?" hasChildLabel={false}>
            <WuiSwitch
              name="switch"
              id="asdf"
              label="Snapshot data"
              checked={true}
              onChange={() => {}}
            />
          </WuiFormRow>
          <WuiFormRow
            label="Include the following in the embed"
            hasChildLabel={false}>
            <WuiSwitch
              name="switch"
              id="asdf2"
              label="Current time range"
              checked={true}
              onChange={() => {}}
            />
          </WuiFormRow>
          <WuiSpacer />
          <WuiButton fill>Copy iFrame code</WuiButton>
        </div>
      ),
    },
  ];

  const button = (
    <WuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Click me to load a context menu
    </WuiButton>
  );

  return (
    <WuiPopover
      id="contextMenuExample"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      withTitle
      anchorPosition="downLeft">
      <WuiContextMenu initialPanelId={0} panels={panels} />
    </WuiPopover>
  );
};
