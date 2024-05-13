import React from 'react';

import { WuiColorPicker, WuiFormRow } from '../../../../src/components';
import { useColorPickerState } from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState('#D36086');
  const [color2, setColor2, errors2] = useColorPickerState('#D36086');
  const [color3, setColor3, errors3] = useColorPickerState('211, 96, 134');
  return (
    <>
      <WuiFormRow label="Auto format" isInvalid={!!errors} error={errors}>
        <WuiColorPicker
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
        />
      </WuiFormRow>
      <WuiFormRow label="Hex format" isInvalid={!!errors2} error={errors2}>
        <WuiColorPicker
          format="hex"
          onChange={setColor2}
          color={color2}
          isInvalid={!!errors2}
        />
      </WuiFormRow>
      <WuiFormRow label="RGB(a) format" isInvalid={!!errors3} error={errors3}>
        <WuiColorPicker
          format="rgba"
          onChange={setColor3}
          color={color3}
          isInvalid={!!errors3}
          showAlpha={true}
        />
      </WuiFormRow>
    </>
  );
};
