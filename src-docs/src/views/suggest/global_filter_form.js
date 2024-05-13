import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiButtonEmpty,
  WuiFormRow,
  WuiComboBox,
  WuiButton,
  WuiSpacer,
  WuiSwitch,
  WuiFieldText,
} from '../../../../src/components';

const fieldOption = [
  {
    label: 'Fields',
    isGroupLabelOption: true,
  },
  {
    label: 'field_1',
  },
  {
    label: 'field_2',
  },
  {
    label: 'field_3',
  },
  {
    label: 'field_4',
  },
];
const operatorOption = [
  {
    label: 'Operators',
    isGroupLabelOption: true,
  },
  {
    label: 'IS',
  },
  {
    label: 'IS NOT',
  },
  {
    label: 'IS ONE OF',
  },
  {
    label: 'EXISTS',
  },
];
const valueOption = [
  {
    label: 'Values',
    isGroupLabelOption: true,
  },
  {
    label: 'Value 1',
  },
  {
    label: 'Value 2',
  },
  {
    label: 'Value 3',
  },
  {
    label: 'Value 4',
  },
];

const GlobalFilterForm = props => {
  const [fieldOptions, setFieldOptions] = useState(fieldOption);
  const [operandOptions, setOperandOptions] = useState(operatorOption);
  const [valueOptions, setValueOptions] = useState(valueOption);
  const [selectedField, setSelectedField] = useState(
    props.selectedObject ? props.selectedObject.field : []
  );
  const [selectedOperand, setSelectedOperand] = useState(
    props.selectedObject ? props.selectedObject.operand : []
  );
  const [selectedValues, setSelectedValues] = useState(
    props.selectedObject ? props.selectedObject.values : []
  );
  const [useCustomLabel, setUseCoustomLabel] = useState(false);
  const [customLabel, setCustomLabel] = useState('');

  const onFieldChange = selectedOptions => {
    // We should only get back either 0 or 1 options.
    setSelectedField(selectedOptions);
  };

  const onOperandChange = selectedOptions => {
    // We should only get back either 0 or 1 options.
    setSelectedOperand(selectedOptions);
  };

  const onValuesChange = selectedOptions => {
    setSelectedValues(selectedOptions);
  };

  const onCustomLabelSwitchChange = e => {
    setCustomLabel(e.target.checked);
  };

  const onFieldSearchChange = searchValue => {
    setFieldOptions(
      fieldOption.filter(option =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const onOperandSearchChange = searchValue => {
    setOperandOptions(
      operatorOption.filter(option =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const onValuesSearchChange = searchValue => {
    setValueOptions(
      valueOption.filter(option =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const resetForm = () => {
    setSelectedField([]);
    setSelectedOperand([]);
    setSelectedValues([]);
    setUseCoustomLabel(false);
    setCustomLabel(null);
  };

  const onCustomLabelChange = value => {
    console.log(value);
    // setCustomLabel()
  };

  const { onAdd, onCancel, selectedObject, ...rest } = props;

  return (
    <div {...rest}>
      <WuiFlexGroup>
        <WuiFlexItem style={{ maxWidth: '188px' }}>
          <WuiFormRow label="Field">
            <WuiComboBox
              placeholder={
                selectedOperand.length < 1 ? 'Start here' : 'Select a field'
              }
              options={fieldOptions}
              selectedOptions={selectedField}
              onChange={onFieldChange}
              onSearchChange={onFieldSearchChange}
              singleSelection={{ asPlainText: true }}
              isClearable={false}
            />
          </WuiFormRow>
        </WuiFlexItem>
        <WuiFlexItem style={{ maxWidth: '188px' }}>
          <WuiFormRow label="Operand">
            <WuiComboBox
              placeholder={
                selectedField.length < 1
                  ? 'Select a field first'
                  : 'Select an operand'
              }
              isDisabled={selectedField.length < 1}
              options={operandOptions}
              selectedOptions={selectedOperand}
              onChange={onOperandChange}
              onSearchChange={onOperandSearchChange}
              singleSelection={{ asPlainText: true }}
              isClearable={false}
            />
          </WuiFormRow>
        </WuiFlexItem>
      </WuiFlexGroup>

      <WuiSpacer size="m" />

      <div>
        <WuiFormRow label="Value(s)">
          <WuiComboBox
            placeholder={
              selectedField.length < 1 && selectedOperand.length < 1
                ? 'Waiting on previous selections'
                : 'Select one or more values'
            }
            isDisabled={selectedField.length < 1 || selectedOperand.length < 1}
            options={valueOptions}
            selectedOptions={selectedValues}
            onChange={onValuesChange}
            onSearchChange={onValuesSearchChange}
          />
        </WuiFormRow>
      </div>

      <WuiSpacer size="m" />

      <WuiSwitch
        label="Create custom label?"
        checked={useCustomLabel}
        onChange={onCustomLabelSwitchChange}
      />

      {useCustomLabel && (
        <div>
          <WuiSpacer size="m" />
          <WuiFormRow label="Custom label">
            <WuiFieldText value={customLabel} onChange={onCustomLabelChange} />
          </WuiFormRow>
        </div>
      )}

      <WuiSpacer size="m" />

      <WuiFlexGroup direction="rowReverse" alignItems="center">
        <WuiFlexItem grow={false}>
          <WuiButton
            isDisabled={selectedValues.length < 1}
            fill
            onClick={onAdd}>
            Add
          </WuiButton>
        </WuiFlexItem>
        <WuiFlexItem grow={false}>
          <WuiButtonEmpty
            flush="right"
            onClick={selectedObject ? onCancel : resetForm}>
            {selectedObject ? 'Cancel' : 'Reset form'}
          </WuiButtonEmpty>
        </WuiFlexItem>
        <WuiFlexItem />
        <WuiFlexItem grow={false}>
          {selectedObject && (
            <WuiButtonEmpty flush="left" color="danger">
              Delete
            </WuiButtonEmpty>
          )}
        </WuiFlexItem>
      </WuiFlexGroup>
    </div>
  );
};

GlobalFilterForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedObject: PropTypes.object,
};

export default GlobalFilterForm;
