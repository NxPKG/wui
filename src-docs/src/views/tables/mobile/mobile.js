import React, { useState, Fragment } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  WuiBasicTable,
  WuiLink,
  WuiHealth,
  WuiFlexGroup,
  WuiFlexItem,
  WuiSwitch,
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
  const [, setSelectedItems] = useState([]);
  const [customHeader, setCustomHeader] = useState(true);
  const [isResponsive, setIsResponsive] = useState(true);

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

  const toggleHeader = () => {
    setCustomHeader(!customHeader);
  };

  const toggleResponsive = () => {
    setIsResponsive(!isResponsive);
  };

  const deleteUser = user => {
    store.deleteUsers(user.id);
    setSelectedItems([]);
  };

  const cloneUser = user => {
    store.cloneUser(user.id);
    setSelectedItems([]);
  };

  const { pageOfItems, totalItemCount } = store.findUsers(
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const actions = [
    {
      name: 'Clone',
      description: 'Clone this person',
      icon: 'copy',
      type: 'icon',
      onClick: cloneUser,
    },
    {
      name: 'Delete',
      description: 'Delete this person',
      icon: 'trash',
      type: 'icon',
      color: 'danger',
      onClick: deleteUser,
    },
  ];

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      truncateText: true,
      sortable: true,
      mobileOptions: {
        render: customHeader
          ? item => (
              <span>
                {item.firstName} {item.lastName}
              </span>
            )
          : undefined,
        header: customHeader ? false : true,
        fullWidth: customHeader ? true : false,
        enlarge: customHeader ? true : false,
        truncateText: customHeader ? false : true,
      },
    },
    {
      field: 'lastName',
      name: 'Last Name',
      truncateText: true,
      mobileOptions: {
        show: !isResponsive || !customHeader,
      },
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
      render: online => {
        const color = online ? 'success' : 'danger';
        const label = online ? 'Online' : 'Offline';
        return <WuiHealth color={color}>{label}</WuiHealth>;
      },
      sortable: true,
    },
    {
      name: 'Actions',
      actions,
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

  const selection = {
    selectable: user => user.online,
    selectableMessage: selectable =>
      !selectable ? 'User is currently offline' : undefined,
    onSelectionChange: onSelectionChange,
  };

  return (
    <Fragment>
      <WuiFlexGroup alignItems="center" responsive={false}>
        <WuiFlexItem grow={false}>
          <WuiSwitch
            label="Responsive"
            checked={isResponsive}
            onChange={toggleResponsive}
          />
        </WuiFlexItem>
        <WuiFlexItem grow={false}>
          <WuiSwitch
            label="Custom header"
            disabled={!isResponsive}
            checked={isResponsive && customHeader}
            onChange={toggleHeader}
          />
        </WuiFlexItem>
      </WuiFlexGroup>

      <WuiSpacer size="l" />

      <WuiBasicTable
        items={pageOfItems}
        itemId="id"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        isSelectable={true}
        hasActions={true}
        responsive={isResponsive}
        onChange={onTableChange}
      />
    </Fragment>
  );
};
