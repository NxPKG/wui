import React, { Fragment, useState } from 'react';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiRange,
  WuiFormRow,
  WuiSpacer,
} from '../../../../src/components';

import { wuiPaletteColorBlind, colorPalette } from '../../../../src/services';
import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';

const customPalettes = [
  [wuiPaletteColorBlind()[3]],
  [wuiPaletteColorBlind()[3], wuiPaletteColorBlind()[4]],
  [wuiPaletteColorBlind()[3], wuiPaletteColorBlind()[4]],
];

export default () => {
  const [length, setLength] = useState(10);

  const onLengthChange = e => {
    setLength(e.currentTarget.value);
  };

  return (
    <Fragment>
      <WuiFormRow label="Number of steps" display="columnCompressed">
        <WuiRange
          value={length}
          onChange={onLengthChange}
          min={2}
          max={20}
          compressed
          showValue
        />
      </WuiFormRow>

      <WuiSpacer />

      {customPalettes.map((palette, i) => (
        <WuiFlexGroup alignItems="center" key={i}>
          <WuiFlexItem grow={false}>
            <WuiFlexGroup
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              responsive={false}>
              {colorPalette(palette, Number(length), i > 1).map(hexCode => (
                <ColorPaletteFlexItem hexCode={hexCode} key={hexCode} />
              ))}
            </WuiFlexGroup>
          </WuiFlexItem>
          <WuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`colorPalette([], ${length}${
                i > 1 ? ', true' : ''
              });`}
              code={`colorPalette([${palette}], ${length}${
                i > 1 ? ', true' : ''
              });`}
            />
          </WuiFlexItem>
        </WuiFlexGroup>
      ))}
    </Fragment>
  );
};
