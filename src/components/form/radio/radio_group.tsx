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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../../common';

import {
  WuiFormFieldsetProps,
  WuiFormLegendProps,
  WuiFormFieldset,
} from '../form_fieldset';
import { WuiRadio, WuiRadioProps } from './radio';

export interface WuiRadioGroupOption
  extends Omit<WuiRadioProps, 'checked' | 'onChange'> {
  id: string;
}

export type WuiRadioGroupChangeCallback = (id: string, value?: string) => void;

// Must omit inherit `onChange` properties or else TS complains when applying to the WuiRadio
type AsDivProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;
type WithLegendProps = Omit<WuiFormFieldsetProps, 'onChange'> & {
  /**
   * If the individual labels for each radio do not provide a sufficient description, add a legend.
   * Wraps the group in a `WuiFormFieldset` which adds an `WuiLegend` for titling the whole group.
   * Accepts an `WuiFormLegendProps` shape.
   */
  legend?: WuiFormLegendProps;
};

export type WuiRadioGroupProps = CommonProps & {
  disabled?: boolean;
  /**
   * Tightens up the spacing between radio rows and sends down the
   * compressed prop to the radio itself
   */
  compressed?: boolean;
  name?: string;
  options: WuiRadioGroupOption[];
  idSelected?: string;
  onChange: WuiRadioGroupChangeCallback;
} & ExclusiveUnion<AsDivProps, WithLegendProps>;

export const WuiRadioGroup: FunctionComponent<WuiRadioGroupProps> = ({
  options = [],
  idSelected,
  onChange,
  name,
  className,
  disabled,
  compressed,
  legend,
  ...rest
}) => {
  const radios = options.map((option, index) => {
    const {
      disabled: isOptionDisabled,
      className: optionClass,
      id,
      label,
      ...optionRest
    } = option;
    return (
      <WuiRadio
        className={classNames('wuiRadioGroup__item', optionClass)}
        key={index}
        name={name}
        checked={id === idSelected}
        disabled={disabled || isOptionDisabled}
        onChange={onChange.bind(null, id, option.value)}
        compressed={compressed}
        id={id}
        label={label}
        {...optionRest}
      />
    );
  });

  if (!!legend) {
    // Be sure to pass down the compressed option to the legend
    legend.compressed = compressed;

    return (
      <WuiFormFieldset
        className={className}
        legend={legend}
        {...(rest as WuiFormFieldsetProps)}>
        {radios}
      </WuiFormFieldset>
    );
  }

  return (
    <div className={className} {...(rest as HTMLAttributes<HTMLDivElement>)}>
      {radios}
    </div>
  );
};
