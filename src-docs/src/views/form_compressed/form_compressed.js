import React, { useState } from 'react';

import {
  WuiCheckboxGroup,
  WuiComboBox,
  WuiFieldText,
  WuiFormRow,
  WuiFilePicker,
  WuiRange,
  WuiSelect,
  WuiSwitch,
  WuiPanel,
  WuiSpacer,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const idPrefix = htmlIdGenerator()();

  const [checkboxes] = useState([
    {
      id: `${idPrefix}0`,
      label: 'Option one',
    },
    {
      id: `${idPrefix}1`,
      label: 'Option two is checked by default',
    },
    {
      id: `${idPrefix}2`,
      label: 'Option three',
    },
  ]);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState({
    [`${idPrefix}1`]: true,
  });

  const [comboBoxSelectionOptions, setComboBoxSelectionOptions] = useState([]);

  const [value, setValue] = useState(20);

  const onRangeChange = e => {
    setValue(e.target.value);
  };

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
    <WuiPanel style={{ maxWidth: 300 }}>
      <WuiFormRow
        label="Text field"
        helpText="I am some friendly help text."
        display="rowCompressed">
        <WuiFieldText name="first" isLoading compressed />
      </WuiFormRow>

      <WuiFormRow label="Select" display="rowCompressed">
        <WuiSelect
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
          compressed
        />
      </WuiFormRow>

      <WuiFormRow label="File picker" display="rowCompressed">
        <WuiFilePicker compressed display="default" />
      </WuiFormRow>

      <WuiFormRow label="Combobox" display="rowCompressed">
        <WuiComboBox
          options={[
            { label: 'Option one' },
            { label: 'Option two' },
            { label: 'Option three' },
          ]}
          compressed
          selectedOptions={comboBoxSelectionOptions}
          onChange={comboBoxSelectionOptions =>
            setComboBoxSelectionOptions(comboBoxSelectionOptions)
          }
        />
      </WuiFormRow>

      <WuiFormRow label="Range" display="rowCompressed">
        <WuiRange
          min={0}
          max={100}
          name="range"
          id="range"
          showInput
          compressed
          value={value}
          onChange={onRangeChange}
        />
      </WuiFormRow>

      <WuiFormRow label="Switch" display="rowCompressed" hasChildLabel={false}>
        <WuiSwitch
          label="Should we do this?"
          name="switch"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
          compressed
        />
      </WuiFormRow>

      <WuiSpacer size="m" />

      <WuiCheckboxGroup
        options={checkboxes}
        idToSelectedMap={checkboxIdToSelectedMap}
        onChange={onCheckboxChange}
        legend={{
          children: 'Checkboxes',
        }}
        compressed
      />
    </WuiPanel>
  );
};
