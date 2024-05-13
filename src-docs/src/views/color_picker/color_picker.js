import React from 'react';

import { WuiColorPicker, WuiFormRow } from '../../../../src/components';
import { useColorPickerState } from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState('#D36086');
  return (
    <WuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
      <WuiColorPicker onChange={setColor} color={color} isInvalid={!!errors} />
    </WuiFormRow>
  );
};
