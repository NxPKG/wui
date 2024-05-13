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
  KeyboardEvent,
  useCallback,
  useState,
  useEffect,
  Fragment,
  ReactChild,
  useMemo,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import classNames from 'classnames';
import tabbable from 'tabbable';
import { WuiI18n } from '../i18n';
import { WuiDataGridHeaderRow } from './data_grid_header_row';
import { CommonProps, OneOf } from '../common';
import {
  WuiDataGridColumn,
  WuiDataGridColumnWidths,
  WuiDataGridInMemory,
  WuiDataGridPaginationProps,
  WuiDataGridInMemoryValues,
  WuiDataGridControlColumn,
  WuiDataGridSorting,
  WuiDataGridStyle,
  WuiDataGridStyleBorders,
  WuiDataGridStyleCellPaddings,
  WuiDataGridStyleFontSizes,
  WuiDataGridStyleHeader,
  WuiDataGridStyleRowHover,
  WuiDataGridPopoverContents,
  WuiDataGridColumnVisibility,
  WuiDataGridToolBarVisibilityOptions,
  WuiDataGridFocusedCell,
  WuiDataGridOnColumnResizeHandler,
  WuiDataGridStyleFooter,
} from './data_grid_types';
import { WuiDataGridCellProps } from './data_grid_cell';
import { WuiButtonEmpty } from '../button';
import { keys, htmlIdGenerator } from '../../services';
import { WuiDataGridBody } from './data_grid_body';
import { useColumnSelector } from './column_selector';
import { useStyleSelector, startingStyles } from './style_selector';
import { WuiTablePagination } from '../table/table_pagination';
import { WuiFocusTrap } from '../focus_trap';
import {
  WuiResizeObserver,
  useResizeObserver,
} from '../observer/resize_observer';
import { WuiDataGridInMemoryRenderer } from './data_grid_inmemory_renderer';
import {
  useMergedSchema,
  WuiDataGridSchemaDetector,
  useDetectSchema,
  schemaDetectors as providedSchemaDetectors,
} from './data_grid_schema';
import { useColumnSorting } from './column_sorting';
import { WuiMutationObserver } from '../observer/mutation_observer';
import { DataGridContext } from './data_grid_context';

// Used to short-circuit some async browser behaviour that is difficult to account for in tests
const IS_JEST_ENVIRONMENT = global.hasOwnProperty('_isJest');

// When below this number the grid only shows the full screen button
const MINIMUM_WIDTH_FOR_GRID_CONTROLS = 479;

type CommonGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * An array of #WuiDataGridControlColumn objects. Used to define ancillary columns on the left side of the data grid.
     */
    leadingControlColumns?: WuiDataGridControlColumn[];
    /**
     * An array of #WuiDataGridControlColumn objects. Used to define ancillary columns on the right side of the data grid.
     */
    trailingControlColumns?: WuiDataGridControlColumn[];
    /**
     * An array of #WuiDataGridColumn objects. Lists the columns available and the schema and settings tied to it.
     */
    columns: WuiDataGridColumn[];
    /**
     * An array of #WuiDataGridColumnVisibility objects. Defines which columns are visible in the grid and the order they are displayed.
     */
    columnVisibility: WuiDataGridColumnVisibility;
    /**
     * An array of custom #WuiDataGridSchemaDetector objects. You can inject custom schemas to the grid to define the classnames applied
     */
    schemaDetectors?: WuiDataGridSchemaDetector[];
    /**
     * An object mapping #WuiDataGridColumn `schema`s to a custom popover formatting component which receives #WuiDataGridPopoverContent props
     */
    popoverContents?: WuiDataGridPopoverContents;
    /**
     * The total number of rows in the dataset (used by e.g. pagination to know how many pages to list)
     */
    rowCount: number;
    /**
     * A function called to render a cell's value. Behind the scenes it is treated as a React component
     * allowing hooks, context, and other React concepts to be used. The function receives a #CellValueElement
     * as its only argument.
     */
    renderCellValue: WuiDataGridCellProps['renderCellValue'];
    /**
     * A function called to render a cell's value. Behind the scenes it is treated as a React component
     * allowing hooks, context, and other React concepts to be used. The function receives a #CellValueElement
     * as its only argument.
     */
    renderFooterCellValue?: WuiDataGridCellProps['renderCellValue'];
    /**
     * Defines the look and feel for the grid. Accepts a partial #WuiDataGridStyle object. Settings provided may be overwritten or merged with user defined preferences if toolbarVisibility density controls are available.
     */
    gridStyle?: WuiDataGridStyle;
    /**
     * Accepts either a boolean or #WuiDataGridToolbarVisibilityOptions object. When used as a boolean, defines the display of the toolbar entire. WHen passed an object allows you to turn off individual controls within the toolbar as well as add additional buttons.
     */
    toolbarVisibility?: boolean | WuiDataGridToolBarVisibilityOptions;
    /**
     * A #WuiDataGridInMemory object to definite the level of high order schema-detection and sorting logic to use on your data. *Try to set when possible*. When omitted, disables all enhancements and assumes content is flat strings.
     */
    inMemory?: WuiDataGridInMemory;
    /**
     * A #WuiDataGridPagination object. Omit to disable pagination completely.
     */
    pagination?: WuiDataGridPaginationProps;
    /**
     * A #WuiDataGridSorting object that provides the sorted columns along with their direction. Omit to disable, but you'll likely want to also turn off the user sorting controls through the `toolbarVisibility` prop.
     */
    sorting?: WuiDataGridSorting;
    /**
     * A callback for when a column's size changes. Callback receives `{ columnId: string, width: number }`.
     */
    onColumnResize?: WuiDataGridOnColumnResizeHandler;
    /**
     * Defines a minimum width for the grid to show all controls in its header.
     */
    minSizeForControls?: number;
  };

