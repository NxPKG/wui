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

import React, { ReactNode, FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { WuiScreenReaderOnly } from '../../accessibility';
import { ToggleType } from '../../toggle';

import { WuiButtonToggle } from '../button_toggle';
import { CommonProps } from '../../common';

import { ButtonColor } from '../button';
import { ButtonContentIconSide } from '../button_content';
import { IconType } from '../../icon';

export interface WuiButtonGroupIdToSelectedMap {
  [id: string]: boolean;
}

export type GroupButtonSize = 's' | 'm' | 'compressed';

export interface WuiButtonGroupOption extends CommonProps {
  id: string;
  label: ReactNode;
  name?: string;
  isDisabled?: boolean;
  value?: any;
  iconSide?: ButtonContentIconSide;
  iconType?: IconType;
}

export interface WuiButtonGroupProps extends CommonProps {
  options?: WuiButtonGroupOption[];
  onChange: (id: string, value?: any) => void;
  /**
   * Typical sizing is `s`. Medium `m` size should be reserved for major features.
   * `compressed` is meant to be used alongside and within compressed forms.
   */
  buttonSize?: GroupButtonSize;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isIconOnly?: boolean;
  idSelected?: string;
  legend?: string;
  color?: ButtonColor;
  name?: string;
  type?: ToggleType;
  idToSelectedMap?: WuiButtonGroupIdToSelectedMap;
}

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  WuiButtonGroupProps;

export const WuiButtonGroup: FunctionComponent<Props> = ({
  className,
  buttonSize = 's',
  color = 'text',
  idSelected,
  idToSelectedMap = {},
  isDisabled,
  isFullWidth,
  isIconOnly,
  name,
  legend,
  onChange,
  options = [],
  type = 'single',
  'data-test-subj': dataTestSubj,
  ...rest
}) => {
  const classes = classNames(
    'wuiButtonGroup',
    [`wuiButtonGroup--${buttonSize}`],
    {
      'wuiButtonGroup--fullWidth': isFullWidth,
    },
    className
  );

  const fieldsetClasses = classNames('wuiButtonGroup__fieldset', {
    'wuiButtonGroup__fieldset--fullWidth': isFullWidth,
  });

  let legendNode;
  if (legend) {
    legendNode = (
      <WuiScreenReaderOnly>
        <legend>{legend}</legend>
      </WuiScreenReaderOnly>
    );
  }

  return (
    <fieldset className={fieldsetClasses}>
      {legendNode}

      <div className={classes} {...rest}>
        {options.map((option, index) => {
          const {
            id,
            name: optionName,
            value,
            isDisabled: optionDisabled,
            className,
            ...rest
          } = option;

          let isSelectedState;
          if (type === 'multi') {
            isSelectedState = idToSelectedMap[id] || false;
          } else {
            isSelectedState = id === idSelected;
          }

          let fill;
          if (buttonSize !== 'compressed') {
            fill = isSelectedState;
          }
          const buttonClasses = classNames(
            'wuiButtonGroup__button',
            {
              'wuiButtonGroup__button--selected': isSelectedState,
            },
            className
          );

          return (
            <WuiButtonToggle
              className={buttonClasses}
              toggleClassName="wuiButtonGroup__toggle"
              id={id}
              key={index}
              value={value}
              color={color}
              fill={fill}
              isDisabled={optionDisabled || isDisabled}
              isIconOnly={isIconOnly}
              isSelected={isSelectedState}
              name={optionName || name}
              onChange={() => onChange(id, value)}
              size={buttonSize === 'compressed' ? 's' : buttonSize}
              type={type}
              data-test-subj={dataTestSubj}
              {...rest}
            />
          );
        })}
      </div>
    </fieldset>
  );
};
