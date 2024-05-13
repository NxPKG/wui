import React, { useState } from 'react';

import {
  WuiButton,
  WuiPopover,
  WuiForm,
  WuiFormRow,
  WuiFieldText,
  WuiFlexGroup,
  WuiFlexItem,
  WuiFieldNumber,
  WuiRange,
  WuiSpacer,
  WuiSwitch,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPopover2Open, setIsPopover2Open] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  const onButton2Click = () => {
    setIsPopover2Open(!isPopover2Open);
  };

  const closePopover2 = () => {
    setIsPopover2Open(false);
  };

  const button = (
    <WuiButton
      iconSide="right"
      fill
      iconType="arrowDown"
      onClick={onButtonClick}>
      Inline form in a popover
    </WuiButton>
  );

  const formSample = (
    <WuiForm>
      <WuiFlexGroup>
        <WuiFlexItem grow={false} style={{ width: 100 }}>
          <WuiFormRow label="Age">
            <WuiFieldNumber max={10} placeholder={42} />
          </WuiFormRow>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiFormRow label="Full name">
            <WuiFieldText icon="user" placeholder="John Doe" />
          </WuiFormRow>
        </WuiFlexItem>
        <WuiFlexItem grow={false}>
          <WuiFormRow hasEmptyLabelSpace>
            <WuiButton>Save</WuiButton>
          </WuiFormRow>
        </WuiFlexItem>
      </WuiFlexGroup>
    </WuiForm>
  );

  const button2 = (
    <WuiButton
      iconSide="right"
      fill
      iconType="arrowDown"
      onClick={onButton2Click}>
      Vertical form in a popover
    </WuiButton>
  );

  const formSample2 = (
    <WuiForm>
      <WuiFormRow>
        <WuiSwitch
          id={htmlIdGenerator()()}
          name="popswitch"
          label="Isn't this popover form cool?"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
        />
      </WuiFormRow>

      <WuiFormRow label="A text field">
        <WuiFieldText name="popfirst" />
      </WuiFormRow>

      <WuiFormRow label="Range" helpText="Some help text for the range">
        <WuiRange min={0} max={100} name="poprange" />
      </WuiFormRow>

      <WuiSpacer />
      <WuiButton fullWidth>Save</WuiButton>
    </WuiForm>
  );

  return (
    <div>
      <WuiPopover
        id="inlineFormPopover"
        ownFocus
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}>
        <div style={{ width: 500 }}>{formSample}</div>
      </WuiPopover>
      &emsp;
      <WuiPopover
        id="formPopover"
        ownFocus
        button={button2}
        isOpen={isPopover2Open}
        closePopover={closePopover2}>
        <div style={{ width: '300px' }}>{formSample2}</div>
      </WuiPopover>
    </div>
  );
};
