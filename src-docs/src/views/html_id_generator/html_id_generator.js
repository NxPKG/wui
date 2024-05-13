import React, { useState, Fragment } from 'react';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiButton,
  WuiCode,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState(htmlIdGenerator()());

  const reGenerate = () => {
    setValue(htmlIdGenerator()());
  };

  return (
    <Fragment>
      <WuiFlexGroup
        justifyContent="flexStart"
        gutterSize="m"
        alignItems="center">
        <WuiFlexItem grow={false}>
          <WuiCode>{value}</WuiCode>
        </WuiFlexItem>
        <WuiFlexItem grow={false}>
          <WuiButton onClick={reGenerate}>Regenerate</WuiButton>
        </WuiFlexItem>
      </WuiFlexGroup>
    </Fragment>
  );
};
