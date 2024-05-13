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
  useMemo,
  ReactElement,
  ChangeEvent,
} from 'react';
import classNames from 'classnames';
import {
  WuiDataGridColumn,
  WuiDataGridColumnVisibility,
  WuiDataGridToolBarVisibilityColumnSelectorOptions,
  WuiDataGridToolBarVisibilityOptions,
} from './data_grid_types';
import { WuiPopover, WuiPopoverFooter, WuiPopoverTitle } from '../popover';
import { WuiI18n } from '../i18n';
import { WuiButtonEmpty } from '../button';
import { WuiFlexGroup, WuiFlexItem } from '../flex';
import { WuiSwitch, WuiFieldText } from '../form';
import {
  WuiDragDropContext,
  WuiDraggable,
  WuiDroppable,
  wuiDragDropReorder,
} from '../drag_and_drop';
import { DropResult } from 'react-beautiful-dnd';
import { WuiIcon } from '../icon';
import { useDependentState } from '../../services';

const getShowColumnSelectorValue = (
  showColumnSelector: WuiDataGridToolBarVisibilityOptions['showColumnSelector'],
  valueName: keyof WuiDataGridToolBarVisibilityColumnSelectorOptions
) => {
  if (showColumnSelector === false) return false;
  if (showColumnSelector == null) return true;
  if (showColumnSelector === true) return true;
  return showColumnSelector[valueName] !== false;
};

