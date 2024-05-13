import React, { useState, Fragment } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  WuiBasicTable,
  WuiLink,
  WuiHealth,
  WuiButton,
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
  const [selectedItems, setSelectedItems] = useState([]);
  const [multiAction, setMultiAction] = useState(false);
  const [customAction, setCustomAction] = useState(false);

  const onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  const onClickDelete = () => {
    store.deleteUsers(...selectedItems.map(user => user.id));

    setSelectedItems([]);
  };

  const onSelectionChange = selectedItems => {
    setSelectedItems(selectedItems);
  };

  const renderDeleteButton = () => {
    if (selectedItems.length === 0) {
      return;
    }

    return (
      <WuiFlexItem grow={false}>
        <WuiButton color="danger" iconType="trash" onClick={onClickDelete}>
          Delete {selectedItems.length} Users
        </WuiButton>
      </WuiFlexItem>
    );
  };

  const toggleMultiAction = () => {
    setMultiAction(!multiAction);
  };

  const toggleCustomAction = () => {
    setCustomAction(!customAction);
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

  const deleteButton = renderDeleteButton();

  let actions = null;

  if (multiAction) {
    actions = customAction
      ? [
          {
            render: item => {
              return (
                <WuiLink color="secondary" onClick={() => cloneUser(item)}>
                  Clone
                </WuiLink>
              );
            },
          },
          {
            render: item => {
              return (
                <WuiLink color="danger" onClick={() => deleteUser(item)}>
                  Delete
                </WuiLink>
              );
            },
          },
        ]
      : [
          {
            name: <span>Clone</span>,
            description: 'Clone this user',
            icon: 'copy',
            onClick: cloneUser,
            'data-test-subj': 'action-clone',
          },
          {
            name: item => (item.id ? 'Delete' : 'Remove'),
            description: 'Delete this user',
            icon: 'trash',
            color: 'danger',
            type: 'icon',
            onClick: deleteUser,
            isPrimary: true,
            'data-test-subj': 'action-delete',
          },
          {
            name: 'Edit',
            isPrimary: true,
            available: ({ online }) => !online,
            description: 'Edit this user',
            icon: 'pencil',
            type: 'icon',
            onClick: () => {},
            'data-test-subj': 'action-edit',
          },
          {
            name: 'Share',
            isPrimary: true,
            description: 'Share this user',
            icon: 'share',
            type: 'icon',
            onClick: () => {},
            'data-test-subj': 'action-share',
          },
          {
            name: 'Wazuh.co',
            description: 'Go to wazuh.co',
            icon: 'logoWazuh',
            type: 'icon',
            href: 'https://wazuh.com',
            target: '_blank',
            'data-test-subj': 'action-outboundlink',
          },
        ];
  } else {
    actions = customAction
      ? [
          {
            render: item => {
              return (
                <WuiLink onClick={() => deleteUser(item)} color="danger">
                  Delete
                </WuiLink>
              );
            },
          },
        ]
      : [
          {
            name: 'Wazuh.co',
            description: 'Go to wazuh.co',
            icon: 'editorLink',
            color: 'primary',
            type: 'icon',
            href: 'https://wazuh.co',
            target: '_blank',
            'data-test-subj': 'action-outboundlink',
          },
        ];
  }

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      truncateText: true,
      sortable: true,
      mobileOptions: {
        render: item => (
          <span>
            {item.firstName} {item.lastName}
          </span>
        ),
        header: false,
        truncateText: false,
        enlarge: true,
        fullWidth: true,
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
      <WuiFlexGroup alignItems="center">
        <WuiFlexItem grow={false}>
          <WuiSwitch
            label="Multiple Actions"
            checked={multiAction}
            onChange={toggleMultiAction}
          />
        </WuiFlexItem>
        <WuiFlexItem grow={false}>
          <WuiSwitch
            label="Custom Actions"
            checked={customAction}
            onChange={toggleCustomAction}
          />
        </WuiFlexItem>
        <WuiFlexItem />
        {deleteButton}
      </WuiFlexGroup>

      <WuiSpacer size="l" />

      <WuiBasicTable
        items={pageOfItems}
        itemId="id"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        hasActions={customAction ? false : true}
        onChange={onTableChange}
      />
    </Fragment>
  );
};
