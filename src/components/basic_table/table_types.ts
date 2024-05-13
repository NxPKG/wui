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

import { ReactElement, ReactNode, TdHTMLAttributes } from 'react';
import { Direction, HorizontalAlignment } from '../../services';
import { Pagination } from './pagination_bar';
import { Action } from './action_types';
import { Primitive } from '../../services/sort/comparators';
import { CommonProps } from '../common';

export type ItemId<T> = string | number | ((item: T) => string);
export type ItemIdResolved = string | number;

export type WuiTableDataType =
  | 'auto'
  | 'string'
  | 'number'
  | 'boolean'
  | 'date';

export interface WuiTableFooterProps<T> {
  items: T[];
  pagination?: Pagination;
}
export interface WuiTableFieldDataColumnType<T>
  extends CommonProps,
    TdHTMLAttributes<HTMLTableDataCellElement> {
  field: keyof T | string; // supports outer.inner key paths
  name: ReactNode;
  description?: string;
  dataType?: WuiTableDataType;
  width?: string;
  sortable?: boolean | ((item: T) => Primitive);
  isExpander?: boolean;
  textOnly?: boolean;
  align?: HorizontalAlignment;
  truncateText?: boolean;
  isMobileHeader?: boolean;
  mobileOptions?: {
    show?: boolean;
    only?: boolean;
    render?: (item: T) => ReactNode;
    header?: boolean;
  };
  hideForMobile?: boolean;
  render?: (value: any, record: T) => ReactNode;
  footer?:
    | string
    | ReactElement
    | ((props: WuiTableFooterProps<T>) => ReactNode);
}

export interface WuiTableComputedColumnType<T>
  extends CommonProps,
    TdHTMLAttributes<HTMLTableDataCellElement> {
  render: (record: T) => ReactNode;
  name?: ReactNode;
  description?: string;
  sortable?: (item: T) => Primitive;
  width?: string;
  truncateText?: boolean;
  isExpander?: boolean;
  align?: HorizontalAlignment;
}

export interface WuiTableActionsColumnType<T> {
  actions: Array<Action<T>>;
  name?: ReactNode;
  description?: string;
  width?: string;
}

export interface WuiTableSortingType<T> {
  sort?: {
    field: keyof T;
    direction: Direction;
  };
  allowNeutralSort?: boolean;
  enableAllColumns?: boolean;
}

export interface WuiTableSelectionType<T> {
  onSelectionChange?: (selection: T[]) => void;
  selectable?: (item: T) => boolean;
  selectableMessage?: (selectable: boolean, item: T) => string;
  initialSelected?: T[];
}
