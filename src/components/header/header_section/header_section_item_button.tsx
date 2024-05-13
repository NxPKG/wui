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

import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import {
  WuiNotificationBadgeProps,
  WuiNotificationBadge,
} from '../../badge/notification_badge/badge_notification';
import { WuiIcon } from '../../icon';

export type WuiHeaderSectionItemButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Inserts the node into a WuiBadgeNotification and places it appropriately against the button.
     * Or pass `true` to render a simple dot
     */
    notification?: WuiNotificationBadgeProps['children'] | boolean;
    /**
     * Changes the color of the notification background
     */
    notificationColor?: WuiNotificationBadgeProps['color'];
  };

export type WuiHeaderSectionItemButtonRef = HTMLButtonElement;

export const WuiHeaderSectionItemButton = React.forwardRef<
  WuiHeaderSectionItemButtonRef,
  PropsWithChildren<WuiHeaderSectionItemButtonProps>
>(
  (
    {
      onClick,
      children,
      className,
      notification,
      notificationColor = 'accent',
      ...rest
    },
    ref
  ) => {
    const classes = classNames('wuiHeaderSectionItem__button', className);

    let notificationBadge;
    if (notification) {
      if (notification === true) {
        notificationBadge = (
          <WuiIcon
            className="wuiHeaderSectionItemButton__notification wuiHeaderSectionItemButton__notification--dot"
            color={notificationColor}
            type="dot"
            size="l"
          />
        );
      } else {
        notificationBadge = (
          <WuiNotificationBadge
            className="wuiHeaderSectionItemButton__notification wuiHeaderSectionItemButton__notification--badge"
            color={notificationColor}>
            {notification}
          </WuiNotificationBadge>
        );
      }
    }

    return (
      <button
        className={classes}
        ref={ref}
        onClick={onClick}
        type="button"
        {...rest}>
        {children}
        {notificationBadge}
      </button>
    );
  }
);

WuiHeaderSectionItemButton.displayName = 'WuiHeaderSectionItemButton';
