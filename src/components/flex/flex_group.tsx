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

import React, { HTMLAttributes, Ref, forwardRef } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

export type FlexGroupAlignItems = keyof typeof alignItemsToClassNameMap;
export type FlexGroupComponentType = 'div' | 'span';
export type FlexGroupDirection = keyof typeof directionToClassNameMap;
export type FlexGroupGutterSize = keyof typeof gutterSizeToClassNameMap;
export type FlexGroupJustifyContent = keyof typeof justifyContentToClassNameMap;

export interface WuiFlexGroupProps {
  alignItems?: FlexGroupAlignItems;
  component?: FlexGroupComponentType;
  direction?: FlexGroupDirection;
  gutterSize?: FlexGroupGutterSize;
  justifyContent?: FlexGroupJustifyContent;
  responsive?: boolean;
  wrap?: boolean;
}

const gutterSizeToClassNameMap = {
  none: null,
  xs: 'wuiFlexGroup--gutterExtraSmall',
  s: 'wuiFlexGroup--gutterSmall',
  m: 'wuiFlexGroup--gutterMedium',
  l: 'wuiFlexGroup--gutterLarge',
  xl: 'wuiFlexGroup--gutterExtraLarge',
};

export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);
export type WuiFlexGroupGutterSize = keyof typeof gutterSizeToClassNameMap;

const alignItemsToClassNameMap = {
  stretch: null,
  flexStart: 'wuiFlexGroup--alignItemsFlexStart',
  flexEnd: 'wuiFlexGroup--alignItemsFlexEnd',
  center: 'wuiFlexGroup--alignItemsCenter',
  baseline: 'wuiFlexGroup--alignItemsBaseline',
};

export const ALIGN_ITEMS = keysOf(alignItemsToClassNameMap);

const justifyContentToClassNameMap = {
  flexStart: null,
  flexEnd: 'wuiFlexGroup--justifyContentFlexEnd',
  center: 'wuiFlexGroup--justifyContentCenter',
  spaceBetween: 'wuiFlexGroup--justifyContentSpaceBetween',
  spaceAround: 'wuiFlexGroup--justifyContentSpaceAround',
  spaceEvenly: 'wuiFlexGroup--justifyContentSpaceEvenly',
};

export const JUSTIFY_CONTENTS = keysOf(justifyContentToClassNameMap);

const directionToClassNameMap = {
  row: 'wuiFlexGroup--directionRow',
  rowReverse: 'wuiFlexGroup--directionRowReverse',
  column: 'wuiFlexGroup--directionColumn',
  columnReverse: 'wuiFlexGroup--directionColumnReverse',
};

export const DIRECTIONS = keysOf(directionToClassNameMap);

const isValidElement = (
  component: string
): component is FlexGroupComponentType => {
  return ['div', 'span'].includes(component);
};

export const WuiFlexGroup = forwardRef<
  HTMLDivElement | HTMLSpanElement,
  CommonProps &
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
    WuiFlexGroupProps
>(
  (
    {
      children,
      className,
      gutterSize = 'l',
      alignItems = 'stretch',
      responsive = true,
      justifyContent = 'flexStart',
      direction = 'row',
      wrap = false,
      component = 'div',
      ...rest
    },
    ref: Ref<HTMLDivElement> | Ref<HTMLSpanElement>
  ) => {
    const classes = classNames(
      'wuiFlexGroup',
      gutterSizeToClassNameMap[gutterSize as FlexGroupGutterSize],
      alignItemsToClassNameMap[alignItems as FlexGroupAlignItems],
      justifyContentToClassNameMap[justifyContent as FlexGroupJustifyContent],
      directionToClassNameMap[direction as FlexGroupDirection],
      {
        'wuiFlexGroup--responsive': responsive,
        'wuiFlexGroup--wrap': wrap,
      },
      className
    );

    if (!isValidElement(component)) {
      throw new Error(
        `${component} is not a valid element type. Use \`div\` or \`span\`.`
      );
    }

    return component === 'span' ? (
      <span
        className={classes}
        ref={ref as Ref<HTMLSpanElement>}
        {...(rest as HTMLAttributes<HTMLSpanElement>)}>
        {children}
      </span>
    ) : (
      <div
        className={classes}
        ref={ref as Ref<HTMLDivElement>}
        {...(rest as HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }
);
WuiFlexGroup.displayName = 'WuiFlexGroup';
