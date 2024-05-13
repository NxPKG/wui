import React, { Fragment, useState } from 'react';

import {
  WuiColorPicker,
  WuiFormRow,
  WuiColorPickerSwatch,
  WuiBadge,
  WuiSpacer,
} from '../../../../src/components';

import { useColorPickerState } from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState('');
  const [selectedColor, setSelectedColor] = useState(color);
  const handleColorChange = (text, { hex, isValid }) => {
    setColor(text, { hex, isValid });
    setSelectedColor(hex);
  };
  return (
    <Fragment>
      <WuiFormRow label="Pick a color" error={errors}>
        <WuiColorPicker
          onChange={handleColorChange}
          color={color}
          secondaryInputDisplay="top"
          button={
            <WuiColorPickerSwatch
              color={selectedColor}
              aria-label="Select a new color"
            />
          }
          isClearable={true}
        />
      </WuiFormRow>
      <WuiSpacer />
      <WuiColorPicker
        onChange={handleColorChange}
        color={color}
        isInvalid={!!errors}
        secondaryInputDisplay="bottom"
        button={
          <WuiBadge
            color={selectedColor ? selectedColor : 'hollow'}
            onClickAriaLabel="Select a new color">
            Color this badge
          </WuiBadge>
        }
      />
    </Fragment>
  );
};
