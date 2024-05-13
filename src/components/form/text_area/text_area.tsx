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

import React, { TextareaHTMLAttributes, Ref, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';
import { WuiValidatableControl } from '../validatable_control';

export type WuiTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  CommonProps & {
    isInvalid?: boolean;
    fullWidth?: boolean;
    compressed?: boolean;

    /**
     * Which direction, if at all, should the textarea resize
     */
    resize?: keyof typeof resizeToClassNameMap;

    inputRef?: Ref<HTMLTextAreaElement>;
  };

const resizeToClassNameMap = {
  vertical: 'wuiTextArea--resizeVertical',
  horizontal: 'wuiTextArea--resizeHorizontal',
  both: 'wuiTextArea--resizeBoth',
  none: 'wuiTextArea--resizeNone',
};

export const RESIZE = Object.keys(resizeToClassNameMap);

export const WuiTextArea: FunctionComponent<WuiTextAreaProps> = ({
  children,
  className,
  compressed,
  fullWidth = false,
  id,
  inputRef,
  isInvalid,
  name,
  placeholder,
  resize = 'vertical',
  rows,
  ...rest
}) => {
  const classes = classNames(
    'wuiTextArea',
    resizeToClassNameMap[resize],
    {
      'wuiTextArea--fullWidth': fullWidth,
      'wuiTextArea--compressed': compressed,
    },
    className
  );

  let definedRows: number;

  if (rows) {
    definedRows = rows;
  } else if (compressed) {
    definedRows = 3;
  } else {
    definedRows = 6;
  }

  return (
    <WuiValidatableControl isInvalid={isInvalid}>
      <textarea
        className={classes}
        {...rest}
        rows={definedRows}
        name={name}
        id={id}
        ref={inputRef}
        placeholder={placeholder}>
        {children}
      </textarea>
    </WuiValidatableControl>
  );
};
