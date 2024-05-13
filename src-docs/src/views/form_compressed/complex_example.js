import React, { useState } from 'react';

import {
  WuiButtonGroup,
  WuiButtonIcon,
  WuiColorPicker,
  WuiColorPickerSwatch,
  WuiDualRange,
  WuiFieldNumber,
  WuiFieldText,
  WuiFlexGroup,
  WuiFlexItem,
  WuiFormLabel,
  WuiFormRow,
  WuiHorizontalRule,
  WuiIcon,
  WuiPanel,
  WuiRange,
  WuiScreenReaderOnly,
  WuiSelect,
  WuiSpacer,
  WuiSuperSelect,
  WuiToolTip,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const idPrefix = htmlIdGenerator();
  const idPrefix1 = htmlIdGenerator();

  const typeStyleToggleButtons = [
    {
      id: `${idPrefix1}3`,
      label: 'Bold',
      name: 'bold',
      iconType: 'editorBold',
    },
    {
      id: `${idPrefix1}4`,
      label: 'Italic',
      name: 'italic',
      iconType: 'editorItalic',
    },
    {
      id: `${idPrefix1}5`,
      label: 'Underline',
      name: 'underline',
      iconType: 'editorUnderline',
    },
    {
      id: `${idPrefix1}6`,
      label: 'Strikethrough',
      name: 'strikethrough',
      iconType: 'editorStrike',
    },
  ];

  const granularityToggleButtons = [
    {
      id: `${idPrefix}3`,
      label: 'fine',
    },
    {
      id: `${idPrefix}4`,
      label: 'rough',
    },
    {
      id: `${idPrefix}5`,
      label: 'coarse',
    },
  ];

  const selectTooltipContent =
    'Otherwise use an WuiToolTip around the label of the form row.';

  const [opacityValue, setOpacityValue] = useState('20');
  const [color, setColor] = useState('#D36086');
  const [popoverSliderValues, setPopoverSliderValues] = useState(16);
  const [dualValue, setDualValue] = useState([5, 10]);
  const [
    typeStyleToggleButtonsIdToSelectedMap,
    setTypeStyleToggleButtonsIdToSelectedMap,
  ] = useState({});
  const [
    granularityToggleButtonsIdSelected,
    setGranularityToggleButtonsIdSelected,
  ] = useState(`${idPrefix}4`);

  const onPopoverSliderValueChange = e => {
    setPopoverSliderValues(e.target.value);
  };

  const onColorChange = value => {
    setColor(value);
  };

  const onRangeChange = e => {
    setOpacityValue(e.target.value);
  };

  const onDualChange = value => {
    setDualValue(value);
  };

  const onTypeStyleChange = optionId => {
    const newTypeStyleToggleButtonsIdToSelectedMap = {
      ...typeStyleToggleButtonsIdToSelectedMap,
      ...{
        [optionId]: !typeStyleToggleButtonsIdToSelectedMap[optionId],
      },
    };

    setTypeStyleToggleButtonsIdToSelectedMap(
      newTypeStyleToggleButtonsIdToSelectedMap
    );
  };

  const onGranularityChange = optionId => {
    setGranularityToggleButtonsIdSelected(optionId);
  };

  return (
    <WuiPanel style={{ maxWidth: 432 }}>
      <WuiFormRow label="Name" display="columnCompressed">
        <WuiFieldText prepend="Label" placeholder="Input" compressed />
      </WuiFormRow>

      <WuiFormRow label="Visibility" display="columnCompressed">
        <WuiDualRange
          value={dualValue}
          onChange={onDualChange}
          min={0}
          max={26}
          compressed
          showInput="inputWithPopover"
          showLabels
          prepend="Zoom levels"
        />
      </WuiFormRow>

      <WuiFormRow label="Opacity" display="columnCompressed">
        <WuiRange
          min={0}
          max={100}
          name="range"
          id="range"
          showInput
          compressed
          value={opacityValue}
          onChange={onRangeChange}
          append="%"
        />
      </WuiFormRow>

      <WuiSpacer size="s" />

      <WuiScreenReaderOnly>
        <span id="docsExampleSelectTooltipContent">{selectTooltipContent}</span>
      </WuiScreenReaderOnly>
      <WuiFormRow
        label={
          <WuiToolTip content={selectTooltipContent}>
            <span>
              Label <WuiIcon type="questionInCircle" color="subdued" />
            </span>
          </WuiToolTip>
        }
        display="columnCompressed">
        <WuiSelect
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
          compressed
          aria-describedby="docsExampleSelectTooltipContent"
        />
      </WuiFormRow>

      <WuiFormRow label="Granularity" display="columnCompressed">
        <WuiButtonGroup
          legend="Granulariy of zoom levels"
          options={granularityToggleButtons}
          idSelected={granularityToggleButtonsIdSelected}
          onChange={onGranularityChange}
          buttonSize="compressed"
          isFullWidth
        />
      </WuiFormRow>

      <WuiFormRow label="Fill" display="columnCompressed">
        <WuiColorPicker onChange={onColorChange} color={color} compressed />
      </WuiFormRow>

      <WuiFormRow label="Select one" display="columnCompressed">
        <WuiSuperSelect
          options={[
            { value: 'option_one', inputDisplay: 'Option one' },
            { value: 'option_two', inputDisplay: 'Option two' },
            { value: 'option_three', inputDisplay: 'Option three' },
          ]}
          compressed
        />
      </WuiFormRow>

      <WuiFormRow label="With button" display="columnCompressed">
        <WuiFieldNumber
          min={1}
          max={100}
          defaultValue={10}
          compressed
          prepend={[
            <WuiButtonIcon
              iconType="magnet"
              aria-label="Dynamic toggle"
              title="Make dynamic"
            />,
            'wazuh_sample_ecommerce_data',
          ]}
          append="px"
        />
      </WuiFormRow>

      <WuiHorizontalRule />

      <WuiFormRow label="Container" display="columnCompressed">
        <WuiFlexGroup gutterSize="s" responsive={false} wrap>
          <WuiFlexItem grow={false}>
            <WuiColorPicker
              onChange={onColorChange}
              color={color}
              button={
                <WuiColorPickerSwatch
                  color={color}
                  aria-label="Container color"
                  title="Container color"
                  style={{ width: 32, height: 32 }}
                />
              }
            />
          </WuiFlexItem>
          <WuiFlexItem>
            <WuiRange
              showInput="inputWithPopover"
              min={0}
              max={240}
              value={popoverSliderValues}
              onChange={onPopoverSliderValueChange}
              compressed
              append="px"
              prepend="Padding"
              aria-label="Container padding in pixels"
            />
          </WuiFlexItem>
        </WuiFlexGroup>
      </WuiFormRow>

      <WuiSpacer size="s" />

      <WuiFormRow label="Label" display="columnCompressed">
        <div>
          <WuiSelect
            id="docsExampleLabelFont"
            options={[
              { value: 'inter', text: 'Inter UI' },
              { value: 'roboto', text: 'Roboto' },
              { value: 'comic', text: 'Comic sans' },
            ]}
            compressed
            prepend="Font"
            aria-label="Label font family"
          />
          <WuiSpacer size="xs" />
          <WuiFlexGroup
            gutterSize="s"
            responsive={false}
            wrap
            justifyContent="flexEnd">
            <WuiFlexItem>
              <WuiRange
                showInput="inputWithPopover"
                min={7}
                max={140}
                value={popoverSliderValues}
                onChange={onPopoverSliderValueChange}
                compressed
                append="px"
                aria-label="Label font size in pixels"
              />
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiButtonGroup
                legend="Label text style"
                className="wui-displayInlineBlock"
                options={typeStyleToggleButtons}
                idToSelectedMap={typeStyleToggleButtonsIdToSelectedMap}
                onChange={onTypeStyleChange}
                type="multi"
                isIconOnly
                buttonSize="compressed"
              />
            </WuiFlexItem>
          </WuiFlexGroup>
        </div>
      </WuiFormRow>

      <WuiSpacer size="s" />

      <WuiFormLabel htmlFor="docsExampleBorderSize">Border</WuiFormLabel>
      <WuiSpacer size="xs" />
      <WuiFlexGroup gutterSize="s" responsive={false} wrap>
        <WuiFlexItem style={{ flexBasis: 72 }}>
          <WuiRange
            id="docsExampleBorderSize"
            showInput="inputWithPopover"
            min={0}
            max={32}
            value={popoverSliderValues}
            onChange={onPopoverSliderValueChange}
            compressed
            append="px"
          />
        </WuiFlexItem>
        <WuiFlexItem grow={4} style={{ minWidth: 160 }}>
          <WuiSelect
            id="docsExampleBorderStyle"
            options={[
              { value: 'dashed', text: 'Dashed' },
              { value: 'dotted', text: 'Dotted' },
              { value: 'solid', text: 'Solid' },
            ]}
            compressed
            prepend="Style"
            aria-label="Border style"
          />
        </WuiFlexItem>
        <WuiFlexItem grow={false}>
          <WuiColorPicker
            onChange={onColorChange}
            color={color}
            button={
              <WuiColorPickerSwatch
                color={color}
                aria-label="Border color"
                title="Border color"
                style={{ width: 32, height: 32 }}
              />
            }
          />
        </WuiFlexItem>
      </WuiFlexGroup>
    </WuiPanel>
  );
};
