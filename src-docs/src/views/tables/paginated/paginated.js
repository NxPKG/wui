import React, { useState } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  WuiBasicTable,
  WuiCode,
  WuiLink,
  WuiHealth,
  WuiFlexGroup,
  WuiFlexItem,
  WuiSpacer,
  WuiSwitch,
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
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);

  const onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

  const renderStatus = online => {
    const color = online ? 'success' : 'danger';
    const label = online ? 'Online' : 'Offline';
    return <WuiHealth color={color}>{label}</WuiHealth>;
  };

  const togglePerPageOptions = () => setShowPerPageOptions(!showPerPageOptions);

  const { pageOfItems, totalItemCount } = store.findUsers(pageIndex, pageSize);

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      truncateText: true,
      hideForMobile: true,
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
        header: false,
        only: true,
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
    },
  ];

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [3, 5, 8],
    hidePerPageOptions: !showPerPageOptions,
  };

  return (
    <div>
      <WuiSwitch
        checked={!showPerPageOptions}
        label={
          <span>
            Hide per page options with{' '}
            <WuiCode>pagination.hidePerPageOptions = true</WuiCode>
          </span>
        }
        onChange={togglePerPageOptions}
      />
      <WuiSpacer size="xl" />
      <WuiBasicTable
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
      />
    </div>
  );
};
