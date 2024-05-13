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

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
  keysOf,
} from '../../common';
import { getSecureRelForTarget } from '../../../services';
import {
  WuiButtonContent,
  WuiButtonContentProps,
  WuiButtonContentType,
} from '../button_content';
import { validateHref } from '../../../services/security/href_validator';

export type WuiButtonEmptyColor =
  | 'primary'
  | 'danger'
  | 'disabled'
  | 'text'
  | 'ghost';

const colorToClassNameMap: { [color in WuiButtonEmptyColor]: string } = {
  primary: 'wuiButtonEmpty--primary',
  danger: 'wuiButtonEmpty--danger',
  disabled: 'wuiButtonEmpty--disabled',
  text: 'wuiButtonEmpty--text',
  ghost: 'wuiButtonEmpty--ghost',
};

export const COLORS = keysOf(colorToClassNameMap);

const sizeToClassNameMap = {
  xs: 'wuiButtonEmpty--xSmall',
  s: 'wuiButtonEmpty--small',
  l: 'wuiButtonEmpty--large',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type WuiButtonEmptySizes = keyof typeof sizeToClassNameMap;

const flushTypeToClassNameMap = {
  left: 'wuiButtonEmpty--flushLeft',
  right: 'wuiButtonEmpty--flushRight',
  both: 'wuiButtonEmpty--flushBoth',
};

export const FLUSH_TYPES = keysOf(flushTypeToClassNameMap);

/**
 * Extends WuiButtonContentProps which provides
 * `iconType`, `iconSide`, and `textProps`
 */
interface CommonWuiButtonEmptyProps extends WuiButtonContentProps, CommonProps {
  /**
   * Any of our named colors
   */
  color?: WuiButtonEmptyColor;
  size?: WuiButtonEmptySizes;
  /**
   * Ensure the text of the button sits flush to the left, right, or both sides of its container
   */
  flush?: keyof typeof flushTypeToClassNameMap;
  /**
   * `disabled` is also allowed
   */
  isDisabled?: boolean;
  /**
   * Force disables the button and changes the icon to a loading spinner
   */
  isLoading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  buttonRef?: (ref: HTMLButtonElement | HTMLAnchorElement | null) => void;
  /**
   * Object of props passed to the <span/> wrapping the button's content
   */
  contentProps?: WuiButtonContentType;
}

type WuiButtonEmptyPropsForAnchor = PropsForAnchor<CommonWuiButtonEmptyProps>;

type WuiButtonEmptyPropsForButton = PropsForButton<CommonWuiButtonEmptyProps>;

export type WuiButtonEmptyProps = ExclusiveUnion<
  WuiButtonEmptyPropsForAnchor,
  WuiButtonEmptyPropsForButton
>;

export const WuiButtonEmpty: FunctionComponent<WuiButtonEmptyProps> = ({
  children,
  className,
  iconType,
  iconSide = 'left',
  color = 'primary',
  size,
  flush,
  isDisabled: _isDisabled,
  disabled: _disabled,
  isLoading,
  href,
  target,
  rel,
  type = 'button',
  buttonRef,
  contentProps,
  textProps,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const disabled = _disabled || !isHrefValid;
  const isDisabled = _isDisabled || !isHrefValid;

  // If in the loading state, force disabled to true
  const buttonIsDisabled = isLoading || isDisabled || disabled;

  const classes = classNames(
    'wuiButtonEmpty',
    colorToClassNameMap[color],
    size ? sizeToClassNameMap[size] : null,
    flush ? flushTypeToClassNameMap[flush] : null,
    {
      'wuiButtonEmpty-isDisabled': buttonIsDisabled,
    },
    className
  );

  const contentClassNames = classNames(
    'wuiButtonEmpty__content',
    contentProps && contentProps.className
  );

  const textClassNames = classNames(
    'wuiButtonEmpty__text',
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

  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !buttonIsDisabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef}
        {...(rest as WuiButtonEmptyPropsForAnchor)}>
        {innerNode}
      </a>
    );
  }

  return (
    <button
      disabled={buttonIsDisabled}
      className={classes}
      type={type}
      ref={buttonRef}
      {...(rest as WuiButtonEmptyPropsForButton)}>
      {innerNode}
    </button>
  );
};
