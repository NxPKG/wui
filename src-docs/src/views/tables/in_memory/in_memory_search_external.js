import React, { Fragment, useState } from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';
import {
  WuiInMemoryTable,
  WuiLink,
  WuiHealth,
  WuiFlexGroup,
  WuiFlexItem,
  WuiSpacer,
  WuiCheckableCard,
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

const initialState = {
  eu: false,
  na: false,
  oc: false,
  as: false,
  af: false,
  sa: false,
};

const store = createDataStore();

export const Table = () => {
  const [query, setQuery] = useState('');
  const [state, setState] = useState(initialState);

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
    },
  ];

  const handleOnChange = search => {
    setState(initialState);
    setQuery(search.queryText);
    return true;
  };

  const handleCheckbox = e => {
    switch (e.target.id) {
      case 'eu': {
        const isChecked = !state.eu;
        setQuery(
          isChecked ? 'nationality:(NL or CZ or NO or IT or GB or GR)' : ''
        );
        setState({
          ...initialState,
          eu: isChecked,
        });
        break;
      }
      case 'na': {
        const isChecked = !state.na;
        setQuery(isChecked ? 'nationality:(US or CA or MX or HT)' : '');
        setState({
          ...initialState,
          na: isChecked,
        });
        break;
      }
      case 'oc': {
        const isChecked = !state.oc;
        setQuery(isChecked ? 'nationality:(AU or FJ)' : '');
        setState({
          ...initialState,
          oc: isChecked,
        });
        break;
      }
      case 'as': {
        const isChecked = !state.as;
        setQuery(isChecked ? 'nationality:(IL or LB)' : '');
        setState({
          ...initialState,
          as: isChecked,
        });
        break;
      }
      case 'af': {
        const isChecked = !state.af;
        setQuery(isChecked ? 'nationality:(ZA or CG)' : '');
        setState({
          ...initialState,
          af: isChecked,
        });
        break;
      }
      case 'sa': {
        const isChecked = !state.sa;
        setQuery(isChecked ? 'nationality:(CL)' : '');
        setState({
          ...initialState,
          sa: isChecked,
        });
        break;
      }
      default:
    }
  };

  const search = {
    query,
    onChange: handleOnChange,
    box: {
      schema: true,
    },
    filters: [
      {
        type: 'is',
        field: 'online',
        name: 'Online',
        negatedName: 'Offline',
      },
      {
        type: 'field_value_selection',
        field: 'nationality',
        name: 'Nationality',
        multiSelect: 'or',
        options: store.countries.map(country => ({
          value: country.code,
          name: country.name,
          view: `${country.flag} ${country.name}`,
        })),
      },
    ],
  };

  return (
    <Fragment>
      <WuiFlexGroup>
        <WuiFlexItem grow={1}>
          <div>
            <WuiCheckableCard
              id="af"
              label="Africa"
              checkableType="radio"
              value="Africa"
              checked={state.af}
              onChange={handleCheckbox}
            />
          </div>
          <WuiSpacer size="s" />
          <div>
            <WuiCheckableCard
              id="as"
              label="Asia"
              checkableType="radio"
              value="Asia"
              checked={state.as}
              onChange={handleCheckbox}
            />
          </div>
          <WuiSpacer size="s" />
          <div>
            <WuiCheckableCard
              id="eu"
              label="Europe"
              checkableType="radio"
              value="Europe"
              checked={state.eu}
              onChange={handleCheckbox}
            />
          </div>
          <WuiSpacer size="s" />
          <div>
            <WuiCheckableCard
              id="na"
              label="North America"
              checkableType="radio"
              value="North America"
              checked={state.na}
              onChange={handleCheckbox}
            />
          </div>
          <WuiSpacer size="s" />
          <div>
            <WuiCheckableCard
              id="oc"
              label="Oceania"
              checkableType="radio"
              value="Oceania"
              checked={state.oc}
              onChange={handleCheckbox}
            />
          </div>
          <WuiSpacer size="s" />
          <div>
            <WuiCheckableCard
              id="sa"
              label="South America"
              checkableType="radio"
              value="South America"
              checked={state.sa}
              onChange={handleCheckbox}
            />
          </div>
        </WuiFlexItem>
        <WuiFlexItem grow={2}>
          <WuiInMemoryTable
            items={store.users}
            columns={columns}
            search={search}
            pagination={true}
            sorting={true}
          />
        </WuiFlexItem>
      </WuiFlexGroup>
    </Fragment>
  );
};
