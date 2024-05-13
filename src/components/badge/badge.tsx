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
  AriaAttributes,
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react';
import classNames from 'classnames';
import chroma from 'chroma-js';
import { CommonProps, ExclusiveUnion, keysOf, PropsOf } from '../common';
import {
  wuiPaletteColorBlindBehindText,
  getSecureRelForTarget,
  isColorDark,
} from '../../services';
import { WuiInnerText } from '../inner_text';
import { WuiIcon, IconColor, IconType } from '../icon';
import { chromaValid, parseColor } from '../color_picker/utils';
import { validateHref } from '../../services/security/href_validator';

type IconSide = 'left' | 'right';

type WithButtonProps = {
  /**
   * Will apply an onclick to the badge itself
   */
  onClick: MouseEventHandler<HTMLButtonElement>;

  /**
   * Aria label applied to the onClick button
   */
  onClickAriaLabel: AriaAttributes['aria-label'];
} & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'color'>;

type WithAnchorProps = {
  href: string;
  target?: string;
  rel?: string;
} & Omit<HTMLAttributes<HTMLAnchorElement>, 'href' | 'color' | 'onClick'>;

type WithSpanProps = Omit<HTMLAttributes<HTMLSpanElement>, 'onClick' | 'color'>;

interface WithIconOnClick {
  /**
   * Will apply an onclick to icon within the badge
   */
  iconOnClick: MouseEventHandler<HTMLButtonElement>;

  /**
   * Aria label applied to the iconOnClick button
   */
  iconOnClickAriaLabel: AriaAttributes['aria-label'];
}

export type WuiBadgeProps = {
  /**
   * Accepts any string from our icon library
   */
  iconType?: IconType;

  /**
   * The side of the badge the icon should sit
   */
  iconSide?: IconSide;

  /**
   * Accepts either our palette colors (primary, secondary ..etc) or a hex value `#FFFFFF`, `#000`.
   */
  color?: IconColor;
  /**
   * Will override any color passed through the `color` prop.
   */
  isDisabled?: boolean;

  /**
   * Props passed to the close button.
   */
  closeButtonProps?: Partial<PropsOf<WuiIcon>>;
} & CommonProps &
  ExclusiveUnion<WithIconOnClick, {}> &
  ExclusiveUnion<
    ExclusiveUnion<WithButtonProps, WithAnchorProps>,
    WithSpanProps
  >;

// TODO - replace with variables once https://github.com/wazuh/wui/issues/2731 is closed
const colorInk = '#000';
const colorGhost = '#fff';

// The color blind palette has some stricter accessibility needs with regards to
// charts and contrast. We use the wuiPaletteColorBlindBehindText variant here since our
// accessibility concerns pertain to foreground (text) and background contrast
const visColors = wuiPaletteColorBlindBehindText();

const colorToHexMap: { [color in IconColor]: string } = {
  // TODO - replace with variable once https://github.com/wazuh/wui/issues/2731 is closed
  default: '#d3dae6',
  primary: visColors[1],
  secondary: visColors[0],
  accent: visColors[2],
  warning: visColors[5],
  danger: visColors[9],
};

export const COLORS = keysOf(colorToHexMap);

const iconSideToClassNameMap: { [side in IconSide]: string } = {
  left: 'wuiBadge--iconLeft',
  right: 'wuiBadge--iconRight',
};

export const ICON_SIDES = keysOf(iconSideToClassNameMap);

