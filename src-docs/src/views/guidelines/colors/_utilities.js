import React, { useContext } from 'react';
import { ThemeContext } from '../../../components';
import { calculateContrast, rgbToHex } from '../../../../../src/services';
import { getSassVars } from '../_get_sass_vars';

import { WuiBadge, WuiCopy, WuiFlexItem } from '../../../../../src/components';
import { WuiIcon } from '../../../../../src/components/icon';

export const coreColors = [
  'wuiColorPrimary',
  'wuiColorAccent',
  'wuiColorSuccess',
  'wuiColorWarning',
  'wuiColorDanger',
];

export const coreTextVariants = [
  'wuiColorPrimaryText',
  'wuiColorAccentText',
  'wuiColorSuccessText',
  'wuiColorWarningText',
  'wuiColorDangerText',
];

export const grayColors = [
  'wuiColorEmptyShade',
  'wuiColorLightestShade',
  'wuiColorLightShade',
  'wuiColorMediumShade',
  'wuiColorDarkShade',
  'wuiColorDarkestShade',
  'wuiColorFullShade',
];

export const textColors = [
  'wuiTextSubduedColor',
  'wuiTextColor',
  'wuiTitleColor',
  'wuiColorGhost',
  'wuiColorInk',
];

export const allowedColors = [...coreColors, ...grayColors];

export const textVariants = [...coreTextVariants, ...textColors];

export const ratingAAA = (
  <WuiBadge iconType="checkInCircleFilled" color="#000">
    AAA
  </WuiBadge>
);
export const ratingAA = (
  <WuiBadge iconType="checkInCircleFilled" color="#333">
    AA
  </WuiBadge>
);
export const ratingAA18 = (
  <WuiBadge iconType="partial" color="#666">
    AA18
  </WuiBadge>
);
export const ratingAll = <WuiBadge color="#eee">ALL</WuiBadge>;

function getContrastRatings(background, foreground, palette) {
  const contrast = calculateContrast(
    [palette[background].r, palette[background].g, palette[background].b],
    [palette[foreground].r, palette[foreground].g, palette[foreground].b]
  );

  let contrastRating;
  let contrastRatingBadge;
  if (contrast >= 7) {
    contrastRating = 'checkInCircleFilled';
    contrastRatingBadge = ratingAAA;
  } else if (contrast >= 4.5) {
    contrastRating = 'checkInCircleFilled';
    contrastRatingBadge = ratingAA;
  } else if (contrast >= 3) {
    contrastRating = 'partial';
    contrastRatingBadge = ratingAA18;
  } else if (foreground.includes('Shade') && contrast >= 2) {
    contrastRating = 'minusInCircle';
    contrastRatingBadge = <WuiIcon type="minusInCircle" />;
  } else {
    contrastRating = 'cross';
    contrastRatingBadge = <WuiIcon type="cross" />;
  }

  return { contrast, contrastRating, contrastRatingBadge };
}

export const ColorsContrastItem = ({
  foreground,
  background,
  minimumContrast,
}) => {
  const themeContext = useContext(ThemeContext);
  const palette = getSassVars(themeContext.theme);
  const contrastRatings = getContrastRatings(background, foreground, palette);

  if (!contrastRatings || contrastRatings.contrast < minimumContrast) {
    return <></>;
  }

  const { contrast, contrastRating, contrastRatingBadge } = getContrastRatings(
    background,
    foreground,
    palette
  );
  const contastIsAcceptableToCopy = contrast >= 3;
  const textToCopy = `background-color: $${background};
color: $${foreground};`;
  const beforeMessage = contastIsAcceptableToCopy ? (
    <small>
      <kbd>Click</kbd> to copy SASS configuration
    </small>
  ) : (
    <small>
      Cannot copy configuration because the contrast is not acceptable
    </small>
  );

  return (
    <WuiFlexItem className="wui-textCenter">
      <WuiCopy
        anchorClassName="wui-displayBlock"
        title={
          <span>
            {contrastRatingBadge} Contrast is {contrast.toFixed(1)}
          </span>
        }
        beforeMessage={beforeMessage}
        afterMessage={<small>Copied!</small>}
        textToCopy={textToCopy}>
        {copy => (
          <WuiBadge
            className="guideColorSection__button"
            iconType={contrastRating}
            onClick={copy}
            onClickAriaLabel="Click to copy SASS configurations"
            disabled={!contastIsAcceptableToCopy}
            style={{
              backgroundColor: palette[background].rgba,
              color: palette[foreground].rgba,
            }}>
            {foreground}
          </WuiBadge>
        )}
      </WuiCopy>
    </WuiFlexItem>
  );
};

export function getHexValueFromColorName(palette, colorName, key) {
  const hex = key ? palette[colorName][key] : palette[colorName];
  return rgbToHex(hex.rgba).toUpperCase();
}
