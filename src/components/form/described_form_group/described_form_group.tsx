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

import React, { ReactNode, HTMLAttributes } from 'react';

import classNames from 'classnames';

import { CommonProps, keysOf, PropsOf } from '../../common';

import { WuiTitle, WuiTitleSize, WuiTitleProps } from '../../title';
import { WuiText } from '../../text';
import { WuiFlexGroup, WuiFlexItem, WuiFlexGroupGutterSize } from '../../flex';

const paddingSizeToClassNameMap = {
  xxxs: 'wuiDescribedFormGroup__fieldPadding--xxxsmall',
  xxs: 'wuiDescribedFormGroup__fieldPadding--xxsmall',
  xs: 'wuiDescribedFormGroup__fieldPadding--xsmall',
  s: 'wuiDescribedFormGroup__fieldPadding--small',
  m: 'wuiDescribedFormGroup__fieldPadding--medium',
  l: 'wuiDescribedFormGroup__fieldPadding--large',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export type WuiDescribedFormGroupPaddingSize = keyof typeof paddingSizeToClassNameMap;

export type WuiDescribedFormGroupProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    /**
     * One or more `WuiFormRow`s
     */
    children?: ReactNode;
    /**
     * Passed to `WuiFlexGroup`
     */
    gutterSize?: WuiFlexGroupGutterSize;
    fullWidth?: boolean;
    /**
     * For better accessibility, it's recommended the use of HTML headings
     */
    title: WuiTitleProps['children'];
    titleSize?: WuiTitleSize;
    /**
     * Added as a child of `WuiText`
     */
    description?: ReactNode;
    /**
     * For customizing the description container. Extended from `WuiFlexItem`
     */
    descriptionFlexItemProps?: PropsOf<typeof WuiFlexItem>;
    /**
     * For customizing the field container. Extended from `WuiFlexItem`
     */
    fieldFlexItemProps?: PropsOf<typeof WuiFlexItem>;
  };

export const WuiDescribedFormGroup: React.FunctionComponent<WuiDescribedFormGroupProps> = ({
  children,
  className,
  gutterSize = 'l',
  fullWidth = false,
  titleSize = 'xs',
  title,
  description,
  descriptionFlexItemProps,
  fieldFlexItemProps,
  ...rest
}) => {
  const classes = classNames(
    'wuiDescribedFormGroup',
    {
      'wuiDescribedFormGroup--fullWidth': fullWidth,
    },
    className
  );

  const fieldClasses = classNames(
    'wuiDescribedFormGroup__fields',
    paddingSizeToClassNameMap[titleSize],
    fieldFlexItemProps && fieldFlexItemProps.className
  );

  let renderedDescription: ReactNode;

  if (description) {
    renderedDescription = (
      <WuiText
        size="s"
        color="subdued"
        className="wuiDescribedFormGroup__description">
        {description}
      </WuiText>
    );
  }

  return (
    <div role="group" className={classes} {...rest}>
      <WuiFlexGroup gutterSize={gutterSize}>
        <WuiFlexItem {...descriptionFlexItemProps}>
          <WuiTitle size={titleSize} className="wuiDescribedFormGroup__title">
            {title}
          </WuiTitle>

          {renderedDescription}
        </WuiFlexItem>

        <WuiFlexItem {...fieldFlexItemProps} className={fieldClasses}>
          {children}
        </WuiFlexItem>
      </WuiFlexGroup>
    </div>
  );
};
