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

export const HtmlIdGeneratorSuffix = () => {
  const [suffix, setSuffix] = useState('Id');
  const [customId, setCustomId] = useState(htmlIdGenerator()('Id'));

  const onSuffixChange = e => {
    const suffix = e.target.value;
    setSuffix(suffix);
    setCustomId(htmlIdGenerator()(suffix));
  };

  return (
    <Fragment>
      <WuiFlexGroup
        justifyContent="flexStart"
        gutterSize="m"
        alignItems="center">
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
