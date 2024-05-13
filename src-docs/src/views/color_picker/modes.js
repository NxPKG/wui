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
  const [color, setColor, errors] = useColorPickerState('#D36086');
  const [colorStops, setColorStops] = useColorStopsState();

  return (
    <React.Fragment>
      <WuiFormRow label="Pick a swatch" isInvalid={!!errors} error={errors}>
        <WuiColorPicker
          mode="swatch"
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
        />
      </WuiFormRow>
      <WuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
        <WuiColorPicker
          mode="picker"
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
        />
      </WuiFormRow>

      <WuiSpacer />

      <WuiFormRow label="Set stops with swatches">
        <WuiColorStops
          label="Set stops with swatches"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          mode="swatch"
        />
      </WuiFormRow>

      <WuiFormRow label="Set stops with picker">
        <WuiColorStops
          label="Set stops with picker"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          mode="picker"
        />
      </WuiFormRow>
    </React.Fragment>
  );
};
