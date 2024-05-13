import React, { useState, useCallback, Fragment } from 'react';
import { fake } from 'faker';

import {
  WuiDataGrid,
  WuiButtonEmpty,
  WuiLink,
} from '../../../../src/components/';

const columns = [
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

for (let i = 1; i < 20; i++) {
  data.push({
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: fake('{{internet.email}}'),
    city: (
      <WuiLink href="http://google.com">{fake('{{address.city}}')}</WuiLink>
    ),
    country: fake('{{address.country}}'),
    account: fake('{{finance.account}}'),
  });
}

export default () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  );

  const setPageIndex = useCallback(
    pageIndex => setPagination({ ...pagination, pageIndex }),
    [pagination, setPagination]
  );
  const setPageSize = useCallback(
    pageSize => setPagination({ ...pagination, pageSize, pageIndex: 0 }),
    [pagination, setPagination]
  );

  return (
    <WuiDataGrid
      aria-label="Data grid demo with additional controls"
      columns={columns}
      columnVisibility={{
        visibleColumns: visibleColumns,
        setVisibleColumns: setVisibleColumns,
      }}
      rowCount={data.length}
      gridStyle={{
        border: 'horizontal',
        header: 'underline',
      }}
      renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
      pagination={{
        ...pagination,
        pageSizeOptions: [5, 10, 25],
        onChangeItemsPerPage: setPageSize,
        onChangePage: setPageIndex,
      }}
      toolbarVisibility={{
        additionalControls: (
          <Fragment>
            <WuiButtonEmpty
              size="xs"
              iconType="bell"
              color="primary"
              className="wuiDataGrid__controlBtn"
              onClick={() => alert('You clicked me! Hugs.')}>
              New button
            </WuiButtonEmpty>
            <WuiButtonEmpty
              size="xs"
              iconType="branch"
              color="danger"
              className="wuiDataGrid__controlBtn"
              onClick={() => alert('You clicked me! Hugs.')}>
              Another button
            </WuiButtonEmpty>
          </Fragment>
        ),
      }}
    />
  );
};
