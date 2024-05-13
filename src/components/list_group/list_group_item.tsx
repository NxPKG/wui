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
  Fragment,
  HTMLAttributes,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  ReactElement,
  MouseEventHandler,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';

import { WuiButtonIcon, WuiButtonIconPropsForButton } from '../button';
import { WuiIcon, IconType } from '../icon';
import { WuiToolTip } from '../tool_tip';
import { useInnerText } from '../inner_text';
import { ExclusiveUnion, CommonProps } from '../common';

import { getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';

type ItemSize = 'xs' | 's' | 'm' | 'l';
const sizeToClassNameMap: { [size in ItemSize]: string } = {
  xs: 'wuiListGroupItem--xSmall',
  s: 'wuiListGroupItem--small',
  m: 'wuiListGroupItem--medium',
  l: 'wuiListGroupItem--large',
};
export const SIZES = Object.keys(sizeToClassNameMap) as ItemSize[];

type Color = 'inherit' | 'primary' | 'text' | 'subdued' | 'ghost';
const colorToClassNameMap: { [color in Color]: string } = {
  inherit: '',
  primary: 'wuiListGroupItem--primary',
  text: 'wuiListGroupItem--text',
  subdued: 'wuiListGroupItem--subdued',
  ghost: 'wuiListGroupItem--ghost',
};
export const COLORS = Object.keys(colorToClassNameMap) as Color[];

export type WuiListGroupItemProps = CommonProps &
  Omit<
    ExclusiveUnion<
      ExclusiveUnion<
        ButtonHTMLAttributes<HTMLButtonElement>,
        Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
      >,
      HTMLAttributes<HTMLSpanElement>
    >,
    'onClick' | 'color' | 'target' | 'rel'
  > & {
    /**
     * Size of the label text
     */
    size?: ItemSize;
    /**
     * By default the item will inherit the color of its wrapper (button/link/span),
     * otherwise pass one of the acceptable options
     */
    color?: Color;

    /**
     * Content to be displayed in the list item
     */
    label: ReactNode;

    /**
     * Apply styles indicating an item is active
     */
    isActive?: boolean;

    /**
     * Apply styles indicating an item is disabled
     */
    isDisabled?: boolean;

    /**
     * Make the list item label a link.
     * While permitted, `href` and `onClick` should not be used together in most cases and may create problems.
     */
    href?: string;

    target?: string;

    rel?: string;

    /**
     * Adds `WuiIcon` of `WuiIcon.type`
     */
    iconType?: IconType;

    /**
     * Custom node to pass as the icon. Cannot be used in conjunction
     * with `iconType`.
     */
    icon?: ReactElement;

    /**
     * Display tooltip on list item
     */
    showToolTip?: boolean;

    /**
     * Adds an `WuiButtonIcon` to the right side of the item; `iconType` is required;
     * pass `alwaysShow` if you don't want the default behavior of only showing on hover
     */
    extraAction?: WuiButtonIconPropsForButton & {
      alwaysShow?: boolean;
    };

    /**
     * Make the list item label a button.
     * While permitted, `href` and `onClick` should not be used together in most cases and may create problems.
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;

    /**
     * Allow link text to wrap
     */
    wrapText?: boolean;

    /**
     * Pass-through ref reference specifically for targeting
     * instances where the item content is rendered as a `button`
     */
    buttonRef?: React.Ref<HTMLButtonElement>;
  };

export const WuiListGroupItem: FunctionComponent<WuiListGroupItemProps> = ({
  label,
  isActive = false,
  isDisabled: _isDisabled = false,
  href,
  target,
  rel,
  className,
  iconType,
  icon,
  extraAction,
  onClick,
  size = 'm',
  color = 'inherit',
  showToolTip = false,
  wrapText,
  buttonRef,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || !isHrefValid;

  const classes = classNames(
    'wuiListGroupItem',
    sizeToClassNameMap[size],
    colorToClassNameMap[color],
    {
      'wuiListGroupItem-isActive': isActive,
      'wuiListGroupItem-isDisabled': isDisabled,
      'wuiListGroupItem-isClickable': href || onClick,
      'wuiListGroupItem-hasExtraAction': extraAction,
      'wuiListGroupItem--wrapText': wrapText,
    },
    className
  );

  let iconNode;

  if (iconType) {
    iconNode = <WuiIcon className="wuiListGroupItem__icon" type={iconType} />;

    if (icon) {
      console.warn(
        'Both `iconType` and `icon` were passed to WuiListGroupItem but only one can exist. The `iconType` was used.'
      );
    }
  } else if (icon) {
    iconNode = React.cloneElement(icon, {
      className: classNames('wuiListGroupItem__icon', icon.props.className),
    });
  }

  let extraActionNode;

  if (extraAction) {
    const { iconType, alwaysShow, className, ...rest } = extraAction;

    const extraActionClasses = classNames(
      'wuiListGroupItem__extraAction',
      {
        'wuiListGroupItem__extraAction-alwaysShow': alwaysShow,
      },
      className
    );

    extraActionNode = (
      <WuiButtonIcon
        className={extraActionClasses}
        iconType={iconType}
        {...rest}
        disabled={isDisabled}
      />
    );
  }

  // Only add the label as the title attribute if it's possibly truncated
  // Also ensure the value of the title attribute is a string
  const [ref, innerText] = useInnerText();
  const shouldRenderTitle = !wrapText && !showToolTip;
  const labelContent = shouldRenderTitle ? (
    <span
      ref={ref}
      className="wuiListGroupItem__label"
      title={typeof label === 'string' ? label : innerText}>
      {label}
    </span>
  ) : (
    <span className="wuiListGroupItem__label">{label}</span>
  );

  // Handle the variety of interaction behavior
  let itemContent;

  const secureRel = getSecureRelForTarget({ href, rel, target });

  if (href && !isDisabled) {
    itemContent = (
      <a
        className="wuiListGroupItem__button"
        href={href}
        target={target}
        rel={secureRel}
        onClick={onClick as AnchorHTMLAttributes<HTMLAnchorElement>['onClick']}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {iconNode}
        {labelContent}
      </a>
    );
  } else if ((href && isDisabled) || onClick) {
    itemContent = (
      <button
        type="button"
        className="wuiListGroupItem__button"
        disabled={isDisabled}
        onClick={onClick}
        ref={buttonRef}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {iconNode}
        {labelContent}
      </button>
    );
  } else {
    itemContent = (
      <span className="wuiListGroupItem__text" {...rest}>
        {iconNode}
        {labelContent}
      </span>
    );
  }

  if (showToolTip) {
    itemContent = (
      <li className={classes}>
        <WuiToolTip
          anchorClassName="wuiListGroupItem__tooltip"
          content={label}
          position="right"
          delay="long">
          {itemContent}
        </WuiToolTip>
      </li>
    );
  } else {
    itemContent = (
      <li className={classes}>
        {itemContent}
        {extraActionNode}
      </li>
    );
  }

  return <Fragment>{itemContent}</Fragment>;
};
