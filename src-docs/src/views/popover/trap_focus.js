import React, { useState } from 'react';

import {
  WuiButton,
  WuiFormRow,
  WuiPopover,
  WuiSpacer,
  WuiSwitch,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () => setIsPopoverOpen(isPopoverOpen => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <WuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Show popover
    </WuiButton>
  );

  return (
    <WuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      initialFocus="[id=asdf2]">
      <WuiFormRow
        label="Generate a public snapshot?"
        id="asdf"
        hasChildLabel={false}>
        <WuiSwitch
          name="switch"
          label="Snapshot data"
          checked={true}
          onChange={() => {}}
        />
      </WuiFormRow>

      <WuiFormRow label="Include the following in the embed" id="asdf2">
        <WuiSwitch
          name="switch"
          label="Current time range"
          checked={true}
          onChange={() => {}}
        />
      </WuiFormRow>

      <WuiSpacer />

      <WuiButton fill>Copy IFRAME code</WuiButton>
    </WuiPopover>
  );
};
