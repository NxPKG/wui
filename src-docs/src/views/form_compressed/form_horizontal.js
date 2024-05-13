import React, { useState } from 'react';

import {
  WuiComboBox,
  WuiFieldText,
  WuiFormRow,
  WuiFilePicker,
  WuiRange,
  WuiSelect,
  WuiSwitch,
  WuiPanel,
} from '../../../../src/components';

export default () => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [comboBoxSelectionOptions, setComboBoxSelectionOptions] = useState([]);
  const [value, setValue] = useState('20');

  const onRangeChange = e => {
    setValue(e.target.value);
  };

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  return (
    <WuiPanel style={{ maxWidth: 300 }}>
      <WuiFormRow
        label="Text field"
        helpText="I am some friendly help text."
        display="columnCompressed">
        <WuiFieldText name="first" isLoading compressed />
      </WuiFormRow>

      <WuiFormRow label="Select" display="columnCompressed">
        <WuiSelect
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
          compressed
        />
      </WuiFormRow>

      <WuiFormRow label="File picker" display="columnCompressed">
        <WuiFilePicker compressed display="default" />
      </WuiFormRow>

      <WuiFormRow label="Comboboxwithalonglabelname" display="columnCompressed">
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

      <WuiFormRow label="Range" display="columnCompressed">
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

      <WuiFormRow display="columnCompressedSwitch" label="Switch">
        <WuiSwitch
          showLabel={false}
          label="Switch"
          name="switch"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
          compressed
        />
      </WuiFormRow>
    </WuiPanel>
  );
};
