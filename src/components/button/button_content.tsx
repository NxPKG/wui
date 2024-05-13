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

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { WuiLoadingSpinner } from '../loading';
import { WuiIcon, IconType } from '../icon';

export type ButtonContentIconSide = 'left' | 'right';

const iconSideToClassNameMap: {
  [side in ButtonContentIconSide]: string | null;
} = {
  left: null,
  right: 'wuiButtonContent--iconRight',
};

export const ICON_SIDES = keysOf(iconSideToClassNameMap);

export type WuiButtonContentType = HTMLAttributes<HTMLSpanElement>;

/**
 * *INTERNAL ONLY*
 * This component is simply a helper component for reuse within other button components
 */
export interface WuiButtonContentProps extends CommonProps {
  iconType?: IconType;
  iconSide?: ButtonContentIconSide;
  isLoading?: boolean;
  /**
   * Object of props passed to the <span/> wrapping the content's text/children only (not icon)
   */
  textProps?: HTMLAttributes<HTMLSpanElement> & CommonProps;
}

export const WuiButtonContent: FunctionComponent<WuiButtonContentType &
  WuiButtonContentProps> = ({
  children,
  textProps,
  isLoading = false,
  iconType,
  iconSide = 'left',
  ...contentProps
}) => {
  // Add an icon to the button if one exists.
  let buttonIcon;

  if (isLoading) {
    buttonIcon = (
      <WuiLoadingSpinner className="wuiButtonContent__spinner" size="m" />
    );
  } else if (iconType) {
    buttonIcon = (
      <WuiIcon className="wuiButtonContent__icon" type={iconType} size="m" />
    );
  }

  const contentClassNames = classNames(
    'wuiButtonContent',
    iconSide ? iconSideToClassNameMap[iconSide] : null,
    contentProps && contentProps.className
  );

  return (
    <span {...contentProps} className={contentClassNames}>
      {buttonIcon}
      <span {...textProps}>{children}</span>
    </span>
  );
};
