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

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';

import { isColorDark, hexToRgb, isValidHex } from '../../services/color';
import { wuiPaletteColorBlindBehindText, toInitials } from '../../services';

const sizeToClassNameMap = {
  none: null,
  s: 'wuiAvatar--s',
  m: 'wuiAvatar--m',
  l: 'wuiAvatar--l',
  xl: 'wuiAvatar--xl',
};

export const SIZES = keysOf(sizeToClassNameMap);
export type WuiAvatarSize = keyof typeof sizeToClassNameMap;

const typeToClassNameMap = {
  space: 'wuiAvatar--space',
  user: 'wuiAvatar--user',
};

export const TYPES = keysOf(typeToClassNameMap);
export type WuiAvatarType = keyof typeof typeToClassNameMap;

export type WuiAvatarProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> &
  CommonProps & {
    /**
     * Full name of avatar for title attribute and calculating initial if not provided
     */
    name: string;

    /**
     * Accepts hex value `#FFFFFF`, `#000` otherwise a viz palette color will be assigned
     */
    color?: string;

    /**
     * Custom initials (max 2 characters).
     * By default will take the first character (of each word).
     */
    initials?: string;

    /**
     * Specify how many characters to show (max 2 allowed).
     * By default, will show based on number of words.
     */
    initialsLength?: 1 | 2;

    /**
     * The type of avatar this is displaying
     */
    type?: WuiAvatarType;
    imageUrl?: string;
    size?: WuiAvatarSize;
  };

export const WuiAvatar: FunctionComponent<WuiAvatarProps> = ({
  className,
  color,
  imageUrl,
  initials,
  initialsLength,
  name,
  size = 'm',
  type = 'user',
  ...rest
}) => {
  const visColors = wuiPaletteColorBlindBehindText();

  const classes = classNames(
    'wuiAvatar',
    sizeToClassNameMap[size],
    typeToClassNameMap[type],
    className
  );

  checkValidColor(color);
  checkValidInitials(initials);

  let optionalInitial;
  if (name && !imageUrl) {
    // Create the initials
    const calculatedInitials = toInitials(name, initialsLength, initials);
    optionalInitial = <span aria-hidden="true">{calculatedInitials}</span>;
  }

  const assignedColor =
    color || visColors[Math.floor(name.length % visColors.length)];
  const textColor = isColorDark(...hexToRgb(assignedColor))
    ? '#FFFFFF'
    : '#000000';

  const avatarStyle = {
    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
    backgroundColor: assignedColor,
    color: textColor,
  };

  return (
    <div
      className={classes}
      style={avatarStyle}
      aria-label={name}
      title={name}
      {...rest}>
      {optionalInitial}
    </div>
  );
};

// TODO: Migrate to a service
export const checkValidColor = (color: WuiAvatarProps['color']) => {
  const validHex = color && isValidHex(color);
  if (color && !validHex) {
    throw new Error(
      'WuiAvatar needs to pass a valid color. This can either be a three ' +
        'or six character hex value'
    );
  }
};

function checkValidInitials(initials: WuiAvatarProps['initials']) {
  // Must be a string of 1 or 2 characters
  if (initials && initials.length > 2) {
    console.warn(
      'WuiAvatar only accepts a max of 2 characters for the initials as a string. It is displaying only the first 2 characters.'
    );
  }
}