// Force either aria-label or aria-labelledby to be defined
export type WuiDataGridProps = OneOf<
  CommonGridProps,
  'aria-label' | 'aria-labelledby'
>;

// Each gridStyle object above sets a specific CSS select to .wuiGrid
const fontSizesToClassMap: { [size in WuiDataGridStyleFontSizes]: string } = {
  s: 'wuiDataGrid--fontSizeSmall',
  m: '',
  l: 'wuiDataGrid--fontSizeLarge',
};

const headerToClassMap: { [header in WuiDataGridStyleHeader]: string } = {
  shade: 'wuiDataGrid--headerShade',
  underline: 'wuiDataGrid--headerUnderline',
};

const footerToClassMap: { [footer in WuiDataGridStyleFooter]: string } = {
  shade: 'wuiDataGrid--footerShade',
  overline: 'wuiDataGrid--footerOverline',
  striped: '',
};

const rowHoverToClassMap: {
  [rowHighlight in WuiDataGridStyleRowHover]: string;
} = {
  highlight: 'wuiDataGrid--rowHoverHighlight',
  none: '',
};

const bordersToClassMap: { [border in WuiDataGridStyleBorders]: string } = {
  all: 'wuiDataGrid--bordersAll',
  horizontal: 'wuiDataGrid--bordersHorizontal',
  none: 'wuiDataGrid--bordersNone',
};

const cellPaddingsToClassMap: {
  [cellPaddings in WuiDataGridStyleCellPaddings]: string;
} = {
  s: 'wuiDataGrid--paddingSmall',
  m: '',
  l: 'wuiDataGrid--paddingLarge',
};

function computeVisibleRows(
  props: Pick<WuiDataGridProps, 'pagination' | 'rowCount'>
) {
  const { pagination, rowCount } = props;

  const startRow = pagination ? pagination.pageIndex * pagination.pageSize : 0;
  let endRow = pagination
    ? (pagination.pageIndex + 1) * pagination.pageSize
    : rowCount;
  endRow = Math.min(endRow, rowCount);

  return endRow - startRow;
}

function renderPagination(props: WuiDataGridProps, controls: string) {
  const { pagination } = props;

  if (pagination == null) {
    return null;
  }

  const {
    pageIndex,
    pageSize,
    pageSizeOptions,
    onChangePage,
    onChangeItemsPerPage,
  } = pagination;
  const pageCount = Math.ceil(props.rowCount / pageSize);
  const minSizeOption =
    pageSizeOptions && [...pageSizeOptions].sort((a, b) => a - b)[0];

  if (props.rowCount < (minSizeOption || pageSize)) {
    /**
     * Do not render the pagination when:
     * 1. Rows count is less than min pagination option (rows per page)
     * 2. Rows count is less than pageSize (the case when there are no pageSizeOptions provided)
     */
    return null;
  }

  // hide select rows per page if pageSizeOptions is undefined or an empty array
  const hidePerPageOptions = !pageSizeOptions || pageSizeOptions.length === 0;

  return (
    <WuiI18n
      token="wuiDataGrid.ariaLabelGridPagination"
      default="Pagination for preceding grid: {label}"
      values={{ label: props['aria-label'] }}>
      {(ariaLabelGridPagination: string) => {
        return (
          <WuiI18n
            token="wuiDataGrid.ariaLabelledByGridPagination"
            default="Pagination for preceding grid">
            {(ariaLabelledByGridPagination: string) => {
              const accessibleName = {
                ...(props['aria-label'] && {
                  'aria-label': ariaLabelGridPagination,
                }),
                ...(props['aria-labelledby'] && {
                  'aria-labelledby': ariaLabelledByGridPagination,
                }),
              };

              return (
                <div className="wuiDataGrid__pagination">
                  <WuiTablePagination
                    aria-controls={controls}
                    activePage={pageIndex}
                    hidePerPageOptions={hidePerPageOptions}
                    itemsPerPage={pageSize}
                    itemsPerPageOptions={pageSizeOptions}
                    pageCount={pageCount}
                    onChangePage={onChangePage}
                    onChangeItemsPerPage={onChangeItemsPerPage}
                    {...accessibleName}
                  />
                </div>
              );
            }}
          </WuiI18n>
        );
      }}
    </WuiI18n>
  );
}

