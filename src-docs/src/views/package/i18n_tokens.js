import React from 'react';
import tokens from '../../i18ntokens';
import tokenChangelog from '../../i18ntokens_changelog';

import {
  WuiAccordion,
  WuiCodeBlock,
  WuiInMemoryTable,
  WuiLink,
  WuiSpacer,
  WuiText,
  WuiTitle,
} from '../../../../src';
import { GuidePage } from '../../components/guide_page';

const columns = [
  {
    name: 'Token',
    render({ filepath, loc, token }) {
      return (
        <div>
          <p>
            <strong>{token}</strong>
          </p>
          <WuiLink
            target="_blank"
            color="subdued"
            href={`https://github.com/wazuh/wui/blob/master/${filepath}#L${loc.start.line}`}>
            {filepath}:{loc.start.line}:{loc.start.column}
          </WuiLink>
        </div>
      );
    },
  },
  {
    name: 'Default',
    render({ defString, highlighting }) {
      return (
        <WuiCodeBlock
          language={highlighting === 'code' ? 'javascript' : 'text'}
          paddingSize="none"
          transparentBackground
          fontSize="s">
          {defString}
        </WuiCodeBlock>
      );
    },
  },
];

const search = {
  box: {
    incremental: true,
    schema: true,
  },
};

export const I18nTokens = {
  name: 'I18n tokens',
  component: () => (
    <GuidePage title="I18n tokens">
      <WuiInMemoryTable
        items={tokens}
        columns={columns}
        search={search}
        pagination={{ initialPageSize: 50 }}
      />

      <WuiSpacer size="m" />

      <WuiTitle size="m">
        <span>Token changelog</span>
      </WuiTitle>

      {tokenChangelog.map(({ version, changes }) => (
        <WuiAccordion
          key={version}
          id={version}
          buttonContent={<span>{version}</span>}>
          <WuiInMemoryTable
            items={changes}
            columns={[
              {
                field: 'changeType',
                name: 'Change',
                width: '100px',
                render: changeType => (
                  <WuiText color="subdued" size="xs">
                    {changeType}
                  </WuiText>
                ),
              },
              { field: 'token', name: 'Token' },
              { field: 'value', name: 'New Value' },
            ]}
          />
          <WuiSpacer size="s" />
        </WuiAccordion>
      ))}
    </GuidePage>
  ),
};
