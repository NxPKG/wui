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
  cloneElement,
  Component,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { WuiIcon } from '../icon';
import { WuiToolTip, ToolTipPositions } from '../tool_tip';

import { getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';

export type WuiContextMenuItemIcon = ReactElement<any> | string | HTMLElement;

export type WuiContextMenuItemLayoutAlignment = 'center' | 'top' | 'bottom';

export interface WuiContextMenuItemProps extends CommonProps {
  icon?: WuiContextMenuItemIcon;
  hasPanel?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  buttonRef?: Ref<HTMLButtonElement>;
  /**
   * Required if using a tooltip. Add an optional tooltip on hover
   */
  toolTipContent?: ReactNode;
  /**
   * Optional title for the tooltip
   */
  toolTipTitle?: ReactNode;
  /**
   * Dictates the position of the tooltip.
   */
  toolTipPosition?: ToolTipPositions;
  href?: string;
  target?: string;
  rel?: string;
  /**
   * How to align icon with content of button
   */
  layoutAlign?: WuiContextMenuItemLayoutAlignment;
}

type Props = CommonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'onClick' | 'disabled'
  > &
  WuiContextMenuItemProps;

const layoutAlignToClassNames: {
  [align in WuiContextMenuItemLayoutAlignment]: string | null;
} = {
  center: null,
  top: 'wuiContextMenu__itemLayout--top',
  bottom: 'wuiContextMenu__itemLayout--bottom',
};

export const LAYOUT_ALIGN = keysOf(layoutAlignToClassNames);

export class WuiContextMenuItem extends Component<Props> {
  render() {
    const {
      children,
      className,
      hasPanel,
      icon,
      buttonRef,
      disabled: _disabled,
      layoutAlign = 'center',
      toolTipTitle,
      toolTipContent,
      toolTipPosition = 'right',
      href,
      target,
      rel,
      ...rest
    } = this.props;
    let iconInstance;

    const isHrefValid = !href || validateHref(href);
    const disabled = _disabled || !isHrefValid;

    if (icon) {
      switch (typeof icon) {
        case 'string':
          iconInstance = (
            <WuiIcon type={icon} size="m" className="wuiContextMenu__icon" />
          );
          break;

        default:
          // Assume it's already an instance of an icon.
          iconInstance = cloneElement(icon as ReactElement, {
            className: 'wuiContextMenu__icon',
          });
      }
    }

    let arrow;

    if (hasPanel) {
      arrow = (
        <WuiIcon type="arrowRight" size="m" className="wuiContextMenu__arrow" />
      );
    }

    const classes = classNames('wuiContextMenuItem', className, {
      'wuiContextMenuItem-isDisabled': disabled,
    });

    const layoutClasses = classNames(
      'wuiContextMenu__itemLayout',
      layoutAlignToClassNames[layoutAlign]
    );

    const buttonInner = (
      <span className={layoutClasses}>
        {iconInstance}
        <span className="wuiContextMenuItem__text">{children}</span>
        {arrow}
      </span>
    );

    let button;
    // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
    // this is a button and piggyback off its disabled styles.
    if (href && !disabled) {
      const secureRel = getSecureRelForTarget({ href, target, rel });

      button = (
        <a
          className={classes}
          href={href}
          target={target}
          rel={secureRel}
          ref={buttonRef as Ref<HTMLAnchorElement>}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {buttonInner}
        </a>
      );
    } else {
      button = (
        <button
          disabled={disabled}
          className={classes}
          type="button"
          ref={buttonRef}
          {...rest}>
          {buttonInner}
        </button>
      );
    }

    if (toolTipContent) {
      return (
        <WuiToolTip
          title={toolTipTitle ? toolTipTitle : null}
          content={toolTipContent}
          anchorClassName="wui-displayBlock"
          position={toolTipPosition}>
          {button}
        </WuiToolTip>
      );
    } else {
      return button;
    }
  }
}
