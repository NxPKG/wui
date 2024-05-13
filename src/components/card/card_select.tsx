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

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import {
  WuiButtonEmpty,
  WuiButtonEmptyColor,
  WuiButtonEmptyProps,
} from '../button/button_empty';

import { WuiI18n } from '../i18n';

export type WuiCardSelectProps = WuiButtonEmptyProps & {
  /**
   * Is in the selected state
   */
  isSelected?: boolean;
  isDisabled?: boolean;
};

export const WuiCardSelect: FunctionComponent<WuiCardSelectProps> = ({
  className,
  isSelected = false,
  isDisabled,
  color,
  children,
  ...rest
}) => {
  const child = wuiCardSelectableText(isSelected, isDisabled, children);

  const selectClasses = classNames(
    'wuiCardSelect',
    `wuiCardSelect--${wuiCardSelectableColor(color, isSelected)}`,
    className
  );

  return (
    <WuiButtonEmpty
      className={selectClasses}
      color={color || 'text'}
      size="xs"
      isDisabled={isDisabled}
      iconType={isSelected ? 'check' : undefined}
      role="switch"
      aria-checked={isSelected}
      {...rest}>
      {child}
    </WuiButtonEmpty>
  );
};

function wuiCardSelectableText(
  isSelected: boolean | undefined,
  isDisabled: boolean | undefined,
  children: ReactNode
): ReactNode {
  if (children) {
    return children;
  }

  let text;

  if (isSelected) {
    text = <WuiI18n token="wuiCardSelect.selected" default="Selected" />;
  } else if (isDisabled) {
    text = <WuiI18n token="wuiCardSelect.unavailable" default="Unavailable" />;
  } else {
    text = <WuiI18n token="wuiCardSelect.select" default="Select" />;
  }

  return text;
}

export function wuiCardSelectableColor(
  color: WuiButtonEmptyColor | undefined,
  isSelected: boolean | undefined
): string {
  let calculatedColor;
  if (color) {
    calculatedColor = color;
  } else if (isSelected) {
    calculatedColor = 'success';
  } else {
    calculatedColor = 'text';
  }

  return calculatedColor;
}
