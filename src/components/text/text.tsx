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
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

import { TextColor, WuiTextColor } from './text_color';

import { WuiTextAlign, TextAlignment } from './text_align';

const textSizeToClassNameMap = {
  xs: 'wuiText--extraSmall',
  s: 'wuiText--small',
  m: 'wuiText--medium',
};

export type TextSize = keyof typeof textSizeToClassNameMap;

export const TEXT_SIZES = keysOf(textSizeToClassNameMap);

export type WuiTextProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    textAlign?: TextAlignment;
    size?: TextSize;
    color?: TextColor;
    grow?: boolean;
  };

export const WuiText: FunctionComponent<WuiTextProps> = ({
  size = 'm',
  color,
  grow = true,
  textAlign,
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'wuiText',
    textSizeToClassNameMap[size],
    className,
    {
      'wuiText--constrainedWidth': !grow,
    }
  );

  let optionallyAlteredText;
  if (color) {
    optionallyAlteredText = (
      <WuiTextColor color={color} component="div">
        {children}
      </WuiTextColor>
    );
  }

  if (textAlign) {
    optionallyAlteredText = (
      <WuiTextAlign textAlign={textAlign}>
        {optionallyAlteredText || children}
      </WuiTextAlign>
    );
  }

  return (
    <div className={classes} {...rest}>
      {optionallyAlteredText || children}
    </div>
  );
};
