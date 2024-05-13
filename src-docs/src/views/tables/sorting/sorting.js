import React, { useState } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';

import {
  WuiBasicTable,
  WuiHealth,
  WuiIcon,
  WuiLink,
  WuiToolTip,
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

  const onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  const { pageOfItems, totalItemCount } = store.findUsers(
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      sortable: true,
      truncateText: true,
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
      sortable: true,
      truncateText: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'github',
      name: (
        <WuiToolTip content="Their mascot is the Octokitty">
          <span>
            Github{' '}
            <WuiIcon
              size="s"
              color="subdued"
              type="questionInCircle"
              className="wui-alignTop"
            />
          </span>
        </WuiToolTip>
      ),
      sortable: true,
      render: username => (
        <WuiLink href={`https://github.com/${username}`} target="_blank">
          {username}
        </WuiLink>
      ),
    },
    {
      field: 'dateOfBirth',
      name: (
        <WuiToolTip content="Colloquially known as a 'birthday'">
          <span>
            Date of Birth{' '}
            <WuiIcon
              size="s"
              color="subdued"
              type="questionInCircle"
              className="wui-alignTop"
            />
          </span>
        </WuiToolTip>
      ),
      schema: 'date',
      render: date => formatDate(date, 'dobLong'),
      sortable: true,
    },
    {
      field: 'nationality',
      name: (
        <WuiToolTip content="The nation in which this person resides">
          <span>
            Nationality{' '}
            <WuiIcon
              size="s"
              color="subdued"
              type="questionInCircle"
              className="wui-alignTop"
            />
          </span>
        </WuiToolTip>
      ),
      sortable: true,
      render: countryCode => {
        const country = store.getCountry(countryCode);
        return `${country.flag} ${country.name}`;
      },
    },
    {
      field: 'online',
      name: (
        <WuiToolTip content="Free to talk or busy with business">
          <span>
            Online{' '}
            <WuiIcon
              size="s"
              color="subdued"
              type="questionInCircle"
              className="wui-alignTop"
            />
          </span>
        </WuiToolTip>
      ),
      schema: 'boolean',
      sortable: true,
      render: online => {
        const color = online ? 'success' : 'danger';
        const label = online ? 'Online' : 'Offline';
        return <WuiHealth color={color}>{label}</WuiHealth>;
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

  return (
    <div>
      <WuiBasicTable
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        onChange={onTableChange}
      />
    </div>
  );
};