function useDefaultColumnWidth(
  container: HTMLElement | null,
  leadingControlColumns: WuiDataGridControlColumn[],
  trailingControlColumns: WuiDataGridControlColumn[],
  columns: WuiDataGridProps['columns']
): number | null {
  const containerSize = useResizeObserver(container, 'width');
  const gridWidth = containerSize.width;

  const computeDefaultWidth = useCallback((): number | null => {
    if (IS_JEST_ENVIRONMENT) return 100;
    if (gridWidth === 0) return null; // we can't tell what size to compute yet

    const controlColumnWidths = [
      ...leadingControlColumns,
      ...trailingControlColumns,
    ].reduce<number>(
      (claimedWidth, controlColumn: WuiDataGridControlColumn) =>
        claimedWidth + controlColumn.width,
      0
    );

    const columnsWithWidths = columns.filter<
      WuiDataGridColumn & { initialWidth: number }
    >(doesColumnHaveAnInitialWidth);

    const definedColumnsWidth = columnsWithWidths.reduce(
      (claimedWidth, column) => claimedWidth + column.initialWidth,
      0
    );

    const claimedWidth = controlColumnWidths + definedColumnsWidth;

    const widthToFill = gridWidth - claimedWidth;
    const unsizedColumnCount = columns.length - columnsWithWidths.length;
    if (unsizedColumnCount === 0) {
      return 100;
    }
    return Math.max(widthToFill / unsizedColumnCount, 100);
  }, [gridWidth, columns, leadingControlColumns, trailingControlColumns]);

  const [defaultColumnWidth, setDefaultColumnWidth] = useState<number | null>(
    computeDefaultWidth
  );

  useEffect(() => {
    const columnWidth = computeDefaultWidth();
    setDefaultColumnWidth(columnWidth);
  }, [computeDefaultWidth]);

  return defaultColumnWidth;
}

function doesColumnHaveAnInitialWidth(
  column: WuiDataGridColumn
): column is WuiDataGridColumn & { initialWidth: number } {
  return column.hasOwnProperty('initialWidth');
}

function useColumnWidths(
  columns: WuiDataGridColumn[],
  onColumnResize?: WuiDataGridOnColumnResizeHandler
): [WuiDataGridColumnWidths, (columnId: string, width: number) => void] {
  const hasMounted = useRef(false);

  const computeColumnWidths = useCallback(() => {
    return columns
      .filter<WuiDataGridColumn & { initialWidth: number }>(
        doesColumnHaveAnInitialWidth
      )
      .reduce<WuiDataGridColumnWidths>((initialWidths, column) => {
        initialWidths[column.id] = column.initialWidth;
        return initialWidths;
      }, {});
  }, [columns]);

  const [columnWidths, setColumnWidths] = useState<WuiDataGridColumnWidths>(
    computeColumnWidths
  );

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setColumnWidths(computeColumnWidths());
  }, [computeColumnWidths]);

  const setColumnWidth = (columnId: string, width: number) => {
    setColumnWidths({ ...columnWidths, [columnId]: width });

    if (onColumnResize) {
      onColumnResize({ columnId, width });
    }
  };

  return [columnWidths, setColumnWidth];
}

function useOnResize(
  setHasRoomForGridControls: (hasRoomForGridControls: boolean) => void,
  isFullScreen: boolean,
  minSizeForControls: number
) {
  return useCallback(
    ({ width }: { width: number }) => {
      setHasRoomForGridControls(width > minSizeForControls || isFullScreen);
    },
    [setHasRoomForGridControls, isFullScreen, minSizeForControls]
  );
}

