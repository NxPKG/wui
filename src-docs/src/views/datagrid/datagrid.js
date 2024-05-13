import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fake } from 'faker';

import {
  WuiDataGrid,
  WuiLink,
  WuiFlexGroup,
  WuiFlexItem,
  WuiPopover,
  WuiPopoverTitle,
  WuiButtonIcon,
  WuiSpacer,
} from '../../../../src/components/';

const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc',
  },
  {
    id: 'email',
  },
  {
    id: 'location',
  },
  {
    id: 'account',
    actions: {
      showHide: { label: 'Custom hide label' },
      showMoveLeft: false,
      showMoveRight: false,
      additional: [
        {
          label: 'Custom action',
          onClick: () => alert('🎉'),
          iconType: 'cheer',
          size: 'xs',
          color: 'text',
        },
      ],
    },
  },
  {
    id: 'date',
    defaultSortDirection: 'desc',
  },
  {
    id: 'amount',
  },
  {
    id: 'phone',
    isSortable: false,
  },
  {
    id: 'version',
    defaultSortDirection: 'desc',
    initialWidth: 65,
    isResizable: false,
    actions: false,
  },
];

const raw_data = [];

for (let i = 1; i < 100; i++) {
  raw_data.push({
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: <WuiLink href="">{fake('{{internet.email}}')}</WuiLink>,
    location: (
      <Fragment>
        {`${fake('{{address.city}}')}, `}
        <WuiLink href="https://google.com">
          {fake('{{address.country}}')}
        </WuiLink>
      </Fragment>
    ),
    date: fake('{{date.past}}'),
    account: fake('{{finance.account}}'),
    amount: fake('${{commerce.price}}'),
    phone: fake('{{phone.phoneNumber}}'),
    version: fake('{{system.semver}}'),
  });
}

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

export default () => {
  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const onChangeItemsPerPage = useCallback(
    pageSize =>
      setPagination(pagination => ({ ...pagination, pageSize, pageIndex: 0 })),
    [setPagination]
  );
  const onChangePage = useCallback(
    pageIndex => setPagination(pagination => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  // ** Sorting config
  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    sortingColumns => {
      setSortingColumns(sortingColumns);
    },
    [setSortingColumns]
  );

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  ); // initialize to the full set of columns

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId, setCellProps }) => {
      useEffect(() => {
        if (columnId === 'amount') {
          if (raw_data.hasOwnProperty(rowIndex)) {
            const numeric = parseFloat(
              raw_data[rowIndex][columnId].match(/\d+\.\d+/)[0],
              10
            );
            setCellProps({
              style: {
                backgroundColor: `rgba(0, 255, 0, ${numeric * 0.0002})`,
              },
            });
          }
        }
      }, [rowIndex, columnId, setCellProps]);

      return raw_data.hasOwnProperty(rowIndex)
        ? raw_data[rowIndex][columnId]
        : null;
    };
  }, []);

  return (
    <WuiDataGrid
      aria-label="Data grid demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      trailingControlColumns={trailingControlColumns}
      rowCount={raw_data.length}
      renderCellValue={renderCellValue}
      inMemory={{ level: 'sorting' }}
      sorting={{ columns: sortingColumns, onSort }}
      pagination={{
        ...pagination,
        pageSizeOptions: [10, 50, 100],
        onChangeItemsPerPage: onChangeItemsPerPage,
        onChangePage: onChangePage,
      }}
      onColumnResize={eventData => {
        console.log(eventData);
      }}
    />
  );
};
