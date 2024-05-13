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

import React, { InputHTMLAttributes, Ref, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';

import {
  WuiFormControlLayout,
  WuiFormControlLayoutProps,
} from '../form_control_layout';

import { WuiValidatableControl } from '../validatable_control';

import { IconType } from '../../icon';

export type WuiFieldNumberProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'min' | 'max' | 'readOnly' | 'step'
> &
  CommonProps & {
    icon?: IconType;
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    readOnly?: boolean;
    min?: number;
    max?: number;
    /**
     * Specifies the granularity that the value must adhere to.
     * Accepts a `number` or the string `'any'` for no stepping to allow for any value.
     * Defaults to `1`
     */
    step?: number | 'any';
    inputRef?: Ref<HTMLInputElement>;

    /**
     * Creates an input group with element(s) coming before input.
     * `string` | `ReactElement` or an array of these
     */
    prepend?: WuiFormControlLayoutProps['prepend'];

    /**
     * Creates an input group with element(s) coming after input.
     * `string` | `ReactElement` or an array of these
     */
    append?: WuiFormControlLayoutProps['append'];

    /**
     * Completely removes form control layout wrapper and ignores
     * icon, prepend, and append. Best used inside WuiFormControlLayoutDelimited.
     */
    controlOnly?: boolean;

    /**
     * when `true` creates a shorter height input
     */
    compressed?: boolean;
  };

export const WuiFieldNumber: FunctionComponent<WuiFieldNumberProps> = ({
  className,
  icon,
  id,
  placeholder,
  name,
  min,
  max,
  value,
  isInvalid,
  fullWidth = false,
  isLoading = false,
  compressed = false,
  prepend,
  append,
  inputRef,
  readOnly,
  controlOnly,
  ...rest
}) => {
  const classes = classNames('wuiFieldNumber', className, {
    'wuiFieldNumber--withIcon': icon,
    'wuiFieldNumber--fullWidth': fullWidth,
    'wuiFieldNumber--compressed': compressed,
    'wuiFieldNumber--inGroup': prepend || append,
    'wuiFieldNumber-isLoading': isLoading,
  });

  const control = (
    <WuiValidatableControl isInvalid={isInvalid}>
      <input
        type="number"
        id={id}
        min={min}
        max={max}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className={classes}
        ref={inputRef}
        {...rest}
      />
    </WuiValidatableControl>
  );

  if (controlOnly) {
    return control;
  }

  return (
    <WuiFormControlLayout
      icon={icon}
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      readOnly={readOnly}
      prepend={prepend}
      append={append}
      inputId={id}>
      {control}
    </WuiFormControlLayout>
  );
};