function useInMemoryValues(
  inMemory: WuiDataGridInMemory | undefined,
  rowCount: number
): [
  WuiDataGridInMemoryValues,
  (rowIndex: number, columnId: string, value: string) => void
] {
  /**
   * For performance, `onCellRender` below mutates the inMemoryValues object
   * instead of cloning. If this operation were done in a setState call
   * React would ignore the update as the object itself has not changed.
   * So, we keep a dual record: the in-memory values themselves and a "version" counter.
   * When the object is mutated, the version is incremented triggering a re-render, and
   * the returned `inMemoryValues` object is re-created (cloned) from the mutated version.
   * The version updates are batched, so only one clone happens per batch.
   **/
  const _inMemoryValues = useRef<WuiDataGridInMemoryValues>({});
  const [inMemoryValuesVersion, setInMemoryValuesVersion] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inMemoryValues = useMemo(() => ({ ..._inMemoryValues.current }), [
    inMemoryValuesVersion,
  ]);

  const onCellRender = useCallback((rowIndex, columnId, value) => {
    const nextInMemoryValues = _inMemoryValues.current;
    nextInMemoryValues[rowIndex] = nextInMemoryValues[rowIndex] || {};
    nextInMemoryValues[rowIndex][columnId] = value;
    setInMemoryValuesVersion(version => version + 1);
  }, []);

  // if `inMemory.level` or `rowCount` changes reset the values
  const inMemoryLevel = inMemory && inMemory.level;
  const resetRunCount = useRef(0);
  useEffect(() => {
    if (resetRunCount.current++ > 0) {
      // this has to delete "overflow" keys from the object instead of resetting to an empty one,
      // as the internal inmemoryrenderer component's useEffect which sets the values
      // executes before this outer, wrapping useEffect
      const existingRowKeyCount = Object.keys(_inMemoryValues.current).length;
      for (let i = rowCount; i < existingRowKeyCount; i++) {
        delete _inMemoryValues.current[i];
      }
      setInMemoryValuesVersion(version => version + 1);
    }
  }, [inMemoryLevel, rowCount]);

  return [inMemoryValues, onCellRender];
}

function createKeyDownHandler(
  props: WuiDataGridProps,
  visibleColumns: WuiDataGridProps['columns'],
  leadingControlColumns: WuiDataGridControlColumn[],
  trailingControlColumns: WuiDataGridControlColumn[],
  focusedCell: WuiDataGridFocusedCell | undefined,
  headerIsInteractive: boolean,
  setFocusedCell: (focusedCell: WuiDataGridFocusedCell) => void,
  updateFocus: Function
) {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    if (focusedCell == null) return;

    const colCount =
      visibleColumns.length +
      leadingControlColumns.length +
      trailingControlColumns.length -
      1;
    const [x, y] = focusedCell;
    const rowCount = computeVisibleRows(props);
    const { key, ctrlKey } = event;

    if (key === keys.ARROW_DOWN) {
      event.preventDefault();
      if (props.renderFooterCellValue ? y < rowCount : y < rowCount - 1) {
        setFocusedCell([x, y + 1]);
      }
    } else if (key === keys.ARROW_LEFT) {
      event.preventDefault();
      if (x > 0) {
        setFocusedCell([x - 1, y]);
      }
    } else if (key === keys.ARROW_UP) {
      event.preventDefault();
      const minimumIndex = headerIsInteractive ? -1 : 0;
      if (y > minimumIndex) {
        setFocusedCell([x, y - 1]);
      }
    } else if (key === keys.ARROW_RIGHT) {
      event.preventDefault();
      if (x < colCount) {
        setFocusedCell([x + 1, y]);
      }
    } else if (key === keys.PAGE_DOWN) {
      if (props.pagination) {
        event.preventDefault();
        const rowCount = props.rowCount;
        const pageIndex = props.pagination.pageIndex;
        const pageSize = props.pagination.pageSize;
        const pageCount = Math.ceil(rowCount / pageSize);
        if (pageIndex < pageCount - 1) {
          props.pagination.onChangePage(pageIndex + 1);
        }
        setFocusedCell([focusedCell[0], 0]);
        updateFocus();
      }
    } else if (key === keys.PAGE_UP) {
      if (props.pagination) {
        event.preventDefault();
        const pageIndex = props.pagination.pageIndex;
        if (pageIndex > 0) {
          props.pagination.onChangePage(pageIndex - 1);
        }
        setFocusedCell([focusedCell[0], props.pagination.pageSize - 1]);
        updateFocus();
      }
    } else if (key === (ctrlKey && keys.END)) {
      event.preventDefault();
      setFocusedCell([colCount, rowCount - 1]);
    } else if (key === (ctrlKey && keys.HOME)) {
      event.preventDefault();
      setFocusedCell([0, 0]);
    } else if (key === keys.END) {
      event.preventDefault();
      setFocusedCell([colCount, y]);
    } else if (key === keys.HOME) {
      event.preventDefault();
      setFocusedCell([0, y]);
    }
  };
}

