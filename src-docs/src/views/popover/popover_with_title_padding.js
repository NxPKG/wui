import React, { useState } from 'react';

import {
  WuiPopover,
  WuiPopoverTitle,
  WuiButton,
  WuiFlexGroup,
  WuiFlexItem,
  WuiText,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen1, setIsPopoverOpen1] = useState(false);
  const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);
  const [isPopoverOpen3, setIsPopoverOpen3] = useState(false);
  const [isPopoverOpen4, setIsPopoverOpen4] = useState(false);

  const onButtonClick1 = () =>
    setIsPopoverOpen1(isPopoverOpen1 => !isPopoverOpen1);
  const closePopover1 = () => setIsPopoverOpen1(false);

  const onButtonClick2 = () =>
    setIsPopoverOpen2(isPopoverOpen2 => !isPopoverOpen2);
  const closePopover2 = () => setIsPopoverOpen2(false);

  const onButtonClick3 = () =>
    setIsPopoverOpen3(isPopoverOpen3 => !isPopoverOpen3);
  const closePopover3 = () => setIsPopoverOpen3(false);

  const onButtonClick4 = () =>
    setIsPopoverOpen4(isPopoverOpen4 => !isPopoverOpen4);
  const closePopover4 = () => setIsPopoverOpen4(false);

  return (
    <WuiFlexGroup wrap={true}>
      <WuiFlexItem grow={false}>
        <WuiPopover
          ownFocus
          button={
            <WuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick2}>
              Title and small padding
            </WuiButton>
          }
          isOpen={isPopoverOpen2}
          closePopover={closePopover2}
          anchorPosition="upCenter"
          panelPaddingSize="s">
          <WuiPopoverTitle>Hello, I&rsquo;m a popover title</WuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <WuiText>
              <p>Popover content</p>
            </WuiText>
          </div>
        </WuiPopover>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiPopover
          ownFocus
          button={
            <WuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick1}>
              Title and default padding (m)
            </WuiButton>
          }
          isOpen={isPopoverOpen1}
          closePopover={closePopover1}
          anchorPosition="upCenter">
          <WuiPopoverTitle>Hello, I&rsquo;m a popover title</WuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <WuiText>
              <p>Popover content</p>
            </WuiText>
          </div>
        </WuiPopover>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiPopover
          ownFocus
          button={
            <WuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick4}>
              Title and large padding
            </WuiButton>
          }
          isOpen={isPopoverOpen4}
          closePopover={closePopover4}
          anchorPosition="upCenter"
          panelPaddingSize="l">
          <WuiPopoverTitle>Hello, I&rsquo;m a popover title</WuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <WuiText>
              <p>Popover content</p>
            </WuiText>
          </div>
        </WuiPopover>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiPopover
          ownFocus
          button={
            <WuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick3}>
              Title and no padding
            </WuiButton>
          }
          isOpen={isPopoverOpen3}
          closePopover={closePopover3}
          anchorPosition="upCenter"
          panelPaddingSize="none">
          <WuiPopoverTitle>As the title, I keep my padding</WuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <WuiText>
              <p>Popover content</p>
            </WuiText>
          </div>
        </WuiPopover>
      </WuiFlexItem>
    </WuiFlexGroup>
  );
};
