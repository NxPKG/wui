/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useCallback, useMemo } from 'react';
import { fake } from 'faker';

import {
  WuiDataGrid,
  WuiButtonEmpty,
  WuiButtonIcon,
  WuiLink,
  WuiSwitch,
  WuiSpacer,
  WuiBadge,
  WuiToken,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components/';

const data = [];

for (let i = 0; i < 10; i++) {
  data.push([
    <span>{fake('{{name.firstName}}')}</span>,
    <span>{fake('{{name.firstName}}')}</span>,

    <span>
      <WuiLink href="#/tabular-content/data-grid-focus">
        {fake('{{internet.email}}')}
      </WuiLink>
    </span>,
    <span>
      <WuiLink href="#/tabular-content/data-grid-focus">
        {fake('{{internet.email}}')}
      </WuiLink>
    </span>,

    <span>
      <WuiButtonEmpty size="xs" onClick={() => console.log('clicked Yes')}>
        Yes
      </WuiButtonEmpty>
      <WuiButtonEmpty
        size="xs"
        color="danger"
        onClick={() => console.log('clicked No')}>
        No
      </WuiButtonEmpty>
    </span>,
    <span>
      <WuiButtonEmpty size="xs" onClick={() => console.log('clicked Yes')}>
        Yes
      </WuiButtonEmpty>
      <WuiButtonEmpty
        size="xs"
        color="danger"
        onClick={() => console.log('clicked No')}>
        No
      </WuiButtonEmpty>
    </span>,
  ]);
}

const renderHeaderIcon = areHeadersInteractive =>
  areHeadersInteractive ? (
    <WuiFlexItem grow={false}>
      <WuiButtonIcon
        aria-label="column settings"
        iconType="gear"
        onClick={() => console.log('gear icon clicked')}
      />
    </WuiFlexItem>
  ) : null;

export default () => {
  const [areHeadersInteractive, setAreHeadersInteractive] = useState(false);
  const switchInteractiveHeaders = useCallback(
    e => setAreHeadersInteractive(e.target.checked),
    [setAreHeadersInteractive]
  );

  const columns = useMemo(
    () => [
      {
        id: 'no-interactives not expandable',
        display: (
          <WuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            {renderHeaderIcon(areHeadersInteractive)}
            <WuiFlexItem grow={false}>
              <WuiToken
                iconType="expandMini"
                color="wuiColorVis2"
                shape="square"
                fill="dark"
              />
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiBadge>0 interactive</WuiBadge>
            </WuiFlexItem>
          </WuiFlexGroup>
        ),
        isExpandable: false,
        actions: false,
      },
      {
        id: 'no-interactives is expandable',
        display: (
          <WuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            <WuiFlexItem grow={false}>
              <WuiToken
                iconType="expandMini"
                color="wuiColorVis0"
                shape="square"
                fill="dark"
              />
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiBadge>0 interactive</WuiBadge>
            </WuiFlexItem>
          </WuiFlexGroup>
        ),
        actions: false,
      },
      {
        id: 'one-interactive not expandable',
        display: (
          <WuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            <WuiFlexItem grow={false}>
              <WuiToken
                iconType="expandMini"
                color="wuiColorVis2"
                shape="square"
                fill="dark"
              />
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiBadge>1 interactive</WuiBadge>
            </WuiFlexItem>
          </WuiFlexGroup>
        ),
        isExpandable: false,
        actions: false,
      },
      {
        id: 'one-interactives is expandable',
        display: (
          <WuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            {renderHeaderIcon(areHeadersInteractive)}
            <WuiFlexItem grow={false}>
              <WuiToken
                iconType="expandMini"
                color="wuiColorVis0"
                shape="square"
                fill="dark"
              />
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiBadge>1 interactive</WuiBadge>
            </WuiFlexItem>
          </WuiFlexGroup>
        ),
        actions: false,
      },
      {
        id: 'two-interactives not expandable',

        display: (
          <WuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            <WuiFlexItem grow={false}>
              <WuiToken
                iconType="expandMini"
                color="wuiColorVis2"
                shape="square"
                fill="dark"
              />
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiBadge>2 interactive</WuiBadge>
            </WuiFlexItem>
          </WuiFlexGroup>
        ),
        isExpandable: false,
        actions: false,
      },
      {
        id: 'two-interactives is expandable',

        display: (
          <WuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
            <WuiFlexItem grow={false}>
              <WuiToken
                iconType="expandMini"
                color="wuiColorVis0"
                shape="square"
                fill="dark"
              />
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiBadge>2 interactive</WuiBadge>
            </WuiFlexItem>
          </WuiFlexGroup>
        ),
        actions: false,
      },
    ],
    [areHeadersInteractive]
  );
  const columnIdToIndex = columns.reduce((acc, { id }, index) => {
    acc[id] = index;
    return acc;
  }, {});

  const renderCellValue = useCallback(
    ({ rowIndex, columnId }) => {
      const columnIndex = columnIdToIndex[columnId];
      return data[rowIndex][columnIndex];
    },
    [columnIdToIndex]
  );

  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const [pagination, setPagination] = useState({
    pageSize: 4,
    pageIndex: 0,
    pageSizeOptions: [4],
  });
  const onChangeItemsPerPage = useCallback(
    pageSize => setPagination(pagination => ({ ...pagination, pageSize })),
    [setPagination]
  );
  const onChangePage = useCallback(
    pageIndex => setPagination(pagination => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  return (
    <>
      <WuiSwitch
        label="Use interactive headers - toggling will reset the datagrid and any internal states"
        checked={areHeadersInteractive}
        onChange={switchInteractiveHeaders}
      />

      <WuiSpacer />

      <WuiDataGrid
        key={areHeadersInteractive ? 'interactive-headers' : 'static-headers'}
        aria-label="Top WUI contributors"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        rowCount={data.length}
        renderCellValue={renderCellValue}
        pagination={{
          ...pagination,
          onChangeItemsPerPage,
          onChangePage,
        }}
      />
    </>
  );
};
