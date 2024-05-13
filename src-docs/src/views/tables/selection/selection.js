import React, { useState, Fragment, useRef } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  WuiBasicTable,
  WuiLink,
  WuiHealth,
  WuiButton,
  WuiFlexGroup,
  WuiFlexItem,
  WuiSpacer,
} from '../../../../../src/components';

/*
Example user object:

{
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  github: 'johndoe',
  dateOfBirth: Date.now(),
  nationality: 'NL',
  online: true
}

Example country object:

{
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱'
}
*/

const store = createDataStore();

export const Table = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedItems, setSelectedItems] = useState([]);
  const tableRef = useRef();

  const onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  const onSelectionChange = selectedItems => {
    setSelectedItems(selectedItems);
  };

  const onClickDelete = () => {
    store.deleteUsers(...selectedItems.map(user => user.id));

    setSelectedItems([]);
  };

  const renderDeleteButton = () => {
    if (selectedItems.length === 0) {
      return;
    }

    return (
      <WuiButton color="danger" iconType="trash" onClick={onClickDelete}>
        Delete {selectedItems.length} Users
      </WuiButton>
    );
  };

  const renderStatus = online => {
    const color = online ? 'success' : 'danger';
    const label = online ? 'Online' : 'Offline';
    return <WuiHealth color={color}>{label}</WuiHealth>;
  };

  const { pageOfItems, totalItemCount } = store.findUsers(
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const deleteButton = renderDeleteButton();

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      sortable: true,
      truncateText: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'lastName',
      name: 'Last Name',
      truncateText: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'firstName',
      name: 'Full Name',
      mobileOptions: {
        only: true,
        header: false,
        enlarge: true,
        fullWidth: true,
      },
      render: (name, item) => (
        <WuiFlexGroup responsive={false} alignItems="center">
          <WuiFlexItem>
            {item.firstName} {item.lastName}
          </WuiFlexItem>
          <WuiFlexItem grow={false}>{renderStatus(item.online)}</WuiFlexItem>
        </WuiFlexGroup>
      ),
    },
    {
      field: 'github',
      name: 'Github',
      render: username => (
        <WuiLink href={`https://github.com/${username}`} target="_blank">
          {username}
        </WuiLink>
      ),
    },
    {
      field: 'dateOfBirth',
      name: 'Date of Birth',
      dataType: 'date',
      render: date => formatDate(date, 'dobLong'),
      sortable: true,
    },
    {
      field: 'nationality',
      name: 'Nationality',
      render: countryCode => {
        const country = store.getCountry(countryCode);
        return `${country.flag} ${country.name}`;
      },
    },
    {
      field: 'online',
      name: 'Online',
      dataType: 'boolean',
      render: online => renderStatus(online),
      sortable: true,
      mobileOptions: {
        show: false,
      },
    },
  ];

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [3, 5, 8],
  };

  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  const onlineUsers = store.users.filter(user => user.online);

  const selection = {
    selectable: user => user.online,
    selectableMessage: selectable =>
      !selectable ? 'User is currently offline' : undefined,
    onSelectionChange: onSelectionChange,
    initialSelected: onlineUsers,
  };

  const onSelection = () => {
    tableRef.current.setSelection(onlineUsers);
  };

  return (
    <Fragment>
      <WuiFlexGroup alignItems="center">
        <WuiFlexItem grow={false}>
          <WuiButton onClick={onSelection}>Select online users</WuiButton>
        </WuiFlexItem>
        <WuiFlexItem />
        {deleteButton}
      </WuiFlexGroup>

      <WuiSpacer size="l" />

      <WuiBasicTable
        ref={tableRef}
        items={pageOfItems}
        itemId="id"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        isSelectable={true}
        selection={selection}
        onChange={onTableChange}
        rowHeader="firstName"
      />
    </Fragment>
  );
};
