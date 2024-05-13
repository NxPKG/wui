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
  forwardRef,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';
import { WuiIcon } from '../icon';
import { WuiI18n } from '../i18n';
import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import { getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';

export type WuiLinkType = 'button' | 'reset' | 'submit';
export type WuiLinkColor =
  | 'primary'
  | 'subdued'
  | 'secondary'
  | 'accent'
  | 'danger'
  | 'warning'
  | 'text'
  | 'ghost';

const colorsToClassNameMap: { [color in WuiLinkColor]: string } = {
  primary: 'wuiLink--primary',
  subdued: 'wuiLink--subdued',
  secondary: 'wuiLink--secondary',
  accent: 'wuiLink--accent',
  danger: 'wuiLink--danger',
  warning: 'wuiLink--warning',
  ghost: 'wuiLink--ghost',
  text: 'wuiLink--text',
};

export const COLORS = keysOf(colorsToClassNameMap);

export interface LinkButtonProps {
  type?: WuiLinkType;
  color?: WuiLinkColor;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface WuiLinkButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color' | 'onClick'>,
    LinkButtonProps {}

export interface LinkAnchorProps {
  type?: WuiLinkType;
  color?: WuiLinkColor;
  /**
   * Set to true to show an icon indicating that it is an external link.
   */
  external?: boolean;
}

export interface WuiLinkAnchorProps
  extends CommonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'color' | 'onClick'>,
    LinkAnchorProps {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export type WuiLinkProps = ExclusiveUnion<
  WuiLinkButtonProps,
  WuiLinkAnchorProps
>;

const WuiLink = forwardRef<HTMLAnchorElement | HTMLButtonElement, WuiLinkProps>(
  (
    {
      children,
      color = 'primary',
      className,
      href,
      external,
      target,
      rel,
      type = 'button',
      onClick,
      disabled: _disabled,
      ...rest
    },
    ref
  ) => {
    const isHrefValid = !href || validateHref(href);
    const disabled = _disabled || !isHrefValid;

    const externalLinkIcon = external ? (
      <WuiI18n token="wuiLink.external.ariaLabel" default="External link">
        {(ariaLabel: string) => (
          <WuiIcon
            aria-label={ariaLabel}
            size="s"
            className="wuiLink__externalIcon"
            type="popout"
          />
        )}
      </WuiI18n>
    ) : (
      undefined
    );

    if (href === undefined || !isHrefValid) {
      const buttonProps = {
        className: classNames(
          'wuiLink',
          disabled ? 'wuiLink-disabled' : colorsToClassNameMap[color],
          className
        ),
        type,
        onClick,
        disabled,
        ...rest,
      };

      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          {...(buttonProps as WuiLinkButtonProps)}>
          {children}
        </button>
      );
    }

    const secureRel = getSecureRelForTarget({ href, target, rel });
    const anchorProps = {
      className: classNames('wuiLink', colorsToClassNameMap[color], className),
      href,
      target,
      rel: secureRel,
      onClick,
      ...rest,
    };

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(anchorProps as WuiLinkAnchorProps)}>
        {children}
        {externalLinkIcon}
      </a>
    );
  }
);

WuiLink.displayName = 'WuiLink';
export { WuiLink };
