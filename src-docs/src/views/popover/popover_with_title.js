import React, { useState } from 'react';

import {
  WuiPopover,
  WuiPopoverTitle,
  WuiPopoverFooter,
  WuiButton,
  WuiFlexGroup,
  WuiFlexItem,
  WuiText,
  WuiTextColor,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen1, setIsPopoverOpen1] = useState(false);
  const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);
  const [isPopoverOpen3, setIsPopoverOpen3] = useState(false);

  const onButtonClick1 = () =>
    setIsPopoverOpen1(isPopoverOpen1 => !isPopoverOpen1);
  const closePopover1 = () => setIsPopoverOpen1(false);

  const onButtonClick2 = () =>
    setIsPopoverOpen2(isPopoverOpen2 => !isPopoverOpen2);
  const closePopover2 = () => setIsPopoverOpen2(false);

  const onButtonClick3 = () =>
    setIsPopoverOpen3(isPopoverOpen3 => !isPopoverOpen3);
  const closePopover3 = () => setIsPopoverOpen3(false);

  return (
    <WuiFlexGroup>
      <WuiFlexItem grow={false}>
        <WuiPopover
          ownFocus
          button={
            <WuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick1}>
              With title
            </WuiButton>
          }
          isOpen={isPopoverOpen1}
          closePopover={closePopover1}
          anchorPosition="downCenter">
          <WuiPopoverTitle>Hello, I&rsquo;m a popover title</WuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <WuiText>
              <p>
                Selfies migas stumptown hot chicken quinoa wolf green juice,
                mumblecore tattooed trust fund hammock truffaut taxidermy kogi.
              </p>
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
              onClick={onButtonClick2}>
              With footer
            </WuiButton>
          }
          isOpen={isPopoverOpen2}
          closePopover={closePopover2}
          anchorPosition="upCenter">
          <div style={{ width: '300px' }}>
            <WuiText>
              <p>
                Selfies migas stumptown hot chicken quinoa wolf green juice,
                mumblecore tattooed trust fund hammock truffaut taxidermy kogi.
              </p>
            </WuiText>
          </div>
          <WuiPopoverFooter>
            <WuiTextColor color="subdued">
              Hello, I&rsquo;m a small popover footer caption
            </WuiTextColor>
          </WuiPopoverFooter>
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
              With title and footer button
            </WuiButton>
          }
          isOpen={isPopoverOpen3}
          closePopover={closePopover3}
          anchorPosition="upCenter">
          <WuiPopoverTitle>Hello, I&rsquo;m a popover title</WuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <WuiText>
              <p>
                Selfies migas stumptown hot chicken quinoa wolf green juice,
                mumblecore tattooed trust fund hammock truffaut taxidermy kogi.
              </p>
            </WuiText>
          </div>
          <WuiPopoverFooter>
            <WuiButton fullWidth size="s">
              Manage this thing
            </WuiButton>
          </WuiPopoverFooter>
        </WuiPopover>
      </WuiFlexItem>
    </WuiFlexGroup>
  );
};
