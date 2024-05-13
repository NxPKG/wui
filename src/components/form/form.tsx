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
  ReactNode,
  HTMLAttributes,
  FormHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { WuiCallOut } from '../call_out';
import { WuiI18n } from '../i18n';
import { CommonProps, ExclusiveUnion } from '../common';

export type WuiFormProps = CommonProps &
  ExclusiveUnion<
    { component: 'form' } & FormHTMLAttributes<HTMLFormElement>,
    { component?: 'div' } & HTMLAttributes<HTMLDivElement>
  > & {
    isInvalid?: boolean;
    /**
     * Which HTML element to render `div` or `form`
     */
    component?: 'form' | 'div';
    error?: ReactNode | ReactNode[];
    /**
     * Where to display the callout with the list of errors
     */
    invalidCallout?: 'above' | 'none';
  };

export const WuiForm: FunctionComponent<WuiFormProps> = ({
  children,
  className,
  isInvalid,
  error,
  component = 'div',
  invalidCallout = 'above',
  ...rest
}) => {
  const classes = classNames('wuiForm', className);

  let optionalErrors: JSX.Element | null = null;

  if (error) {
    const errorTexts = Array.isArray(error) ? error : [error];
    optionalErrors = (
      <ul>
        {errorTexts.map((error, index) => (
          <li className="wuiForm__error" key={index}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  let optionalErrorAlert;

  if (isInvalid && invalidCallout === 'above') {
    optionalErrorAlert = (
      <WuiI18n
        token="wuiForm.addressFormErrors"
        default="Please address the highlighted errors.">
        {(addressFormErrors: string) => (
          <WuiCallOut
            className="wuiForm__errors"
            title={addressFormErrors}
            color="danger">
            {optionalErrors}
          </WuiCallOut>
        )}
      </WuiI18n>
    );
  }

  const Element = component;

  return (
    <Element className={classes} {...(rest as HTMLAttributes<HTMLElement>)}>
      {optionalErrorAlert}
      {children}
    </Element>
  );
};
