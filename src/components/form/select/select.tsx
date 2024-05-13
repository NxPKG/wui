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
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  Ref,
  FunctionComponent,
} from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';
import {
  WuiFormControlLayout,
  WuiFormControlLayoutProps,
} from '../form_control_layout';
import { WuiValidatableControl } from '../validatable_control';
import { WuiFormControlLayoutIconsProps } from '../form_control_layout/form_control_layout_icons';

export interface WuiSelectOption
  extends OptionHTMLAttributes<HTMLOptionElement> {
  text: React.ReactNode;
}

export type WuiSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'value'
> &
  CommonProps & {
    options?: WuiSelectOption[];
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;

    /**
     * Simulates no selection by creating an empty, selected, hidden first option
     */
    hasNoInitialSelection?: boolean;
    inputRef?: Ref<HTMLSelectElement>;
    value?: string | number;

    /**
     * when `true` creates a shorter height input
     */
    compressed?: boolean;

    /**
     * Creates an input group with element(s) coming before select.
     * `string` | `ReactElement` or an array of these
     */
    prepend?: WuiFormControlLayoutProps['prepend'];
    /**
     * Creates an input group with element(s) coming after select.
     * `string` | `ReactElement` or an array of these
     */
    append?: WuiFormControlLayoutProps['append'];
  };

export const WuiSelect: FunctionComponent<WuiSelectProps> = ({
  className,
  options = [],
  id,
  name,
  inputRef,
  isInvalid,
  fullWidth = false,
  isLoading = false,
  hasNoInitialSelection = false,
  defaultValue,
  compressed = false,
  value,
  prepend,
  append,
  onMouseUp,
  ...rest
}) => {
  const handleMouseUp = (e: React.MouseEvent<HTMLSelectElement>) => {
    // Normalizes cross-browser mouse eventing by preventing propagation,
    // notably for use in conjunction with WuiOutsideClickDetector.
    // See https://github.com/wazuh/wui/pull/1926 for full discussion on
    // rationale and alternatives should this intervention become problematic.
    e.nativeEvent.stopImmediatePropagation();
    if (onMouseUp) onMouseUp(e);
  };

  const classes = classNames(
    'wuiSelect',
    {
      'wuiSelect--fullWidth': fullWidth,
      'wuiSelect--compressed': compressed,
      'wuiSelect--inGroup': prepend || append,
      'wuiSelect-isLoading': isLoading,
    },
    className
  );

  let emptyOptionNode;
  if (hasNoInitialSelection) {
    emptyOptionNode = (
      <option value="" disabled hidden style={{ display: 'none' }}>
        &nbsp;
      </option>
    );
  }

  // React HTML input can not have both value and defaultValue properties.
  // https://reactjs.org/docs/uncontrolled-components.html#default-values
  let selectDefaultValue;
  if (value == null) {
    selectDefaultValue = defaultValue || '';
  }

  const icon: WuiFormControlLayoutIconsProps['icon'] = {
    type: 'arrowDown',
    side: 'right',
  };

  return (
    <WuiFormControlLayout
      icon={icon}
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      prepend={prepend}
      append={append}
      inputId={id}>
      <WuiValidatableControl isInvalid={isInvalid}>
        <select
          id={id}
          name={name}
          className={classes}
          ref={inputRef}
          defaultValue={selectDefaultValue}
          value={value}
          onMouseUp={handleMouseUp}
          {...rest}>
          {emptyOptionNode}
          {options.map((option, index) => {
            const { text, ...rest } = option;
            return (
              <option {...rest} key={index}>
                {text}
              </option>
            );
          })}
        </select>
      </WuiValidatableControl>
    </WuiFormControlLayout>
  );
};
