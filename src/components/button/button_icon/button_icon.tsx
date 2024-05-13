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
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  Ref,
} from 'react';
import classNames from 'classnames';

import { getSecureRelForTarget } from '../../../services';
import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
  keysOf,
} from '../../common';

import { IconType, IconSize, WuiIcon } from '../../icon';

import { ButtonSize } from '../button';
import { validateHref } from '../../../services/security/href_validator';

export type WuiButtonIconColor =
  | 'accent'
  | 'danger'
  | 'disabled'
  | 'ghost'
  | 'primary'
  | 'subdued'
  | 'success'
  | 'text'
  | 'warning';

export interface WuiButtonIconProps extends CommonProps {
  iconType?: IconType;
  color?: WuiButtonIconColor;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  isDisabled?: boolean;
  size?: ButtonSize;
  iconSize?: IconSize;
}

type WuiButtonIconPropsForAnchor = {
  type?: string;
} & PropsForAnchor<
  WuiButtonIconProps,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

export type WuiButtonIconPropsForButton = {
  type?: 'submit' | 'reset' | 'button';
} & PropsForButton<
  WuiButtonIconProps,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

type Props = ExclusiveUnion<
  WuiButtonIconPropsForAnchor,
  WuiButtonIconPropsForButton
>;

const colorToClassNameMap: { [color in WuiButtonIconColor]: string } = {
  accent: 'wuiButtonIcon--accent',
  danger: 'wuiButtonIcon--danger',
  disabled: 'wuiButtonIcon--disabled',
  ghost: 'wuiButtonIcon--ghost',
  primary: 'wuiButtonIcon--primary',
  subdued: 'wuiButtonIcon--subdued',
  success: 'wuiButtonIcon--success',
  text: 'wuiButtonIcon--text',
  warning: 'wuiButtonIcon--warning',
};

export const COLORS = keysOf(colorToClassNameMap);

export const WuiButtonIcon: FunctionComponent<Props> = ({
  className,
  iconType,
  iconSize = 'm',
  color = 'primary',
  isDisabled: _isDisabled,
  href,
  type = 'button',
  target,
  rel,
  buttonRef,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || !isHrefValid;

  const ariaHidden = rest['aria-hidden'];
  const isAriaHidden = ariaHidden === 'true' || ariaHidden === true;

  if (!rest['aria-label'] && !rest['aria-labelledby'] && !isAriaHidden) {
    console.warn(
      `WuiButtonIcon requires aria-label or aria-labelledby to be specified because icon-only
      buttons are screen-reader-inaccessible without them.`
    );
  }
  const classes = classNames(
    'wuiButtonIcon',
    colorToClassNameMap[color],
    className
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <WuiIcon
        className="wuiButtonIcon__icon"
        type={iconType}
        size={iconSize}
        aria-hidden="true"
      />
    );
  }

  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !isDisabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        tabIndex={isAriaHidden ? -1 : undefined}
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef as Ref<HTMLAnchorElement>}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {buttonIcon}
      </a>
    );
  }

  let buttonType: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  return (
    <button
      tabIndex={isAriaHidden ? -1 : undefined}
      disabled={isDisabled}
      className={classes}
      type={type as typeof buttonType}
      ref={buttonRef as Ref<HTMLButtonElement>}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {buttonIcon}
    </button>
  );
};
