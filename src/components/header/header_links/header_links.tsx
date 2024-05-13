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
  HTMLAttributes,
  FunctionComponent,
  useState,
  useEffect,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../../common';
import { WuiIcon, IconType } from '../../icon';
import { WuiPopover, WuiPopoverProps } from '../../popover';
import { WuiI18n } from '../../i18n';
import {
  WuiHeaderSectionItemButton,
  WuiHeaderSectionItemButtonProps,
} from '../header_section';
import { WuiBreakpointSize } from '../../../services/breakpoint';
import { WuiHideFor, WuiShowFor } from '../../responsive';

type WuiHeaderLinksGutterSize = 'xs' | 's' | 'm' | 'l';
type WuiHeaderLinksPopoverButtonProps = WuiHeaderSectionItemButtonProps & {
  iconType?: IconType;
};

export type WuiHeaderLinksProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    /**
     * Spacing between direct children
     */
    gutterSize?: WuiHeaderLinksGutterSize;
    /**
     * A list of named breakpoints at which to show the popover version
     */
    popoverBreakpoints?: WuiBreakpointSize[] | 'all' | 'none';
    /**
     * Extend the functionality of the WuiPopover.button which is a WuiHeaderSectionItemButton.
     * With the addition of `iconType` to change the display icon which defaults to `apps`
     */
    popoverButtonProps?: WuiHeaderLinksPopoverButtonProps;
    /**
     * Extend the functionality of the WuiPopover
     */
    popoverProps?: Omit<WuiPopoverProps, 'button' | 'closePopover'>;
  };

const gutterSizeToClassNameMap: {
  [gutterSize in WuiHeaderLinksGutterSize]: string;
} = {
  xs: '--gutterXS',
  s: '--gutterS',
  m: '--gutterM',
  l: '--gutterL',
};
export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);

export const WuiHeaderLinks: FunctionComponent<WuiHeaderLinksProps> = ({
  children,
  className,
  gutterSize = 's',
  popoverBreakpoints = ['xs', 's'],
  popoverButtonProps,
  popoverProps,
  ...rest
}) => {
  const { onClick: _onClick, iconType = 'apps', ...popoverButtonRest } = {
    ...popoverButtonProps,
  };

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const onMenuButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
    _onClick && _onClick(e);
    setMobileMenuIsOpen(!mobileMenuIsOpen);
  };

  const closeMenu = () => {
    setMobileMenuIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('resize', closeMenu);
    return () => {
      window.removeEventListener('resize', closeMenu);
    };
  });

  const classes = classNames('wuiHeaderLinks', className);

  const button = (
    <WuiI18n token="wuiHeaderLinks.openNavigationMenu" default="Open menu">
      {(openNavigationMenu: string) => (
        <WuiHeaderSectionItemButton
          aria-label={openNavigationMenu}
          onClick={onMenuButtonClick}
          {...popoverButtonRest}>
          <WuiIcon type={iconType} size="m" />
        </WuiHeaderSectionItemButton>
      )}
    </WuiI18n>
  );

  return (
    <WuiI18n token="wuiHeaderLinks.appNavigation" default="App menu">
      {(appNavigation: string) => (
        <nav className={classes} aria-label={appNavigation} {...rest}>
          <WuiHideFor sizes={popoverBreakpoints}>
            <div
              className={classNames('wuiHeaderLinks__list', [
                `wuiHeaderLinks__list${gutterSizeToClassNameMap[gutterSize]}`,
              ])}>
              {children}
            </div>
          </WuiHideFor>

          <WuiShowFor sizes={popoverBreakpoints}>
            <WuiPopover
              ownFocus
              button={button}
              isOpen={mobileMenuIsOpen}
              anchorPosition="downRight"
              closePopover={closeMenu}
              panelPaddingSize="none"
              {...popoverProps}>
              <div
                className={classNames('wuiHeaderLinks__mobileList', [
                  `wuiHeaderLinks__mobileList${gutterSizeToClassNameMap[gutterSize]}`,
                ])}>
                {children}
              </div>
            </WuiPopover>
          </WuiShowFor>
        </nav>
      )}
    </WuiI18n>
  );
};