export const WuiBadge: FunctionComponent<WuiBadgeProps> = ({
  children,
  color = 'default',
  iconType,
  iconSide = 'left',
  className,
  isDisabled: _isDisabled,
  onClick,
  iconOnClick,
  onClickAriaLabel,
  iconOnClickAriaLabel,
  closeButtonProps,
  href,
  rel,
  target,
  style,
  ...rest
}) => {
  checkValidColor(color);

  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || !isHrefValid;

  let optionalCustomStyles: object | undefined = style;
  let textColor = null;
  // TODO - replace with variable once https://github.com/wazuh/wui/issues/2731 is closed
  const wcagContrastBase = 4.5; // WCAG AA contrast level
  let wcagContrast = null;
  let colorHex = null;

  // Check if a valid color name was provided
  if (COLORS.indexOf(color) > -1) {
    // Get the hex equivalent for the provided color name
    colorHex = colorToHexMap[color];

    // Set dark or light text color based upon best contrast
    textColor = setTextColor(colorHex);

    optionalCustomStyles = {
      backgroundColor: colorHex,
      color: textColor,
      ...optionalCustomStyles,
    };
  } else if (color !== 'hollow') {
    // This is a custom color that is neither from the base palette nor hollow
    // Let's do our best to ensure that it provides sufficient contrast

    // Set dark or light text color based upon best contrast
    textColor = setTextColor(color);

    // Check the contrast
    wcagContrast = getColorContrast(textColor, color);

    if (wcagContrast < wcagContrastBase) {
      // It's low contrast, so lets show a warning in the console
      console.warn(
        'Warning: ',
        color,
        ' badge has low contrast of ',
        wcagContrast.toFixed(2),
        '. Should be above ',
        wcagContrastBase,
        '.'
      );
    }

    optionalCustomStyles = {
      backgroundColor: color,
      color: textColor,
      ...optionalCustomStyles,
    };
  }

  const classes = classNames(
    'wuiBadge',
    {
      'wuiBadge-isClickable': (onClick || href) && !iconOnClick,
      'wuiBadge-isDisabled': isDisabled,
      'wuiBadge--hollow': color === 'hollow',
    },
    iconSideToClassNameMap[iconSide],
    className
  );

  const closeClassNames = classNames(
    'wuiBadge__icon',
    closeButtonProps && closeButtonProps.className
  );

  const Element = href && !isDisabled ? 'a' : 'button';
  const relObj: {
    href?: string;
    target?: string;
    rel?: string;
    onClick?:
      | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
      | ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void);
  } = {};

  if (href && !isDisabled) {
    relObj.href = href;
    relObj.target = target;
    relObj.rel = getSecureRelForTarget({ href, target, rel });
  }
  if (onClick) {
    relObj.onClick = onClick;
  }

  let optionalIcon: ReactNode = null;
  if (iconType) {
    if (iconOnClick) {
      if (!iconOnClickAriaLabel) {
        console.warn(
          'When passing the iconOnClick props to WuiBadge, you must also provide iconOnClickAriaLabel'
        );
      }
      optionalIcon = (
        <button
          className="wuiBadge__iconButton"
          aria-label={iconOnClickAriaLabel}
          disabled={isDisabled}
          title={iconOnClickAriaLabel}
          onClick={iconOnClick}>
          <WuiIcon
            type={iconType}
            size="s"
            {...closeButtonProps}
            className={closeClassNames}
          />
        </button>
      );
    } else {
      optionalIcon = (
        <WuiIcon
          type={iconType}
          size={children ? 's' : 'm'}
          className="wuiBadge__icon"
        />
      );
    }
  }

  if (onClick && !onClickAriaLabel) {
    console.warn(
      'When passing onClick to WuiBadge, you must also provide onClickAriaLabel'
    );
  }

  const content = (
    <span className="wuiBadge__content">
      {children && <span className="wuiBadge__text">{children}</span>}
      {optionalIcon}
    </span>
  );

  if (iconOnClick) {
    return onClick || href ? (
      <span className={classes} style={optionalCustomStyles}>
        <span className="wuiBadge__content">
          <WuiInnerText>
            {(ref, innerText) => (
              <Element
                className="wuiBadge__childButton"
                disabled={isDisabled}
                aria-label={onClickAriaLabel}
                ref={ref}
                title={innerText}
                {...(relObj as HTMLAttributes<HTMLElement>)}
                {...(rest as HTMLAttributes<HTMLElement>)}>
                {children}
              </Element>
            )}
          </WuiInnerText>
          {optionalIcon}
        </span>
      </span>
    ) : (
      <WuiInnerText>
        {(ref, innerText) => (
          <span
            className={classes}
            style={optionalCustomStyles}
            ref={ref}
            title={innerText}
            {...rest}>
            {content}
          </span>
        )}
      </WuiInnerText>
    );
  } else if (onClick || href) {
    return (
      <WuiInnerText>
        {(ref, innerText) => (
          <Element
            disabled={isDisabled}
            aria-label={onClickAriaLabel}
            className={classes}
            style={optionalCustomStyles}
            ref={ref as Ref<HTMLButtonElement & HTMLAnchorElement>}
            title={innerText}
            {...(relObj as HTMLAttributes<HTMLElement>)}
            {...(rest as HTMLAttributes<HTMLElement>)}>
            {content}
          </Element>
        )}
      </WuiInnerText>
    );
  } else {
    return (
      <WuiInnerText>
        {(ref, innerText) => (
          <span
            className={classes}
            style={optionalCustomStyles}
            ref={ref}
            title={innerText}
            {...rest}>
            {content}
          </span>
        )}
      </WuiInnerText>
    );
  }
};

function getColorContrast(textColor: string, color: string) {
  const contrastValue = chroma.contrast(textColor, color);
  return contrastValue;
}

function setTextColor(bgColor: string) {
  const textColor = isColorDark(...chroma(bgColor).rgb())
    ? colorGhost
    : colorInk;

  return textColor;
}

function checkValidColor(color: null | IconColor | string) {
  const colorExists = !!color;
  const isNamedColor = (color && COLORS.includes(color)) || color === 'hollow';
  const isValidColorString = color && chromaValid(parseColor(color) || '');

  if (!colorExists && !isNamedColor && !isValidColorString) {
    console.warn(
      'WuiBadge expects a valid color. This can either be a three or six ' +
        `character hex value, rgb(a) value, hsv value, hollow, or one of the following: ${COLORS}. ` +
        `Instead got ${color}.`
    );
  }
}
