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

import React, { Fragment, FunctionComponent, useMemo } from 'react';
import { WuiCodeBlock } from '../code';
import {
  WuiDataGridControlColumn,
  WuiDataGridColumn,
  WuiDataGridColumnWidths,
  WuiDataGridPopoverContents,
  WuiDataGridInMemory,
  WuiDataGridInMemoryValues,
  WuiDataGridPaginationProps,
  WuiDataGridSorting,
  WuiDataGridFocusedCell,
} from './data_grid_types';
import { WuiDataGridCellProps } from './data_grid_cell';
import {
  WuiDataGridDataRow,
  WuiDataGridDataRowProps,
} from './data_grid_data_row';
import {
  WuiDataGridSchema,
  WuiDataGridSchemaDetector,
} from './data_grid_schema';
import { WuiDataGridFooterRow } from './data_grid_footer_row';

export interface WuiDataGridBodyProps {
  columnWidths: WuiDataGridColumnWidths;
  defaultColumnWidth?: number | null;
  leadingControlColumns?: WuiDataGridControlColumn[];
  trailingControlColumns?: WuiDataGridControlColumn[];
  columns: WuiDataGridColumn[];
  schema: WuiDataGridSchema;
  schemaDetectors: WuiDataGridSchemaDetector[];
  popoverContents?: WuiDataGridPopoverContents;
  focusedCell?: WuiDataGridFocusedCell;
  onCellFocus: WuiDataGridDataRowProps['onCellFocus'];
  rowCount: number;
  renderCellValue: WuiDataGridCellProps['renderCellValue'];
  renderFooterCellValue?: WuiDataGridCellProps['renderCellValue'];
  inMemory?: WuiDataGridInMemory;
  inMemoryValues: WuiDataGridInMemoryValues;
  interactiveCellId: WuiDataGridCellProps['interactiveCellId'];
  pagination?: WuiDataGridPaginationProps;
  sorting?: WuiDataGridSorting;
}

const defaultComparator: NonNullable<WuiDataGridSchemaDetector['comparator']> = (
  a,
  b,
  direction
) => {
  if (a < b) return direction === 'asc' ? -1 : 1;
  if (a > b) return direction === 'asc' ? 1 : -1;
  return 0;
};

const providedPopoverContents: WuiDataGridPopoverContents = {
  json: ({ cellContentsElement }) => {
    let formattedText = cellContentsElement.innerText;

    // attempt to pretty-print the json
    try {
      formattedText = JSON.stringify(JSON.parse(formattedText), null, 2);
    } catch (e) {} // eslint-disable-line no-empty

    return (
      <WuiCodeBlock
        isCopyable
        transparentBackground
        paddingSize="none"
        language="json">
        {formattedText}
      </WuiCodeBlock>
    );
  },
};

