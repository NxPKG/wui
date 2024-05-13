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
  Fragment,
  FunctionComponent,
  ReactNode,
  cloneElement,
  ReactElement,
} from 'react';
import classNames from 'classnames';

import { WuiText } from '../text';
import { IconType } from '../icon';
import { CommonProps } from '../common';
import { WuiDatePickerProps } from './date_picker';

export type WuiDatePickerRangeProps = CommonProps & {
  /**
   * Including any children will replace all innards with the provided children
   */
  children?: ReactNode;

  /**
   * The end date `WuiDatePicker` element
   */
  endDateControl: ReactNode;
  fullWidth?: boolean;

  /**
   * Pass either an icon type or set to `false` to remove icon entirely
   */
  iconType?: boolean | IconType;

  /**
   * Won't apply any additional props to start and end date components
   */
  isCustom?: boolean;
  readOnly?: boolean;

  /**
   * The start date `WuiDatePicker` element
   */
  startDateControl: ReactNode;
};

export const WuiDatePickerRange: FunctionComponent<WuiDatePickerRangeProps> = ({
  children,
  className,
  startDateControl,
  endDateControl,
  iconType = true,
  fullWidth,
  isCustom,
  readOnly,
  ...rest
}) => {
  const classes = classNames(
    'wuiDatePickerRange',
    {
      'wuiDatePickerRange--fullWidth': fullWidth,
      'wuiDatePickerRange--readOnly': readOnly,
    },
    className
  );

  let startControl = startDateControl;
  let endControl = endDateControl;

  if (!isCustom) {
    startControl = cloneElement(
      startDateControl as ReactElement<WuiDatePickerProps>,
      {
        fullWidth: fullWidth,
        readOnly: readOnly,
        iconType: typeof iconType === 'boolean' ? undefined : iconType,
        showIcon: !!iconType,
      }
    );

    endControl = cloneElement(
      endDateControl as ReactElement<WuiDatePickerProps>,
      {
        showIcon: false,
        fullWidth: fullWidth,
        readOnly: readOnly,
        popoverPlacement: 'bottom-end',
      }
    );
  }

  return (
    <div className={classes} {...rest}>
      {children ? (
        children
      ) : (
        <Fragment>
          {startControl}
          <WuiText
            className="wuiDatePickerRange__delimeter"
            size="s"
            color="subdued">
            →
          </WuiText>
          {endControl}
        </Fragment>
      )}
    </div>
  );
};
