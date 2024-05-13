import React, { useState, Fragment } from 'react';

import {
  WuiFieldText,
  WuiFlexGroup,
  WuiFlexItem,
  WuiSpacer,
  WuiCode,
  WuiFormRow,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export const HtmlIdGeneratorPrefix = () => {
  const [prefix, setPrefix] = useState('Id');
  const [customId, setCustomId] = useState(htmlIdGenerator('Id')());

  const onSearchChange = e => {
    const prefix = e.target.value;
    setPrefix(prefix);
    setCustomId(htmlIdGenerator(prefix)());
  };

  return (
    <Fragment>
      <WuiFlexGroup
        justifyContent="flexStart"
        gutterSize="m"
        alignItems="center">
        <WuiFlexItem grow={false}>
          <WuiFormRow label="Prefix">
            <WuiFieldText
              value={prefix}
              onChange={onSearchChange}
              placeholder="Enter prefix"
            />
          </WuiFormRow>
        </WuiFlexItem>
      </WuiFlexGroup>
      <WuiSpacer size="xl" />
      <WuiCode>{customId} </WuiCode>
    </Fragment>
  );
};
