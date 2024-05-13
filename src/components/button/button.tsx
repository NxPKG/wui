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

import React, { FunctionComponent, Ref, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
  keysOf,
} from '../common';

import { getSecureRelForTarget } from '../../services';

import {
  WuiButtonContentProps,
  WuiButtonContentType,
  WuiButtonContent,
} from './button_content';
import { validateHref } from '../../services/security/href_validator';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | 'ghost'
  /**
   * Set for deprecation 2/26/20
   * This color button can easily be confused with disabled, it should not be used
   */
  | 'text';

export type ButtonSize = 's' | 'm';

const colorToClassNameMap: { [color in ButtonColor]: string } = {
  primary: 'wuiButton--primary',
  secondary: 'wuiButton--secondary',
  warning: 'wuiButton--warning',
  danger: 'wuiButton--danger',
  ghost: 'wuiButton--ghost',
  text: 'wuiButton--text',
};

export const COLORS = keysOf(colorToClassNameMap);

const sizeToClassNameMap: { [size in ButtonSize]: string | null } = {
  s: 'wuiButton--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

/**
 * Extends WuiButtonContentProps which provides
 * `iconType`, `iconSide`, and `textProps`
 */
export interface WuiButtonProps extends WuiButtonContentProps, CommonProps {
  /**
   * Make button a solid color for prominence
   */
  fill?: boolean;
  /**
   * Any of our named colors. `text` color is set for deprecation
   */
  color?: ButtonColor;
  /**
   * Use size `s` in confined spaces
   */
  size?: ButtonSize;
  /**
   * `disabled` is also allowed
   */
  isDisabled?: boolean;
  /**
   * Extends the button to 100% width
   */
  fullWidth?: boolean;
  /**
   * Force disables the button and changes the icon to a loading spinner
   */
  isLoading?: boolean;
  /**
   * Object of props passed to the <span/> wrapping the button's content
   */
  contentProps?: WuiButtonContentType;
}

export interface WuiButtonDisplayProps extends WuiButtonProps {
  element: 'a' | 'button' | 'span' | 'label';
}

/**
 * *INTERNAL ONLY*
 * Component for displaying any element as a button
 * WuiButton is largely responsible for providing relevant props
 * and the logic for element-specific attributes
 */
const WuiButtonDisplay = React.forwardRef<HTMLElement, WuiButtonDisplayProps>(
  (
    {
      children,
      className,
      iconType,
      iconSide = 'left',
      color = 'primary',
      size = 'm',
      fill = false,
      isDisabled,
      isLoading,
      contentProps,
      textProps,
      fullWidth,
      element = 'button',
      ...rest
    },
    ref
  ) => {
    const classes = classNames(
      'wuiButton',
      color ? colorToClassNameMap[color] : null,
      size ? sizeToClassNameMap[size] : null,
      className,
      {
        'wuiButton--fill': fill,
        'wuiButton--fullWidth': fullWidth,
        'wuiButton-isDisabled': isDisabled,
      }
    );

    const contentClassNames = classNames(
      'wuiButton__content',
      contentProps && contentProps.className
    );

    const textClassNames = classNames(
      'wuiButton__text',
      textProps && textProps.className
    );

    const innerNode = (
      <WuiButtonContent
        isLoading={isLoading}
        iconType={iconType}
        iconSide={iconSide}
        textProps={{ ...textProps, className: textClassNames }}
        {...contentProps}
        // className has to come last to override contentProps.className
        className={contentClassNames}>
        {children}
      </WuiButtonContent>
    );

    return React.createElement(
      element,
      {
        className: classes,
        ref,
        ...rest,
      },
      innerNode
    );
  }
);

WuiButtonDisplay.displayName = 'WuiButtonDisplay';
export { WuiButtonDisplay };

type WuiButtonPropsForAnchor = PropsForAnchor<
  WuiButtonProps,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

type WuiButtonPropsForButton = PropsForButton<
  WuiButtonProps,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

export type Props = ExclusiveUnion<
  WuiButtonPropsForAnchor,
  WuiButtonPropsForButton
>;

export const WuiButton: FunctionComponent<Props> = ({
  isDisabled: _isDisabled,
  disabled: _disabled,
  href,
  target,
  rel,
  type = 'button',
  buttonRef,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const disabled = _disabled || !isHrefValid;
  const isDisabled = _isDisabled || !isHrefValid;

  const buttonIsDisabled = rest.isLoading || isDisabled || disabled;
  const element = href && !isDisabled ? 'a' : 'button';

  let elementProps = {};
  // Props for all elements
  elementProps = { ...elementProps, isDisabled: buttonIsDisabled };
  // Element-specific attributes
  if (element === 'button') {
    elementProps = { ...elementProps, disabled: buttonIsDisabled };
  }

  const relObj: {
    rel?: string;
    href?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    target?: string;
  } = {};

  if (href && !buttonIsDisabled) {
    relObj.href = href;
    relObj.rel = getSecureRelForTarget({ href, target, rel });
    relObj.target = target;
  } else {
    relObj.type = type as ButtonHTMLAttributes<HTMLButtonElement>['type'];
  }

  return (
    <WuiButtonDisplay
      element={element}
      ref={buttonRef}
      {...elementProps}
      {...relObj}
      {...rest}
    />
  );
};
