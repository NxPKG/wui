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

export type WuiFieldTextProps = InputHTMLAttributes<HTMLInputElement> &
  CommonProps & {
    icon?: WuiFormControlLayoutProps['icon'];
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    readOnly?: boolean;
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

export const WuiFieldText: FunctionComponent<WuiFieldTextProps> = ({
  id,
  name,
  placeholder,
  value,
  className,
  icon,
  isInvalid,
  inputRef,
  fullWidth = false,
  isLoading,
  compressed,
  prepend,
  append,
  readOnly,
  controlOnly,
  ...rest
}) => {
  const classes = classNames('wuiFieldText', className, {
    'wuiFieldText--withIcon': icon,
    'wuiFieldText--fullWidth': fullWidth,
    'wuiFieldText--compressed': compressed,
    'wuiFieldText--inGroup': prepend || append,
    'wuiFieldText-isLoading': isLoading,
  });

  const control = (
    <WuiValidatableControl isInvalid={isInvalid}>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        className={classes}
        value={value}
        ref={inputRef}
        readOnly={readOnly}
        {...rest}
      />
    </WuiValidatableControl>
  );

  if (controlOnly) return control;

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