export const useColumnSelector = (
  availableColumns: WuiDataGridColumn[],
  columnVisibility: WuiDataGridColumnVisibility,
  showColumnSelector: WuiDataGridToolBarVisibilityOptions['showColumnSelector'],
  displayValues: { [key: string]: string }
): [
  ReactElement,
  WuiDataGridColumn[],
  (columns: string[]) => void,
  (colFrom: string, colTo: string) => void
] => {
  const allowColumnHiding = getShowColumnSelectorValue(
    showColumnSelector,
    'allowHide'
  );
  const allowColumnReorder = getShowColumnSelectorValue(
    showColumnSelector,
    'allowReorder'
  );

  const [sortedColumns, setSortedColumns] = useDependentState(
    () => availableColumns.map(({ id }) => id),
    [availableColumns]
  );

  const { visibleColumns, setVisibleColumns } = columnVisibility;
  const visibleColumnIds = new Set(visibleColumns);

  const [isOpen, setIsOpen] = useState(false);

  function setColumns(nextColumns: string[]) {
    setSortedColumns(nextColumns);

    const nextVisibleColumns = nextColumns.filter(id =>
      visibleColumnIds.has(id)
    );
    setVisibleColumns(nextVisibleColumns);
  }

  function onDragEnd({
    source: { index: sourceIndex },
    destination,
  }: DropResult) {
    const destinationIndex = destination!.index;
    const nextSortedColumns = wuiDragDropReorder(
      sortedColumns,
      sourceIndex,
      destinationIndex
    );
    setColumns(nextSortedColumns);
  }

  const numberOfHiddenFields = availableColumns.length - visibleColumns.length;

  const [columnSearchText, setColumnSearchText] = useState('');

  const controlBtnClasses = classNames('wuiDataGrid__controlBtn', {
    'wuiDataGrid__controlBtn--active': numberOfHiddenFields > 0,
  });

  const filteredColumns = sortedColumns.filter(
    id => id.toLowerCase().indexOf(columnSearchText.toLowerCase()) !== -1
  );

  const isDragEnabled = allowColumnReorder && columnSearchText.length === 0; // only allow drag-and-drop when not filtering columns

  let buttonText = (
    <WuiI18n token="wuiColumnSelector.button" default="Columns" />
  );

  if (numberOfHiddenFields === 1) {
    buttonText = (
      <WuiI18n
        token="wuiColumnSelector.buttonActiveSingular"
        default="{numberOfHiddenFields} column hidden"
        values={{ numberOfHiddenFields }}
      />
    );
  } else if (numberOfHiddenFields > 1) {
    buttonText = (
      <WuiI18n
        token="wuiColumnSelector.buttonActivePlural"
        default="{numberOfHiddenFields} columns hidden"
        values={{ numberOfHiddenFields }}
      />
    );
  }

  const columnSelector = (
    <WuiPopover
      data-test-subj="dataGridColumnSelectorPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downLeft"
      ownFocus
      panelPaddingSize="s"
      panelClassName="wuiDataGridColumnSelectorPopover"
      button={
        <WuiButtonEmpty
          size="xs"
          iconType={allowColumnHiding ? 'listAdd' : 'list'}
          color="text"
          className={controlBtnClasses}
          data-test-subj="dataGridColumnSelectorButton"
          onClick={() => setIsOpen(!isOpen)}>
          {buttonText}
        </WuiButtonEmpty>
      }>
      <div>
        {allowColumnHiding && (
          <WuiPopoverTitle>
            <WuiI18n
              tokens={[
                'wuiColumnSelector.search',
                'wuiColumnSelector.searchcolumns',
              ]}
              defaults={['Search', 'Search columns']}>
              {([search, searchcolumns]: string[]) => (
                <WuiFieldText
                  compressed
                  placeholder={search}
                  aria-label={searchcolumns}
                  value={columnSearchText}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setColumnSearchText(e.currentTarget.value)
                  }
                />
              )}
            </WuiI18n>
          </WuiPopoverTitle>
        )}
        <div className="wuiDataGrid__controlScroll">
          <WuiDragDropContext onDragEnd={onDragEnd}>
            <WuiDroppable
              droppableId="columnOrder"
              isDropDisabled={!isDragEnabled}>
              <Fragment>
                {filteredColumns.map((id, index) => (
                  <WuiDraggable
                    key={id}
                    draggableId={id}
                    index={index}
                    isDragDisabled={!isDragEnabled}>
                    {(provided, state) => (
                      <div
                        className={`wuiDataGridColumnSelector__item ${state.isDragging &&
                          'wuiDataGridColumnSelector__item-isDragging'}`}>
                        <WuiFlexGroup gutterSize="m" alignItems="center">
                          <WuiFlexItem>
                            {allowColumnHiding ? (
                              <WuiSwitch
                                name={id}
                                label={displayValues[id] || id}
                                checked={visibleColumnIds.has(id)}
                                compressed
                                className="wuiSwitch--mini"
                                onChange={event => {
                                  const {
                                    target: { checked },
                                  } = event;
                                  const nextVisibleColumns = sortedColumns.filter(
                                    columnId =>
                                      checked
                                        ? visibleColumnIds.has(columnId) ||
                                          id === columnId
                                        : visibleColumnIds.has(columnId) &&
                                          id !== columnId
                                  );
                                  setVisibleColumns(nextVisibleColumns);
                                }}
                              />
                            ) : (
                              <span className="wuiDataGridColumnSelector__itemLabel">
                                {id}
                              </span>
                            )}
                          </WuiFlexItem>
                          {isDragEnabled && (
                            <WuiFlexItem grow={false}>
                              <WuiIcon type="grab" color="subdued" />
                            </WuiFlexItem>
                          )}
                        </WuiFlexGroup>
                      </div>
                    )}
                  </WuiDraggable>
                ))}
              </Fragment>
            </WuiDroppable>
          </WuiDragDropContext>
        </div>
      </div>
      {allowColumnHiding && (
        <WuiPopoverFooter>
          <WuiFlexGroup gutterSize="s" justifyContent="spaceBetween">
            <WuiFlexItem grow={false}>
              <WuiButtonEmpty
                size="xs"
                flush="left"
                onClick={() => setVisibleColumns(sortedColumns)}>
                <WuiI18n
                  token="wuiColumnSelector.selectAll"
                  default="Show all"
                />
              </WuiButtonEmpty>
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiButtonEmpty
                size="xs"
                flush="right"
                onClick={() => setVisibleColumns([])}>
                <WuiI18n token="wuiColumnSelector.hideAll" default="Hide all" />
              </WuiButtonEmpty>
            </WuiFlexItem>
          </WuiFlexGroup>
        </WuiPopoverFooter>
      )}
    </WuiPopover>
  );

  const orderedVisibleColumns = useMemo(
    () =>
      visibleColumns
        .map<WuiDataGridColumn>(
          columnId =>
            availableColumns.find(
              ({ id }) => id === columnId
            ) as WuiDataGridColumn // cast to avoid `undefined`, it filters those out next
        )
        .filter(column => column != null),
    [availableColumns, visibleColumns]
  );
  /**
   * Used for moving columns left/right, available in the headers actions menu
   */
  const switchColumnPos = (fromColId: string, toColId: string) => {
    const moveFromIdx = sortedColumns.indexOf(fromColId);
    const moveToIdx = sortedColumns.indexOf(toColId);
    if (moveFromIdx === -1 || moveToIdx === -1) {
      return;
    }
    const nextSortedColumns = [...sortedColumns];
    nextSortedColumns.splice(moveFromIdx, 1);
    nextSortedColumns.splice(moveToIdx, 0, fromColId);
    setColumns(nextSortedColumns);
  };

  return [
    columnSelector,
    orderedVisibleColumns,
    setVisibleColumns,
    switchColumnPos,
  ];
};
