import React, { Fragment, useState } from 'react';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiRange,
  WuiFormRow,
  WuiSpacer,
} from '../../../../src/components';

import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';

import {
  wuiPaletteComplimentary,
  wuiPaletteForStatus,
  wuiPaletteForTemperature,
  wuiPaletteCool,
  wuiPaletteWarm,
  wuiPaletteNegative,
  wuiPalettePositive,
  wuiPaletteGray,
} from '../../../../src/services';
const paletteData = {
  wuiPaletteForStatus,
  wuiPaletteForTemperature,
  wuiPaletteComplimentary,
  wuiPaletteNegative,
  wuiPalettePositive,
  wuiPaletteCool,
  wuiPaletteWarm,
  wuiPaletteGray,
};
const paletteNames = Object.keys(paletteData);

export default () => {
  const [length, setLength] = useState(5);

  const onLengthChange = e => {
    setLength(e.currentTarget.value);
  };

  return (
    <Fragment>
      <WuiFormRow label="Number of steps" display="columnCompressed">
        <WuiRange
          value={length}
          onChange={onLengthChange}
          min={1}
          max={20}
          compressed
          showValue
        />
      </WuiFormRow>

      <WuiSpacer />

      {paletteNames.map(paletteName => (
        <WuiFlexGroup alignItems="center" key={paletteName}>
          <WuiFlexItem grow={false}>
            <WuiFlexGroup
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              responsive={false}>
              {paletteData[paletteName](Number(length)).map(hexCode => (
                <ColorPaletteFlexItem hexCode={hexCode} key={hexCode} />
              ))}
            </WuiFlexGroup>
          </WuiFlexItem>
          <WuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`${paletteName}(${length});`}
              code={`${paletteName}(${length})`}
            />
          </WuiFlexItem>
        </WuiFlexGroup>
      ))}
    </Fragment>
  );
};
