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
  HTMLAttributes,
  ProgressHTMLAttributes,
  ReactNode,
  Fragment,
} from 'react';
import classNames from 'classnames';
import { WuiI18n } from '../i18n';
import { WuiInnerText } from '../inner_text';
import { CommonProps, ExclusiveUnion } from '../common';
import { isNil } from '../../services/predicate';

const sizeToClassNameMap = {
  xs: 'wuiProgress--xs',
  s: 'wuiProgress--s',
  m: 'wuiProgress--m',
  l: 'wuiProgress--l',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export type WuiProgressSize = keyof typeof sizeToClassNameMap;

const colorToClassNameMap = {
  primary: 'wuiProgress--primary',
  secondary: 'wuiProgress--secondary',
  danger: 'wuiProgress--danger',
  subdued: 'wuiProgress--subdued',
  accent: 'wuiProgress--accent',
};

export const COLORS = Object.keys(colorToClassNameMap);

export type WuiProgressColor = keyof typeof colorToClassNameMap;

const dataColorToClassNameMap = {
  primary: 'wuiProgress__data--primary',
  secondary: 'wuiProgress__data--secondary',
  danger: 'wuiProgress__data--danger',
  subdued: 'wuiProgress__data--subdued',
  accent: 'wuiProgress__data--accent',
};

const positionsToClassNameMap = {
  fixed: 'wuiProgress--fixed',
  absolute: 'wuiProgress--absolute',
  static: '',
};

export const POSITIONS = Object.keys(positionsToClassNameMap);

export type WuiProgressPosition = keyof typeof positionsToClassNameMap;

export type WuiProgressProps = CommonProps & {
  size?: WuiProgressSize;
  color?: WuiProgressColor;
  position?: WuiProgressPosition;
};

type Indeterminate = WuiProgressProps & HTMLAttributes<HTMLDivElement>;

type Determinate = WuiProgressProps &
  Omit<ProgressHTMLAttributes<HTMLProgressElement>, 'max'> & {
    max?: number;
    /*
     * If true, will render the percentage, otherwise pass a custom node
     */
    valueText?: boolean | ReactNode;
    label?: ReactNode;
    /**
     * Object of props passed to the <span/> wrapping the determinate progress's label
     */
    labelProps?: HTMLAttributes<HTMLSpanElement>;
  };

export const WuiProgress: FunctionComponent<ExclusiveUnion<
  Determinate,
  Indeterminate
>> = ({
  className,
  color = 'secondary',
  size = 'm',
  position = 'static',
  max,
  valueText = false,
  label,
  value,
  labelProps,
  ...rest
}) => {
  const determinate = !isNil(max);
  const classes = classNames(
    'wuiProgress',
    {
      'wuiProgress--indeterminate': !determinate,
      'wuiProgress--native': determinate,
    },
    sizeToClassNameMap[size],
    colorToClassNameMap[color],
    positionsToClassNameMap[position],
    className
  );
  const dataClasses = classNames(
    'wuiProgress__data',
    {
      'wuiProgress__data--l': size === 'l',
    },
    dataColorToClassNameMap[color]
  );
  const labelClasses = classNames(
    'wuiProgress__label',
    labelProps && labelProps.className
  );

  let valueRender: ReactNode;
  if (valueText === true) {
    // valueText is true
    valueRender = (
      <WuiI18n
        token="wuiProgress.valueText"
        default="{value}%"
        values={{
          value,
        }}
      />
    );
  } else if (valueText) {
    // valueText exists
    valueRender = valueText;
  }

  // Because of a Firefox animation issue, indeterminate progress needs to not use <progress />.
  // See https://css-tricks.com/html5-progress-element/

  if (determinate) {
    return (
      <Fragment>
        {label || valueText ? (
          <div className={dataClasses}>
            {label && (
              <WuiInnerText>
                {(ref, innerText) => (
                  <span
                    title={innerText}
                    ref={ref}
                    {...labelProps}
                    className={labelClasses}>
                    {label}
                  </span>
                )}
              </WuiInnerText>
            )}
            {valueRender && (
              <WuiInnerText>
                {(ref, innerText) => (
                  <span
                    title={innerText}
                    ref={ref}
                    className="wuiProgress__valueText">
                    {valueRender}
                  </span>
                )}
              </WuiInnerText>
            )}
          </div>
        ) : (
          undefined
        )}
        <progress
          className={classes}
          max={max}
          value={value}
          aria-hidden={label && valueText ? true : false}
          {...(rest as ProgressHTMLAttributes<HTMLProgressElement>)}
        />
      </Fragment>
    );
  } else {
    return (
      <div className={classes} {...(rest as HTMLAttributes<HTMLDivElement>)} />
    );
  }
};
