import React from 'react';
import { getSassVars } from '../_get_sass_vars';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiIcon,
  WuiCopy,
  WuiTitle,
  WuiText,
} from '../../../../../src/components';
import { rgbToHex } from '../../../../../src/services';

export const VisPalette = ({ variant }) => {
  const visColors = getSassVars('light').wuiPaletteColorBlind;
  const visColorKeys = Object.keys(getSassVars('light').wuiPaletteColorBlind);

  function renderPaletteColor(palette, color, index, key) {
    const hex = key ? palette[color][key] : palette[color];
    const name = key && key !== 'graphic' ? `${color}_${key}` : color;

    return (
      <WuiFlexItem key={index} grow={false}>
        <WuiFlexGroup responsive={false} alignItems="center">
          <WuiFlexItem grow={false}>
            <WuiCopy beforeMessage="Click to copy color name" textToCopy={name}>
              {copy => (
                <WuiIcon
                  onClick={copy}
                  size="xl"
                  type="stopFilled"
                  color={rgbToHex(hex.rgba)}
                />
              )}
            </WuiCopy>
          </WuiFlexItem>
          <WuiFlexItem grow={false}>
            <WuiTitle size="xxs">
              <h3>{name}</h3>
            </WuiTitle>
          </WuiFlexItem>
          <WuiFlexItem>
            <WuiText size="s" color="subdued">
              <p>
                <code>{rgbToHex(hex.rgba).toUpperCase()}</code>
              </p>
            </WuiText>
          </WuiFlexItem>
        </WuiFlexGroup>
      </WuiFlexItem>
    );
  }

  return (
    <WuiFlexGroup
      className="guideSection__shadedBox"
      direction="column"
      gutterSize="s">
      {visColorKeys.map(function(color, index) {
        return renderPaletteColor(visColors, color, index, variant);
      })}
    </WuiFlexGroup>
  );
};
