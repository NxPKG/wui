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

import React, {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

const displayToClassNameMap = {
  condensed: 'wuiTabs--condensed',
  default: null,
};

export const DISPLAYS = keysOf(displayToClassNameMap);

export type WuiTabsDisplaySizes = keyof typeof displayToClassNameMap;

const sizeToClassNameMap = {
  s: 'wuiTabs--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

export type WuiTabsSizes = keyof typeof sizeToClassNameMap;

export type WuiTabsProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * ReactNode to render as this component's content
     */
    children?: ReactNode;
    /**
     * Choose `default` or alternative `condensed` display styles
     */
    display?: WuiTabsDisplaySizes;
    /**
     * Evenly stretches each tab to fill the
     * horizontal space
     */
    expand?: boolean;
    size?: WuiTabsSizes;
  };

export type WuiTabRef = HTMLDivElement;

export const WuiTabs = forwardRef<WuiTabRef, PropsWithChildren<WuiTabsProps>>(
  (
    {
      children,
      className,
      display = 'default',
      expand = false,
      size = 'm',
      ...rest
    }: PropsWithChildren<WuiTabsProps>,
    ref
  ) => {
    const classes = classNames(
      'wuiTabs',
      displayToClassNameMap[display],
      sizeToClassNameMap[size],
      {
        'wuiTabs--expand': expand,
      },
      className
    );

    return (
      <div ref={ref} role="tablist" className={classes} {...rest}>
        {children}
      </div>
    );
  }
);

WuiTabs.displayName = 'WuiTabs';
