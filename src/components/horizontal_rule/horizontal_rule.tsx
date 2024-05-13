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

import { CommonProps } from '../common';

export type WuiHorizontalRuleSize = keyof typeof sizeToClassNameMap;
export type WuiHorizontalRuleMargin = keyof typeof marginToClassNameMap;

export interface WuiHorizontalRuleProps
  extends CommonProps,
    HTMLAttributes<HTMLHRElement> {
  /**
   * Defines the width of the HR.
   */
  size?: WuiHorizontalRuleSize;
  margin?: WuiHorizontalRuleMargin;
}

const sizeToClassNameMap = {
  full: 'wuiHorizontalRule--full',
  half: 'wuiHorizontalRule--half',
  quarter: 'wuiHorizontalRule--quarter',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const marginToClassNameMap = {
  none: null,
  xs: 'wuiHorizontalRule--marginXSmall',
  s: 'wuiHorizontalRule--marginSmall',
  m: 'wuiHorizontalRule--marginMedium',
  l: 'wuiHorizontalRule--marginLarge',
  xl: 'wuiHorizontalRule--marginXLarge',
  xxl: 'wuiHorizontalRule--marginXXLarge',
};

export const MARGINS = Object.keys(marginToClassNameMap);

export const WuiHorizontalRule: FunctionComponent<WuiHorizontalRuleProps> = ({
  className,
  size = 'full',
  margin = 'l',
  ...rest
}) => {
  const classes = classNames(
    'wuiHorizontalRule',
    sizeToClassNameMap[size],
    marginToClassNameMap[margin],
    className
  );

  return <hr className={classes} {...rest} />;
};
