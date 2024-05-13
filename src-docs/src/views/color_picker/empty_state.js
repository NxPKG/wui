import React, { useMemo } from 'react';

import { WuiColorPicker, WuiFormRow } from '../../../../src/components';

import { useColorPickerState } from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState();
  const isInvalid = useMemo(() => color !== '' && !!errors, [color, errors]);

  return (
    <React.Fragment>
      <WuiFormRow label="Pick a color" isInvalid={isInvalid} error={errors}>
        <WuiColorPicker
          onChange={setColor}
          color={color}
          isInvalid={isInvalid}
          placeholder="Auto"
          isClearable={true}
        />
      </WuiFormRow>
    </React.Fragment>
  );
};
