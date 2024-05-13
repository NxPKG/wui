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

import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { WuiIconProps, WuiIcon } from '../../../components/icon';
import { WuiAvatarProps, WuiAvatar } from '../../../components/avatar/avatar';
import { WuiSelectableOption } from '../selectable_option';
import { WuiHighlight } from '../../../components/highlight';

export interface WuiSelectableTemplateSitewideMetaData extends CommonProps {
  /**
   * Required to display the metadata
   */
  text: string;
  /**
   * Styles the metadata according to Elastic's schema.
   * Can be one of 'application', 'deployment', 'article', 'case', 'platform',
   * or a custom string to associate with your own schema.
   * Appends the string to the class name as `wuiSelectableTemplateSitewide__optionMeta--[type]`
   */
  type?:
    | 'application'
    | 'deployment'
    | 'article'
    | 'case'
    | 'platform'
    | string;
  /**
   * Will wrap the meta tag in WuiHighlight to mark the portions that match the search text
   */
  highlightSearchString?: boolean;
}

/**
 * The generic extension allows consumers to keep their data objects
 * intact without needing to do key lookups when using `renderOption`
 */
export type WuiSelectableTemplateSitewideOption<T = { [key: string]: any }> = {
  /**
   * Displayed on the left (`prepend`).
   * Object of `WuiIconProps` for display of the solution/application's logo
   */
  icon?: WuiIconProps;
  /**
   * Displayed on the right (`append`).
   * Object of `WuiAvatarProps` for display of the space (default) or user
   */
  avatar?: WuiAvatarProps;
  /**
   * An array of inline #MetaData displayed beneath the label and separated by bullets.
   */
  meta?: WuiSelectableTemplateSitewideMetaData[];
} & WuiSelectableOption<T>;

export const wuiSelectableTemplateSitewideFormatOptions = (
  options: WuiSelectableTemplateSitewideOption[]
) => {
  return options.map((item: WuiSelectableTemplateSitewideOption) => {
    let title = item.label;
    if (item.meta && item.meta.length) {
      title += ` •${renderOptionMeta(item.meta, '', true)}`;
    }

    return {
      key: item.label,
      label: item.label,
      title,
      ...item,
      className: classNames(
        'wuiSelectableTemplateSitewide__listItem',
        item.className
      ),
      prepend: item.icon ? (
        <WuiIcon color="subdued" size="l" {...item.icon} />
      ) : (
        item.prepend
      ),
      append: item.avatar ? (
        <WuiAvatar type="space" size="s" {...item.avatar} />
      ) : (
        item.append
      ),
    };
  });
};

export const wuiSelectableTemplateSitewideRenderOptions = (
  option: WuiSelectableTemplateSitewideOption,
  searchValue: string
) => {
  return (
    <>
      <WuiHighlight
        className="wuiSelectableTemplateSitewide__listItemTitle"
        search={searchValue}>
        {option.label}
      </WuiHighlight>
      {renderOptionMeta(option.meta, searchValue)}
    </>
  );
};

function renderOptionMeta(
  meta?: WuiSelectableTemplateSitewideMetaData[],
  searchValue: string = '',
  stringsOnly: boolean = false
): ReactNode {
  if (!meta || meta.length < 1) return;
  const metas: ReactNode = meta.map(
    (meta: WuiSelectableTemplateSitewideMetaData) => {
      const { text, highlightSearchString, className, ...rest } = meta;
      if (stringsOnly) {
        return ` ${text}`;
      }

      // Start with the base and custom classes
      let metaClasses = classNames(
        'wuiSelectableTemplateSitewide__optionMeta',
        className
      );

      // If they provided a type, create the class and append
      if (meta.type) {
        metaClasses = classNames(
          [`wuiSelectableTemplateSitewide__optionMeta--${meta.type}`],
          metaClasses
        );
      }

      return (
        <WuiHighlight
          search={highlightSearchString ? searchValue : ''}
          className={metaClasses}
          key={text}
          {...rest}>
          {text}
        </WuiHighlight>
      );
    }
  );

  return stringsOnly ? (
    metas
  ) : (
    <span className="wuiSelectableTemplateSitewide__optionMetasList">
      {metas}
    </span>
  );
}
