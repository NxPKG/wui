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
  AriaAttributes,
  FunctionComponent,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { htmlIdGenerator } from '../../services/accessibility';
import classnames from 'classnames';
import { WuiDataGridHeaderRowPropsSpecificProps } from './data_grid_header_row';
import { keys } from '../../services';
import { WuiDataGridColumnResizer } from './data_grid_column_resizer';
import { WuiPopover } from '../popover';
import { WuiListGroup } from '../list_group';
import { WuiScreenReaderOnly } from '../accessibility';
import tabbable from 'tabbable';
import { WuiDataGridColumn } from './data_grid_types';
import { getColumnActions } from './column_actions';
import { useWuiI18n } from '../i18n';
import { WuiIcon } from '../icon';

export interface WuiDataGridHeaderCellProps
  extends Omit<
    WuiDataGridHeaderRowPropsSpecificProps,
    'leadingControlColumns'
  > {
  column: WuiDataGridColumn;
  index: number;
  className?: string;
}

export const WuiDataGridHeaderCell: FunctionComponent<WuiDataGridHeaderCellProps> = props => {
  const {
    column,
    index,
    columns,
    columnWidths,
    schema,
    defaultColumnWidth,
    setColumnWidth,
    setVisibleColumns,
    switchColumnPos,
    sorting,
    focusedCell,
    onCellFocus: setFocusedCell,
    headerIsInteractive,
    className,
  } = props;
  const { id, display } = column;

  const width = columnWidths[id] || defaultColumnWidth;

  const ariaProps: {
    'aria-sort'?: AriaAttributes['aria-sort'];
    'aria-describedby'?: AriaAttributes['aria-describedby'];
  } = {};

  const screenReaderId = htmlIdGenerator()();
  let sortString;
  const actionButtonAriaLabel = useWuiI18n(
    'wuiDataGridHeaderCell.headerActions',
    'Header actions'
  );

  if (sorting) {
    const sortedColumnIds = new Set(sorting.columns.map(({ id }) => id));

    if (sorting.columns.length === 1 && sortedColumnIds.has(id)) {
      const sortDirection = sorting.columns[0].direction;

      let sortValue: HTMLAttributes<HTMLDivElement>['aria-sort'] = 'other';
      if (sortDirection === 'asc') {
        sortValue = 'ascending';
      } else if (sortDirection === 'desc') {
        sortValue = 'descending';
      }

      ariaProps['aria-sort'] = sortValue;
    } else if (sorting.columns.length >= 2 && sortedColumnIds.has(id)) {
      sortString = sorting.columns
        .map(col => `Sorted by ${col.id} ${col.direction}`)
        .join(' then ');
      ariaProps['aria-describedby'] = screenReaderId;
    }
  }

  const columnType = schema[id] ? schema[id].columnType : null;

  const classes = classnames(
    'wuiDataGridHeaderCell',
    {
      [`wuiDataGridHeaderCell--${columnType}`]: columnType,
    },
    className
  );

  const headerRef = useRef<HTMLDivElement>(null);
  const isFocused =
    focusedCell != null && focusedCell[0] === index && focusedCell[1] === -1;
  const [isCellEntered, setIsCellEntered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const enableInteractives = useCallback(() => {
    if (headerRef.current) {
      const interactiveElements = headerRef.current.querySelectorAll(
        '[data-wuigrid-tab-managed]'
      );
      for (let i = 0; i < interactiveElements.length; i++) {
        interactiveElements[i].setAttribute('tabIndex', '0');
      }
    }
  }, []);

  const disableInteractives = useCallback(() => {
    if (headerRef.current) {
      const tababbles = tabbable(headerRef.current);
      if (tababbles.length > 1) {
        console.warn(
          `WuiDataGridHeaderCell expects at most 1 tabbable element, ${tababbles.length} found instead`
        );
      }
      for (let i = 0; i < tababbles.length; i++) {
        const element = tababbles[i];
        element.setAttribute('data-wuigrid-tab-managed', 'true');
        element.setAttribute('tabIndex', '-1');
      }
    }
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      if (isCellEntered) {
        enableInteractives();
        const tabbables = tabbable(headerRef.current!);
        if (tabbables.length > 0) {
          tabbables[0].focus();
        }
      } else {
        disableInteractives();
      }
    }
  }, [disableInteractives, enableInteractives, isCellEntered]);

  useEffect(() => {
    if (headerRef.current) {
      if (isFocused) {
        const interactives = headerRef.current.querySelectorAll(
          '[data-wuigrid-tab-managed]'
        );
        if (interactives.length === 1) {
          setIsCellEntered(true);
        } else {
          headerRef.current.focus();
        }
      } else {
        setIsCellEntered(false);
      }

      // focusin bubbles while focus does not, and this needs to react to children gaining focus
      function onFocusIn(e: FocusEvent) {
        if (!headerIsInteractive) {
          // header is not interactive, avoid focusing
          requestAnimationFrame(() => headerRef.current!.blur());
          e.preventDefault();
          return false;
        } else {
          // take the focus
          if (
            focusedCell == null ||
            focusedCell[0] !== index ||
            focusedCell[1] !== -1
          ) {
            setFocusedCell([index, -1]);
          } else if (headerRef.current) {
            // this cell already had the grid's focus, so re-enable interactives
            enableInteractives();
            setIsCellEntered(true);

            // if there is only one interactive element shift focus to the interactive element
            const tabbables = tabbable(headerRef.current);
            if (tabbables.length === 1) {
              tabbables[0].focus();
            }
          }
        }
      }

      // focusout bubbles while blur does not, and this needs to react to the children losing focus
      function onFocusOut() {
        // wait for the next element to receive focus, then update interactives' state
        requestAnimationFrame(() => {
          if (headerRef.current) {
            if (!headerRef.current.contains(document.activeElement)) {
              setIsCellEntered(false);
            }
          }
        });
      }

      function onKeyUp(event: KeyboardEvent) {
        switch (event.key) {
          case keys.ENTER: {
            event.preventDefault();
            setIsCellEntered(true);
            break;
          }
          case keys.ESCAPE: {
            event.preventDefault();
            // move focus to cell
            setIsCellEntered(false);
            headerRef.current!.focus();
            break;
          }
          case keys.F2: {
            event.preventDefault();
            if (document.activeElement === headerRef.current) {
              // move focus into cell's interactives
              setIsCellEntered(true);
            } else {
              // move focus to cell
              setIsCellEntered(false);
              headerRef.current!.focus();
            }
            break;
          }
        }
      }

      const headerNode = headerRef.current;
      // @ts-ignore-next line TS doesn't have focusin
      headerNode.addEventListener('focusin', onFocusIn);
      headerNode.addEventListener('focusout', onFocusOut);
      headerNode.addEventListener('keyup', onKeyUp);
      return () => {
        // @ts-ignore-next line TS doesn't have focusin
        headerNode.removeEventListener('focusin', onFocusIn);
        headerNode.removeEventListener('focusout', onFocusOut);
        headerNode.removeEventListener('keyup', onKeyUp);
      };
    }
  }, [
    enableInteractives,
    headerIsInteractive,
    isFocused,
    setIsCellEntered,
    focusedCell,
    setFocusedCell,
    index,
  ]);

  const columnActions = getColumnActions(
    column,
    columns,
    setVisibleColumns,
    setIsPopoverOpen,
    sorting,
    switchColumnPos
  );

  const showColumnActions = columnActions && columnActions.length > 0;

  return (
    <div
      role="columnheader"
      {...ariaProps}
      ref={headerRef}
      tabIndex={isFocused && !isCellEntered ? 0 : -1}
      className={classes}
      data-test-subj={`dataGridHeaderCell-${id}`}
      style={width != null ? { width: `${width}px` } : {}}>
      {column.isResizable !== false && width != null ? (
        <WuiDataGridColumnResizer
          columnId={id}
          columnWidth={width}
          setColumnWidth={setColumnWidth}
        />
      ) : null}

      {sorting && sorting.columns.length >= 2 && (
        <WuiScreenReaderOnly>
          <div id={screenReaderId}>{sortString}</div>
        </WuiScreenReaderOnly>
      )}
      {!showColumnActions ? (
        <div className="wuiDataGridHeaderCell__content">{display || id}</div>
      ) : (
        <button
          className="wuiDataGridHeaderCell__button"
          onClick={() => setIsPopoverOpen(true)}>
          <div className="wuiDataGridHeaderCell__content">{display || id}</div>
          <WuiPopover
            className="wuiDataGridHeaderCell__popover"
            panelPaddingSize="none"
            anchorPosition="downRight"
            button={
              <WuiIcon
                type="arrowDown"
                size="s"
                color="text"
                aria-label={actionButtonAriaLabel}
                data-test-subj={`dataGridHeaderCellActionButton-${id}`}
              />
            }
            isOpen={isPopoverOpen}
            closePopover={() => setIsPopoverOpen(false)}
            ownFocus={isFocused}>
            <div>
              <WuiListGroup
                listItems={columnActions}
                gutterSize="none"
                data-test-subj={`dataGridHeaderCellActionGroup-${id}`}
              />
            </div>
          </WuiPopover>
        </button>
      )}
    </div>
  );
};
