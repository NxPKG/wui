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
import { CommonProps } from '../../common';

import { WuiI18n } from '../../i18n';
import { WuiListGroup, WuiListGroupProps } from '../list_group';
import { WuiListGroupItemProps } from '../list_group_item';

const pinExtraAction: WuiListGroupItemProps['extraAction'] = {
  color: 'primary',
  iconType: 'pinFilled',
  iconSize: 's',
  className: 'wuiPinnableListGroup__itemExtraAction',
};

const pinnedExtraAction: WuiListGroupItemProps['extraAction'] = {
  color: 'primary',
  iconType: 'pinFilled',
  iconSize: 's',
  className:
    'wuiPinnableListGroup__itemExtraAction wuiPinnableListGroup__itemExtraAction-pinned',
  alwaysShow: true,
};

export type WuiPinnableListGroupItemProps = WuiListGroupItemProps & {
  /**
   * Saves the pinned status and changes the visibility of the pin icon
   */
  pinned?: boolean;
  /**
   * Passing `onPinClick` to the full WuiPinnableListGroup, will make every item pinnable.
   * Set this property to `false` to turn off individual item pinnability
   */
  pinnable?: boolean;
};

export interface WuiPinnableListGroupProps
  extends CommonProps,
    WuiListGroupProps {
  /**
   * Extends `WuiListGroupItemProps`, at the very least, expecting a `label`.
   * See #WuiPinnableListGroupItem
   */
  listItems: WuiPinnableListGroupItemProps[];
  /**
   * Shows the pin icon and calls this function on click.
   * Returns `item: WuiPinnableListGroupItemProps`
   */
  onPinClick: (item: WuiPinnableListGroupItemProps) => void;
  /**
   * The pin icon needs a title/aria-label for accessibility.
   * It is a function that passes the item back and must return a string `(item) => string`.
   * Default is `"Pin item"`
   */
  pinTitle?: (item: WuiPinnableListGroupItemProps) => string;
  /**
   * The unpin icon needs a title/aria-label for accessibility.
   * It is a function that passes the item back and must return a string `(item) => string`.
   * Default is `"Unpin item"`
   */
  unpinTitle?: (item: WuiPinnableListGroupItemProps) => string;
}

export const WuiPinnableListGroup: FunctionComponent<WuiPinnableListGroupProps> = ({
  className,
  listItems,
  pinTitle,
  unpinTitle,
  onPinClick,
  ...rest
}) => {
  const classes = classNames('wuiPinnableListGroup', className);

  // Alter listItems object with extra props
  const getNewListItems = (
    pinExtraActionLabel: string,
    pinnedExtraActionLabel: string
  ) =>
    listItems.map(item => {
      const { pinned, pinnable = true, ...itemProps } = item;
      // Make some declarations of props for the nav implementation
      itemProps.className = classNames(
        'wuiPinnableListGroup__item',
        item.className
      );

      // Add the pinning action unless the item has it's own extra action
      if (onPinClick && !itemProps.extraAction && pinnable) {
        // Different displays for pinned vs unpinned
        if (pinned) {
          itemProps.extraAction = {
            ...pinnedExtraAction,
            title: unpinTitle ? unpinTitle(item) : pinnedExtraActionLabel,
            'aria-label': unpinTitle
              ? unpinTitle(item)
              : pinnedExtraActionLabel,
          };
        } else {
          itemProps.extraAction = {
            ...pinExtraAction,
            title: pinTitle ? pinTitle(item) : pinExtraActionLabel,
            'aria-label': pinTitle ? pinTitle(item) : pinExtraActionLabel,
          };
        }
        // Return the item on click
        itemProps.extraAction.onClick = () => onPinClick(item);
      }

      return itemProps;
    });

  return (
    <WuiI18n
      tokens={[
        'wuiPinnableListGroup.pinExtraActionLabel',
        'wuiPinnableListGroup.pinnedExtraActionLabel',
      ]}
      defaults={['Pin item', 'Unpin item']}>
      {([pinExtraActionLabel, pinnedExtraActionLabel]: string[]) => {
        const newListItems = getNewListItems(
          pinExtraActionLabel,
          pinnedExtraActionLabel
        );
        return (
          <WuiListGroup
            className={classes}
            listItems={newListItems}
            {...rest}
          />
        );
      }}
    </WuiI18n>
  );
};
