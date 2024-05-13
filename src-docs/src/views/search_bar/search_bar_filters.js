import React, { useState, Fragment } from 'react';
import { times } from '../../../../src/services/utils';
import { Random } from '../../../../src/services/random';
import {
  WuiHealth,
  WuiCallOut,
  WuiSpacer,
  WuiFlexGroup,
  WuiFlexItem,
  WuiCodeBlock,
  WuiTitle,
  WuiBasicTable,
  WuiSearchBar,
} from '../../../../src/components';

const random = new Random();

const tags = [
  { name: 'marketing', color: 'danger' },
  { name: 'finance', color: 'success' },
  { name: 'eng', color: 'success' },
  { name: 'sales', color: 'warning' },
  { name: 'ga', color: 'success' },
  { name: 'presales', color: 'success' },
  { name: 'product', color: 'warning' },
  { name: 'engineering', color: 'success' },
  { name: 'design', color: 'warning' },
  { name: 'earlybirds', color: 'success' },
  { name: 'people-ops', color: 'danger' },
  { name: 'solutions', color: 'success' },
  { name: 'cloud', color: 'danger' },
  { name: 'wazuh', color: 'warning' },
  { name: 'beats', color: 'warning' },
  { name: 'legal', color: 'danger' },
  { name: 'revenue', color: 'success' },
  { name: 'public-relations', color: 'success' },
  { name: 'social-media-management', color: 'warning' },
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

const initialQuery = WuiSearchBar.Query.MATCH_ALL;

export const SearchBarFilters = () => {
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState(null);

  const onChange = ({ query, error }) => {
    if (error) {
      setError(error);
    } else {
      setError(null);
      setQuery(query);
    }
  };

  const renderSearch = () => {
    const filters = [
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag ("prefix" filter, default)',
        multiSelect: 'or',
        options: tags.map(tag => ({
          value: tag.name,
          view: <WuiHealth color={tag.color}>{tag.name}</WuiHealth>,
        })),
      },
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag ("includes" filter)',
        filterWith: 'includes',
        multiSelect: 'or',
        options: tags.map(tag => ({
          value: tag.name,
          view: <WuiHealth color={tag.color}>{tag.name}</WuiHealth>,
        })),
      },
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag (custom filter)',
        filterWith: () => Math.random() > 0.5,
        multiSelect: 'or',
        options: tags.map(tag => ({
          value: tag.name,
          view: <WuiHealth color={tag.color}>{tag.name}</WuiHealth>,
        })),
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
        defaultQuery={initialQuery}
        box={{
          placeholder: 'e.g. type:visualization -is:active joe',
          incremental: true,
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

  const esQueryDsl = WuiSearchBar.Query.toESQuery(query);
  const esQueryString = WuiSearchBar.Query.toESQueryString(query);

  const content = renderError() || (
    <WuiFlexGroup>
      <WuiFlexItem grow={4}>
        <WuiTitle size="s">
          <h3>Query String</h3>
        </WuiTitle>
        <WuiSpacer size="s" />
        <WuiCodeBlock language="js">
          {esQueryString ? esQueryString : ''}
        </WuiCodeBlock>

        <WuiSpacer size="l" />

        <WuiTitle size="s">
          <h3>Query DSL</h3>
        </WuiTitle>
        <WuiSpacer size="s" />
        <WuiCodeBlock language="js">
          {esQueryDsl ? JSON.stringify(esQueryDsl, null, 2) : ''}
        </WuiCodeBlock>
      </WuiFlexItem>

      <WuiFlexItem grow={6}>
        <WuiTitle size="s">
          <h3>JS execution</h3>
        </WuiTitle>

        <WuiSpacer size="s" />

        {renderTable()}
      </WuiFlexItem>
    </WuiFlexGroup>
  );

  return (
    <Fragment>
      {renderSearch()}
      <WuiSpacer size="l" />
      {content}
    </Fragment>
  );
};
