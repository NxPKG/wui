import React, { useContext } from 'react';
import { ThemeContext } from '../../../components';
import { getSassVars } from '../_get_sass_vars';

import {
  WuiIcon,
  WuiTitle,
  WuiCode,
  WuiSpacer,
  WuiText,
  WuiFlexGrid,
} from '../../../../../src/components';
import {
  getHexValueFromColorName,
  ColorsContrastItem,
  allowedColors,
  textVariants,
  coreColors,
  coreTextVariants,
} from './_utilities';

export const ColorSection = ({
  color,
  minimumContrast,
  showTextVariants,
  children,
}) => {
  const theme = useContext(ThemeContext).theme;
  const palette = getSassVars(theme);
  const colorsForContrast = showTextVariants ? textVariants : allowedColors;
  const hex = getHexValueFromColorName(palette, color);
  const iconClass =
    color.includes('Lightest') ||
    color.includes('Empty') ||
    color.includes('Page')
      ? 'colorGuidelines_colorPreviewTooLight'
      : undefined;

  function colorIsCore(color) {
    return coreColors.includes(color) || coreTextVariants.includes(color);
  }

  return (
    <>
      <WuiTitle size="xs">
        <h3 id={color}>
          <WuiIcon
            className={iconClass}
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            color={hex}
          />{' '}
          &ensp;
          {color}: <WuiCode>{hex}</WuiCode>
        </h3>
      </WuiTitle>

      <WuiSpacer />

      <WuiText grow={false}>{children}</WuiText>

      <WuiSpacer />

      <WuiText size="xs">
        <WuiFlexGrid
          columns={2}
          className="guideSection__shadedBox"
          direction="column"
          gutterSize="s">
          {showTextVariants && colorIsCore(color) && (
            <ColorsContrastItem
              foreground={`${color}Text`}
              background={'wuiPageBackgroundColor'}
              minimumContrast={minimumContrast}
            />
          )}

          {colorsForContrast.map(color2 => {
            if (colorIsCore(color) && colorIsCore(color2)) {
              // i.e. don't render if both are core colors
              return;
            }
            return (
              <ColorsContrastItem
                foreground={color2}
                background={color}
                key={color2}
                minimumContrast={minimumContrast}
              />
            );
          })}
        </WuiFlexGrid>
      </WuiText>
    </>
  );
};
