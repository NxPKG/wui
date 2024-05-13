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

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import {
  WuiRadio,
  WuiRadioProps,
  WuiCheckbox,
  WuiCheckboxProps,
} from '../../form';

interface WuiCheckableCardBaseProps {
  id: string;
  label: ReactNode;
}

// if `checkableType` is left out or set to 'radio', use WuiRadioProps
interface WuiCheckableCardAsRadioProps
  extends Omit<WuiRadioProps, 'compressed'> {
  /**
   * Whether the control is a radio button or checkbox
   */
  checkableType?: 'radio';
}

// if `checkableType` is set to 'checkbox', use WuiCheckboxProps
interface WuiCheckableCardAsCheckboxProps
  extends Omit<WuiCheckboxProps, 'compressed'> {
  checkableType: 'checkbox';
}

export type WuiCheckableCardProps = Omit<
  WuiCheckableCardAsCheckboxProps | WuiCheckableCardAsRadioProps,
  'label' | 'id'
> &
  WuiCheckableCardBaseProps;
export const WuiCheckableCard: FunctionComponent<WuiCheckableCardProps> = ({
  children,
  className,
  checkableType = 'radio',
  label,
  checked,
  disabled,
  ...rest
}) => {
  const { id } = rest;
  const classes = classNames(
    'wuiCheckableCard',
    {
      'wuiCheckableCard-isChecked': checked,
      'wuiCheckableCard-isDisabled': disabled,
    },
    className
  );

  let checkableElement;
  if (checkableType === 'radio') {
    checkableElement = (
      <WuiRadio
        checked={checked}
        disabled={disabled}
        {...(rest as WuiRadioProps)}
      />
    );
  } else {
    checkableElement = (
      <WuiCheckbox checked={checked} disabled={disabled} {...rest} />
    );
  }

  const labelClasses = classNames('wuiCheckableCard__label', {
    'wuiCheckableCard__label-isDisabled': disabled,
  });

  return (
    <div className={classes}>
      <div className="wuiCheckableCard__row">
        <div className="wuiCheckableCard__control">{checkableElement}</div>
        <label
          className={labelClasses}
          htmlFor={id}
          aria-describedby={children ? `${id}-details` : undefined}>
          {label}
        </label>
      </div>
      {children && (
        <div className="wuiCheckableCard__row">
          {/* Empty div for left side background color only */}
          <div className="wuiCheckableCard__control" />
          <div id={`${id}-details`} className="wuiCheckableCard__children">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
