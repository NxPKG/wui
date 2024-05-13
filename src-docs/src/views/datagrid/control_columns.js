import React, {
  createContext,
  useContext,
  useCallback,
  useReducer,
  useState,
  Fragment,
} from 'react';
import { fake } from 'faker';

import {
  WuiDataGrid,
  WuiAvatar,
  WuiCheckbox,
  WuiButtonIcon,
  WuiPopover,
  WuiButtonEmpty,
  WuiFlexGroup,
  WuiFlexItem,
  WuiPopoverTitle,
  WuiSpacer,
  WuiPortal,
  WuiFlyout,
  WuiFlyoutBody,
  WuiFlyoutHeader,
  WuiTitle,
  WuiDescriptionList,
  WuiDescriptionListTitle,
  WuiDescriptionListDescription,
} from '../../../../src/components/';

const columns = [
  {
    id: 'avatar',
    initialWidth: 38,
    isExpandable: false,
    isResizable: false,
    headerCellRender: () => null,
  },
  {
    id: 'name',
  },
  {
    id: 'email',
  },
  {
    id: 'city',
  },
  {
    id: 'country',
  },
  {
    id: 'account',
  },
];

const data = [];

for (let i = 1; i < 500; i++) {
  data.push({
    avatar: (
      <WuiAvatar
        size="s"
        imageUrl={fake('{{internet.avatar}}')}
        name={fake('{{name.lastName}}, {{name.firstName}}')}
      />
    ),
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: fake('{{internet.email}}'),
    city: fake('{{address.city}}'),
    country: fake('{{address.country}}'),
    account: fake('{{finance.account}}'),
  });
}

const SelectionContext = createContext();

const SelectionButton = () => {
  const [selectedRows] = useContext(SelectionContext);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  if (selectedRows.size > 0) {
    return (
      <WuiPopover
        isOpen={isPopoverOpen}
        anchorPosition="upCenter"
        panelPaddingSize="s"
        button={
          <WuiButtonEmpty
            size="xs"
            iconType="arrowDown"
            color="primary"
            className="wuiDataGrid__controlBtn"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            {selectedRows.size} {selectedRows.size > 1 ? 'items' : 'item'}{' '}
            selected
          </WuiButtonEmpty>
        }
        closePopover={() => setIsPopoverOpen(false)}
        ownFocus={true}>
        <WuiPopoverTitle>
          {selectedRows.size} {selectedRows.size > 1 ? 'items' : 'item'}
        </WuiPopoverTitle>
        <div style={{ width: 150 }}>
          <button onClick={() => alert('hello')} component="span">
            <WuiFlexGroup alignItems="center" component="span" gutterSize="s">
              <WuiFlexItem grow={false}>
                <WuiButtonIcon
                  aria-label="Pin selected items"
                  iconType="pin"
                  color="text"
                />
              </WuiFlexItem>
              <WuiFlexItem>Pin items</WuiFlexItem>
            </WuiFlexGroup>
          </button>
          <WuiSpacer size="s" />
          <button onClick={() => alert('hello')}>
            <WuiFlexGroup alignItems="center" component="span" gutterSize="s">
              <WuiFlexItem grow={false}>
                <WuiButtonIcon
                  aria-label="Delete selected items"
                  iconType="trash"
                  color="text"
                />
              </WuiFlexItem>
              <WuiFlexItem>Delete items</WuiFlexItem>
            </WuiFlexGroup>
          </button>
        </div>
      </WuiPopover>
    );
  } else {
    return null;
  }
};

const SelectionHeaderCell = () => {
  const [selectedRows, updateSelectedRows] = useContext(SelectionContext);
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size < data.length;
  return (
    <WuiCheckbox
      id="selection-toggle"
      aria-label="Select all rows"
      indeterminate={isIndeterminate}
      checked={selectedRows.size > 0}
      onChange={e => {
        if (isIndeterminate) {
          // clear selection
          updateSelectedRows({ action: 'clear' });
        } else {
          if (e.target.checked) {
            // select everything
            updateSelectedRows({ action: 'selectAll' });
          } else {
            // clear selection
            updateSelectedRows({ action: 'clear' });
          }
        }
      }}
    />
  );
};

const SelectionRowCell = ({ rowIndex }) => {
  const [selectedRows, updateSelectedRows] = useContext(SelectionContext);
  const isChecked = selectedRows.has(rowIndex);

  return (
    <div>
      <WuiCheckbox
        id={`${rowIndex}`}
        aria-label={`Select row ${rowIndex}, ${data[rowIndex].name}`}
        checked={isChecked}
        onChange={e => {
          if (e.target.checked) {
            updateSelectedRows({ action: 'add', rowIndex });
          } else {
            updateSelectedRows({ action: 'delete', rowIndex });
          }
        }}
      />
    </div>
  );
};

