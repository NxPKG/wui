import React, { Fragment } from 'react';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiTitle,
  WuiSpacer,
  WuiBadge,
  WuiFlexGrid,
} from '../../../../src/components';

import {
  wuiPaletteColorBlind,
  wuiPaletteColorBlindBehindText,
} from '../../../../src/services';
import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';

const customPalettes = [
  {
    title: 'Max 10 colors',
    palette: wuiPaletteColorBlind(),
    code: 'wuiPaletteColorBlind()',
  },
  {
    title: 'More than 10 colors are needed',
    palette: wuiPaletteColorBlind({ rotations: 2 }),
    code: 'wuiPaletteColorBlind({rotations: 2})',
  },
  {
    title:
      'Series may have multiple metrics and so the colors must coordinate but be distinguishable',
    palette: wuiPaletteColorBlind({
      rotations: 3,
      order: 'group',
      direction: 'both',
    }),
    code:
      "wuiPaletteColorBlind({rotations: 3, order: 'group', direction: 'both'})",
  },
  {
    title:
      "The default sort order is close but not exactly aligned with the color wheel. To sort this better add the 'natural' sort param.",
    palette: wuiPaletteColorBlind({ sortBy: 'natural' }),
    code: "wuiPaletteColorBlind({sortBy: 'natural'})",
  },
];

export default () => (
  <Fragment>
    {customPalettes.map(palette => (
      <Fragment key={palette.title}>
        <WuiTitle size="xxs">
          <h3>{palette.title}</h3>
        </WuiTitle>
        <WuiSpacer size="s" />
        <WuiFlexGroup alignItems="center">
          <WuiFlexItem grow={false} style={{ maxWidth: 240 }}>
            <WuiFlexGroup
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              alignItems="flexStart"
              responsive={false}
              wrap>
              {palette.palette.map(hexCode => (
                <ColorPaletteFlexItem
                  className="guideColorPalette__swatch--notRound"
                  hexCode={hexCode}
                  key={hexCode}
                />
              ))}
            </WuiFlexGroup>
          </WuiFlexItem>
          <WuiFlexItem>
            <ColorPaletteCopyCode code={palette.code} />
          </WuiFlexItem>
        </WuiFlexGroup>
        <WuiSpacer size="xl" />
      </Fragment>
    ))}
    <WuiTitle size="xxs">
      <h3>Behind text variant</h3>
    </WuiTitle>
    <WuiSpacer size="s" />
    <WuiFlexGroup alignItems="center">
      <WuiFlexItem grow={false} style={{ maxWidth: 240 }}>
        <WuiFlexGrid columns={4} gutterSize="s">
          {wuiPaletteColorBlindBehindText({ sortBy: 'natural' }).map(
            (color, i) => (
              <WuiFlexItem key={i} grow={false}>
                <span>
                  <WuiBadge color={color}>Text</WuiBadge>
                </span>
              </WuiFlexItem>
            )
          )}
        </WuiFlexGrid>
      </WuiFlexItem>
      <WuiFlexItem>
        <ColorPaletteCopyCode
          textToCopy={"wuiPaletteColorBlindBehindText({ sortBy: 'natural' })"}
          code={"wuiPaletteColorBlindBehindText({ sortBy: 'natural' })"}
        />
      </WuiFlexItem>
    </WuiFlexGroup>
  </Fragment>
);
