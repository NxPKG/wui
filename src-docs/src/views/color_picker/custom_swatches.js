import React from 'react';

import {
  WuiColorPicker,
  WuiColorStops,
  WuiFormRow,
  WuiSpacer,
} from '../../../../src/components';

import {
  useColorPickerState,
  useColorStopsState,
} from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState();
  const [colorStops, setColorStops] = useColorStopsState();

  const customSwatches = ['#333', '#666', '#999', '#CCC'];

  return (
    <React.Fragment>
      <WuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
        <WuiColorPicker
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
          swatches={customSwatches}
        />
      </WuiFormRow>

      <WuiSpacer />

      <WuiFormRow label="Set color stops">
        <WuiColorStops
          label="Set color stops"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          swatches={customSwatches}
        />
      </WuiFormRow>
    </React.Fragment>
  );
};
