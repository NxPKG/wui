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

import classNames from 'classnames';
import React, { Component, LiHTMLAttributes } from 'react';
import { CommonProps } from '../../common';
import { WuiI18n } from '../../i18n';
import { WuiIcon, IconColor, IconType } from '../../icon';
import { WuiSelectableOptionCheckedType } from '../selectable_option';
import { WuiScreenReaderOnly } from '../../accessibility';
import { WuiBadge, WuiBadgeProps } from '../../badge';

function resolveIconAndColor(
  checked: WuiSelectableOptionCheckedType
): { icon: IconType; color?: IconColor } {
  if (!checked) {
    return { icon: 'empty' };
  }
  return checked === 'on'
    ? { icon: 'check', color: 'text' }
    : { icon: 'cross', color: 'text' };
}

export type WuiSelectableListItemProps = LiHTMLAttributes<HTMLLIElement> &
  CommonProps & {
    children?: React.ReactNode;
    /**
     * Applies an icon and visual styling to activated items
     */
    checked?: WuiSelectableOptionCheckedType;
    /**
     * Shows icons based on `checked` type
     */
    showIcons: boolean;
    /**
     * Highlights the item for pseudo focus
     */
    isFocused?: boolean;
    disabled?: boolean;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    allowExclusions?: boolean;
    /**
     * When enabled by setting to either `true` or passing custom a custom badge,
     * shows a hollow badge as an append (far right) when the item is focused.
     * The default content when `true` is `↩ to select/deselect/include/exclude`
     */
    onFocusBadge?: boolean | WuiBadgeProps;
  };

// eslint-disable-next-line react/prefer-stateless-function
export class WuiSelectableListItem extends Component<
  WuiSelectableListItemProps
> {
  static defaultProps = {
    showIcons: true,
    onFocusBadge: true,
  };

  constructor(props: WuiSelectableListItemProps) {
    super(props);
  }

  render() {
    const {
      children,
      className,
      disabled,
      checked,
      isFocused,
      showIcons,
      prepend,
      append,
      allowExclusions,
      onFocusBadge,
      ...rest
    } = this.props;

    const classes = classNames(
      'wuiSelectableListItem',
      {
        'wuiSelectableListItem-isFocused': isFocused,
      },
      className
    );

    let optionIcon: React.ReactNode;
    if (showIcons) {
      const { icon, color } = resolveIconAndColor(checked);
      optionIcon = (
        <WuiIcon
          className="wuiSelectableListItem__icon"
          color={color}
          type={icon}
        />
      );
    }

    let state: React.ReactNode;
    let instruction: React.ReactNode;
    if (allowExclusions && checked === 'on') {
      state = (
        <WuiScreenReaderOnly>
          <span>
            <WuiI18n
              token="wuiSelectableListItem.includedOption"
              default="Included option."
            />
          </span>
        </WuiScreenReaderOnly>
      );
      instruction = (
        <WuiScreenReaderOnly>
          <span>
            <WuiI18n
              token="wuiSelectableListItem.includedOptionInstructions"
              default="To exclude this option, press enter."
            />
          </span>
        </WuiScreenReaderOnly>
      );
    } else if (allowExclusions && checked === 'off') {
      state = (
        <WuiScreenReaderOnly>
          <span>
            <WuiI18n
              token="wuiSelectableListItem.excludedOption"
              default="Excluded option."
            />
          </span>
        </WuiScreenReaderOnly>
      );
      instruction = (
        <WuiScreenReaderOnly>
          <span>
            <WuiI18n
              token="wuiSelectableListItem.excludedOptionInstructions"
              default="To deselect this option, press enter."
            />
          </span>
        </WuiScreenReaderOnly>
      );
    }

    let prependNode: React.ReactNode;
    if (prepend) {
      prependNode = (
        <span className="wuiSelectableListItem__prepend">{prepend}</span>
      );
    }

    let appendNode: React.ReactNode;
    if (append || !!onFocusBadge) {
      let onFocusBadgeNode: React.ReactNode;
      const defaultOnFocusBadgeProps: WuiBadgeProps = {
        'aria-hidden': true,
        iconType: 'returnKey',
        iconSide: 'left',
        color: 'hollow',
      };

      if (onFocusBadge === true) {
        onFocusBadgeNode = (
          <WuiBadge
            className="wuiSelectableListItem__onFocusBadge"
            {...defaultOnFocusBadgeProps}
          />
        );
      } else if (!!onFocusBadge && onFocusBadge !== false) {
        const { children, className, ...restBadgeProps } = onFocusBadge;
        onFocusBadgeNode = (
          <WuiBadge
            className={classNames(
              'wuiSelectableListItem__onFocusBadge',
              className
            )}
            {...defaultOnFocusBadgeProps}
            {...(restBadgeProps as WuiBadgeProps)}>
            {children}
          </WuiBadge>
        );
      }

      // Only display the append wrapper if append exists or isFocused
      if (append || (isFocused && !disabled)) {
        appendNode = (
          <span className="wuiSelectableListItem__append">
            {append} {isFocused && !disabled ? onFocusBadgeNode : null}
          </span>
        );
      }
    }

    return (
      <li
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="option"
        aria-selected={!disabled && typeof checked === 'string'}
        className={classes}
        aria-disabled={disabled}
        {...rest}>
        <span className="wuiSelectableListItem__content">
          {optionIcon}
          {prependNode}
          <span className="wuiSelectableListItem__text">
            {state}
            {children}
            {instruction}
          </span>
          {appendNode}
        </span>
      </li>
    );
  }
}
