import React from 'react';
import { getSassVars } from '../_get_sass_vars';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiIcon,
  WuiCopy,
  WuiScreenReaderOnly,
} from '../../../../../src/components';
import { rgbToHex } from '../../../../../src/services';
import { scrollToSelector } from '../../../components/guide_page/guide_page_chrome';

export const CorePalette = ({ theme, colors }) => {
  const palette = getSassVars(theme);

  function renderPaletteColor(palette, color, index) {
    const hex = palette[color];
    const iconClass =
      color === 'wuiColorLightestShade' || color === 'wuiColorEmptyShade'
        ? 'colorGuidelines_colorPreviewTooLight'
        : undefined;

    return (
      <WuiFlexItem key={index} grow={false}>
        <WuiCopy
          title={`$${color}:
          ${rgbToHex(hex.rgba).toUpperCase()}`}
          beforeMessage={
            <small>
              <kbd>Click</kbd> to copy color name
              <br />
              <kbd>Shift + Click</kbd> to scroll to section
            </small>
          }
          afterMessage={<small>Color name copied!</small>}
          textToCopy={color}>
          {copy => (
            <button
              className="wui-isFocusable"
              onClick={e => {
                e.shiftKey ? scrollToSelector(`#${color}`) : copy();
              }}>
              <WuiIcon
                className={iconClass}
                size="xxl"
                type="stopFilled"
                color={rgbToHex(hex.rgba)}
              />
              <WuiScreenReaderOnly>
                <span>{color}</span>
              </WuiScreenReaderOnly>
            </button>
          )}
        </WuiCopy>
      </WuiFlexItem>
    );
  }

  return (
    <WuiFlexGroup
      className="guideSection__shadedBox"
      gutterSize="s"
      wrap
      responsive={false}>
      {colors.map(function(color, index) {
        return renderPaletteColor(palette, color, index);
      })}
    </WuiFlexGroup>
  );
};
