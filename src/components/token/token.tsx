/*
 * Copyright 2022 Wazuh Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * NOTICE: THIS FILE HAS BEEN MODIFIED BY WAZUH INC UNDER COMPLIANCE WITH THE APACHE 2.0 LICENSE FROM THE ORIGINAL WORK
 * OF THE COMPANY Elasticsearch B.V.
 *
 * THE FOLLOWING IS THE COPYRIGHT OF THE ORIGINAL DOCUMENT:
 *
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import { defaults } from 'lodash';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { isColorDark, hexToRgb } from '../../services';

import { IconType, WuiIcon, IconSize } from '../icon';
import { WuiTokenMapType, TOKEN_MAP } from './token_map';

type TokenSize = 'xs' | 's' | 'm' | 'l';
type TokenShape = 'circle' | 'square' | 'rectangle';
type TokenFill = 'dark' | 'light' | 'none';
type TokenColor =
  | 'wuiColorVis0'
  | 'wuiColorVis1'
  | 'wuiColorVis2'
  | 'wuiColorVis3'
  | 'wuiColorVis4'
  | 'wuiColorVis5'
  | 'wuiColorVis6'
  | 'wuiColorVis7'
  | 'wuiColorVis8'
  | 'wuiColorVis9'
  | 'gray';

const sizeToClassMap: { [size in TokenSize]: string } = {
  xs: 'wuiToken--xsmall',
  s: 'wuiToken--small',
  m: 'wuiToken--medium',
  l: 'wuiToken--large',
};

export const SIZES = keysOf(sizeToClassMap);

const shapeToClassMap: { [shape in TokenShape]: string } = {
  circle: 'wuiToken--circle',
  square: 'wuiToken--square',
  rectangle: 'wuiToken--rectangle',
};

export const SHAPES = keysOf(shapeToClassMap);

const fillToClassMap: { [fill in TokenFill]: string | null } = {
  none: null,
  light: 'wuiToken--light',
  dark: 'wuiToken--dark',
};

export const FILLS = keysOf(fillToClassMap);

const colorToClassMap: { [color in TokenColor]: string } = {
  wuiColorVis0: 'wuiToken--wuiColorVis0',
  wuiColorVis1: 'wuiToken--wuiColorVis1',
  wuiColorVis2: 'wuiToken--wuiColorVis2',
  wuiColorVis3: 'wuiToken--wuiColorVis3',
  wuiColorVis4: 'wuiToken--wuiColorVis4',
  wuiColorVis5: 'wuiToken--wuiColorVis5',
  wuiColorVis6: 'wuiToken--wuiColorVis6',
  wuiColorVis7: 'wuiToken--wuiColorVis7',
  wuiColorVis8: 'wuiToken--wuiColorVis8',
  wuiColorVis9: 'wuiToken--wuiColorVis9',
  gray: 'wuiToken--gray',
};

export const COLORS = keysOf(colorToClassMap);

export interface TokenProps {
  /**
   * An WUI icon type
   */
  iconType: IconType;
  /**
   * For best results use one of the vis color names (or 'gray').
   * Or supply your own color (can be used with dark or no fill only).
   * Default: `gray`
   */
  color?: TokenColor | string;
  /**
   * Outer shape surrounding the icon
   * Default: `circle`
   */
  shape?: TokenShape;
  /**
   * `light` for lightened color with border, `dark` for solid, or `none`
   * Default: `light`
   */
  fill?: TokenFill;
  /**
   * Size of the token
   */
  size?: TokenSize;
  /**
   * The icon's title. Required for accessibility
   */
  title?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export type WuiTokenProps = CommonProps &
  TokenProps &
  Omit<HTMLAttributes<HTMLSpanElement>, 'title'>;

export const WuiToken: FunctionComponent<WuiTokenProps> = ({
  iconType,
  color,
  fill,
  shape,
  size = 's',
  style = {},
  className,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...rest
}) => {
  // Set the icon size to the same as the passed size
  // unless they passed `xs` which IconSize doesn't support
  let finalSize: IconSize = size === 'xs' ? 's' : size;

  // When displaying at the small size, the token specific icons
  // should actually be displayed at medium size
  if (
    typeof iconType === 'string' &&
    iconType.indexOf('token') === 0 &&
    size === 's'
  ) {
    finalSize = 'm';
  }

  const currentDisplay = {
    color,
    fill,
    shape,
  };
  let finalDisplay;

  // If the iconType passed is one of the prefab token types,
  // grab its properties
  if (iconType in TOKEN_MAP) {
    const tokenDisplay = TOKEN_MAP[iconType as WuiTokenMapType];
    finalDisplay = defaults(currentDisplay, tokenDisplay);
  } else {
    finalDisplay = currentDisplay;
  }

  const finalColor = finalDisplay.color || 'gray';
  const finalShape = finalDisplay.shape || 'circle';
  let finalFill = finalDisplay.fill || 'light';

  // Color can be a named space via wuiColorVis
  let colorClass;
  if (finalColor in colorToClassMap) {
    colorClass = colorToClassMap[finalColor as TokenColor];
  }
  // Or it can be a string which adds inline styles for the
  else {
    // text color if fill='none' or
    if (finalFill === 'none') {
      style.color = finalColor;
    }
    // full background color if fill='dark' and overrides fill='light' with dark
    else {
      finalFill = 'dark';
      style.backgroundColor = finalColor;
      style.color = isColorDark(...hexToRgb(finalColor))
        ? '#FFFFFF'
        : '#000000';
    }
  }

  const classes = classNames(
    'wuiToken',
    colorClass,
    shapeToClassMap[finalShape],
    fillToClassMap[finalFill],
    sizeToClassMap[size],
    className
  );

  return (
    <span className={classes} style={style} {...rest}>
      <WuiIcon
        type={iconType}
        size={finalSize}
        title={title}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
      />
    </span>
  );
};
