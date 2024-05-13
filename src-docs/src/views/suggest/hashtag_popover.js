import React, { useState } from 'react';

import {
  WuiButton,
  WuiButtonIcon,
  WuiFlexGroup,
  WuiFlexItem,
  WuiListGroup,
  WuiListGroupItem,
  WuiPopover,
  WuiPopoverFooter,
  WuiPopoverTitle,
  WuiText,
} from '../../../../src/components';

export default props => {
  const [isPopoverOpen, setPopover] = useState(false);

  const togglePopover = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const hashtagButton = (
    <WuiButtonIcon
      onClick={togglePopover}
      size="m"
      iconSize="m"
      iconType="save"
      aria-label="Save"
    />
  );

  return (
    <WuiPopover
      id="popover"
      button={hashtagButton}
      isOpen={isPopoverOpen}
      anchorPosition="downLeft"
      panelPaddingSize="none"
      closePopover={closePopover}>
      <WuiPopoverTitle>SAVED QUERIES</WuiPopoverTitle>
      <div>
        <WuiText
          size="s"
          color="subdued"
          className="savedQueryManagement__text">
          <p>Save query text and filters that you want to use again.</p>
        </WuiText>
        <div className="savedQueryManagement__listWrapper">
          <WuiListGroup className="savedQueryManagement__list" flush={true}>
            <WuiListGroupItem
              extraAction={{
                color: 'danger',
                iconType: 'trash',
                iconSize: 's',
              }}
              href="#"
              label="Popular shoes in America"
            />
            <WuiListGroupItem
              extraAction={{
                color: 'danger',
                iconType: 'trash',
                iconSize: 's',
              }}
              href="#"
              label="Popular shirts in Canada"
            />
          </WuiListGroup>
        </div>
        {props.value !== '' ? (
          <WuiPopoverFooter>
            <WuiFlexGroup direction="rowReverse" alignItems="center">
              <WuiFlexItem grow={false}>
                <WuiButton fill>Save</WuiButton>
              </WuiFlexItem>
            </WuiFlexGroup>
          </WuiPopoverFooter>
        ) : (
          undefined
        )}
      </div>
    </WuiPopover>
  );
};
