import React, { useState } from 'react';

import {
  WuiButton,
  WuiContextMenu,
  WuiIcon,
  WuiPopover,
  WuiSpacer,
  WuiText,
} from '../../../../src/components';

import WuiTabsExample from '../tabs/tabbed_content';

function flattenPanelTree(tree, array = []) {
  array.push(tree);

  if (tree.items) {
    tree.items.forEach(item => {
      if (item.panel) {
        flattenPanelTree(item.panel, array);
        item.panel = item.panel.id;
      }
    });
  }

  return array;
}

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);
  const [isDynamicPopoverOpen, setDynamicPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const onDynamicButtonClick = () => {
    setDynamicPopover(!isDynamicPopoverOpen);
  };

  const closeDynamicPopover = () => {
    setDynamicPopover(false);
  };

  const createPanelTree = Content => {
    return flattenPanelTree({
      id: 0,
      title: 'View options',
      items: [
        {
          name: 'Show fullscreen',
          icon: <WuiIcon type="search" size="m" />,
          onClick: () => {
            closePopover();
            window.alert('Show fullscreen');
          },
        },
        {
          isSeparator: true,
          key: 'sep',
        },
        {
          name: 'See more',
          icon: 'plusInCircle',
          panel: {
            id: 1,
            width: 400,
            title: 'See more',
            content: <Content />,
          },
        },
      ],
    });
  };

  const panels = createPanelTree(() => (
    <WuiText style={{ padding: 24 }} textAlign="center">
      <p>
        <WuiIcon type="faceHappy" size="xxl" />
      </p>

      <h3>Context panels can contain anything</h3>
      <p>
        You can stuff just about anything into these panels. Be mindful of size
        though. This panel is set to 400px and the height will grow as space
        allows.
      </p>
    </WuiText>
  ));

  const dynamicPanels = createPanelTree(WuiTabsExample);

  const button = (
    <WuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Click me to load mixed content menu
    </WuiButton>
  );

  const dynamicButton = (
    <WuiButton
      iconType="arrowDown"
      iconSide="right"
      onClick={onDynamicButtonClick}>
      Click me to load dynamic mixed content menu
    </WuiButton>
  );

  return (
    <React.Fragment>
      <WuiPopover
        id="contextMenuNormal"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
        withTitle
        anchorPosition="upLeft">
        <WuiContextMenu initialPanelId={0} panels={panels} />
      </WuiPopover>

      <WuiSpacer size="l" />

      <WuiPopover
        id="contextMenuDynamic"
        button={dynamicButton}
        isOpen={isDynamicPopoverOpen}
        closePopover={closeDynamicPopover}
        panelPaddingSize="none"
        withTitle
        anchorPosition="upLeft">
        <WuiContextMenu initialPanelId={0} panels={dynamicPanels} />
      </WuiPopover>
    </React.Fragment>
  );
};
