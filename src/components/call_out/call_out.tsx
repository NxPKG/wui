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

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { IconType, WuiIcon } from '../icon';

import { WuiText } from '../text';

type Color = 'primary' | 'success' | 'warning' | 'danger';
type Size = 's' | 'm';
type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export type WuiCallOutProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> & {
    title?: ReactNode;
    iconType?: IconType;
    color?: Color;
    size?: Size;
    heading?: Heading;
  };

const colorToClassNameMap: { [color in Color]: string } = {
  primary: 'wuiCallOut--primary',
  success: 'wuiCallOut--success',
  warning: 'wuiCallOut--warning',
  danger: 'wuiCallOut--danger',
};

export const COLORS = keysOf(colorToClassNameMap);
export const HEADINGS: Heading[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

const sizeToClassNameMap: { [size in Size]: string } = {
  s: 'wuiCallOut--small',
  m: '',
};

export const WuiCallOut: FunctionComponent<WuiCallOutProps> = ({
  title,
  color = 'primary',
  size = 'm',
  iconType,
  children,
  className,
  heading,
  ...rest
}) => {
  const classes = classNames(
    'wuiCallOut',
    colorToClassNameMap[color],
    sizeToClassNameMap[size],
    className
  );

  let headerIcon;

  if (iconType) {
    headerIcon = (
      <WuiIcon
        className="wuiCallOutHeader__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  let optionalChildren;
  if (children && size === 's') {
    optionalChildren = <WuiText size="xs">{children}</WuiText>;
  } else if (children) {
    optionalChildren = <WuiText size="s">{children}</WuiText>;
  }

  const H: any = heading ? `${heading}` : 'span';
  let header;

  if (title) {
    header = (
      <div className="wuiCallOutHeader">
        {headerIcon}
        <H className="wuiCallOutHeader__title">{title}</H>
      </div>
    );
  }
  return (
    <div className={classes} {...rest}>
      {header}

      {optionalChildren}
    </div>
  );
};
