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

import React, { FunctionComponent } from 'react';

import { PropsOf } from '../common';
import { WuiIcon, IconSize, IconType } from '../icon';
import { WuiToolTip, Props as WuiToolTipProps } from './tool_tip';

export interface WuiIconTipProps {
  /**
   * The icon color.
   */
  color?: string;
  /**
   * The icon type.
   */
  type?: IconType;
  /**
   * The icon size.
   */
  size?: IconSize;
  /**
   * Explain what this icon means for screen readers.
   */
  'aria-label'?: string;

  /**
   * Pass certain props down to `WuiIcon`
   */
  // WuiIconTip's `type` is passed to WuiIcon, so we want to exclude `type` from
  // iconProps; however, due to TS's bivariant function arguments `type` could be
  // passed without any error/feedback so we explicitly set it to `never` type
  iconProps?: Omit<PropsOf<WuiIcon>, 'type'> & { type?: never };
}

type Props = Omit<WuiToolTipProps, 'children' | 'delay' | 'position'> &
  WuiIconTipProps & {
    // This are copied from WuiToolTipProps, but made optional. Defaults
    // are applied below.
    delay?: WuiToolTipProps['delay'];
    position?: WuiToolTipProps['position'];
  };

export const WuiIconTip: FunctionComponent<Props> = ({
  type = 'questionInCircle',
  'aria-label': ariaLabel = 'Info',
  color,
  size,
  iconProps,
  position = 'top',
  delay = 'regular',
  ...rest
}) => (
  <WuiToolTip position={position} delay={delay} {...rest}>
    <WuiIcon
      tabIndex={0}
      type={type}
      color={color}
      size={size}
      aria-label={ariaLabel}
      {...iconProps}
    />
  </WuiToolTip>
);
