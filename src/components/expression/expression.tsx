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
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf, ExclusiveUnion } from '../common';
import { WuiIcon } from '../icon';

const colorToClassNameMap = {
  subdued: 'wuiExpression--subdued',
  primary: 'wuiExpression--primary',
  secondary: 'wuiExpression--secondary',
  accent: 'wuiExpression--accent',
  warning: 'wuiExpression--warning',
  danger: 'wuiExpression--danger',
};

const textWrapToClassNameMap = {
  'break-word': null,
  truncate: 'wuiExpression--truncate',
};

export const COLORS = keysOf(colorToClassNameMap);

export type ExpressionColor = keyof typeof colorToClassNameMap;

const displayToClassNameMap = {
  inline: null,
  columns: 'wuiExpression--columns',
};

export type WuiExpressionProps = CommonProps & {
  /**
   * First part of the expression
   */
  description: ReactNode;
  descriptionProps?: HTMLAttributes<HTMLSpanElement>;
  /**
   * Second part of the expression
   */
  value?: ReactNode;
  valueProps?: HTMLAttributes<HTMLSpanElement>;
  /**
   * Color of the `description`
   */
  color?: ExpressionColor;
  /**
   * Should the `description` auto-uppercase?
   */
  uppercase?: boolean;
  /**
   * Adds an solid border at the bottom
   */
  isActive?: boolean;
  /**
   * Turns the component into a button and adds an editable style border at the bottom
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Sets the display style for the expression. Defaults to `inline`
   */
  display?: keyof typeof displayToClassNameMap;
  /**
   * Forces color to display as `danger` and shows an `alert` icon
   */
  isInvalid?: boolean;
  /**
   * Sets a custom width for the description when using the columns layout.
   * Set to a number for a custom width in `px`.
   * Set to a string for a custom width in custom measurement.
   * Defaults to `20%`
   */
  descriptionWidth?: number | string;
  /**
   * Sets how to handle the wrapping of long text.
   */
  textWrap?: keyof typeof textWrapToClassNameMap;
};

type Buttonlike = WuiExpressionProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & {
    onClick: MouseEventHandler<HTMLButtonElement>;
  };

type Spanlike = WuiExpressionProps &
  Omit<HTMLAttributes<HTMLSpanElement>, 'value'>;

export const WuiExpression: FunctionComponent<ExclusiveUnion<
  Buttonlike,
  Spanlike
>> = ({
  className,
  description,
  descriptionProps,
  value,
  valueProps,
  color = 'secondary',
  uppercase = true,
  isActive = false,
  display = 'inline',
  descriptionWidth = '20%',
  onClick,
  isInvalid = false,
  textWrap = 'break-word',
  ...rest
}) => {
  const calculatedColor = isInvalid ? 'danger' : color;

  const classes = classNames(
    'wuiExpression',
    className,
    {
      'wuiExpression-isActive': isActive,
      'wuiExpression-isClickable': onClick,
      'wuiExpression-isUppercase': uppercase,
    },
    displayToClassNameMap[display],
    colorToClassNameMap[calculatedColor],
    textWrapToClassNameMap[textWrap]
  );

  const Component = onClick ? 'button' : 'span';

  const descriptionStyle = descriptionProps && descriptionProps.style;
  const customWidth =
    display === 'columns' && descriptionWidth
      ? {
          flexBasis: descriptionWidth,
          ...descriptionStyle,
        }
      : undefined;

  const invalidIcon = isInvalid ? (
    <WuiIcon
      className="wuiExpression__icon"
      type="alert"
      color={calculatedColor}
    />
  ) : (
    undefined
  );

  return (
    <Component className={classes} onClick={onClick} {...rest}>
      <span
        className="wuiExpression__description"
        style={customWidth}
        {...descriptionProps}>
        {description}
      </span>{' '}
      {value && (
        <span className="wuiExpression__value" {...valueProps}>
          {value}
        </span>
      )}
      {invalidIcon}
    </Component>
  );
};
