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
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

import { WuiScreenReaderOnly } from '../../accessibility';
import { htmlIdGenerator } from '../../../services/accessibility';
import {
  WuiFormControlLayout,
  WuiFormControlLayoutProps,
} from '../form_control_layout';
import { WuiI18n } from '../../i18n';

export interface WuiSuperSelectOption<T> {
  value: T;
  inputDisplay?: ReactNode;
  dropdownDisplay?: ReactNode;
  disabled?: boolean;
  'data-test-subj'?: string;
}

export interface WuiSuperSelectControlProps<T>
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  compressed?: boolean;
  fullWidth?: boolean;
  isInvalid?: boolean;
  isLoading?: boolean;
  readOnly?: boolean;

  name?: string;
  value?: T;

  options?: Array<WuiSuperSelectOption<T>>;

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
}

export const WuiSuperSelectControl: <T extends string>(
  props: WuiSuperSelectControlProps<T>
) => ReturnType<FunctionComponent<WuiSuperSelectControlProps<T>>> = ({
  className,
  options = [],
  id,
  name,
  fullWidth = false,
  isLoading = false,
  isInvalid = false,
  defaultValue,
  compressed = false,
  value,
  prepend,
  append,
  ...rest
}) => {
  const classes = classNames(
    'wuiSuperSelectControl',
    {
      'wuiSuperSelectControl--fullWidth': fullWidth,
      'wuiSuperSelectControl--compressed': compressed,
      'wuiSuperSelectControl--inGroup': prepend || append,
      'wuiSuperSelectControl-isLoading': isLoading,
      'wuiSuperSelectControl-isInvalid': isInvalid,
    },
    className
  );

  // React HTML input can not have both value and defaultValue properties.
  // https://reactjs.org/docs/uncontrolled-components.html#default-values
  let selectDefaultValue;
  if (value == null) {
    selectDefaultValue = defaultValue || '';
  }

  let selectedValue;
  if (value) {
    const selectedOption = options.find(option => option.value === value);
    selectedValue = selectedOption
      ? selectedOption.inputDisplay
      : selectedValue;
  }

  const icon: WuiFormControlLayoutProps['icon'] = {
    type: 'arrowDown',
    side: 'right',
  };

  const screenReaderId = htmlIdGenerator()();

  return (
    <Fragment>
      <input
        type="hidden"
        id={id}
        name={name}
        defaultValue={selectDefaultValue}
        value={value}
      />

      <WuiFormControlLayout
        icon={icon}
        fullWidth={fullWidth}
        isLoading={isLoading}
        compressed={compressed}
        prepend={prepend}
        append={append}>
        {/*
          This is read when the user tabs in. The comma is important,
          otherwise the screen reader often combines the text.
        */}
        <WuiScreenReaderOnly>
          <span id={screenReaderId}>
            <WuiI18n
              token="wuiSuperSelectControl.selectAnOption"
              default="Select an option: {selectedValue}, is selected"
              values={{ selectedValue }}
            />
          </span>
        </WuiScreenReaderOnly>
        <button
          type="button"
          className={classes}
          aria-haspopup="true"
          aria-labelledby={`${id} ${screenReaderId}`}
          {...rest}>
          {selectedValue}
        </button>
      </WuiFormControlLayout>
    </Fragment>
  );
};
