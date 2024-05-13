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

import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

const titleSizeToClassNameMap = {
  xxxs: 'wuiTitle--xxxsmall',
  xxs: 'wuiTitle--xxsmall',
  xs: 'wuiTitle--xsmall',
  s: 'wuiTitle--small',
  m: 'wuiTitle--medium',
  l: 'wuiTitle--large',
};

export const TITLE_SIZES = keysOf(titleSizeToClassNameMap);
export type WuiTitleSize = keyof typeof titleSizeToClassNameMap;

const textTransformToClassNameMap = {
  uppercase: 'wuiTitle--uppercase',
};

export const TEXT_TRANSFORM = keysOf(textTransformToClassNameMap);
export type WuiTitleTextTransform = keyof typeof textTransformToClassNameMap;

export type WuiTitleProps = CommonProps & {
  /**
   * ReactElement to render as this component's content
   */
  children: ReactElement<any>;
  size?: WuiTitleSize;
  textTransform?: WuiTitleTextTransform;
  id?: string;
};

export const WuiTitle: FunctionComponent<WuiTitleProps> = ({
  size = 'm',
  children,
  className,
  textTransform,
  ...rest
}) => {
  const classes = classNames(
    'wuiTitle',
    titleSizeToClassNameMap[size],
    textTransform ? textTransformToClassNameMap[textTransform] : undefined,
    className,
    children.props.className
  );

  const props = {
    className: classes,
    ...rest,
  };

  return React.cloneElement(children, props);
};
