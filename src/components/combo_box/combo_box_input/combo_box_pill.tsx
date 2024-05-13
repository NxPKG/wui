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

import React, { AriaAttributes, Component, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { WuiBadge } from '../../badge';
import { WuiI18n } from '../../i18n';
import { WuiComboBoxOptionOption, OptionHandler } from '../types';
import { CommonProps } from '../../common';

export interface WuiComboBoxPillProps<T> extends CommonProps {
  asPlainText?: boolean;
  children?: string;
  className?: string;
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onClickAriaLabel?: AriaAttributes['aria-label'];
  onClose?: OptionHandler<T>;
  option: WuiComboBoxOptionOption<T>;
}

export class WuiComboBoxPill<T> extends Component<WuiComboBoxPillProps<T>> {
  static defaultProps = {
    color: 'hollow',
  };

  onCloseButtonClick = () => {
    const { onClose, option } = this.props;
    if (onClose) {
      onClose(option);
    }
  };

  render() {
    const {
      asPlainText,
      children,
      className,
      color,
      onClick,
      onClickAriaLabel,
      onClose, // eslint-disable-line no-unused-vars
      option, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;
    const classes = classNames(
      'wuiComboBoxPill',
      {
        'wuiComboBoxPill--plainText': asPlainText,
      },
      className
    );
    const onClickProps =
      onClick && onClickAriaLabel
        ? {
            onClick,
            onClickAriaLabel,
          }
        : {};

    if (onClose) {
      return (
        <WuiI18n
          token="wuiComboBoxPill.removeSelection"
          default="Remove {children} from selection in this group"
          values={{ children }}>
          {(removeSelection: string) => (
            <WuiBadge
              className={classes}
              closeButtonProps={{ tabIndex: -1 }}
              color={color}
              iconOnClick={this.onCloseButtonClick}
              iconOnClickAriaLabel={removeSelection}
              iconSide="right"
              iconType="cross"
              title={children}
              {...onClickProps}
              {...rest}>
              {children}
            </WuiBadge>
          )}
        </WuiI18n>
      );
    }

    if (asPlainText) {
      return (
        <span className={classes} {...rest}>
          {children}
        </span>
      );
    }

    return (
      <WuiBadge
        className={classes}
        color={color}
        title={children}
        {...rest}
        {...onClickProps}>
        {children}
      </WuiBadge>
    );
  }
}