const FlyoutRowCell = rowIndex => {
  let flyout;
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  if (isFlyoutOpen) {
    const rowData = data[rowIndex.rowIndex];
    console.log(rowData);

    const details = Object.entries(rowData).map(([key, value]) => {
      return (
        <Fragment>
          <WuiDescriptionListTitle>{key}</WuiDescriptionListTitle>
          <WuiDescriptionListDescription>{value}</WuiDescriptionListDescription>
        </Fragment>
      );
    });

    flyout = (
      <WuiPortal>
        <WuiFlyout ownFocus onClose={() => setIsFlyoutOpen(!isFlyoutOpen)}>
          <WuiFlyoutHeader hasBorder>
            <WuiTitle size="m">
              <h2>{rowData.name}</h2>
            </WuiTitle>
          </WuiFlyoutHeader>
          <WuiFlyoutBody>
            <WuiDescriptionList>{details}</WuiDescriptionList>
          </WuiFlyoutBody>
        </WuiFlyout>
      </WuiPortal>
    );
  }

  return (
    <Fragment>
      <WuiButtonIcon
        color="text"
        iconType="eye"
        iconSize="s"
        aria-label="View details"
        onClick={() => setIsFlyoutOpen(!isFlyoutOpen)}
      />
      {flyout}
    </Fragment>
  );
};

const leadingControlColumns = [
  {
    id: 'selection',
    width: 32,
    headerCellRender: SelectionHeaderCell,
    rowCellRender: SelectionRowCell,
  },
  {
    id: 'View',
    width: 36,
    headerCellRender: () => null,
    rowCellRender: FlyoutRowCell,
  },
];

const trailingControlColumns = [
  {
    id: 'actions',
    width: 40,
    headerCellRender: () => null,
    rowCellRender: function RowCellRender() {
      const [isPopoverOpen, setIsPopoverOpen] = useState(false);
      return (
        <div>
          <WuiPopover
            isOpen={isPopoverOpen}
            anchorPosition="upCenter"
            panelPaddingSize="s"
            button={
              <WuiButtonIcon
                aria-label="show actions"
                iconType="boxesHorizontal"
                color="text"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              />
            }
            closePopover={() => setIsPopoverOpen(false)}
            ownFocus={true}>
            <WuiPopoverTitle>Actions</WuiPopoverTitle>
            <div style={{ width: 150 }}>
              <button onClick={() => alert('hello')} component="span">
                <WuiFlexGroup
                  alignItems="center"
                  component="span"
                  gutterSize="s">
                  <WuiFlexItem grow={false}>
                    <WuiButtonIcon
                      aria-label="Pin selected items"
                      iconType="pin"
                      color="text"
                    />
                  </WuiFlexItem>
                  <WuiFlexItem>Pin</WuiFlexItem>
                </WuiFlexGroup>
              </button>
              <WuiSpacer size="s" />
              <button onClick={() => alert('hello')}>
                <WuiFlexGroup
                  alignItems="center"
                  component="span"
                  gutterSize="s">
                  <WuiFlexItem grow={false}>
                    <WuiButtonIcon
                      aria-label="Delete selected items"
                      iconType="trash"
                      color="text"
                    />
                  </WuiFlexItem>
                  <WuiFlexItem>Delete</WuiFlexItem>
                </WuiFlexGroup>
              </button>
            </div>
          </WuiPopover>
        </div>
      );
    },
  },
];

export default function DataGrid() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });
  const setPageIndex = useCallback(
    pageIndex => setPagination({ ...pagination, pageIndex }),
    [pagination, setPagination]
  );
  const setPageSize = useCallback(
    pageSize => setPagination({ ...pagination, pageSize, pageIndex: 0 }),
    [pagination, setPagination]
  );

  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  );

  const rowSelection = useReducer((rowSelection, { action, rowIndex }) => {
    if (action === 'add') {
      const nextRowSelection = new Set(rowSelection);
      nextRowSelection.add(rowIndex);
      return nextRowSelection;
    } else if (action === 'delete') {
      const nextRowSelection = new Set(rowSelection);
      nextRowSelection.delete(rowIndex);
      return nextRowSelection;
    } else if (action === 'clear') {
      return new Set();
    } else if (action === 'selectAll') {
      return new Set(data.map((_, index) => index));
    }
    return rowSelection;
  }, new Set());

  const renderCellValue = useCallback(
    ({ rowIndex, columnId }) => data[rowIndex][columnId],
    []
  );

  return (
    <SelectionContext.Provider value={rowSelection}>
      <div>
        <WuiDataGrid
          aria-label="Top WUI contributors"
          leadingControlColumns={leadingControlColumns}
          trailingControlColumns={trailingControlColumns}
          columns={columns}
          columnVisibility={{
            visibleColumns,
            setVisibleColumns,
          }}
          rowCount={data.length}
          renderCellValue={renderCellValue}
          pagination={{
            ...pagination,
            pageSizeOptions: [5, 15, 25],
            onChangeItemsPerPage: setPageSize,
            onChangePage: setPageIndex,
          }}
          toolbarVisibility={{
            additionalControls: <SelectionButton />,
          }}
        />
      </div>
    </SelectionContext.Provider>
  );
}
