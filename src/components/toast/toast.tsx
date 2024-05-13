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
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { WuiScreenReaderOnly } from '../accessibility';
import { WuiI18n } from '../i18n';

import { IconType, WuiIcon } from '../icon';

import { WuiText } from '../text';

type ToastColor = 'primary' | 'success' | 'warning' | 'danger';

const colorToClassNameMap: { [color in ToastColor]: string } = {
  primary: 'wuiToast--primary',
  success: 'wuiToast--success',
  warning: 'wuiToast--warning',
  danger: 'wuiToast--danger',
};

export const COLORS = keysOf(colorToClassNameMap);

export interface WuiToastProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  color?: ToastColor;
  iconType?: IconType;
  onClose?: () => void;
}

export const WuiToast: FunctionComponent<WuiToastProps> = ({
  title,
  color,
  iconType,
  onClose,
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'wuiToast',
    color ? colorToClassNameMap[color] : null,
    className
  );
  const headerClasses = classNames('wuiToastHeader', {
    'wuiToastHeader--withBody': children,
  });

  let headerIcon: ReactElement;

  if (iconType) {
    headerIcon = (
      <WuiIcon
        className="wuiToastHeader__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  let closeButton;

  if (onClose) {
    closeButton = (
      <WuiI18n token="wuiToast.dismissToast" default="Dismiss toast">
        {(dismissToast: string) => (
          <button
            type="button"
            className="wuiToast__closeButton"
            aria-label={dismissToast}
            onClick={onClose}
            data-test-subj="toastCloseButton">
            <WuiIcon type="cross" size="m" aria-hidden="true" />
          </button>
        )}
      </WuiI18n>
    );
  }

  let optionalBody;

  if (children) {
    optionalBody = (
      <WuiText size="s" className="wuiToastBody">
        {children}
      </WuiText>
    );
  }

  return (
    <div className={classes} {...rest}>
      <WuiScreenReaderOnly>
        <p>
          <WuiI18n
            token="wuiToast.newNotification"
            default="A new notification appears"
          />
        </p>
      </WuiScreenReaderOnly>

      <WuiI18n token="wuiToast.notification" default="Notification">
        {(notification: string) => (
          <div
            className={headerClasses}
            aria-label={notification}
            data-test-subj="wuiToastHeader">
            {headerIcon}

            <span className="wuiToastHeader__title">{title}</span>
          </div>
        )}
      </WuiI18n>

      {closeButton}
      {optionalBody}
    </div>
  );
};
