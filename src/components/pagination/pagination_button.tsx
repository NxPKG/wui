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

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { ExclusiveUnion, PropsForAnchor, PropsForButton } from '../common';
import { WuiButtonEmpty, WuiButtonEmptyProps } from '../button';
import { WuiI18n } from '../i18n';

export type WuiPaginationButtonProps = WuiButtonEmptyProps & {
  isActive?: boolean;
  /**
   * For ellipsis or other non-clickable buttons.
   */
  isPlaceholder?: boolean;
  hideOnMobile?: boolean;
  pageIndex: number;
  totalPages?: number;
};

type WuiPaginationButtonPropsForAnchor = PropsForAnchor<
  WuiPaginationButtonProps
>;

type WuiPaginationButtonPropsForButton = PropsForButton<
  WuiPaginationButtonProps
>;

type Props = ExclusiveUnion<
  WuiPaginationButtonPropsForAnchor,
  WuiPaginationButtonPropsForButton
>;

export const WuiPaginationButton: FunctionComponent<Props> = ({
  className,
  isActive,
  isPlaceholder,
  hideOnMobile,
  pageIndex,
  totalPages,
  ...rest
}) => {
  const classes = classNames('wuiPaginationButton', className, {
    'wuiPaginationButton-isActive': isActive,
    'wuiPaginationButton-isPlaceholder': isPlaceholder,
    'wuiPaginationButton--hideOnMobile': hideOnMobile,
  });

  const props = {
    className: classes,
    size: 'xs',
    color: 'text',
    'data-test-subj': `pagination-button-${pageIndex}`,
    isDisabled: isPlaceholder || isActive,
    ...(isActive && { 'aria-current': true }),
    ...(rest['aria-controls'] && { href: `#${rest['aria-controls']}` }),
    ...rest,
  };

  const pageNumber = pageIndex + 1;

  return (
    <WuiI18n
      token="wuiPaginationButton.longPageString"
      default="Page {page} of {totalPages}"
      values={{ page: pageNumber, totalPages: totalPages }}>
      {(longPageString: string) => (
        <WuiI18n
          token="wuiPaginationButton.shortPageString"
          default="Page {page}"
          values={{ page: pageNumber }}>
          {(shortPageString: string) => (
            <WuiButtonEmpty
              aria-label={totalPages ? longPageString : shortPageString}
              {...(props as WuiButtonEmptyProps)}>
              {pageNumber}
            </WuiButtonEmpty>
          )}
        </WuiI18n>
      )}
    </WuiI18n>
  );
};