export const WuiDataGridBody: FunctionComponent<WuiDataGridBodyProps> = props => {
  const {
    columnWidths,
    defaultColumnWidth,
    leadingControlColumns = [],
    trailingControlColumns = [],
    columns,
    schema,
    schemaDetectors,
    popoverContents,
    focusedCell,
    onCellFocus,
    rowCount,
    renderCellValue,
    renderFooterCellValue,
    inMemory,
    inMemoryValues,
    interactiveCellId,
    pagination,
    sorting,
  } = props;

  const startRow = pagination ? pagination.pageIndex * pagination.pageSize : 0;
  let endRow = pagination
    ? (pagination.pageIndex + 1) * pagination.pageSize
    : rowCount;
  endRow = Math.min(endRow, rowCount);

  const visibleRowIndices = useMemo(() => {
    const visibleRowIndices = [];
    for (let i = startRow; i < endRow; i++) {
      visibleRowIndices.push(i);
    }
    return visibleRowIndices;
  }, [startRow, endRow]);

  const rowMap = useMemo(() => {
    const rowMap: { [key: number]: number } = {};

    if (
      inMemory?.level === 'sorting' &&
      sorting != null &&
      sorting.columns.length > 0
    ) {
      const inMemoryRowIndices = Object.keys(inMemoryValues);
      const wrappedValues: Array<{
        index: number;
        values: WuiDataGridInMemoryValues[number];
      }> = [];
      for (let i = 0; i < inMemoryRowIndices.length; i++) {
        const inMemoryRow = inMemoryValues[inMemoryRowIndices[i]];
        wrappedValues.push({ index: i, values: inMemoryRow });
      }

      wrappedValues.sort((a, b) => {
        for (let i = 0; i < sorting.columns.length; i++) {
          const column = sorting.columns[i];
          const aValue = a.values[column.id];
          const bValue = b.values[column.id];

          // get the comparator, based on schema
          let comparator = defaultComparator;
          if (schema.hasOwnProperty(column.id)) {
            const columnType = schema[column.id].columnType;
            for (let i = 0; i < schemaDetectors.length; i++) {
              const detector = schemaDetectors[i];
              if (
                detector.type === columnType &&
                detector.hasOwnProperty('comparator')
              ) {
                comparator = detector.comparator!;
              }
            }
          }

          const result = comparator(aValue, bValue, column.direction);
          // only return if the columns are unequal, otherwise allow the next sort-by column to run
          if (result !== 0) return result;
        }

        return 0;
      });

      for (let i = 0; i < wrappedValues.length; i++) {
        rowMap[i] = wrappedValues[i].index;
      }
    }

    return rowMap;
  }, [sorting, inMemory, inMemoryValues, schema, schemaDetectors]);

  const mergedPopoverContents = useMemo(
    () => ({
      ...providedPopoverContents,
      ...popoverContents,
    }),
    [popoverContents]
  );

  const rows = useMemo(() => {
    const rowsToRender = visibleRowIndices.map((rowIndex, i) => {
      rowIndex = rowMap.hasOwnProperty(rowIndex) ? rowMap[rowIndex] : rowIndex;
      return (
        <WuiDataGridDataRow
          key={rowIndex}
          leadingControlColumns={leadingControlColumns}
          trailingControlColumns={trailingControlColumns}
          columns={columns}
          schema={schema}
          popoverContents={mergedPopoverContents}
          columnWidths={columnWidths}
          defaultColumnWidth={defaultColumnWidth}
          focusedCellPositionInTheRow={
            focusedCell != null && i === focusedCell[1] ? focusedCell[0] : null
          }
          onCellFocus={onCellFocus}
          renderCellValue={renderCellValue}
          rowIndex={rowIndex}
          visibleRowIndex={i}
          interactiveCellId={interactiveCellId}
        />
      );
    });

    if (renderFooterCellValue) {
      rowsToRender.push(
        <WuiDataGridFooterRow
          key="footerRow"
          leadingControlColumns={leadingControlColumns}
          trailingControlColumns={trailingControlColumns}
          columns={columns}
          schema={schema}
          popoverContents={mergedPopoverContents}
          columnWidths={columnWidths}
          defaultColumnWidth={defaultColumnWidth}
          focusedCellPositionInTheRow={
            focusedCell != null && visibleRowIndices.length === focusedCell[1]
              ? focusedCell[0]
              : null
          }
          onCellFocus={onCellFocus}
          renderCellValue={renderFooterCellValue}
          rowIndex={visibleRowIndices.length}
          visibleRowIndex={visibleRowIndices.length}
          interactiveCellId={interactiveCellId}
        />
      );
    }

    return rowsToRender;
  }, [
    visibleRowIndices,
    rowMap,
    leadingControlColumns,
    trailingControlColumns,
    columns,
    schema,
    mergedPopoverContents,
    columnWidths,
    defaultColumnWidth,
    focusedCell,
    onCellFocus,
    renderCellValue,
    renderFooterCellValue,
    interactiveCellId,
  ]);

  return <Fragment>{rows}</Fragment>;
};