function useAfterRender(fn: Function): Function {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [needsExecution, setNeedsExecution] = useState(false);

  // first useEffect waits for the parent & children to render & flush to dom
  useEffect(() => {
    if (isSubscribed) {
      setIsSubscribed(false);
      setNeedsExecution(true);
    }
  }, [isSubscribed, setIsSubscribed, setNeedsExecution]);

  // second useEffect allows for a new `fn` to have been created
  // with any state updates before being called
  useEffect(() => {
    if (needsExecution) {
      setNeedsExecution(false);
      fn();
    }
  }, [needsExecution, setNeedsExecution, fn]);

  return () => {
    setIsSubscribed(true);
  };
}

type FocusProps = Pick<HTMLAttributes<HTMLDivElement>, 'tabIndex' | 'onFocus'>;
const useFocus = (
  headerIsInteractive: boolean
): [
  FocusProps,
  WuiDataGridFocusedCell | undefined,
  Dispatch<SetStateAction<WuiDataGridFocusedCell | undefined>>
] => {
  const [focusedCell, setFocusedCell] = useState<
    WuiDataGridFocusedCell | undefined
  >(undefined);

  const hasHadFocus = useMemo(() => focusedCell != null, [focusedCell]);

  const focusProps = useMemo<FocusProps>(
    () =>
      hasHadFocus
        ? {
            // FireFox allows tabbing to a div that is scrollable, while Chrome does not
            tabIndex: -1,
          }
        : {
            tabIndex: 0,
            onFocus: e => {
              // if e.target (the source element of the `focus event`
              // matches e.currentTarget (always the div with this onFocus listener)
              // then the user has focused directly on the data grid wrapper (almost definitely by tabbing)
              // so shift focus to the first interactive cell within the grid
              if (e.target === e.currentTarget) {
                setFocusedCell(headerIsInteractive ? [0, -1] : [0, 0]);
              }
            },
          },
    [hasHadFocus, setFocusedCell, headerIsInteractive]
  );

  return [focusProps, focusedCell, setFocusedCell];
};

// Typeguards to see if toolbarVisibility has a certain boolean property assigned
// If not, just set it to true and assume it's OK to show
function objectHasKey<O extends Record<string, any>, ObjectKey extends keyof O>(
  object: O,
  key: ObjectKey
): object is Required<O> {
  return object.hasOwnProperty(key);
}
function checkOrDefaultToolBarDiplayOptions<
  OptionKey extends keyof WuiDataGridToolBarVisibilityOptions
>(
  arg: WuiDataGridProps['toolbarVisibility'],
  option: OptionKey
): Required<WuiDataGridToolBarVisibilityOptions>[OptionKey] {
  if (arg === undefined) {
    return true;
  } else if (typeof arg === 'boolean') {
    return arg as boolean;
  } else if (objectHasKey(arg, option)) {
    return arg[option];
  } else {
    return true;
  }
}

