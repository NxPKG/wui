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
  Fragment,
  useState,
  ReactChild,
  ReactNode,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { WuiDataGridColumn, WuiDataGridSorting } from './data_grid_types';
import { WuiPopover, WuiPopoverFooter } from '../popover';
import { WuiI18n } from '../i18n';
import { WuiText } from '../text';
import { WuiButtonEmpty } from '../button';
import { WuiFlexGroup, WuiFlexItem } from '../flex';
import {
  WuiDragDropContext,
  WuiDroppable,
  wuiDragDropReorder,
} from '../drag_and_drop';
import { DropResult } from 'react-beautiful-dnd';
import { WuiDataGridColumnSortingDraggable } from './column_sorting_draggable';
import {
  WuiDataGridSchema,
  WuiDataGridSchemaDetector,
  getDetailsForSchema,
} from './data_grid_schema';
import { WuiToken } from '../token';

export const useColumnSorting = (
  columns: WuiDataGridColumn[],
  sorting: WuiDataGridSorting | undefined,
  schema: WuiDataGridSchema,
  schemaDetectors: WuiDataGridSchemaDetector[],
  displayValues: { [key: string]: string }
): ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  const [avilableColumnsisOpen, setAvailableColumnsIsOpen] = useState(false);
  // prune any non-existent/hidden columns from sorting
  useEffect(() => {
    if (sorting) {
      const nextSortingColumns: WuiDataGridSorting['columns'] = [];

      const availableColumnIds = new Set(columns.map(({ id }) => id));
      for (let i = 0; i < sorting.columns.length; i++) {
        const column = sorting.columns[i];
        if (availableColumnIds.has(column.id)) {
          nextSortingColumns.push(column);
        }
      }

      // if the column array lengths differ then the sorting columns have been pruned
      if (nextSortingColumns.length !== sorting.columns.length) {
        sorting.onSort(nextSortingColumns);
      }
    }
  }, [columns, sorting]);

  if (sorting == null) return [null];

  const activeColumnIds = new Set(sorting.columns.map(({ id }) => id));
  const { inactiveColumns } = columns.reduce<{
    activeColumns: WuiDataGridColumn[];
    inactiveColumns: WuiDataGridColumn[];
  }>(
    (acc, column) => {
      if (activeColumnIds.has(column.id)) {
        acc.activeColumns.push(column);
      } else {
        acc.inactiveColumns.push(column);
      }
      return acc;
    },
    {
      activeColumns: [],
      inactiveColumns: [],
    }
  );

  function onDragEnd({
    source: { index: sourceIndex },
    destination,
  }: DropResult) {
    const destinationIndex = destination!.index;
    const nextColumns = wuiDragDropReorder(
      sorting!.columns,
      sourceIndex,
      destinationIndex
    );

    sorting!.onSort(nextColumns);
  }

  const controlBtnClasses = classNames('wuiDataGrid__controlBtn', {
    'wuiDataGrid__controlBtn--active': sorting.columns.length > 0,
  });

  const numberOfSortedFields = sorting.columns.length;

  const schemaDetails = (id: string | number) =>
    schema.hasOwnProperty(id) && schema[id].columnType != null
      ? getDetailsForSchema(schemaDetectors, schema[id].columnType)
      : null;

  const inactiveSortableColumns = inactiveColumns.filter(
    ({ id, isSortable }) => {
      const schemaDetail = schemaDetails(id);
      let sortable = true;
      if (isSortable != null) {
        sortable = isSortable;
      } else if (schemaDetail != null) {
        sortable = schemaDetail.hasOwnProperty('isSortable')
          ? schemaDetail.isSortable!
          : true;
      }
      return sortable;
    }
  );

  const columnSorting = (
    <WuiPopover
      data-test-subj="dataGridColumnSortingPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downLeft"
      ownFocus
      panelPaddingSize="s"
      panelClassName="wuiDataGridColumnSortingPopover"
      button={
        <WuiI18n
          tokens={['wuiColumnSorting.button', 'wuiColumnSorting.buttonActive']}
          defaults={['Sort fields', 'fields sorted']}>
          {([button, buttonActive]: ReactChild[]) => (
            <WuiButtonEmpty
              size="xs"
              iconType="sortable"
              color="text"
              className={controlBtnClasses}
              data-test-subj="dataGridColumnSortingButton"
              onClick={() => setIsOpen(!isOpen)}>
              {numberOfSortedFields > 0
                ? `${numberOfSortedFields} ${buttonActive}`
                : button}
            </WuiButtonEmpty>
          )}
        </WuiI18n>
      }>
      {sorting.columns.length > 0 ? (
        <div
          role="region"
          aria-live="assertive"
          className="wuiDataGrid__controlScroll">
          <WuiDragDropContext onDragEnd={onDragEnd}>
            <WuiDroppable droppableId="columnSorting">
              <Fragment>
                {sorting.columns.map(({ id, direction }, index) => {
                  return (
                    <WuiDataGridColumnSortingDraggable
                      key={id}
                      id={id}
                      display={displayValues[id]}
                      direction={direction}
                      index={index}
                      sorting={sorting}
                      schema={schema}
                      schemaDetectors={schemaDetectors}
                    />
                  );
                })}
              </Fragment>
            </WuiDroppable>
          </WuiDragDropContext>
        </div>
      ) : (
        <WuiText size="s" color="subdued">
          <p role="alert">
            <WuiI18n
              token="wuiColumnSorting.emptySorting"
              default="Currently no fields are sorted"
            />
          </p>
        </WuiText>
      )}
      {(inactiveSortableColumns.length > 0 || sorting.columns.length > 0) && (
        <WuiPopoverFooter>
          <WuiFlexGroup
            gutterSize="m"
            justifyContent="spaceBetween"
            responsive={false}>
            <WuiFlexItem grow={false}>
              {inactiveSortableColumns.length > 0 && (
                <WuiPopover
                  data-test-subj="dataGridColumnSortingPopoverColumnSelection"
                  isOpen={avilableColumnsisOpen}
                  closePopover={() => setAvailableColumnsIsOpen(false)}
                  anchorPosition="downLeft"
                  ownFocus
                  panelPaddingSize="s"
                  button={
                    <WuiButtonEmpty
                      size="xs"
                      flush="left"
                      iconType="arrowDown"
                      iconSide="right"
                      onClick={() =>
                        setAvailableColumnsIsOpen(!avilableColumnsisOpen)
                      }>
                      <WuiI18n
                        token="wuiColumnSorting.pickFields"
                        default="Pick fields to sort by"
                      />
                    </WuiButtonEmpty>
                  }>
                  <WuiI18n
                    token="wuiColumnSorting.sortFieldAriaLabel"
                    default="Sort by: ">
                    {(sortFieldAriaLabel: string) => (
                      <div
                        className="wuiDataGridColumnSorting__fieldList"
                        role="listbox">
                        {inactiveSortableColumns.map(
                          ({ id, defaultSortDirection }) => {
                            return (
                              <button
                                key={id}
                                className="wuiDataGridColumnSorting__field"
                                aria-label={`${sortFieldAriaLabel} ${id}`}
                                role="option"
                                aria-selected="false"
                                data-test-subj={`dataGridColumnSortingPopoverColumnSelection-${id}`}
                                onClick={() => {
                                  const nextColumns = [...sorting.columns];
                                  nextColumns.push({
                                    id,
                                    direction:
                                      defaultSortDirection ||
                                      (schemaDetails(id) &&
                                        schemaDetails(id)!
                                          .defaultSortDirection) ||
                                      'asc',
                                  });
                                  sorting.onSort(nextColumns);
                                }}>
                                <WuiFlexGroup
                                  alignItems="center"
                                  gutterSize="s"
                                  component="span"
                                  responsive={false}>
                                  <WuiFlexItem grow={false}>
                                    <WuiToken
                                      iconType={
                                        schemaDetails(id) != null
                                          ? getDetailsForSchema(
                                              schemaDetectors,
                                              schema[id].columnType
                                            ).icon
                                          : 'tokenString'
                                      }
                                      color={
                                        schemaDetails(id) != null
                                          ? getDetailsForSchema(
                                              schemaDetectors,
                                              schema[id].columnType
                                            ).color
                                          : undefined
                                      }
                                    />
                                  </WuiFlexItem>
                                  <WuiFlexItem grow={false}>
                                    <WuiText size="xs">
                                      {displayValues[id]}
                                    </WuiText>
                                  </WuiFlexItem>
                                </WuiFlexGroup>
                              </button>
                            );
                          }
                        )}
                      </div>
                    )}
                  </WuiI18n>
                </WuiPopover>
              )}
            </WuiFlexItem>
            {sorting.columns.length > 0 ? (
              <WuiFlexItem grow={false}>
                <WuiButtonEmpty
                  size="xs"
                  flush="right"
                  onClick={() => sorting.onSort([])}>
                  <WuiI18n
                    token="wuiColumnSorting.clearAll"
                    default="Clear sorting"
                  />
                </WuiButtonEmpty>
              </WuiFlexItem>
            ) : null}
          </WuiFlexGroup>
        </WuiPopoverFooter>
      )}
    </WuiPopover>
  );

  return columnSorting;
};
