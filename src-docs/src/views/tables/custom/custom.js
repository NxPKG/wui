import React, { Component } from 'react';

import {
  WuiBadge,
  WuiHealth,
  WuiButton,
  WuiButtonIcon,
  WuiCheckbox,
  WuiContextMenuItem,
  WuiContextMenuPanel,
  WuiFieldSearch,
  WuiFlexGroup,
  WuiFlexItem,
  WuiIcon,
  WuiLink,
  WuiPopover,
  WuiSpacer,
  WuiTable,
  WuiTableBody,
  WuiTableFooter,
  WuiTableFooterCell,
  WuiTableHeader,
  WuiTableHeaderCell,
  WuiTableHeaderCellCheckbox,
  WuiTablePagination,
  WuiTableRow,
  WuiTableRowCell,
  WuiTableRowCellCheckbox,
  WuiTableSortMobile,
  WuiTableHeaderMobile,
} from '../../../../../src/components';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  Pager,
  SortableProperties,
} from '../../../../../src/services';

import { isFunction } from '../../../../../src/services/predicate';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemIdToSelectedMap: {},
      itemIdToOpenActionsPopoverMap: {},
      sortedColumn: 'title',
      itemsPerPage: 10,
    };

    this.items = [
      {
        id: 0,
        title:
          'A very long line which will wrap on narrower screens and NOT become truncated and replaced by an ellipsis',
        type: 'user',
        dateCreated: 'Tue Dec 28 2016',
        magnitude: 1,
        health: <WuiBadge color="secondary">Healthy</WuiBadge>,
      },
      {
        id: 1,
        title: {
          value:
            'A very long line which will not wrap on narrower screens and instead will become truncated and replaced by an ellipsis',
          truncateText: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 01 2016',
        magnitude: 1,
        health: <WuiBadge color="secondary">Healthy</WuiBadge>,
      },
      {
        id: 2,
        title: (
          <span>
            A very long line in an ELEMENT which will wrap on narrower screens
            and NOT become truncated and replaced by an ellipsis
          </span>
        ),
        type: 'user',
        dateCreated: (
          <span>
            Tue Dec 01 2016 &nbsp; <WuiBadge color="accent">New!</WuiBadge>
          </span>
        ),
        magnitude: 10,
        health: <WuiBadge color="warning">Warning</WuiBadge>,
      },
      {
        id: 3,
        title: {
          value: (
            <span>
              A very long line in an ELEMENT which will not wrap on narrower
              screens and instead will become truncated and replaced by an
              ellipsis
            </span>
          ),
          truncateText: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 16 2016',
        magnitude: 100,
        health: <WuiBadge color="secondary">Healthy</WuiBadge>,
      },
      {
        id: 4,
        title: {
          value: 'Dog',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 13 2016',
        magnitude: 1000,
        health: <WuiBadge color="warning">Warning</WuiBadge>,
      },
      {
        id: 5,
        title: {
          value: 'Dragon',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <WuiBadge color="secondary">Healthy</WuiBadge>,
      },
      {
        id: 6,
        title: {
          value: 'Bear',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <WuiBadge color="danger">Danger</WuiBadge>,
      },
      {
        id: 7,
        title: {
          value: 'Dinosaur',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <WuiBadge color="warning">Warning</WuiBadge>,
      },
      {
        id: 8,
        title: {
          value: 'Spider',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <WuiBadge color="warning">Warning</WuiBadge>,
      },
      {
        id: 9,
        title: {
          value: 'Bugbear',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <WuiBadge color="secondary">Healthy</WuiBadge>,
      },
      {
        id: 10,
        title: {
          value: 'Bear',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <WuiBadge color="danger">Danger</WuiBadge>,
      },
      {
        id: 11,
        title: {
          value: 'Dinosaur',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <WuiBadge color="warning">Warning</WuiBadge>,
      },
      {
        id: 12,
        title: {
          value: 'Spider',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <WuiHealth color="secondary">Healthy</WuiHealth>,
      },
      {
        id: 13,
        title: {
          value: 'Bugbear',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <WuiBadge color="danger">Danger</WuiBadge>,
      },
    ];

    this.sortableProperties = new SortableProperties(
      [
        {
          name: 'title',
          getValue: item => item.title.toLowerCase(),
          isAscending: true,
        },
        {
          name: 'dateCreated',
          getValue: item => item.dateCreated.toLowerCase(),
          isAscending: true,
        },
        {
          name: 'magnitude',
          getValue: item => item.magnitude.toLowerCase(),
          isAscending: true,
        },
      ],
      this.state.sortedColumn
    );

    this.columns = [
      {
        id: 'checkbox',
        isCheckbox: true,
        textOnly: false,
        width: '32px',
      },
      {
        id: 'type',
        label: '',
        alignment: LEFT_ALIGNMENT,
        width: '24px',
        cellProvider: cell => <WuiIcon type={cell} size="m" />,
        mobileOptions: {
          show: false,
        },
      },
      {
        id: 'title',
        label: 'Title',
        footer: <em>Title</em>,
        alignment: LEFT_ALIGNMENT,
        isSortable: true,
        mobileOptions: {
          show: false,
        },
      },
      {
        id: 'title_type',
        label: 'Title',
        mobileOptions: {
          only: true,
          header: false,
          enlarge: true,
          fullWidth: true,
        },
        render: (title, item) => (
          <span>
            <WuiIcon
              type={item.type}
              size="m"
              style={{ verticalAlign: 'text-top' }}
            />{' '}
            {title}
          </span>
        ),
      },
      {
        id: 'health',
        label: 'Health',
        footer: '',
        alignment: LEFT_ALIGNMENT,
      },
      {
        id: 'dateCreated',
        label: 'Date created',
        footer: 'Date created',
        alignment: LEFT_ALIGNMENT,
        isSortable: true,
      },
      {
        id: 'magnitude',
        label: 'Orders of magnitude',
        footer: ({ items, pagination }) => {
          const { pageIndex, pageSize } = pagination;
          const startIndex = pageIndex * pageSize;
          const pageOfItems = items.slice(
            startIndex,
            Math.min(startIndex + pageSize, items.length)
          );
          return (
            <strong>
              Total: {pageOfItems.reduce((acc, cur) => acc + cur.magnitude, 0)}
            </strong>
          );
        },
        alignment: RIGHT_ALIGNMENT,
        isSortable: true,
      },
      {
        id: 'actions',
        label: '',
        alignment: RIGHT_ALIGNMENT,
        isActionsPopover: true,
        width: '32px',
      },
    ];

    this.pager = new Pager(this.items.length, this.state.itemsPerPage);
    this.state.firstItemIndex = this.pager.getFirstItemIndex();
    this.state.lastItemIndex = this.pager.getLastItemIndex();
  }

  onChangeItemsPerPage = itemsPerPage => {
    this.pager.setItemsPerPage(itemsPerPage);
    this.setState({
      itemsPerPage,
      firstItemIndex: this.pager.getFirstItemIndex(),
      lastItemIndex: this.pager.getLastItemIndex(),
    });
  };

  onChangePage = pageIndex => {
    this.pager.goToPageIndex(pageIndex);
    this.setState({
      firstItemIndex: this.pager.getFirstItemIndex(),
      lastItemIndex: this.pager.getLastItemIndex(),
    });
  };

  onSort = prop => {
    this.sortableProperties.sortOn(prop);

    this.setState({
      sortedColumn: prop,
    });
  };

  toggleItem = itemId => {
    this.setState(previousState => {
      const newItemIdToSelectedMap = {
        ...previousState.itemIdToSelectedMap,
        [itemId]: !previousState.itemIdToSelectedMap[itemId],
      };

      return {
        itemIdToSelectedMap: newItemIdToSelectedMap,
      };
    });
  };

  toggleAll = () => {
    const allSelected = this.areAllItemsSelected();
    const newItemIdToSelectedMap = {};
    this.items.forEach(
      item => (newItemIdToSelectedMap[item.id] = !allSelected)
    );

    this.setState({
      itemIdToSelectedMap: newItemIdToSelectedMap,
    });
  };

  isItemSelected = itemId => {
    return this.state.itemIdToSelectedMap[itemId];
  };

  areAllItemsSelected = () => {
    const indexOfUnselectedItem = this.items.findIndex(
      item => !this.isItemSelected(item.id)
    );
    return indexOfUnselectedItem === -1;
  };

  areAnyRowsSelected = () => {
    return (
      Object.keys(this.state.itemIdToSelectedMap).findIndex(id => {
        return this.state.itemIdToSelectedMap[id];
      }) !== -1
    );
  };

  togglePopover = itemId => {
    this.setState(previousState => {
      const newItemIdToOpenActionsPopoverMap = {
        ...previousState.itemIdToOpenActionsPopoverMap,
        [itemId]: !previousState.itemIdToOpenActionsPopoverMap[itemId],
      };

      return {
        itemIdToOpenActionsPopoverMap: newItemIdToOpenActionsPopoverMap,
      };
    });
  };

  closePopover = itemId => {
    // only update the state if this item's popover is open
    if (this.isPopoverOpen(itemId)) {
      this.setState(previousState => {
        const newItemIdToOpenActionsPopoverMap = {
          ...previousState.itemIdToOpenActionsPopoverMap,
          [itemId]: false,
        };

        return {
          itemIdToOpenActionsPopoverMap: newItemIdToOpenActionsPopoverMap,
        };
      });
    }
  };

  isPopoverOpen = itemId => {
    return this.state.itemIdToOpenActionsPopoverMap[itemId];
  };

  renderSelectAll = mobile => {
    return (
      <WuiCheckbox
        id="selectAllCheckbox"
        label={mobile ? 'Select all' : null}
        checked={this.areAllItemsSelected()}
        onChange={this.toggleAll.bind(this)}
        type={mobile ? null : 'inList'}
      />
    );
  };

  getTableMobileSortItems() {
    const items = [];
    this.columns.forEach(column => {
      if (column.isCheckbox || !column.isSortable) {
        return;
      }
      items.push({
        name: column.label,
        key: column.id,
        onSort: this.onSort.bind(this, column.id),
        isSorted: this.state.sortedColumn === column.id,
        isSortAscending: this.sortableProperties.isAscendingByName(column.id),
      });
    });
    return items.length ? items : null;
  }

  renderHeaderCells() {
    const headers = [];

    this.columns.forEach((column, columnIndex) => {
      if (column.isCheckbox) {
        headers.push(
          <WuiTableHeaderCellCheckbox key={column.id} width={column.width}>
            {this.renderSelectAll()}
          </WuiTableHeaderCellCheckbox>
        );
      } else {
        headers.push(
          <WuiTableHeaderCell
            key={column.id}
            align={this.columns[columnIndex].alignment}
            width={column.width}
            onSort={
              column.isSortable ? this.onSort.bind(this, column.id) : undefined
            }
            isSorted={this.state.sortedColumn === column.id}
            isSortAscending={this.sortableProperties.isAscendingByName(
              column.id
            )}
            mobileOptions={column.mobileOptions}>
            {column.label}
          </WuiTableHeaderCell>
        );
      }
    });
    return headers.length ? headers : null;
  }

  renderRows() {
    const renderRow = item => {
      const cells = this.columns.map(column => {
        const cell = item[column.id];

        let child;

        if (column.isCheckbox) {
          return (
            <WuiTableRowCellCheckbox key={column.id}>
              <WuiCheckbox
                id={`${item.id}-checkbox`}
                checked={this.isItemSelected(item.id)}
                onChange={this.toggleItem.bind(this, item.id)}
                type="inList"
              />
            </WuiTableRowCellCheckbox>
          );
        }

        if (column.isActionsPopover) {
          return (
            <WuiTableRowCell
              key={column.id}
              header={column.label}
              textOnly={false}
              hasActions={true}
              align="right">
              <WuiPopover
                id={`${item.id}-actions`}
                button={
                  <WuiButtonIcon
                    aria-label="Actions"
                    iconType="gear"
                    size="s"
                    color="text"
                    onClick={() => this.togglePopover(item.id)}
                  />
                }
                isOpen={this.isPopoverOpen(item.id)}
                closePopover={() => this.closePopover(item.id)}
                panelPaddingSize="none"
                anchorPosition="leftCenter">
                <WuiContextMenuPanel
                  items={[
                    <WuiContextMenuItem
                      key="A"
                      icon="pencil"
                      onClick={() => {
                        this.closePopover(item.id);
                      }}>
                      Edit
                    </WuiContextMenuItem>,
                    <WuiContextMenuItem
                      key="B"
                      icon="share"
                      onClick={() => {
                        this.closePopover(item.id);
                      }}>
                      Share
                    </WuiContextMenuItem>,
                    <WuiContextMenuItem
                      key="C"
                      icon="trash"
                      onClick={() => {
                        this.closePopover(item.id);
                      }}>
                      Delete
                    </WuiContextMenuItem>,
                  ]}
                />
              </WuiPopover>
            </WuiTableRowCell>
          );
        }

        if (column.render) {
          const titleText = item.title.truncateText
            ? item.title.value
            : item.title;
          const title = item.title.isLink ? (
            <WuiLink href="">{item.title.value}</WuiLink>
          ) : (
            titleText
          );
          child = column.render(title, item);
        } else if (column.cellProvider) {
          child = column.cellProvider(cell);
        } else if (cell.isLink) {
          child = <WuiLink href="">{cell.value}</WuiLink>;
        } else if (cell.truncateText) {
          child = cell.value;
        } else {
          child = cell;
        }

        return (
          <WuiTableRowCell
            key={column.id}
            align={column.alignment}
            truncateText={cell && cell.truncateText}
            textOnly={cell ? cell.textOnly : true}
            mobileOptions={{
              header: column.label,
              ...column.mobileOptions,
            }}>
            {child}
          </WuiTableRowCell>
        );
      });

      return (
        <WuiTableRow
          key={item.id}
          isSelected={this.isItemSelected(item.id)}
          isSelectable={true}
          hasActions={true}>
          {cells}
        </WuiTableRow>
      );
    };

    const rows = [];

    for (
      let itemIndex = this.state.firstItemIndex;
      itemIndex <= this.state.lastItemIndex;
      itemIndex++
    ) {
      const item = this.items[itemIndex];
      rows.push(renderRow(item));
    }

    return rows;
  }

  renderFooterCells() {
    const footers = [];

    const items = this.items;
    const pagination = {
      pageIndex: this.pager.getCurrentPageIndex(),
      pageSize: this.state.itemsPerPage,
      totalItemCount: this.pager.getTotalPages(),
    };

    this.columns.forEach(column => {
      const footer = this.getColumnFooter(column, { items, pagination });
      if (column.mobileOptions && column.mobileOptions.only) {
        return; // exclude columns that only exist for mobile headers
      }

      if (footer) {
        footers.push(
          <WuiTableFooterCell
            key={`footer_${column.id}`}
            align={column.alignment}>
            {footer}
          </WuiTableFooterCell>
        );
      } else {
        footers.push(
          <WuiTableFooterCell
            key={`footer_empty_${footers.length - 1}`}
            align={column.alignment}>
            {undefined}
          </WuiTableFooterCell>
        );
      }
    });
    return footers;
  }

  getColumnFooter = (column, { items, pagination }) => {
    if (column.footer === null) {
      return null;
    }

    if (column.footer) {
      if (isFunction(column.footer)) {
        return column.footer({ items, pagination });
      }
      return column.footer;
    }

    return undefined;
  };

  render() {
    let optionalActionButtons;
    const exampleId = 'example-id';

    if (this.areAnyRowsSelected() > 0) {
      optionalActionButtons = (
        <WuiFlexItem grow={false}>
          <WuiButton color="danger">Delete selected</WuiButton>
        </WuiFlexItem>
      );
    }

    return (
      <div>
        <WuiFlexGroup gutterSize="m">
          {optionalActionButtons}

          <WuiFlexItem>
            <WuiFieldSearch fullWidth placeholder="Search..." />
          </WuiFlexItem>
        </WuiFlexGroup>

        <WuiSpacer size="m" />

        <WuiTableHeaderMobile>
          <WuiFlexGroup
            responsive={false}
            justifyContent="spaceBetween"
            alignItems="baseline">
            <WuiFlexItem grow={false}>{this.renderSelectAll(true)}</WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiTableSortMobile items={this.getTableMobileSortItems()} />
            </WuiFlexItem>
          </WuiFlexGroup>
        </WuiTableHeaderMobile>

        <WuiTable id={exampleId}>
          <WuiTableHeader>{this.renderHeaderCells()}</WuiTableHeader>

          <WuiTableBody>{this.renderRows()}</WuiTableBody>

          <WuiTableFooter>{this.renderFooterCells()}</WuiTableFooter>
        </WuiTable>

        <WuiSpacer size="m" />

        <WuiTablePagination
          aria-controls={exampleId}
          activePage={this.pager.getCurrentPageIndex()}
          itemsPerPage={this.state.itemsPerPage}
          itemsPerPageOptions={[5, 10, 20]}
          pageCount={this.pager.getTotalPages()}
          onChangeItemsPerPage={this.onChangeItemsPerPage}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}
