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

import React, { FunctionComponent, ReactChild } from 'react';
import { WuiI18n } from '../i18n';
import { WuiDraggable } from '../drag_and_drop';
import { WuiScreenReaderOnly } from '../accessibility';
import { WuiFlexGroup, WuiFlexItem } from '../flex';
import { WuiButtonIcon, WuiButtonGroup } from '../button';
import { WuiIcon } from '../icon';
import { WuiText } from '../text';
import {
  getDetailsForSchema,
  WuiDataGridSchema,
  WuiDataGridSchemaDetector,
} from './data_grid_schema';
import { WuiDataGridSorting } from './data_grid_types';
import { WuiToken } from '../token';

export interface WuiDataGridColumnSortingDraggableProps {
  id: string;
  direction: string;
  index: number;
  sorting: WuiDataGridSorting;
  schema: WuiDataGridSchema;
  schemaDetectors: WuiDataGridSchemaDetector[];
  /**
   * Value to be shown in column sorting popover.
   */
  display: string;
}

export const WuiDataGridColumnSortingDraggable: FunctionComponent<WuiDataGridColumnSortingDraggableProps> = ({
  id,
  display,
  direction,
  index,
  sorting,
  schema,
  schemaDetectors,
  ...rest
}) => {
  const schemaDetails =
    schema.hasOwnProperty(id) && schema[id].columnType != null
      ? getDetailsForSchema(schemaDetectors, schema[id].columnType)
      : null;

  const textSortAsc =
    schemaDetails != null ? (
      schemaDetails.sortTextAsc
    ) : (
      <WuiI18n token="wuiColumnSortingDraggable.defaultSortAsc" default="A-Z" />
    );

  const textSortDesc =
    schemaDetails != null ? (
      schemaDetails.sortTextDesc
    ) : (
      <WuiI18n
        token="wuiColumnSortingDraggable.defaultSortDesc"
        default="Z-A"
      />
    );

  const toggleOptions = [
    {
      id: `${id}Asc`,
      value: 'asc',
      label: textSortAsc,
      'data-test-subj': `wuiDataGridColumnSorting-sortColumn-${id}-asc`,
    },
    {
      id: `${id}Desc`,
      value: 'desc',
      label: textSortDesc,
      'data-test-subj': `wuiDataGridColumnSorting-sortColumn-${id}-desc`,
    },
  ];

  return (
    <WuiDraggable draggableId={id} index={index} {...rest}>
      {(provided, state) => (
        <div
          className={`wuiDataGridColumnSorting__item ${state.isDragging &&
            'wuiDataGridColumnSorting__item-isDragging'}`}>
          <WuiScreenReaderOnly>
            <p>
              <WuiI18n
                token="wuiColumnSortingDraggable.activeSortLabel"
                default="is sorting this data grid">
                {(activeSortLabel: ReactChild) => (
                  <span>
                    {display} {activeSortLabel}
                  </span>
                )}
              </WuiI18n>
            </p>
          </WuiScreenReaderOnly>
          <WuiFlexGroup
            gutterSize="xs"
            alignItems="center"
            responsive={false}
            data-test-subj={`wuiDataGridColumnSorting-sortColumn-${id}`}>
            <WuiFlexItem grow={false}>
              <WuiI18n
                token="wuiColumnSortingDraggable.removeSortLabel"
                default="Remove from data grid sort:">
                {(removeSortLabel: ReactChild) => (
                  <WuiButtonIcon
                    color="text"
                    size="s"
                    className="wuiDataGridColumnSorting__button"
                    aria-label={`${removeSortLabel} ${id}`}
                    iconType="cross"
                    onClick={() => {
                      const nextColumns = [...sorting.columns];
                      const columnIndex = nextColumns
                        .map(({ id }) => id)
                        .indexOf(id);
                      nextColumns.splice(columnIndex, 1);
                      sorting.onSort(nextColumns);
                    }}
                  />
                )}
              </WuiI18n>
            </WuiFlexItem>

            <WuiFlexItem grow={false}>
              <WuiToken
                color={schemaDetails != null ? schemaDetails.color : undefined}
                iconType={
                  schemaDetails != null ? schemaDetails.icon : 'tokenString'
                }
              />
            </WuiFlexItem>
            <WuiFlexItem aria-hidden>
              <WuiText size="xs">
                <p>{display}</p>
              </WuiText>
            </WuiFlexItem>
            <WuiFlexItem className="wuiDataGridColumnSorting__orderButtons">
              <WuiI18n
                token="wuiColumnSortingDraggable.toggleLegend"
                default="Select sorting method for field: ">
                {(toggleLegend: ReactChild) => (
                  <WuiButtonGroup
                    legend={`${toggleLegend} ${id}`}
                    options={toggleOptions}
                    data-test-subj={`-${direction}`}
                    buttonSize="compressed"
                    className="wuiDataGridColumnSorting__order"
                    idSelected={direction === 'asc' ? `${id}Asc` : `${id}Desc`}
                    onChange={(_, direction) => {
                      const nextColumns = [...sorting.columns];
                      const columnIndex = nextColumns
                        .map(({ id }) => id)
                        .indexOf(id);
                      nextColumns.splice(columnIndex, 1, {
                        id,
                        direction,
                      });
                      sorting.onSort(nextColumns);
                    }}
                  />
                )}
              </WuiI18n>
            </WuiFlexItem>
            <WuiFlexItem grow={false} {...provided.dragHandleProps}>
              <div {...provided.dragHandleProps}>
                <WuiIcon type="grab" color="subdued" />
              </div>
            </WuiFlexItem>
          </WuiFlexGroup>
        </div>
      )}
    </WuiDraggable>
  );
};
