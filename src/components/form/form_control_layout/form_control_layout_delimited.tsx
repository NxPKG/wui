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
  FunctionComponent,
  ReactElement,
  cloneElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { WuiText } from '../../text';
import {
  WuiFormControlLayout,
  WuiFormControlLayoutProps,
} from './form_control_layout';

export type WuiFormControlLayoutDelimitedProps = Partial<
  WuiFormControlLayoutProps
> & {
  /**
   * Left side control
   */
  startControl: ReactElement;
  /**
   * Right side control
   */
  endControl: ReactElement;
  /**
   * The center content. Accepts a string to be wrapped in a subdued WuiText
   * or a single ReactElement
   */
  delimiter?: ReactNode;
  className?: string;
};

export const WuiFormControlLayoutDelimited: FunctionComponent<WuiFormControlLayoutDelimitedProps> = ({
  startControl,
  endControl,
  delimiter = '→',
  className,
  ...rest
}) => {
  const classes = classNames('wuiFormControlLayoutDelimited', className);

  return (
    <WuiFormControlLayout className={classes} {...rest}>
      {addClassesToControl(startControl)}
      <WuiText
        className="wuiFormControlLayoutDelimited__delimeter"
        size="s"
        color="subdued">
        {delimiter}
      </WuiText>
      {addClassesToControl(endControl)}
    </WuiFormControlLayout>
  );
};

function addClassesToControl(control: ReactElement) {
  return cloneElement(control, {
    className: classNames(
      control.props.className,
      'wuiFormControlLayoutDelimited__input'
    ),
  });
}
