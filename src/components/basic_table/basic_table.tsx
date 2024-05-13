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
  Component,
  Fragment,
  HTMLAttributes,
  ReactNode,
  ReactElement,
} from 'react';
import classNames from 'classnames';
import moment from 'moment';
import {
  Direction,
  formatAuto,
  formatBoolean,
  formatDate,
  formatNumber,
  formatText,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  SortDirection,
} from '../../services';
import { CommonProps } from '../common';
import { isFunction } from '../../services/predicate';
import { get } from '../../services/objects';
import { WuiFlexGroup, WuiFlexItem } from '../flex';
import { WuiCheckbox } from '../form';

import {
  WuiTable,
  WuiTableProps,
  WuiTableBody,
  WuiTableFooter,
  WuiTableFooterCell,
  WuiTableHeader,
  WuiTableHeaderCell,
  WuiTableHeaderCellCheckbox,
  WuiTableHeaderMobile,
  WuiTableRow,
  WuiTableRowCell,
  WuiTableRowCellCheckbox,
  WuiTableSortMobile,
} from '../table';

import { CollapsedItemActions } from './collapsed_item_actions';
import { ExpandedItemActions } from './expanded_item_actions';

import { Pagination, PaginationBar } from './pagination_bar';
import { WuiIcon } from '../icon';
import { WuiKeyboardAccessible, WuiScreenReaderOnly } from '../accessibility';
import { WuiI18n } from '../i18n';
import { WuiDelayRender } from '../delay_render';

import { htmlIdGenerator } from '../../services/accessibility';
import { Action } from './action_types';
import {
  WuiTableActionsColumnType,
  WuiTableComputedColumnType,
  WuiTableDataType,
  WuiTableFieldDataColumnType,
  WuiTableFooterProps,
  ItemId,
  WuiTableSelectionType,
  WuiTableSortingType,
  ItemIdResolved,
} from './table_types';
import { WuiTableSortMobileProps } from '../table/mobile/table_sort_mobile';

type DataTypeProfiles = Record<
  WuiTableDataType,
  {
    align: typeof LEFT_ALIGNMENT | typeof RIGHT_ALIGNMENT;
    render: (value: any) => string;
  }
>;

const dataTypesProfiles: DataTypeProfiles = {
  auto: {
    align: LEFT_ALIGNMENT,
    render: (value: any) => formatAuto(value),
  },
  string: {
    align: LEFT_ALIGNMENT,
    render: (value: any) => formatText(value),
  },
  number: {
    align: RIGHT_ALIGNMENT,
    render: (value: number | null) => formatNumber(value),
  },
  boolean: {
    align: LEFT_ALIGNMENT,
    render: (value: boolean) => formatBoolean(value),
  },
  date: {
    align: LEFT_ALIGNMENT,
    render: (value: moment.MomentInput) => formatDate(value),
  },
};

const DATA_TYPES = Object.keys(dataTypesProfiles);

interface ItemIdToExpandedRowMap {
  [id: string]: ReactNode;
}

export function getItemId<T>(item: T, itemId?: ItemId<T>) {
  if (itemId) {
    if (isFunction(itemId)) {
      return itemId(item);
    }
    // @ts-ignore never mind about the index signature
    return item[itemId];
  }
}

function getRowProps<T>(item: T, rowProps: RowPropsCallback<T>) {
  if (rowProps) {
    if (isFunction(rowProps)) {
      return rowProps(item);
    }
    return rowProps;
  }

  return {};
}

function getCellProps<T>(
  item: T,
  column: WuiBasicTableColumn<T>,
  cellProps: CellPropsCallback<T>
) {
  if (cellProps) {
    if (isFunction(cellProps)) {
      return cellProps(item, column);
    }
    return cellProps;
  }

  return {};
}

function getColumnFooter<T>(
  column: WuiBasicTableColumn<T>,
  { items, pagination }: WuiTableFooterProps<T>
) {
  const { footer } = column as WuiTableFieldDataColumnType<T>;
  if (footer) {
    if (isFunction(footer)) {
      return footer({ items, pagination });
    }
    return footer;
  }

  return undefined;
}

export type WuiBasicTableColumn<T> =
  | WuiTableFieldDataColumnType<T>
  | WuiTableComputedColumnType<T>
  | WuiTableActionsColumnType<T>;

export interface Criteria<T> {
  page?: {
    index: number;
    size: number;
  };
  sort?: {
    field: keyof T;
    direction: Direction;
  };
}

