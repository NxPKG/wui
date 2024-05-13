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

import React from 'react';
import { WuiDataGridColumn, WuiDataGridSorting } from './data_grid_types';
import { WuiI18n } from '../i18n';
import { WuiListGroupItemProps } from '../list_group';

export function getColumnActions(
  column: WuiDataGridColumn,
  columns: WuiDataGridColumn[],
  setVisibleColumns: (columnId: string[]) => void,
  setIsPopoverOpen: (value: boolean) => void,
  sorting: WuiDataGridSorting | undefined,
  switchColumnPos: (colFromId: string, colToId: string) => void
) {
  if (column.actions === false) {
    return [];
  }
  const colIdx = columns.findIndex(col => col.id === column.id);

  const sortingIdx = sorting
    ? sorting.columns.findIndex(col => col.id === column.id)
    : -1;
  const sortBy = (direction: 'asc' | 'desc' = 'asc') => {
    if (!sorting) {
      return;
    }

    if (
      sortingIdx >= 0 &&
      sorting.columns[sortingIdx]?.direction === direction
    ) {
      // unsort if the same current and new direction are same
      const newColumns = sorting.columns.filter(
        (val, idx) => idx !== sortingIdx
      );
      sorting.onSort(newColumns);
    } else if (sortingIdx >= 0) {
      // replace existing sort
      const newColumns = Object.values({
        ...sorting.columns,
        [sortingIdx]: {
          id: column.id,
          direction: direction,
        },
      });
      sorting.onSort(newColumns as WuiDataGridSorting['columns']);
    } else {
      // add new sort
      const newColumns = [
        ...sorting.columns,
        {
          id: column.id,
          direction: direction,
        },
      ];
      sorting.onSort(newColumns as WuiDataGridSorting['columns']);
    }
  };
  const onClickHideColumn = () =>
    setVisibleColumns(
      columns.filter(col => col.id !== column.id).map(col => col.id)
    );

  const onClickSortAsc = () => {
    sortBy('asc');
  };

  const onClickSortDesc = () => {
    sortBy('desc');
  };

  const onClickMoveLeft = () => {
    const targetCol = columns[colIdx - 1];
    if (targetCol) {
      switchColumnPos(column.id, targetCol.id);
    }
  };

  const onClickMoveRight = () => {
    const targetCol = columns[colIdx + 1];
    if (targetCol) {
      switchColumnPos(column.id, targetCol.id);
    }
  };

  const result: WuiListGroupItemProps[] = [];
  if (column.actions?.showHide !== false) {
    const option = {
      label: (
        <WuiI18n token="wuiColumnActions.hideColumn" default="Hide column" />
      ),
      onClick: onClickHideColumn,
      iconType: 'eyeClosed',
      size: 'xs',
      color: 'text',
    } as WuiListGroupItemProps;
    if (typeof column.actions?.showHide === 'object') {
      result.push({ ...option, ...column.actions.showHide });
    } else {
      result.push(option);
    }
  }

  if (column.actions?.showSortAsc !== false && sorting) {
    const option = {
      label: (
        <WuiI18n token="wuiColumnActions.sortAsc" default="Sort schema asc" />
      ),
      onClick: onClickSortAsc,
      isDisabled: column.isSortable === false,
      className:
        sortingIdx >= 0 && sorting.columns[sortingIdx].direction === 'asc'
          ? 'wuiDataGridHeader__action--selected'
          : '',
      iconType: 'sortUp',
      size: 'xs',
      color: 'text',
    } as WuiListGroupItemProps;
    if (typeof column.actions?.showSortAsc === 'object') {
      result.push({ ...option, ...column.actions.showSortAsc });
    } else {
      result.push(option);
    }
  }

  if (column.actions?.showSortDesc !== false && sorting) {
    const option = {
      label: (
        <WuiI18n token="wuiColumnActions.sortDesc" default="Sort schema desc" />
      ),
      onClick: onClickSortDesc,
      isDisabled: column.isSortable === false,
      className:
        sortingIdx >= 0 && sorting.columns[sortingIdx].direction === 'desc'
          ? 'wuiDataGridHeader__action--selected'
          : '',
      iconType: 'sortDown',
      size: 'xs',
      color: 'text',
    } as WuiListGroupItemProps;
    if (typeof column.actions?.showSortDesc === 'object') {
      result.push({ ...option, ...column.actions.showSortDesc });
    } else {
      result.push(option);
    }
  }

  if (column.actions?.showMoveLeft !== false) {
    const option = {
      label: <WuiI18n token="wuiColumnActions.moveLeft" default="Move left" />,
      iconType: 'sortLeft',
      size: 'xs',
      color: 'text',
      onClick: onClickMoveLeft,
      isDisabled: colIdx === 0,
    } as WuiListGroupItemProps;
    if (typeof column.actions?.showMoveLeft === 'object') {
      result.push({ ...option, ...column.actions.showMoveLeft });
    } else {
      result.push(option);
    }
  }

  if (column.actions?.showMoveRight !== false) {
    const option = {
      label: (
        <WuiI18n token="wuiColumnActions.moveRight" default="Move right" />
      ),
      iconType: 'sortRight',
      size: 'xs',
      color: 'text',
      onClick: onClickMoveRight,
      isDisabled: colIdx === columns.length - 1,
    } as WuiListGroupItemProps;
    if (typeof column.actions?.showMoveRight === 'object') {
      result.push({ ...option, ...column.actions.showMoveRight });
    } else {
      result.push(option);
    }
  }
  const allActions = column.actions?.additional
    ? [...result, ...column.actions?.additional]
    : result;

  //wrap WuiListGroupItem onClick function to close the popover and prevet bubbling up

  return allActions.map(action => {
    return {
      ...action,
      ...{
        onClick: (ev: React.MouseEvent<HTMLButtonElement>) => {
          ev.stopPropagation();
          setIsPopoverOpen(false);
          if (action && action.onClick) {
            action.onClick(ev);
          }
        },
      },
    };
  }) as WuiListGroupItemProps[];
}
