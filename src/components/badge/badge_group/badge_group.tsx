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

import React, { forwardRef, HTMLAttributes, Ref, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';

const gutterSizeToClassNameMap = {
  none: null,
  xs: 'wuiBadgeGroup--gutterExtraSmall',
  s: 'wuiBadgeGroup--gutterSmall',
};

export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);
type BadgeGroupGutterSize = keyof typeof gutterSizeToClassNameMap;

export interface WuiBadgeGroupProps {
  /**
   * Space between badges
   */
  gutterSize?: BadgeGroupGutterSize;
  /**
   * Should be a list of WuiBadge's but can also be any other element
   * Will apply an extra class to add spacing
   */
  children?: ReactNode;
}

export const WuiBadgeGroup = forwardRef<
  HTMLDivElement,
  CommonProps & HTMLAttributes<HTMLDivElement> & WuiBadgeGroupProps
>(
  (
    { children, className, gutterSize = 'xs', ...rest },
    ref: Ref<HTMLDivElement>
  ) => {
    const classes = classNames(
      'wuiBadgeGroup',
      gutterSizeToClassNameMap[gutterSize as BadgeGroupGutterSize],
      className
    );

    return (
      <div className={classes} ref={ref} {...rest}>
        {React.Children.map(children, (child: ReactNode) => (
          <span className="wuiBadgeGroup__item">{child}</span>
        ))}
      </div>
    );
  }
);

WuiBadgeGroup.displayName = 'WuiBadgeGroup';
