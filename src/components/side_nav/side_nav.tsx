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

import React, { Component, ReactNode, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { WuiIcon } from '../icon';

import { WuiSideNavItem, RenderItem } from './side_nav_item';
import { WuiSideNavItemType } from './side_nav_types';

export type WuiSideNavProps<T> = T &
  CommonProps & {
    /**
     * `children` are not rendered. Use `items` to specify navigation items instead.
     */
    children?: never;
    /**
     * Class names to be merged into the final `className` property.
     */
    className?: string;
    /**
     * When called, toggles visibility of the navigation menu at mobile responsive widths. The callback should set the `isOpenOnMobile` prop to actually toggle navigation visibility.
     */
    toggleOpenOnMobile?: MouseEventHandler<HTMLButtonElement>;
    /**
     * If `true`, the navigation menu will be open at mobile device widths. Use in conjunction with the `toggleOpenOnMobile` prop.
     */
    isOpenOnMobile?: boolean;
    /**
     * A React node to render at mobile responsive widths, representing the title of this navigation menu.
     */
    mobileTitle?: ReactNode;
    /**
     *  An array of #WuiSideNavItem objects. Lists navigation menu items.
     */
    items: Array<WuiSideNavItemType<T>>;
    /**
     * Overrides default navigation menu item rendering. When called, it should return a React node representing a replacement navigation item.
     */
    renderItem?: RenderItem<T>;
  };

export class WuiSideNav<T> extends Component<WuiSideNavProps<T>> {
  static defaultProps = {
    items: [],
  };

  isItemOpen = (item: WuiSideNavItemType<T>) => {
    // The developer can force the item to be open.
    if (item.forceOpen) {
      return true;
    }

    // Of course a selected item is open.
    if (item.isSelected) {
      return true;
    }

    // The item has to be open if it has a child that's open.
    if (item.items) {
      return item.items.some(this.isItemOpen);
    }

    return false;
  };

  renderTree = (items: Array<WuiSideNavItemType<T>>, depth = 0) => {
    const { renderItem } = this.props;

    return items.map(item => {
      const {
        id,
        name,
        isSelected,
        items: childItems,
        icon,
        onClick,
        href,
        forceOpen,
        ...rest
      } = item;

      // Root items are always open.
      const isOpen = depth === 0 ? true : this.isItemOpen(item);

      let renderedItems;

      if (childItems) {
        renderedItems = this.renderTree(childItems, depth + 1);
      }

      return (
        <WuiSideNavItem
          isOpen={isOpen}
          isSelected={isSelected}
          isParent={!!childItems}
          icon={icon}
          onClick={onClick}
          href={href}
          items={renderedItems}
          key={id}
          depth={depth}
          renderItem={renderItem}
          {...rest}>
          {name}
        </WuiSideNavItem>
      );
    });
  };

  render() {
    const {
      className,
      items,
      toggleOpenOnMobile,
      isOpenOnMobile,
      mobileTitle,
      // Extract this one out so it isn't passed to <nav>
      renderItem,
      ...rest
    } = this.props;

    const classes = classNames('wuiSideNav', className, {
      'wuiSideNav-isOpenMobile': isOpenOnMobile,
    });

    const nav = this.renderTree(items);

    return (
      <nav className={classes} {...rest}>
        {/* Hidden from view, except in mobile */}
        <button
          type="button"
          className="wuiSideNav__mobileToggle wuiLink"
          onClick={toggleOpenOnMobile}>
          <span className="wuiSideNav__mobileWrap">
            <span className="wuiSideNav__mobileTitle">{mobileTitle}</span>

            <WuiIcon
              className="wuiSideNav__mobileIcon"
              type="apps"
              size="m"
              aria-hidden="true"
            />
          </span>
        </button>

        {/* Hidden from view in mobile, but toggled from the button above */}
        <div className="wuiSideNav__content">{nav}</div>
      </nav>
    );
  }
}