export interface CriteriaWithPagination<T> extends Criteria<T> {
  page: {
    index: number;
    size: number;
  };
}

type CellPropsCallback<T> = (item: T, column: WuiBasicTableColumn<T>) => object;
type RowPropsCallback<T> = (item: T) => object;

interface BasicTableProps<T> extends Omit<WuiTableProps, 'onChange'> {
  itemId?: ItemId<T>;
  itemIdToExpandedRowMap?: ItemIdToExpandedRowMap;
  items: T[];
  cellProps?: object | CellPropsCallback<T>;
  columns: Array<WuiBasicTableColumn<T>>;
  error?: string;
  tableCaption?: string;
  rowHeader?: string;
  hasActions?: boolean;
  isExpandable?: boolean;
  isSelectable?: boolean;
  loading?: boolean;
  noItemsMessage?: ReactNode;
  onChange?: (criteria: Criteria<T>) => void;
  pagination?: undefined;
  rowProps?: object | RowPropsCallback<T>;
  selection?: WuiTableSelectionType<T>;
  sorting?: WuiTableSortingType<T>;
}

type BasicTableWithPaginationProps<T> = Omit<
  BasicTableProps<T>,
  'pagination' | 'onChange'
> & {
  pagination: Pagination;
  onChange?: (criteria: CriteriaWithPagination<T>) => void;
};

export type WuiBasicTableProps<T> = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  (BasicTableProps<T> | BasicTableWithPaginationProps<T>);

interface State<T> {
  initialSelectionRendered: boolean;
  selection: T[];
}

interface SortOptions {
  isSorted?: boolean;
  isSortAscending?: boolean;
  onSort?: () => void;
  allowNeutralSort?: boolean;
}

function hasPagination<T>(
  x: WuiBasicTableProps<T>
): x is BasicTableWithPaginationProps<T> {
  return x.hasOwnProperty('pagination') && !!x.pagination;
}

export class WuiBasicTable<T = any> extends Component<
  WuiBasicTableProps<T>,
  State<T>
