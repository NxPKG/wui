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

import React, { FunctionComponent, Ref } from 'react';
import classNames from 'classnames';
import { WuiButton, WuiButtonProps } from '../button/button';
import { WuiScreenReaderOnly } from '../accessibility/screen_reader';
import { PropsForAnchor, PropsForButton, ExclusiveUnion } from '../common';

type Positions = 'static' | 'fixed' | 'absolute';
export const POSITIONS = ['static', 'fixed', 'absolute'] as Positions[];

interface WuiSkipLinkInterface extends WuiButtonProps {
  /**
   * Change the display position of the element when focused.
   * If 'fixed', the link will be fixed to the top left of the viewport
   */
  position?: Positions;
  /**
   * Typically an anchor id (e.g. `a11yMainContent`), the value provided
   * will be prepended with a hash `#` and used as the link `href`
   */
  destinationId: string;
  /**
   * When position is fixed, this is forced to `0`
   */
  tabIndex?: number;
}

type propsForAnchor = PropsForAnchor<
  WuiSkipLinkInterface,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

type propsForButton = PropsForButton<
  WuiSkipLinkInterface,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

export type WuiSkipLinkProps = ExclusiveUnion<propsForAnchor, propsForButton>;

export const WuiSkipLink: FunctionComponent<WuiSkipLinkProps> = ({
  destinationId,
  tabIndex,
  position = 'static',
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'wuiSkipLink',
    [`wuiSkipLink--${position}`],
    className
  );

  // Create the `href` from `destinationId`
  let optionalProps = {};
  if (destinationId) {
    optionalProps = {
      href: `#${destinationId}`,
    };
  }

  return (
    <WuiScreenReaderOnly showOnFocus>
      <WuiButton
        className={classes}
        tabIndex={position === 'fixed' ? 0 : tabIndex}
        size="s"
        fill
        {...optionalProps}
        {...rest}>
        {children}
      </WuiButton>
    </WuiScreenReaderOnly>
  );
};
