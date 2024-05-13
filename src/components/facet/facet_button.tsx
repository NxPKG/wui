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
  MouseEventHandler,
  ReactNode,
  RefCallback,
  ReactElement,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { WuiNotificationBadge } from '../badge';

import { WuiLoadingSpinner } from '../loading';
import { WuiInnerText } from '../inner_text';

export interface WuiFacetButtonProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  buttonRef?: RefCallback<HTMLButtonElement>;
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  /**
   * Any node, but preferably a `WuiIcon` or `WuiAvatar`
   */
  icon?: ReactNode;
  isDisabled?: boolean;
  /**
   * Adds/swaps for loading spinner & disables
   */
  isLoading?: boolean;
  /**
   * Changes visual of button to indicate it's currently selected
   */
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Adds a notification indicator for displaying the quantity provided
   */
  quantity?: number;
}

export const WuiFacetButton: FunctionComponent<WuiFacetButtonProps> = ({
  children,
  className,
  icon,
  isDisabled = false,
  isLoading = false,
  isSelected = false,
  quantity,
  buttonRef,
  ...rest
}) => {
  // If in the loading state, force disabled to true
  isDisabled = isLoading ? true : isDisabled;

  const classes = classNames(
    'wuiFacetButton',
    {
      'wuiFacetButton--isSelected': isSelected,
      'wuiFacetButton--unSelected': !isSelected,
    },
    className
  );

  // Add quantity number if provided or loading indicator
  let buttonQuantity: ReactElement;

  if (isLoading) {
    buttonQuantity = (
      <WuiLoadingSpinner className="wuiFacetButton__spinner" size="m" />
    );
  } else if (typeof quantity === 'number') {
    buttonQuantity = (
      <WuiNotificationBadge
        className="wuiFacetButton__quantity"
        size="m"
        color={!isSelected || isDisabled ? 'subdued' : 'accent'}>
        {quantity}
      </WuiNotificationBadge>
    );
  }

  // Add an icon to the button if one exists.
  let buttonIcon: ReactElement;

  if (React.isValidElement<{ className?: string }>(icon)) {
    buttonIcon = React.cloneElement(icon, {
      className: classNames(icon.props.className, 'wuiFacetButton__icon'),
    });
  }

  return (
    <WuiInnerText>
      {(ref, innerText) => (
        <button
          className={classes}
          disabled={isDisabled}
          type="button"
          ref={buttonRef}
          title={rest['aria-label'] || innerText}
          {...rest}>
          <span className="wuiFacetButton__content">
            {buttonIcon}
            <span
              className="wuiFacetButton__text"
              data-text={innerText}
              ref={ref}>
              {children}
            </span>
            {buttonQuantity}
          </span>
        </button>
      )}
    </WuiInnerText>
  );
};