> {
  static defaultProps = {
    responsive: true,
    tableLayout: 'fixed',
    noItemsMessage: 'No items found',
  };

  static getDerivedStateFromProps<T>(
    nextProps: WuiBasicTableProps<T>,
    prevState: State<T>
  ) {
    if (!nextProps.selection) {
      // next props doesn't have a selection, reset our state
      return { selection: [] };
    }

    const { itemId } = nextProps;
    const selection = prevState.selection.filter(
      (selectedItem: T) =>
        nextProps.items.findIndex(
          (item: T) =>
            getItemId(item, itemId) === getItemId(selectedItem, itemId)
        ) !== -1
    );

    if (selection.length !== prevState.selection.length) {
      if (nextProps.selection.onSelectionChange) {
        nextProps.selection.onSelectionChange(selection);
      }

      return { selection };
    }

    return null;
  }

  // used for moving in & out of `loading` state
  private cleanups: Array<() => void> = [];
  private tbody: HTMLTableSectionElement | null = null;

  constructor(props: WuiBasicTableProps<T>) {
    super(props);
    this.state = {
      // used for checking if  initial selection is rendered
      initialSelectionRendered: false,
      selection: [],
    };
  }

  componentDidMount() {
    if (this.props.loading && this.tbody) this.addLoadingListeners(this.tbody);
    this.getInitialSelection();
  }

  componentDidUpdate(prevProps: WuiBasicTableProps<T>) {
    if (prevProps.loading !== this.props.loading) {
      if (this.props.loading && this.tbody) {
        this.addLoadingListeners(this.tbody);
      } else {
        this.removeLoadingListeners();
      }
    }
    this.getInitialSelection();
  }

  componentWillUnmount() {
    this.removeLoadingListeners();
  }

  getInitialSelection() {
    if (
      this.props.selection &&
      this.props.selection.initialSelected &&
      !this.state.initialSelectionRendered &&
      this.props.items.length > 0
    ) {
      this.setState({ selection: this.props.selection.initialSelected });
      this.setState({ initialSelectionRendered: true });
    }
  }

  setSelection(newSelection: T[]) {
    this.changeSelection(newSelection);
  }

  private setTbody = (tbody: HTMLTableSectionElement | null) => {
    // remove listeners from an existing element
    this.removeLoadingListeners();

    // update the ref
    this.tbody = tbody;

    // if loading, add listeners
    if (this.props.loading === true && tbody) {
      this.addLoadingListeners(tbody);
    }
  };

  private addLoadingListeners = (tbody: HTMLTableSectionElement) => {
    const listener = (event: Event) => {
      event.stopPropagation();
      event.preventDefault();
    };
    [
      'mousedown',
      'mouseup',
      'mouseover',
      'mouseout',
      'mouseenter',
      'mouseleave',
      'click',
      'dblclick',
      'keydown',
      'keyup',
      'keypress',
    ].forEach(event => {
      tbody.addEventListener(event, listener, true);
      this.cleanups.push(() => {
        tbody.removeEventListener(event, listener, true);
      });
    });
  };

  private removeLoadingListeners = () => {
    this.cleanups.forEach(cleanup => cleanup());
    this.cleanups.length = 0;
  };

  buildCriteria(props: WuiBasicTableProps<T>): Criteria<T> {
    const criteria: Criteria<T> = {};
    if (hasPagination(props)) {
      criteria.page = {
        index: props.pagination.pageIndex,
        size: props.pagination.pageSize,
      };
    }
    if (props.sorting) {
      criteria.sort = props.sorting.sort;
    }
    return criteria;
  }

  changeSelection(selection: T[]) {
    if (!this.props.selection) {
      return;
    }
    this.setState({ selection });
    if (this.props.selection.onSelectionChange) {
      this.props.selection.onSelectionChange(selection);
    }
  }

  clearSelection() {
    this.changeSelection([]);
  }

  onPageSizeChange(size: number) {
    this.clearSelection();
    const currentCriteria = this.buildCriteria(this.props);
    const criteria: CriteriaWithPagination<T> = {
      ...currentCriteria,
      page: {
        index: 0, // when page size changes, we take the user back to the first page
        size,
      },
    };
    if (this.props.onChange) {
      this.props.onChange(criteria);
    }
  }

  onPageChange(index: number) {
    this.clearSelection();
    const currentCriteria = this.buildCriteria(this.props);
    const criteria: CriteriaWithPagination<T> = {
      ...currentCriteria,
      page: {
        ...currentCriteria.page!,
        index,
      },
    };
    if (this.props.onChange) {
      this.props.onChange(criteria);
    }
  }

  onColumnSortChange(column: WuiBasicTableColumn<T>) {
    this.clearSelection();
    const currentCriteria = this.buildCriteria(this.props);
    let direction: Direction = SortDirection.ASC;
    if (
      currentCriteria &&
      currentCriteria.sort &&
      (currentCriteria.sort.field ===
        (column as WuiTableFieldDataColumnType<T>).field ||
        currentCriteria.sort.field === column.name)
    ) {
      direction = SortDirection.reverse(currentCriteria.sort.direction);
    }
    const criteria: Criteria<T> = {
      ...currentCriteria,
      // resetting the page if the criteria has one
      page: !currentCriteria.page
        ? undefined
        : {
            index: 0,
            size: currentCriteria.page.size,
          },
      sort: {
        field: ((column as WuiTableFieldDataColumnType<T>).field ||
          column.name) as keyof T,
        direction,
      },
    };
    if (this.props.onChange) {
      // @ts-ignore complex relationship between pagination's existence and criteria, the code logic ensures this is correctly maintained
      this.props.onChange(criteria);
    }
  }

  tableId = htmlIdGenerator('__table')();

  render() {
    const {
      className,
      loading,
      items,
      itemId,
      columns,
      pagination,
      sorting,
      selection,
      onChange,
      error,
      noItemsMessage,
      compressed,
      itemIdToExpandedRowMap,
      responsive,
      isSelectable,
      isExpandable,
      hasActions,
      rowProps,
      cellProps,
      tableCaption,
      rowHeader,
      tableLayout,
      ...rest
    } = this.props;

    const classes = classNames(
      'wuiBasicTable',
      {
        'wuiBasicTable-loading': loading,
      },
      className
    );

    const table = this.renderTable();
    const paginationBar = this.renderPaginationBar();

    return (
      <div className={classes} {...rest}>
        {table}
        {paginationBar}
      </div>
    );
  }

  renderTable() {
    const { compressed, responsive, tableLayout } = this.props;

    const mobileHeader = responsive ? (
      <WuiTableHeaderMobile>
        <WuiFlexGroup
          responsive={false}
          justifyContent="spaceBetween"
          alignItems="baseline">
          <WuiFlexItem grow={false}>{this.renderSelectAll(true)}</WuiFlexItem>
          <WuiFlexItem grow={false}>{this.renderTableMobileSort()}</WuiFlexItem>
        </WuiFlexGroup>
      </WuiTableHeaderMobile>
    ) : (
      undefined
    );
    const caption = this.renderTableCaption();
    const head = this.renderTableHead();
    const body = this.renderTableBody();
    const footer = this.renderTableFooter();
    return (
      <div>
        {mobileHeader}
        <WuiTable
          id={this.tableId}
          tableLayout={tableLayout}
          responsive={responsive}
          compressed={compressed}>
          {caption}
          {head}
          {body}
          {footer}
        </WuiTable>
      </div>
    );
  }

  renderTableMobileSort() {
    const { columns, sorting } = this.props;
    const items: WuiTableSortMobileProps['items'] = [];

    if (!sorting) {
      return null;
    }

    columns.forEach((column: WuiBasicTableColumn<T>, index: number) => {
      if (
        (column as WuiTableFieldDataColumnType<T>).field &&
        sorting.sort &&
        !!sorting.enableAllColumns &&
        (column as WuiTableFieldDataColumnType<T>).sortable == null
      ) {
        column = {
          ...(column as WuiTableFieldDataColumnType<T>),
          sortable: true,
        };
      }

      if (
        !(column as WuiTableFieldDataColumnType<T>).sortable ||
        (column as WuiTableFieldDataColumnType<T>).hideForMobile
      ) {
        return;
      }

      const sortDirection = this.resolveColumnSortDirection(column);

      items.push({
        name: column.name,
        key: `_data_s_${
          (column as WuiTableFieldDataColumnType<T>).field
        }_${index}`,
        onSort: this.resolveColumnOnSort(column),
        isSorted: !!sortDirection,
        isSortAscending: sortDirection
          ? SortDirection.isAsc(sortDirection)
          : undefined,
      });
    });

    return items.length ? <WuiTableSortMobile items={items} /> : null;
  }

  renderTableCaption() {
    const { items, pagination, tableCaption } = this.props;
    let captionElement;
    if (tableCaption) {
      if (pagination) {
        captionElement = (
          <WuiI18n
            token="wuiBasicTable.tableCaptionWithPagination"
            default="{tableCaption}; Page {page} of {pageCount}."
            values={{
              tableCaption,
              page: pagination.pageIndex + 1,
              pageCount: Math.ceil(
                pagination.totalItemCount / pagination.pageSize
              ),
            }}
          />
        );
      } else {
        captionElement = tableCaption;
      }
    } else {
      if (pagination) {
        if (pagination.totalItemCount > 0) {
          captionElement = (
            <WuiI18n
              token="wuiBasicTable.tableAutoCaptionWithPagination"
              default="This table contains {itemCount} rows out of {totalItemCount} rows; Page {page} of {pageCount}."
              values={{
                totalItemCount: pagination.totalItemCount,
                itemCount: items.length,
                page: pagination.pageIndex + 1,
                pageCount: Math.ceil(
                  pagination.totalItemCount / pagination.pageSize
                ),
              }}
            />
          );
        } else {
          captionElement = (
            <WuiI18n
              token="wuiBasicTable.tableSimpleAutoCaptionWithPagination"
              default="This table contains {itemCount} rows; Page {page} of {pageCount}."
              values={{
                itemCount: items.length,
                page: pagination.pageIndex + 1,
                pageCount: Math.ceil(
                  pagination.totalItemCount / pagination.pageSize
                ),
              }}
            />
          );
        }
      } else {
        captionElement = (
          <WuiI18n
            token="wuiBasicTable.tableAutoCaptionWithoutPagination"
            default="This table contains {itemCount} rows."
            values={{
              itemCount: items.length,
            }}
          />
        );
      }
    }
    return (
      <WuiScreenReaderOnly>
        <caption className="wuiTableCaption">
          <WuiDelayRender>{captionElement}</WuiDelayRender>
        </caption>
      </WuiScreenReaderOnly>
    );
  }

  renderSelectAll = (isMobile: boolean) => {
    const { items, selection } = this.props;

    if (!selection) {
      return;
    }

    const selectableItems = items.filter(
      (item: T) => !selection.selectable || selection.selectable(item)
    );

    const checked =
      this.state.selection &&
      selectableItems.length > 0 &&
      this.state.selection.length === selectableItems.length;

    const disabled = selectableItems.length === 0;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        this.changeSelection(selectableItems);
      } else {
        this.changeSelection([]);
      }
    };

    return (
      <WuiI18n token="wuiBasicTable.selectAllRows" default="Select all rows">
        {(selectAllRows: string) => (
          <WuiCheckbox
            id={`_selection_column-checkbox_${htmlIdGenerator()()}`}
            type={isMobile ? undefined : 'inList'}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            // Only add data-test-subj to one of the checkboxes
            data-test-subj={isMobile ? undefined : 'checkboxSelectAll'}
            aria-label={selectAllRows}
            label={isMobile ? selectAllRows : null}
          />
        )}
      </WuiI18n>
    );
  };

  renderTableHead() {
    const { columns, selection } = this.props;

    const headers: ReactNode[] = [];

    if (selection) {
      headers.push(
        <WuiTableHeaderCellCheckbox key="_selection_column_h">
          {this.renderSelectAll(false)}
        </WuiTableHeaderCellCheckbox>
      );
    }

    columns.forEach((column: WuiBasicTableColumn<T>, index: number) => {
      const {
        field,
        width,
        name,
        align,
        dataType,
        sortable,
        mobileOptions,
        isMobileHeader,
        hideForMobile,
      } = column as WuiTableFieldDataColumnType<T>;

      const columnAlign = align || this.getAlignForDataType(dataType);

      // actions column
      if ((column as WuiTableActionsColumnType<T>).actions) {
        headers.push(
          <WuiTableHeaderCell
            key={`_actions_h_${index}`}
            align="right"
            width={width}
            mobileOptions={mobileOptions}>
            {name}
          </WuiTableHeaderCell>
        );
        return;
      }

      // computed column
      if (!(column as WuiTableFieldDataColumnType<T>).field) {
        const sorting: SortOptions = {};
        // computed columns are only sortable if their `sortable` is a function
        if (this.props.sorting && typeof sortable === 'function') {
          const sortDirection = this.resolveColumnSortDirection(column);
          sorting.isSorted = !!sortDirection;
          sorting.isSortAscending = sortDirection
            ? SortDirection.isAsc(sortDirection)
            : undefined;
          sorting.onSort = this.resolveColumnOnSort(column);
          sorting.allowNeutralSort = this.props.sorting.allowNeutralSort;
        }
        headers.push(
          <WuiTableHeaderCell
            key={`_computed_column_h_${index}`}
            align={columnAlign}
            width={width}
            mobileOptions={mobileOptions}
            data-test-subj={`tableHeaderCell_${name}_${index}`}
            {...sorting}>
            {name}
          </WuiTableHeaderCell>
        );
        return;
      }

      // field data column
      const sorting: SortOptions = {};
      if (this.props.sorting) {
        if (
          this.props.sorting.sort &&
          !!this.props.sorting.enableAllColumns &&
          (column as WuiTableFieldDataColumnType<T>).sortable == null
        ) {
          column = {
            ...(column as WuiTableFieldDataColumnType<T>),
            sortable: true,
          };
        }

        const { sortable } = column as WuiTableFieldDataColumnType<T>;

        if (sortable) {
          const sortDirection = this.resolveColumnSortDirection(column);
          sorting.isSorted = !!sortDirection;
          sorting.isSortAscending = sortDirection
            ? SortDirection.isAsc(sortDirection)
            : undefined;
          sorting.onSort = this.resolveColumnOnSort(column);
          sorting.allowNeutralSort = this.props.sorting.allowNeutralSort;
        }
      }
      headers.push(
        <WuiTableHeaderCell
          key={`_data_h_${field}_${index}`}
          align={columnAlign}
          width={width}
          isMobileHeader={isMobileHeader}
          hideForMobile={hideForMobile}
          mobileOptions={mobileOptions}
          data-test-subj={`tableHeaderCell_${field}_${index}`}
          {...sorting}>
          {name}
        </WuiTableHeaderCell>
      );
    });

    return <WuiTableHeader>{headers}</WuiTableHeader>;
  }

  renderTableFooter() {
    const { items, columns, pagination, selection } = this.props;

    const footers = [];
    let hasDefinedFooter = false;

    if (selection) {
      // Create an empty cell to compensate for additional selection column
      footers.push(
        <WuiTableFooterCell key="_selection_column_f">
          {undefined}
        </WuiTableFooterCell>
      );
    }

    columns.forEach((column: WuiBasicTableColumn<T>) => {
      const footer = getColumnFooter(column, { items, pagination });
      const {
        mobileOptions,
        isMobileHeader,
        field,
        align,
      } = column as WuiTableFieldDataColumnType<T>;

      if ((mobileOptions && mobileOptions!.only) || isMobileHeader) {
        return; // exclude columns that only exist for mobile headers
      }

      if (footer) {
        footers.push(
          <WuiTableFooterCell
            key={`footer_${field}_${footers.length - 1}`}
            align={align}>
            {footer}
          </WuiTableFooterCell>
        );
        hasDefinedFooter = true;
      } else {
        // Footer is undefined, so create an empty cell to preserve layout
        footers.push(
          <WuiTableFooterCell
            key={`footer_empty_${footers.length - 1}`}
            align={align}>
            {undefined}
          </WuiTableFooterCell>
        );
      }
    });

    return footers.length && hasDefinedFooter ? (
      <WuiTableFooter>{footers}</WuiTableFooter>
    ) : null;
  }

  renderTableBody() {
    if (this.props.error) {
      return this.renderErrorBody(this.props.error);
    }
    const { items } = this.props;
    if (items.length === 0) {
      return this.renderEmptyBody();
    }

    const rows = items.map((item: T, index: number) => {
      // if there's pagination the item's index must be adjusted to the where it is in the whole dataset
      const tableItemIndex = hasPagination(this.props)
        ? this.props.pagination.pageIndex * this.props.pagination.pageSize +
          index
        : index;
      return this.renderItemRow(item, tableItemIndex);
    });
    return <WuiTableBody bodyRef={this.setTbody}>{rows}</WuiTableBody>;
  }

  renderErrorBody(error: string) {
    const colSpan = this.props.columns.length + (this.props.selection ? 1 : 0);
    return (
      <WuiTableBody>
        <WuiTableRow>
          <WuiTableRowCell
            align="center"
            colSpan={colSpan}
            isMobileFullWidth={true}>
            <WuiIcon type="minusInCircle" color="danger" /> {error}
          </WuiTableRowCell>
        </WuiTableRow>
      </WuiTableBody>
    );
  }

  renderEmptyBody() {
    const { columns, selection, noItemsMessage } = this.props;
    const colSpan = columns.length + (selection ? 1 : 0);
    return (
      <WuiTableBody>
        <WuiTableRow>
          <WuiTableRowCell
            align="center"
            colSpan={colSpan}
            isMobileFullWidth={true}>
            {noItemsMessage}
          </WuiTableRowCell>
        </WuiTableRow>
      </WuiTableBody>
    );
  }

  renderItemRow(item: T, rowIndex: number) {
    const {
      columns,
      selection,
      isSelectable,
      hasActions,
      rowHeader,
      itemIdToExpandedRowMap = {},
      isExpandable,
    } = this.props;

    const cells = [];

    const { itemId: itemIdCallback } = this.props;
    const itemId: ItemIdResolved =
      getItemId(item, itemIdCallback) != null
        ? getItemId(item, itemIdCallback)
        : rowIndex;
    const selected = !selection
      ? false
      : this.state.selection &&
        !!this.state.selection.find(
          (selectedItem: T) =>
            getItemId(selectedItem, itemIdCallback) === itemId
        );

    let calculatedHasSelection;
    if (selection) {
      cells.push(this.renderItemSelectionCell(itemId, item, selected));
      calculatedHasSelection = true;
    }

    let calculatedHasActions;
    columns.forEach((column: WuiBasicTableColumn<T>, columnIndex: number) => {
      if ((column as WuiTableActionsColumnType<T>).actions) {
        cells.push(
          this.renderItemActionsCell(
            itemId,
            item,
            column as WuiTableActionsColumnType<T>,
            columnIndex
          )
        );
        calculatedHasActions = true;
      } else if ((column as WuiTableFieldDataColumnType<T>).field) {
        const fieldDataColumn = column as WuiTableFieldDataColumnType<T>;
        cells.push(
          this.renderItemFieldDataCell(
            itemId,
            item,
            column as WuiTableFieldDataColumnType<T>,
            columnIndex,
            fieldDataColumn.field === rowHeader
          )
        );
      } else {
        cells.push(
          this.renderItemComputedCell(
            itemId,
            item,
            column as WuiTableComputedColumnType<T>,
            columnIndex
          )
        );
      }
    });

    // Occupy full width of table, taking checkbox & mobile only columns into account.
    let expandedRowColSpan = selection ? columns.length + 1 : columns.length;

    const mobileOnlyCols = columns.reduce<number>((num, column) => {
      if (
        (column as WuiTableFieldDataColumnType<T>).mobileOptions &&
        (column as WuiTableFieldDataColumnType<T>).mobileOptions!.only
      ) {
        return num + 1;
      }

      return (column as WuiTableFieldDataColumnType<T>).isMobileHeader
        ? num + 1
        : num + 0; // BWC only
    }, 0);

    expandedRowColSpan = expandedRowColSpan - mobileOnlyCols;

    // We'll use the ID to associate the expanded row with the original.
    const hasExpandedRow = itemIdToExpandedRowMap.hasOwnProperty(itemId);
    const expandedRowId = hasExpandedRow
      ? `row_${itemId}_expansion`
      : undefined;
    const expandedRow = hasExpandedRow ? (
      <WuiTableRow
        id={expandedRowId}
        isExpandedRow={true}
        isSelectable={isSelectable}>
        <WuiTableRowCell colSpan={expandedRowColSpan} textOnly={false}>
          {itemIdToExpandedRowMap[itemId]}
        </WuiTableRowCell>
      </WuiTableRow>
    ) : (
      undefined
    );

    const { rowProps: rowPropsCallback } = this.props;
    const rowProps = getRowProps(item, rowPropsCallback as RowPropsCallback<T>);
    const row = (
      <WuiTableRow
        aria-owns={expandedRowId}
        isSelectable={
          isSelectable == null ? calculatedHasSelection : isSelectable
        }
        isSelected={selected}
        hasActions={hasActions == null ? calculatedHasActions : hasActions}
        isExpandable={isExpandable}
        {...rowProps}>
        {cells}
      </WuiTableRow>
    );

    return (
      <Fragment key={`row_${itemId}`}>
        {(rowProps as any).onClick ? (
          <WuiKeyboardAccessible>{row}</WuiKeyboardAccessible>
        ) : (
          row
        )}
        {expandedRow}
      </Fragment>
    );
  }

  renderItemSelectionCell(itemId: ItemId<T>, item: T, selected: boolean) {
    const { selection } = this.props;
    const key = `_selection_column_${itemId}`;
    const checked = selected;
    const disabled = selection!.selectable && !selection!.selectable(item);
    const title =
      selection!.selectableMessage &&
      selection!.selectableMessage(!disabled, item);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        this.changeSelection([...this.state.selection, item]);
      } else {
        const { itemId: itemIdCallback } = this.props;
        this.changeSelection(
          this.state.selection.reduce((selection: T[], selectedItem: T) => {
            if (getItemId(selectedItem, itemIdCallback) !== itemId) {
              selection.push(selectedItem);
            }
            return selection;
          }, [])
        );
      }
    };
    return (
      <WuiTableRowCellCheckbox key={key}>
        <WuiI18n token="wuiBasicTable.selectThisRow" default="Select this row">
          {(selectThisRow: string) => (
            <WuiCheckbox
              id={`${key}-checkbox`}
              type="inList"
              disabled={disabled}
              checked={checked}
              onChange={onChange}
              title={title || selectThisRow}
              aria-label={title || selectThisRow}
              data-test-subj={`checkboxSelectRow-${itemId}`}
            />
          )}
        </WuiI18n>
      </WuiTableRowCellCheckbox>
    );
  }

  renderItemActionsCell(
    itemId: ItemIdResolved,
    item: T,
    column: WuiTableActionsColumnType<T>,
    columnIndex: number
  ) {
    const actionEnabled = (action: Action<T>) =>
      this.state.selection.length === 0 &&
      (!action.enabled || action.enabled(item));

    let actualActions = column.actions.filter(
      (action: Action<T>) => !action.available || action.available(item)
    );
    if (actualActions.length > 2) {
      // if any of the actions `isPrimary`, add them inline as well, but only the first 2
      const primaryActions = actualActions.filter(o => o.isPrimary);
      actualActions = primaryActions.slice(0, 2);

      // if we have more than 1 action, we don't show them all in the cell, instead we
      // put them all in a popover tool. This effectively means we can only have a maximum
      // of one tool per row (it's either and normal action, or it's a popover that shows multiple actions)
      //
      // here we create a single custom action that triggers the popover with all the configured actions

      actualActions.push({
        name: 'All actions',
        render: (item: T) => {
          return (
            <CollapsedItemActions
              actions={column.actions}
              itemId={itemId}
              item={item}
              actionEnabled={actionEnabled}
            />
          );
        },
      });
    }

    const tools = (
      <ExpandedItemActions
        actions={actualActions}
        itemId={itemId}
        item={item}
        actionEnabled={actionEnabled}
      />
    );

    const key = `record_actions_${itemId}_${columnIndex}`;
    return (
      <WuiTableRowCell
        showOnHover={true}
        key={key}
        align="right"
        textOnly={false}
        hasActions={true}>
        {tools}
      </WuiTableRowCell>
    );
  }

  renderItemFieldDataCell(
    itemId: ItemId<T>,
    item: T,
    column: WuiTableFieldDataColumnType<T>,
    columnIndex: number,
    setScopeRow: boolean
  ) {
    const { field, render, dataType } = column;

    const key = `_data_column_${field}_${itemId}_${columnIndex}`;
    const contentRenderer = render || this.getRendererForDataType(dataType);
    const value = get(item, field as string);
    const content = contentRenderer(value, item);

    return this.renderItemCell(item, column, key, content, setScopeRow);
  }

  renderItemComputedCell(
    itemId: ItemId<T>,
    item: T,
    column: WuiTableComputedColumnType<T>,
    columnIndex: number
  ) {
    const { render } = column;

    const key = `_computed_column_${itemId}_${columnIndex}`;
    const contentRenderer = render || this.getRendererForDataType();
    const content = contentRenderer(item);

    return this.renderItemCell(item, column, key, content, false);
  }

  renderItemCell(
    item: T,
    column: WuiBasicTableColumn<T>,
    key: string | number,
    content: ReactNode,
    setScopeRow: boolean
  ) {
    const {
      align,
      render,
      dataType,
      isExpander,
      textOnly,
      name,
      field,
      description,
      sortable,
      footer,
      mobileOptions,
      ...rest
    } = column as WuiTableFieldDataColumnType<T>;
    const columnAlign = align || this.getAlignForDataType(dataType);
    const { cellProps: cellPropsCallback } = this.props;
    const cellProps = getCellProps(
      item,
      column,
      cellPropsCallback as CellPropsCallback<T>
    );

    return (
      <WuiTableRowCell
        key={key}
        align={columnAlign}
        isExpander={isExpander}
        textOnly={textOnly || !render}
        setScopeRow={setScopeRow}
        mobileOptions={{
          ...mobileOptions,
          render:
            mobileOptions && mobileOptions.render && mobileOptions.render(item),
          header:
            mobileOptions && mobileOptions.header === false ? false : name,
        }}
        {...cellProps}
        {...rest}>
        {content}
      </WuiTableRowCell>
    );
  }

  resolveColumnSortDirection = (column: WuiBasicTableColumn<T>) => {
    const { sorting } = this.props;
    const { sortable, field, name } = column as WuiTableFieldDataColumnType<T>;
    if (!sorting || !sorting.sort || !sortable) {
      return;
    }
    if (sorting.sort.field === field || sorting.sort.field === name) {
      return sorting.sort.direction;
    }
  };

  resolveColumnOnSort = (column: WuiBasicTableColumn<T>) => {
    const { sorting } = this.props;
    const { sortable, name } = column as WuiTableFieldDataColumnType<T>;
    if (!sorting || !sortable) {
      return;
    }
    if (!this.props.onChange) {
      throw new Error(`BasicTable is configured to be sortable on column [${name}] but
          [onChange] is not configured. This callback must be implemented to handle the sort requests`);
    }
    return () => this.onColumnSortChange(column);
  };

  getRendererForDataType(dataType: WuiTableDataType = 'auto') {
    const profile = dataTypesProfiles[dataType];
    if (!profile) {
      throw new Error(
        `Unknown dataType [${dataType}]. The supported data types are [${DATA_TYPES.join(
          ', '
        )}]`
      );
    }
    return profile.render;
  }

  getAlignForDataType(dataType: WuiTableDataType = 'auto') {
    const profile = dataTypesProfiles[dataType];
    if (!profile) {
      throw new Error(
        `Unknown dataType [${dataType}]. The supported data types are [${DATA_TYPES.join(
          ', '
        )}]`
      );
    }
    return profile.align;
  }

  renderPaginationBar() {
    const { error, pagination, tableCaption, onChange } = this.props;
    if (!error && pagination && pagination.totalItemCount > 0) {
      if (!onChange) {
        throw new Error(`The Basic Table is configured with pagination but [onChange] is
        not configured. This callback must be implemented to handle pagination changes`);
      }

      let ariaLabel: ReactElement | undefined = undefined;

      if (tableCaption) {
        ariaLabel = (
          <WuiI18n
            token="wuiBasicTable.tablePagination"
            default="Pagination for preceding table: {tableCaption}"
            values={{ tableCaption }}
          />
        );
      }

      return (
        <PaginationBar
          aria-controls={this.tableId}
          pagination={pagination}
          onPageSizeChange={this.onPageSizeChange.bind(this)}
          onPageChange={this.onPageChange.bind(this)}
          aria-label={ariaLabel}
        />
      );
    }
  }
}