const emptyArrayDefault: WuiDataGridControlColumn[] = [];
export const WuiDataGrid: FunctionComponent<WuiDataGridProps> = props => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [hasRoomForGridControls, setHasRoomForGridControls] = useState(true);
  const [containerRef, _setContainerRef] = useState<HTMLDivElement | null>(
    null
  );
  const [interactiveCellId] = useState(htmlIdGenerator()());
  const [headerIsInteractive, setHeaderIsInteractive] = useState(false);

  const setContainerRef = useCallback(ref => _setContainerRef(ref), []);

  const [wrappingDivFocusProps, focusedCell, setFocusedCell] = useFocus(
    headerIsInteractive
  );

  const handleHeaderChange = useCallback<(headerRow: HTMLElement) => void>(
    headerRow => {
      const tabbables = tabbable(headerRow);
      const managed = headerRow.querySelectorAll('[data-wuigrid-tab-managed]');
      const hasInteractives = tabbables.length > 0 || managed.length > 0;
      if (hasInteractives !== headerIsInteractive) {
        setHeaderIsInteractive(hasInteractives);

        // if the focus is on the header, and the header is no longer interactive
        // move the focus down to the first row
        if (hasInteractives === false && focusedCell && focusedCell[1] === -1) {
          setFocusedCell([focusedCell[0], 0]);
        }
      }
    },
    [headerIsInteractive, setHeaderIsInteractive, focusedCell, setFocusedCell]
  );
  const handleHeaderMutation = useCallback<MutationCallback>(
    records => {
      const [{ target }] = records;

      // find the wrapping header div
      let headerRow = target.parentElement;
      while (
        headerRow &&
        (headerRow.getAttribute('data-test-subj') || '')
          .split(/\s+/)
          .indexOf('dataGridHeader') === -1
      ) {
        headerRow = headerRow.parentElement;
      }

      if (headerRow) handleHeaderChange(headerRow);
    },
    [handleHeaderChange]
  );

  const handleGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case keys.ESCAPE:
        if (isFullScreen) {
          event.preventDefault();
          setIsFullScreen(false);
        }
        break;
    }
  };

  const {
    leadingControlColumns = emptyArrayDefault,
    trailingControlColumns = emptyArrayDefault,
    columns,
    columnVisibility,
    schemaDetectors,
    rowCount,
    renderCellValue,
    renderFooterCellValue,
    className,
    gridStyle,
    toolbarVisibility = true,
    pagination,
    sorting,
    inMemory,
    popoverContents,
    onColumnResize,
    minSizeForControls = MINIMUM_WIDTH_FOR_GRID_CONTROLS,
    ...rest
  } = props;

  // enables/disables grid controls based on available width
  const onResize = useOnResize(
    nextHasRoomForGridControls => {
      if (nextHasRoomForGridControls !== hasRoomForGridControls) {
        setHasRoomForGridControls(nextHasRoomForGridControls);
      }
    },
    isFullScreen,
    minSizeForControls
  );

  const [columnWidths, setColumnWidth] = useColumnWidths(
    columns,
    onColumnResize
  );

  // apply style props on top of defaults
  const gridStyleWithDefaults = { ...startingStyles, ...gridStyle };

  const [inMemoryValues, onCellRender] = useInMemoryValues(inMemory, rowCount);

  const definedColumnSchemas = useMemo(() => {
    return columns.reduce<{ [key: string]: string }>(
      (definedColumnSchemas, { id, schema }) => {
        if (schema != null) {
          definedColumnSchemas[id] = schema;
        }
        return definedColumnSchemas;
      },
      {}
    );
  }, [columns]);

  const allSchemaDetectors = useMemo(
    () => [...providedSchemaDetectors, ...(schemaDetectors || [])],
    [schemaDetectors]
  );
  const detectedSchema = useDetectSchema(
    inMemory,
    inMemoryValues,
    allSchemaDetectors,
    definedColumnSchemas,
    inMemory != null
  );
  const mergedSchema = useMergedSchema(detectedSchema, columns);

  const displayValues: { [key: string]: string } = columns.reduce(
    (acc: { [key: string]: string }, column: WuiDataGridColumn) => ({
      ...acc,
      [column.id]: column.displayAsText || column.id,
    }),
    {}
  );

  const [
    columnSelector,
    orderedVisibleColumns,
    setVisibleColumns,
    switchColumnPos,
  ] = useColumnSelector(
    columns,
    columnVisibility,
    checkOrDefaultToolBarDiplayOptions(toolbarVisibility, 'showColumnSelector'),
    displayValues
  );
  const columnSorting = useColumnSorting(
    orderedVisibleColumns,
    sorting,
    mergedSchema,
    allSchemaDetectors,
    displayValues
  );
  const [styleSelector, gridStyles] = useStyleSelector(gridStyleWithDefaults);

  // compute the default column width from the container's clientWidth and count of visible columns
  const defaultColumnWidth = useDefaultColumnWidth(
    containerRef,
    leadingControlColumns,
    trailingControlColumns,
    orderedVisibleColumns
  );

  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef) {
      const headerElement = contentRef.querySelector(
        '[data-test-subj~=dataGridHeader]'
      );
      if (headerElement) {
        handleHeaderChange(headerElement as HTMLElement);
      }
    }
  }, [contentRef, handleHeaderChange]);

  // Because of a weird Chrome bug with position:sticky css items and focus, we force scrolling to the top
  // if the item is in the first row. This prevents the cell from ever being under the sticky header.
  useEffect(() => {
    if (focusedCell !== undefined && focusedCell[1] === 0) {
      if (contentRef != null) {
        contentRef.scrollTop = 0;
      }
    }
  }, [focusedCell, contentRef]);

  const classes = classNames(
    'wuiDataGrid',
    fontSizesToClassMap[gridStyles.fontSize!],
    bordersToClassMap[gridStyles.border!],
    headerToClassMap[gridStyles.header!],
    footerToClassMap[gridStyles.footer!],
    rowHoverToClassMap[gridStyles.rowHover!],
    cellPaddingsToClassMap[gridStyles.cellPadding!],
    {
      'wuiDataGrid--stripes': gridStyles.stripes!,
    },
    {
      'wuiDataGrid--stickyFooter': gridStyles.footer && gridStyles.stickyFooter,
    },
    {
      'wuiDataGrid--fullScreen': isFullScreen,
    },
    {
      'wuiDataGrid--noControls': !toolbarVisibility,
    },
    className
  );

  const controlBtnClasses = classNames(
    'wuiDataGrid__controlBtn',
    {
      'wuiDataGrid__controlBtn--active': isFullScreen,
    },
    className
  );

  // By default the toolbar appears
  const showToolbar = !!toolbarVisibility;

  // These grid controls will only show when there is room. Check the resize observer callback
  // They can also be optionally turned off individually by using toolbarVisibility
  const gridControls = (
    <Fragment>
      {checkOrDefaultToolBarDiplayOptions(
        toolbarVisibility,
        'additionalControls'
      ) && typeof toolbarVisibility !== 'boolean'
        ? toolbarVisibility.additionalControls
        : null}
      {checkOrDefaultToolBarDiplayOptions(
        toolbarVisibility,
        'showColumnSelector'
      )
        ? columnSelector
        : null}
      {checkOrDefaultToolBarDiplayOptions(
        toolbarVisibility,
        'showStyleSelector'
      )
        ? styleSelector
        : null}
      {checkOrDefaultToolBarDiplayOptions(toolbarVisibility, 'showSortSelector')
        ? columnSorting
        : null}
    </Fragment>
  );

  // When data grid is full screen, we add a class to the body to remove the extra scrollbar
  if (isFullScreen) {
    document.body.classList.add('wuiDataGrid__restrictBody');
  } else {
    document.body.classList.remove('wuiDataGrid__restrictBody');
  }

  const fullScreenSelector = (
    <WuiI18n
      tokens={[
        'wuiDataGrid.fullScreenButton',
        'wuiDataGrid.fullScreenButtonActive',
      ]}
      defaults={['Full screen', 'Exit full screen']}>
      {([fullScreenButton, fullScreenButtonActive]: ReactChild[]) => (
        <WuiButtonEmpty
          size="xs"
          iconType="fullScreen"
          color="text"
          className={controlBtnClasses}
          data-test-subj="dataGridFullScrenButton"
          onClick={() => setIsFullScreen(!isFullScreen)}>
          {isFullScreen ? fullScreenButtonActive : fullScreenButton}
        </WuiButtonEmpty>
      )}
    </WuiI18n>
  );

  const cellsUpdateFocus = useRef<Map<string, Function>>(new Map());

  const focusAfterRender = useAfterRender(() => {
    if (focusedCell) {
      const key = `${focusedCell[0]}-${focusedCell[1]}`;

      if (cellsUpdateFocus.current.has(key)) {
        cellsUpdateFocus.current.get(key)!();
      }
    }
  });

  const datagridContext = useMemo(
    () => ({
      onFocusUpdate: (cell: WuiDataGridFocusedCell, updateFocus: Function) => {
        const key = `${cell[0]}-${cell[1]}`;
        cellsUpdateFocus.current.set(key, updateFocus);

        return () => {
          cellsUpdateFocus.current.delete(key);
        };
      },
    }),
    []
  );

  const gridIds = htmlIdGenerator();
  const gridId = gridIds();
  const ariaLabelledById = gridIds();

  const commonGridProps = {
    columns: orderedVisibleColumns,
    columnWidths,
    defaultColumnWidth,
    focusedCell,
    leadingControlColumns,
    onCellFocus: setFocusedCell,
    schema: mergedSchema,
    sorting,
    trailingControlColumns,
  };

  return (
    <WuiI18n
      token="wuiDataGrid.ariaLabel"
      default="{label}; Page {page} of {pageCount}."
      values={{
        label: rest['aria-label'],
        page: pagination ? pagination.pageIndex + 1 : 0,
        pageCount: pagination
          ? Math.ceil(props.rowCount / pagination.pageSize)
          : 0,
      }}>
      {(ariaLabel: string) => {
        return (
          <WuiI18n
            token="wuiDataGrid.ariaLabelledBy"
            default="Page {page} of {pageCount}."
            values={{
              page: pagination ? pagination.pageIndex + 1 : 0,
              pageCount: pagination
                ? Math.ceil(props.rowCount / pagination.pageSize)
                : 0,
            }}>
            {(ariaLabelledBy: string) => {
              // extract aria-label and/or aria-labelledby from `rest`
              const gridAriaProps: {
                'aria-label'?: string;
                'aria-labelledby'?: string;
              } = {};
              if ('aria-label' in rest) {
                gridAriaProps['aria-label'] = pagination
                  ? ariaLabel
                  : rest['aria-label'];
                delete rest['aria-label'];
              }
              if ('aria-labelledby' in rest) {
                gridAriaProps['aria-labelledby'] = `${
                  rest['aria-labelledby']
                } ${pagination ? ariaLabelledById : ''}`;
                delete rest['aria-labelledby'];
              }

              return (
                <DataGridContext.Provider value={datagridContext}>
                  <WuiFocusTrap
                    disabled={!isFullScreen}
                    className="wuiDataGrid__focusWrap">
                    <div
                      className={classes}
                      onKeyDown={handleGridKeyDown}
                      ref={setContainerRef}>
                      {(IS_JEST_ENVIRONMENT || defaultColumnWidth) && (
                        <>
                          {showToolbar ? (
                            <div
                              className="wuiDataGrid__controls"
                              data-test-sub="dataGridControls">
                              {hasRoomForGridControls ? gridControls : null}
                              {checkOrDefaultToolBarDiplayOptions(
                                toolbarVisibility,
                                'showFullScreenSelector'
                              )
                                ? fullScreenSelector
                                : null}
                            </div>
                          ) : null}
                          <WuiResizeObserver onResize={onResize}>
                            {resizeRef => (
                              <div
                                onKeyDown={createKeyDownHandler(
                                  props,
                                  orderedVisibleColumns,
                                  leadingControlColumns,
                                  trailingControlColumns,
                                  focusedCell,
                                  headerIsInteractive,
                                  setFocusedCell,
                                  focusAfterRender
                                )}
                                className="wuiDataGrid__verticalScroll"
                                ref={resizeRef}
                                {...rest}>
                                <div className="wuiDataGrid__overflow">
                                  {inMemory ? (
                                    <WuiDataGridInMemoryRenderer
                                      inMemory={inMemory}
                                      renderCellValue={renderCellValue}
                                      columns={columns}
                                      rowCount={
                                        inMemory.level === 'enhancements'
                                          ? // if `inMemory.level === enhancements` then we can only be sure the pagination's pageSize is available in memory
                                            pagination?.pageSize || rowCount
                                          : // otherwise, all of the data is present and usable
                                            rowCount
                                      }
                                      onCellRender={onCellRender}
                                    />
                                  ) : null}
                                  <div
                                    ref={setContentRef}
                                    data-test-subj="dataGridWrapper"
                                    className="wuiDataGrid__content"
                                    role="grid"
                                    id={gridId}
                                    {...wrappingDivFocusProps}
                                    {...gridAriaProps}>
                                    <WuiMutationObserver
                                      observerOptions={{
                                        subtree: true,
                                        childList: true,
                                      }}
                                      onMutation={handleHeaderMutation}>
                                      {ref => (
                                        <WuiDataGridHeaderRow
                                          ref={ref}
                                          {...commonGridProps}
                                          setColumnWidth={setColumnWidth}
                                          setVisibleColumns={setVisibleColumns}
                                          switchColumnPos={switchColumnPos}
                                          schema={mergedSchema}
                                          sorting={sorting}
                                          headerIsInteractive={
                                            headerIsInteractive
                                          }
                                        />
                                      )}
                                    </WuiMutationObserver>
                                    <WuiDataGridBody
                                      {...commonGridProps}
                                      inMemoryValues={inMemoryValues}
                                      inMemory={inMemory}
                                      schemaDetectors={allSchemaDetectors}
                                      popoverContents={popoverContents}
                                      pagination={pagination}
                                      renderCellValue={renderCellValue}
                                      renderFooterCellValue={
                                        renderFooterCellValue
                                      }
                                      rowCount={rowCount}
                                      interactiveCellId={interactiveCellId}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </WuiResizeObserver>
                          {props.pagination && props['aria-labelledby'] && (
                            <p id={ariaLabelledBy} hidden>
                              {ariaLabelledBy}
                            </p>
                          )}
                          {renderPagination(props, gridId)}
                          <p id={interactiveCellId} hidden>
                            <WuiI18n
                              token="wuiDataGrid.screenReaderNotice"
                              default="Cell contains interactive content."
                            />
                            {/* TODO: if no keyboard shortcuts panel gets built, add keyboard shortcut info here */}
                          </p>
                        </>
                      )}
                    </div>
                  </WuiFocusTrap>
                </DataGridContext.Provider>
              );
            }}
          </WuiI18n>
        );
      }}
    </WuiI18n>
  );
};
