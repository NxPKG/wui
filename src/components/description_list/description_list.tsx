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

import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';

import { WuiDescriptionListTitle } from './description_list_title';

import { WuiDescriptionListDescription } from './description_list_description';
import { CommonProps, keysOf } from '../common';

export type WuiDescriptionListType = keyof typeof typesToClassNameMap;
export type WuiDescriptionListAlignment = keyof typeof alignmentsToClassNameMap;
export type WuiDescriptionListTextStyle = keyof typeof textStylesToClassNameMap;

export interface WuiDescriptionListProps {
  listItems?: Array<{
    title: NonNullable<ReactNode>;
    description: NonNullable<ReactNode>;
  }>;
  /**
   * Text alignment
   */
  align?: WuiDescriptionListAlignment;
  /**
   * Smaller text and condensed spacing
   */
  compressed?: boolean;
  /**
   * How should the content be styled, by default
   * this will emphasize the title
   */
  textStyle?: WuiDescriptionListTextStyle;
  /**
   * How each item should be laid out
   */
  type?: WuiDescriptionListType;
  /**
   * Props object to be passed to `WuiDescriptionListTitle`
   */
  titleProps?: HTMLAttributes<HTMLElement>;
  /**
   * Props object to be passed to `WuiDescriptionListDescription`
   */
  descriptionProps?: HTMLAttributes<HTMLElement>;
}

const typesToClassNameMap = {
  row: 'wuiDescriptionList--row',
  inline: 'wuiDescriptionList--inline',
  column: 'wuiDescriptionList--column',
  responsiveColumn: 'wuiDescriptionList--responsiveColumn',
};

export const TYPES = keysOf(typesToClassNameMap);

const alignmentsToClassNameMap = {
  center: 'wuiDescriptionList--center',
  left: '',
};

export const ALIGNMENTS = keysOf(alignmentsToClassNameMap);

const textStylesToClassNameMap = {
  normal: '',
  reverse: 'wuiDescriptionList--reverse',
};

export const TEXT_STYLES = keysOf(textStylesToClassNameMap);

export const WuiDescriptionList: FunctionComponent<CommonProps &
  HTMLAttributes<HTMLDListElement> &
  WuiDescriptionListProps> = ({
  align = 'left',
  children,
  className,
  compressed = false,
  descriptionProps,
  listItems,
  textStyle = 'normal',
  titleProps,
  type = 'row',
  ...rest
}) => {
  const classes = classNames(
    'wuiDescriptionList',
    type ? typesToClassNameMap[type] : undefined,
    align ? alignmentsToClassNameMap[align] : undefined,
    textStyle ? textStylesToClassNameMap[textStyle] : undefined,
    {
      'wuiDescriptionList--compressed': compressed,
    },
    className
  );

  let childrenOrListItems = null;
  if (listItems) {
    childrenOrListItems = listItems.map((item, index) => {
      return [
        <WuiDescriptionListTitle key={`title-${index}`} {...titleProps}>
          {item.title}
        </WuiDescriptionListTitle>,

        <WuiDescriptionListDescription
          key={`description-${index}`}
          {...descriptionProps}>
          {item.description}
        </WuiDescriptionListDescription>,
      ];
    });
  } else {
    childrenOrListItems = children;
  }

  return (
    <dl className={classes} {...rest}>
      {childrenOrListItems}
    </dl>
  );
};
