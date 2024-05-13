import React from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';
import {
  WuiInMemoryTable,
  WuiLink,
  WuiHealth,
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
  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      sortable: true,
      truncateText: true,
    },
    {
      field: 'lastName',
      name: 'Last Name',
      truncateText: true,
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
  ];

  const sorting = {
    sort: {
      field: 'dateOfBirth',
      direction: 'desc',
    },
  };

  return (
    <WuiInMemoryTable
      items={store.users}
      columns={columns}
      pagination={true}
      sorting={sorting}
    />
  );
};
