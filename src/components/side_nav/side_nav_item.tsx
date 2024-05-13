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
  cloneElement,
  ReactNode,
  ReactElement,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { WuiIcon } from '../icon';

import { getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';

type ItemProps = CommonProps & {
  href?: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLElement>;
  children: ReactNode;
};

interface SideNavItemProps {
  isOpen?: boolean;
  isSelected?: boolean;
  isParent?: boolean;
  icon?: ReactElement;
  items?: ReactNode;
  depth?: number;
}

type ExcludeWuiSideNavItemProps<T> = Pick<
  T,
  Exclude<keyof T, keyof SideNavItemProps | 'renderItem'>
>;
type OmitWuiSideNavItemProps<T> = {
  [K in keyof ExcludeWuiSideNavItemProps<T>]: T[K];
};

interface GuaranteedRenderItemProps {
  href?: string;
  target?: string;
  rel?: string;
  onClick?: ItemProps['onClick'];
  className: string;
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
}
export type RenderItem<T> = (
  // argument is the set of extra component props + GuaranteedRenderItemProps
  props: OmitWuiSideNavItemProps<T> & GuaranteedRenderItemProps
) => JSX.Element;

export type WuiSideNavItemProps<T> = T extends { renderItem: Function }
  ? T & { renderItem: RenderItem<T> }
  : T;

const DefaultRenderItem = ({
  href,
  target,
  rel,
  onClick,
  className,
  children,
  ...rest
}: ItemProps) => {
  if (href) {
    const secureRel = getSecureRelForTarget({ href, rel, target });
    return (
      <a
        className={className}
        href={href}
        target={target}
        rel={secureRel}
        onClick={onClick}
        {...rest}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export function WuiSideNavItem<
  T extends ItemProps &
    SideNavItemProps & { renderItem?: (props: any) => JSX.Element }
>({
  isOpen,
  isSelected,
  isParent,
  icon,
  onClick,
  href: _href,
  rel,
  target,
  items,
  children,
  renderItem: RenderItem = DefaultRenderItem,
  depth = 0,
  className,
  ...rest
}: WuiSideNavItemProps<T>) {
  const isHrefValid = !_href || validateHref(_href);
  const href = isHrefValid ? _href : '';
  let childItems;

  if (items && isOpen) {
    childItems = <div className="wuiSideNavItem__items">{items}</div>;
  }

  let buttonIcon;

  if (icon) {
    buttonIcon = cloneElement(icon, {
      className: classNames('wuiSideNavItemButton__icon', icon.props.className),
    });
  }

  const classes = classNames(
    'wuiSideNavItem',
    {
      'wuiSideNavItem--root': depth === 0,
      'wuiSideNavItem--rootIcon': depth === 0 && icon,
      'wuiSideNavItem--trunk': depth === 1,
      'wuiSideNavItem--branch': depth > 1,
      'wuiSideNavItem--hasChildItems': !!childItems,
    },
    className
  );

  const buttonClasses = classNames('wuiSideNavItemButton', {
    'wuiSideNavItemButton--isClickable': onClick || href,
    'wuiSideNavItemButton-isOpen': depth > 0 && isOpen && !isSelected,
    'wuiSideNavItemButton-isSelected': isSelected,
  });

  let caret;

  if (depth > 0 && isParent && !isOpen && !isSelected) {
    caret = <WuiIcon type="arrowDown" color="subdued" size="s" />;
  }

  const buttonContent = (
    <span className="wuiSideNavItemButton__content">
      {buttonIcon}

      <span className="wuiSideNavItemButton__label">{children}</span>

      {caret}
    </span>
  );

  const renderItemProps: GuaranteedRenderItemProps = {
    href,
    rel,
    target,
    onClick,
    className: buttonClasses,
    children: buttonContent,
  };
  return (
    <div className={classes}>
      <RenderItem {...renderItemProps} {...rest} />
      {childItems}
    </div>
  );
}
