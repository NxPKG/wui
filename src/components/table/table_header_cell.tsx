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
  FunctionComponent,
  HTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { WuiScreenReaderOnly } from '../accessibility';
import { CommonProps, NoArgCallback } from '../common';
import { WuiIcon } from '../icon';
import { resolveWidthAsStyle } from './utils';
import { WuiInnerText } from '../inner_text';

import {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from '../../services';
import { WuiI18n } from '../i18n';

export type TableHeaderCellScope = 'col' | 'row' | 'colgroup' | 'rowgroup';

type Props = CommonProps &
  Omit<ThHTMLAttributes<HTMLTableHeaderCellElement>, 'align' | 'scope'> & {
    align?: HorizontalAlignment;
    /**
     * Set `allowNeutralSort` on WuiInMemoryTable to false to force column
     * sorting.  WuiBasicTable always forces column sorting.
     */
    allowNeutralSort?: boolean;
    /**
     * _DEPRECATED: use `mobileOptions.show = false`_ Indicates if the
     * column should not show for mobile users (typically hidden because a
     * custom mobile header utilizes the column's contents)
     */
    hideForMobile?: boolean;
    /**
     * _DEPRECATED: use `mobileOptions.only = true`_ Indicates if the
     * column was created to be the row's heading in mobile view (this
     * column will be hidden at larger screens)
     */
    isMobileHeader?: boolean;
    isSortAscending?: boolean;
    isSorted?: boolean;
    /**
     * Mobile options for displaying differently at small screens
     */
    mobileOptions?: {
      /**
       * If false, will not render the column at all for mobile
       */
      show?: boolean;
      /**
       * Only show for mobile? If true, will not render the column at all
       * for desktop
       */
      only?: boolean;
    };
    onSort?: NoArgCallback<void>;
    scope?: TableHeaderCellScope;
    width?: string | number;
  };

export const WuiTableHeaderCell: FunctionComponent<Props> = ({
  children,
  align = LEFT_ALIGNMENT,
  onSort,
  isSorted,
  isSortAscending,
  allowNeutralSort,
  className,
  scope = 'col',
  mobileOptions = {
    show: true,
  },
  width,
  // Soon to be deprecated for {...mobileOptions}
  isMobileHeader,
  hideForMobile,
  style,
  ...rest
}) => {
  const classes = classNames('wuiTableHeaderCell', className, {
    'wuiTableHeaderCell--hideForDesktop': mobileOptions.only || isMobileHeader,
    'wuiTableHeaderCell--hideForMobile': !mobileOptions.show || hideForMobile,
  });

  const contentClasses = classNames('wuiTableCellContent', className, {
    'wuiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'wuiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
  });

  const styleObj = resolveWidthAsStyle(style, width);

  const CellComponent = children ? 'th' : 'td';

  if (onSort) {
    const buttonClasses = classNames('wuiTableHeaderButton', {
      'wuiTableHeaderButton-isSorted': isSorted,
    });

    let ariaSortValue: HTMLAttributes<any>['aria-sort'] = 'none';
    if (isSorted) {
      ariaSortValue = isSortAscending ? 'ascending' : 'descending';
    }

    function getScreenCasterDirection() {
      if (ariaSortValue === 'ascending') {
        return (
          <WuiI18n
            token="wuiTableHeaderCell.clickForDescending"
            default="Click to sort in descending order"
          />
        );
      }

      if (allowNeutralSort && ariaSortValue === 'descending') {
        return (
          <WuiI18n
            token="wuiTableHeaderCell.clickForUnsort"
            default="Click to unsort"
          />
        );
      }

      return (
        <WuiI18n
          token="wuiTableHeaderCell.clickForAscending"
          default="Click to sort in ascending order"
        />
      );
    }

    return (
      <CellComponent
        className={classes}
        scope={scope}
        role="columnheader"
        aria-sort={ariaSortValue}
        aria-live="polite"
        style={styleObj}
        {...rest}>
        <button
          type="button"
          className={buttonClasses}
          onClick={onSort}
          data-test-subj="tableHeaderSortButton">
          <span className={contentClasses}>
            <WuiInnerText>
              {(ref, innerText) => (
                <WuiI18n
                  token="wuiTableHeaderCell.titleTextWithSort"
                  default="{innerText}; Sorted in {ariaSortValue} order"
                  values={{ innerText, ariaSortValue }}>
                  {(titleTextWithSort: string) => (
                    <span
                      title={isSorted ? titleTextWithSort : innerText}
                      ref={ref}
                      className="wuiTableCellContent__text">
                      {children}
                    </span>
                  )}
                </WuiI18n>
              )}
            </WuiInnerText>

            {isSorted && (
              <WuiI18n
                token="wuiTableHeaderCell.sortedAriaLabel"
                default="Sorted in {ariaSortValue} order"
                values={{ ariaSortValue }}>
                {(sortedAriaLabel: string) => (
                  <WuiIcon
                    className="wuiTableSortIcon"
                    type={isSortAscending ? 'sortUp' : 'sortDown'}
                    size="m"
                    aria-label={sortedAriaLabel}
                  />
                )}
              </WuiI18n>
            )}
            <WuiScreenReaderOnly>
              <span>{getScreenCasterDirection()}</span>
            </WuiScreenReaderOnly>
          </span>
        </button>
      </CellComponent>
    );
  }

  return (
    <CellComponent
      className={classes}
      scope={scope}
      role="columnheader"
      style={styleObj}
      {...rest}>
      <div className={contentClasses}>
        <WuiInnerText>
          {(ref, innerText) => (
            <span
              title={innerText}
              ref={ref}
              className="wuiTableCellContent__text">
              {children}
            </span>
          )}
        </WuiInnerText>
      </div>
    </CellComponent>
  );
};
