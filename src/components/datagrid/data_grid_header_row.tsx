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

import React, { HTMLAttributes, forwardRef } from 'react';
import classnames from 'classnames';
import {
  WuiDataGridColumnWidths,
  WuiDataGridColumn,
  WuiDataGridSorting,
  WuiDataGridFocusedCell,
  WuiDataGridControlColumn,
} from './data_grid_types';
import { CommonProps } from '../common';
import { WuiDataGridSchema } from './data_grid_schema';
import { WuiDataGridDataRowProps } from './data_grid_data_row';
import { WuiDataGridHeaderCell } from './data_grid_header_cell';
import { WuiDataGridControlHeaderCell } from './data_grid_control_header_cell';

export interface WuiDataGridHeaderRowPropsSpecificProps {
  leadingControlColumns?: WuiDataGridControlColumn[];
  trailingControlColumns?: WuiDataGridControlColumn[];
  columns: WuiDataGridColumn[];
  columnWidths: WuiDataGridColumnWidths;
  schema: WuiDataGridSchema;
  defaultColumnWidth?: number | null;
  setColumnWidth: (columnId: string, width: number) => void;
  setVisibleColumns: (columnId: string[]) => void;
  switchColumnPos: (colFromId: string, colToId: string) => void;
  sorting?: WuiDataGridSorting;
  focusedCell?: WuiDataGridFocusedCell;
  onCellFocus: WuiDataGridDataRowProps['onCellFocus'];
  headerIsInteractive: boolean;
}

export type WuiDataGridHeaderRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  WuiDataGridHeaderRowPropsSpecificProps;

const WuiDataGridHeaderRow = forwardRef<
  HTMLDivElement,
  WuiDataGridHeaderRowProps
>((props, ref) => {
  const {
    leadingControlColumns = [],
    trailingControlColumns = [],
    columns,
    schema,
    columnWidths,
    defaultColumnWidth,
    className,
    setColumnWidth,
    setVisibleColumns,
    switchColumnPos,
    sorting,
    focusedCell,
    onCellFocus: setFocusedCell,
    headerIsInteractive,
    'data-test-subj': _dataTestSubj,
    ...rest
  } = props;

  const classes = classnames('wuiDataGridHeader', className);
  const dataTestSubj = classnames('dataGridHeader', _dataTestSubj);

  return (
    <div
      role="row"
      ref={ref}
      className={classes}
      data-test-subj={dataTestSubj}
      {...rest}>
      {leadingControlColumns.map((controlColumn, index) => (
        <WuiDataGridControlHeaderCell
          key={controlColumn.id}
          index={index}
          controlColumn={controlColumn}
          focusedCell={focusedCell}
          setFocusedCell={setFocusedCell}
          headerIsInteractive={headerIsInteractive}
          className="wuiDataGridHeaderCell--controlColumn"
        />
      ))}
      {columns.map((column, index) => (
        <WuiDataGridHeaderCell
          key={column.id}
          column={column}
          columns={columns}
          index={index + leadingControlColumns.length}
          columnWidths={columnWidths}
          focusedCell={focusedCell}
          onCellFocus={setFocusedCell}
          schema={schema}
          setColumnWidth={setColumnWidth}
          setVisibleColumns={setVisibleColumns}
          switchColumnPos={switchColumnPos}
          defaultColumnWidth={defaultColumnWidth}
          sorting={sorting}
          headerIsInteractive={headerIsInteractive}
        />
      ))}
      {trailingControlColumns.map((controlColumn, index) => (
        <WuiDataGridControlHeaderCell
          key={controlColumn.id}
          index={index + leadingControlColumns.length + columns.length}
          controlColumn={controlColumn}
          focusedCell={focusedCell}
          setFocusedCell={setFocusedCell}
          headerIsInteractive={headerIsInteractive}
          className="wuiDataGridHeaderCell--controlColumn"
        />
      ))}
    </div>
  );
});

WuiDataGridHeaderRow.displayName = 'WuiDataGridHeaderRow';

export { WuiDataGridHeaderRow };
