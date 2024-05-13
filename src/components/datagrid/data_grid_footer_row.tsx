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

import React, { FunctionComponent, HTMLAttributes, memo } from 'react';
import classnames from 'classnames';
import {
  WuiDataGridControlColumn,
  WuiDataGridColumn,
  WuiDataGridColumnWidths,
  WuiDataGridPopoverContent,
  WuiDataGridPopoverContents,
} from './data_grid_types';
import { CommonProps } from '../common';

import { WuiDataGridCell, WuiDataGridCellProps } from './data_grid_cell';
import { WuiDataGridSchema } from './data_grid_schema';
import { WuiText } from '../text';

export type WuiDataGridFooterRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    rowIndex: number;
    leadingControlColumns: WuiDataGridControlColumn[];
    trailingControlColumns: WuiDataGridControlColumn[];
    columns: WuiDataGridColumn[];
    schema: WuiDataGridSchema;
    popoverContents: WuiDataGridPopoverContents;
    columnWidths: WuiDataGridColumnWidths;
    defaultColumnWidth?: number | null;
    focusedCellPositionInTheRow?: number | null;
    renderCellValue: WuiDataGridCellProps['renderCellValue'];
    onCellFocus: Function;
    interactiveCellId: WuiDataGridCellProps['interactiveCellId'];
    visibleRowIndex?: number;
  };

const DefaultColumnFormatter: WuiDataGridPopoverContent = ({ children }) => {
  return <WuiText>{children}</WuiText>;
};

const WuiDataGridFooterRow: FunctionComponent<WuiDataGridFooterRowProps> = memo(
  ({
    leadingControlColumns,
    trailingControlColumns,
    columns,
    schema,
    popoverContents,
    columnWidths,
    defaultColumnWidth,
    className,
    renderCellValue,
    rowIndex,
    focusedCellPositionInTheRow,
    onCellFocus,
    interactiveCellId,
    'data-test-subj': _dataTestSubj,
    visibleRowIndex = rowIndex,
    ...rest
  }) => {
    const classes = classnames(
      'wuiDataGridRow',
      'wuiDataGridFooter',
      className
    );
    const dataTestSubj = classnames('dataGridRow', _dataTestSubj);

    return (
      <div
        role="row"
        className={classes}
        data-test-subj={dataTestSubj}
        {...rest}>
        {leadingControlColumns.map(({ id, width }, i) => (
          <WuiDataGridCell
            key={`${id}-${rowIndex}`}
            rowIndex={rowIndex}
            visibleRowIndex={visibleRowIndex}
            colIndex={i}
            columnId={id}
            popoverContent={DefaultColumnFormatter}
            width={width}
            renderCellValue={() => null}
            onCellFocus={onCellFocus}
            isFocused={focusedCellPositionInTheRow === i}
            interactiveCellId={interactiveCellId}
            isExpandable={true}
            className="wuiDataGridFooterCell wuiDataGridRowCell--controlColumn"
          />
        ))}
        {columns.map(({ id }, i) => {
          const columnType = schema[id] ? schema[id].columnType : null;
          const popoverContent =
            (columnType && popoverContents[columnType]) ||
            DefaultColumnFormatter;

          const width = columnWidths[id] || defaultColumnWidth;
          const columnPosition = i + leadingControlColumns.length;

          return (
            <WuiDataGridCell
              key={`${id}-${rowIndex}`}
              rowIndex={rowIndex}
              visibleRowIndex={visibleRowIndex}
              colIndex={columnPosition}
              columnId={id}
              columnType={columnType}
              popoverContent={popoverContent}
              width={width || undefined}
              renderCellValue={renderCellValue}
              onCellFocus={onCellFocus}
              isFocused={focusedCellPositionInTheRow === columnPosition}
              interactiveCellId={interactiveCellId}
              isExpandable={true}
              className="wuiDataGridFooterCell"
            />
          );
        })}
        {trailingControlColumns.map(({ id, width }, i) => {
          const colIndex = i + columns.length + leadingControlColumns.length;

          return (
            <WuiDataGridCell
              key={`${id}-${rowIndex}`}
              rowIndex={rowIndex}
              visibleRowIndex={visibleRowIndex}
              colIndex={colIndex}
              columnId={id}
              popoverContent={DefaultColumnFormatter}
              width={width}
              renderCellValue={() => null}
              onCellFocus={onCellFocus}
              isFocused={focusedCellPositionInTheRow === colIndex}
              interactiveCellId={interactiveCellId}
              isExpandable={true}
              className="wuiDataGridFooterCell wuiDataGridRowCell--controlColumn"
            />
          );
        })}
      </div>
    );
  }
);

export { WuiDataGridFooterRow };
