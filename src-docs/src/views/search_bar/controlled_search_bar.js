import React, { useState, Fragment } from 'react';
import { times } from '../../../../src/services/utils';
import { Random } from '../../../../src/services/random';
import {
  WuiHealth,
  WuiCallOut,
  WuiSpacer,
  WuiFlexGroup,
  WuiFlexItem,
  WuiSwitch,
  WuiBasicTable,
  WuiSearchBar,
  WuiButton,
} from '../../../../src/components';

const random = new Random();

const tags = [
  { name: 'marketing', color: 'danger' },
  { name: 'finance', color: 'success' },
  { name: 'eng', color: 'success' },
  { name: 'sales', color: 'warning' },
  { name: 'ga', color: 'success' },
];

const types = ['dashboard', 'visualization', 'watch'];

const users = ['dewey', 'wanda', 'carrie', 'jmack', 'gabic'];

const items = times(10, id => {
  return {
    id,
    status: random.oneOf(['open', 'closed']),
    type: random.oneOf(types),
    tag: random.setOf(
      tags.map(tag => tag.name),
      { min: 0, max: 3 }
    ),
    active: random.boolean(),
    owner: random.oneOf(users),
    followers: random.integer({ min: 0, max: 20 }),
    comments: random.integer({ min: 0, max: 10 }),
    stars: random.integer({ min: 0, max: 5 }),
  };
});

const loadTags = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        tags.map(tag => ({
          value: tag.name,
          view: <WuiHealth color={tag.color}>{tag.name}</WuiHealth>,
        }))
      );
    }, 2000);
  });
};

const initialQuery = 'status:open';

export const ControlledSearchBar = () => {
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState(null);
  const [incremental, setIncremental] = useState(false);

  const onChange = ({ query, error }) => {
    if (error) {
      setError(error);
    } else {
      setError(null);
      setQuery(query);
    }
  };

  const toggleIncremental = () => {
    setIncremental(!incremental);
  };

  const renderBookmarks = () => {
    return (
      <Fragment>
        <p>Enter a query, or select one from a bookmark</p>
        <WuiSpacer size="s" />
        <WuiFlexGroup>
          <WuiFlexItem grow={false}>
            <WuiButton
              size="s"
              onClick={() => setQuery('status:open owner:dewey')}>
              mine, open
            </WuiButton>
          </WuiFlexItem>
          <WuiFlexItem grow={false}>
            <WuiButton
              size="s"
              onClick={() => setQuery('status:closed owner:dewey')}>
              mine, closed
            </WuiButton>
          </WuiFlexItem>
        </WuiFlexGroup>
        <WuiSpacer size="m" />
      </Fragment>
    );
  };

  const renderSearch = () => {
    const filters = [
      {
        type: 'field_value_toggle_group',
        field: 'status',
        items: [
          {
            value: 'open',
            name: 'Open',
          },
          {
            value: 'closed',
            name: 'Closed',
          },
        ],
      },
      {
        type: 'is',
        field: 'active',
        name: 'Active',
        negatedName: 'Inactive',
      },
      {
        type: 'field_value_toggle',
        name: 'Mine',
        field: 'owner',
        value: 'dewey',
      },
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        multiSelect: 'or',
        cache: 10000, // will cache the loaded tags for 10 sec
        options: () => loadTags(),
      },
    ];

    const schema = {
      strict: true,
      fields: {
        type: {
          type: 'string',
        },
        active: {
          type: 'boolean',
        },
        status: {
          type: 'string',
        },
        followers: {
          type: 'number',
        },
        comments: {
          type: 'number',
        },
        stars: {
          type: 'number',
        },
        created: {
          type: 'date',
        },
        owner: {
          type: 'string',
        },
        tag: {
          type: 'string',
          validate: value => {
            if (!tags.some(tag => tag.name === value)) {
              throw new Error(
                `unknown tag (possible values: ${tags
                  .map(tag => tag.name)
                  .join(',')})`
              );
            }
          },
        },
      },
    };

    return (
      <WuiSearchBar
        query={query}
        box={{
          placeholder: 'e.g. type:visualization -is:active joe',
          incremental,
          schema,
        }}
        filters={filters}
        onChange={onChange}
      />
    );
  };

  const renderError = () => {
    if (!error) {
      return;
    }
    return (
      <Fragment>
        <WuiCallOut
          iconType="faceSad"
          color="danger"
          title={`Invalid search: ${error.message}`}
        />
        <WuiSpacer size="l" />
      </Fragment>
    );
  };

  const renderTable = () => {
    const columns = [
      {
        name: 'Type',
        field: 'type',
      },
      {
        name: 'Open',
        field: 'status',
        render: status => (status === 'open' ? 'Yes' : 'No'),
      },
      {
        name: 'Active',
        field: 'active',
        dataType: 'boolean',
      },
      {
        name: 'Tags',
        field: 'tag',
      },
      {
        name: 'Owner',
        field: 'owner',
      },
      {
        name: 'Stats',
        width: '150px',
        render: item => {
          return (
            <div>
              <div>{`${item.stars} Stars`}</div>
              <div>{`${item.followers} Followers`}</div>
              <div>{`${item.comments} Comments`}</div>
            </div>
          );
        },
      },
    ];

    const queriedItems = WuiSearchBar.Query.execute(query, items, {
      defaultFields: ['owner', 'tag', 'type'],
    });

    return <WuiBasicTable items={queriedItems} columns={columns} />;
  };

  const content = renderError() || (
    <WuiFlexGroup>
      <WuiFlexItem grow={6}>{renderTable()}</WuiFlexItem>
    </WuiFlexGroup>
  );

  return (
    <Fragment>
      <WuiFlexGroup>
        <WuiFlexItem>{renderBookmarks()}</WuiFlexItem>
      </WuiFlexGroup>
      <WuiFlexGroup alignItems="center">
        <WuiFlexItem>{renderSearch()}</WuiFlexItem>

        <WuiFlexItem grow={false}>
          <WuiSwitch
            label="Incremental"
            checked={incremental}
            onChange={toggleIncremental}
          />
        </WuiFlexItem>
      </WuiFlexGroup>
      <WuiSpacer size="l" />
      {content}
    </Fragment>
  );
};
