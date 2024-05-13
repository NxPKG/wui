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
  useState,
  FunctionComponent,
  KeyboardEventHandler,
  HTMLAttributes,
  useRef,
} from 'react';
import classNames from 'classnames';
import tabbable from 'tabbable';

import { keys } from '../../services';

import { WuiTitle } from '../title';
import { WuiNavDrawerGroup, FlyoutMenuItem } from './nav_drawer_group';
import { WuiListGroupProps } from '../list_group/list_group';
import { WuiFocusTrap } from '../focus_trap';
import { CommonProps } from '../common';

export interface WuiNavDrawerFlyoutProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Toggle the nav drawer between collapsed and expanded
   */
  isCollapsed?: boolean;

  listItems?: FlyoutMenuItem[] | null;

  /**
   * Passthrough function to be called when the flyout is closing
   * @see `WuiNavDrawer`
   */
  onClose?: (shouldReturnFocus?: boolean) => void;

  /**
   * Display a title atop the flyout
   */
  title?: string;

  wrapText?: WuiListGroupProps['wrapText'];
}

export const WuiNavDrawerFlyout: FunctionComponent<WuiNavDrawerFlyoutProps> = ({
  className,
  isCollapsed = true,
  listItems,
  onClose,
  title,
  wrapText = false,
  ...rest
}) => {
  const menuElementRef = useRef<HTMLDivElement>(null);
  const [
    tabbables,
    setTabbables,
  ] = useState<Array<HTMLElement | null> | null>();
  const LABEL = 'navDrawerFlyoutTitle';
  const classes = classNames(
    'wuiNavDrawerFlyout',
    {
      'wuiNavDrawerFlyout-isCollapsed': isCollapsed,
      'wuiNavDrawerFlyout-isExpanded': !isCollapsed,
    },
    className
  );

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
    if (event.key === keys.ESCAPE) {
      handleClose();
    } else if (event.key === keys.TAB) {
      let tabs = tabbables;
      if (!tabs && menuElementRef.current) {
        tabs = tabbable(menuElementRef.current).filter(
          element => element.tagName !== 'DIV'
        );
        setTabbables(tabs);
      }
      if (!tabs) {
        return;
      }
      if (
        (!event.shiftKey && document.activeElement === tabs[tabs.length - 1]) ||
        (event.shiftKey && document.activeElement === tabs[0])
      ) {
        handleClose();
      }
    }
  };

  const handleClose = (shouldReturnFocus = true) => {
    setTabbables(null);
    if (onClose) {
      onClose(shouldReturnFocus);
    }
  };

  return (
    <div
      className={classes}
      aria-labelledby={LABEL}
      onKeyDown={handleKeyDown}
      ref={menuElementRef}
      {...rest}>
      <WuiTitle className="wuiNavDrawerFlyout__title" size="xxs">
        <div id={LABEL} tabIndex={-1}>
          {title}
        </div>
      </WuiTitle>
      {listItems ? (
        <WuiFocusTrap returnFocus={false}>
          <WuiNavDrawerGroup
            className="wuiNavDrawerFlyout__listGroup"
            aria-labelledby={LABEL}
            listItems={listItems}
            wrapText={wrapText}
            onClose={() => handleClose(false)}
          />
        </WuiFocusTrap>
      ) : null}
    </div>
  );
};
