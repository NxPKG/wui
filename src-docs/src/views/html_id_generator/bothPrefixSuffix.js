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

export const PrefixSufix = () => {
  const [prefix, setPrefix] = useState('Some');
  const [suffix, setSuffix] = useState('Id');
  const [customId, setCustomId] = useState(htmlIdGenerator('Some')('Id'));

  const onPrefixChange = e => {
    const prefix = e.target.value;
    setPrefix(prefix);
    setCustomId(htmlIdGenerator(prefix)(suffix));
  };

  const onSuffixChange = e => {
    const suffix = e.target.value;
    setSuffix(suffix);
    setCustomId(htmlIdGenerator(prefix)(suffix));
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
              onChange={onPrefixChange}
              placeholder="Enter prefix"
            />
          </WuiFormRow>
        </WuiFlexItem>
        <WuiFlexItem grow={false}>
          <WuiFormRow label="Suffix">
            <WuiFieldText
              value={suffix}
              onChange={onSuffixChange}
              placeholder="Enter suffix"
            />
          </WuiFormRow>
        </WuiFlexItem>
      </WuiFlexGroup>
      <WuiSpacer size="xl" />
      <WuiCode>{customId} </WuiCode>
    </Fragment>
  );
};
