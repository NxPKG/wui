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

import React, { PropsWithChildren, ComponentType, ComponentProps } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

type ComponentTypes = keyof JSX.IntrinsicElements | ComponentType<any>;

export type WuiPageBodyProps<T extends ComponentTypes = 'main'> = CommonProps &
  ComponentProps<T> & {
    /**
     * Sets the max-width of the page,
     * set to `true` to use the default size,
     * set to `false` to not restrict the width,
     * set to a number for a custom width in px,
     * set to a string for a custom width in custom measurement.
     */
    restrictWidth?: boolean | number | string;
    /**
     * Sets the HTML element for `WuiPageBody`.
     */
    component?: T;
  };

export const WuiPageBody = <T extends ComponentTypes>({
  children,
  restrictWidth = false,
  style,
  className,
  component: Component = 'main' as T,
  ...rest
}: PropsWithChildren<WuiPageBodyProps<T>>) => {
  let widthClassname;
  let newStyle;

  if (restrictWidth === true) {
    widthClassname = 'wuiPageBody--restrictWidth-default';
  } else if (restrictWidth !== false) {
    widthClassname = 'wuiPageBody--restrictWidth-custom';
    const value =
      typeof restrictWidth === 'number' ? `${restrictWidth}px` : restrictWidth;
    newStyle = { ...style, maxWidth: value };
  }

  const classes = classNames('wuiPageBody', widthClassname, className);

  return (
    <Component className={classes} style={newStyle || style} {...rest}>
      {children}
    </Component>
  );
};
