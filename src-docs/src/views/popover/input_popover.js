import React, { useState } from 'react';

import {
  WuiInputPopover,
  WuiFieldText,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const [inputWidth, setInputWidth] = useState(200);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPopoverOpenTwo, setIsPopoverOpenTwo] = useState(false);
  const toggleIsPopoverOpen = (shouldBeOpen = !isPopoverOpen) => {
    setIsPopoverOpen(shouldBeOpen);
  };
  const toggleIsPopoverOpenTwo = (shouldBeOpen = !isPopoverOpenTwo) => {
    setIsPopoverOpenTwo(shouldBeOpen);
  };

  const input = (
    <WuiFieldText
      onFocus={() => toggleIsPopoverOpen()}
      aria-label="Popover attached to input element"
    />
  );

  const inputTwo = (
    <WuiFieldText
      onFocus={() => {
        setInputWidth(400);
        toggleIsPopoverOpenTwo();
      }}
      style={{ width: inputWidth }}
      aria-label="Popover attached to an adjustable sized input element"
    />
  );

  return (
    <React.Fragment>
      <WuiInputPopover
        input={input}
        isOpen={isPopoverOpen}
        closePopover={() => {
          toggleIsPopoverOpen(false);
        }}>
        Popover content
      </WuiInputPopover>

      <WuiSpacer />

      <WuiInputPopover
        input={inputTwo}
        isOpen={isPopoverOpenTwo}
        closePopover={() => {
          toggleIsPopoverOpenTwo(false);
          setInputWidth(200);
        }}>
        Popover will adjust in size as the input does
      </WuiInputPopover>

      <WuiSpacer size="xxl" />
    </React.Fragment>
  );
};
