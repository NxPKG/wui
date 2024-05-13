import React, { useState, useRef } from 'react';

import {
  WuiButton,
  WuiCheckboxGroup,
  WuiFieldText,
  WuiForm,
  WuiFormRow,
  WuiFilePicker,
  WuiLink,
  WuiRange,
  WuiSelect,
  WuiSpacer,
  WuiSwitch,
  WuiText,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const idPrefix = useRef(htmlIdGenerator()());
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const checkboxes = [
    {
      id: `${idPrefix.current}0`,
      label: 'Option one',
    },
    {
      id: `${idPrefix.current}1`,
      label: 'Option two is checked by default',
    },
    {
      id: `${idPrefix.current}2`,
      label: 'Option three',
    },
  ];
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState({
    [`${idPrefix.current}1`]: true,
  });

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  const onCheckboxChange = optionId => {
    const newCheckboxIdToSelectedMap = {
      ...checkboxIdToSelectedMap,
      ...{
        [optionId]: !checkboxIdToSelectedMap[optionId],
      },
    };

    setCheckboxIdToSelectedMap(newCheckboxIdToSelectedMap);
  };

  return (
    <WuiForm component="form">
      <WuiFormRow label="Text field" helpText="I am some friendly help text.">
        <WuiFieldText name="first" />
      </WuiFormRow>

      <WuiFormRow
        label="Select (with no initial selection)"
        labelAppend={
          <WuiText size="xs">
            <WuiLink>Link to some help</WuiLink>
          </WuiText>
        }>
        <WuiSelect
          hasNoInitialSelection
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
        />
      </WuiFormRow>

      <WuiFormRow label="File picker">
        <WuiFilePicker />
      </WuiFormRow>

      <WuiFormRow label="Range">
        <WuiRange min={0} max={100} name="range" id="range" />
      </WuiFormRow>

      <WuiFormRow
        label="Use a switch instead of a single checkbox and set 'hasChildLabel' to false"
        hasChildLabel={false}>
        <WuiSwitch
          name="switch"
          label="Should we do this?"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
        />
      </WuiFormRow>

      <WuiSpacer />

      <WuiCheckboxGroup
        options={checkboxes}
        idToSelectedMap={checkboxIdToSelectedMap}
        onChange={onCheckboxChange}
        legend={{
          children:
            'Checkbox groups should use the `legend` prop instead of form row',
        }}
      />

      <WuiSpacer />

      <WuiButton type="submit" fill>
        Save form
      </WuiButton>
    </WuiForm>
  );
};
