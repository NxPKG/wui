import React from 'react';

import { WuiExpression } from '../../../../src/components/expression';

export default () => (
  <div>
    <WuiExpression description="Select" value="count(*)" onClick={() => {}} />
    <WuiExpression
      description="From"
      value="wazuh_sample_data_ky_counties left"
    />
    <WuiExpression
      description="join"
      value="wazuh_sample_data_ky_avl right"
      onClick={() => {}}
    />
    <WuiExpression description="on" value="left.smis = right.kytccountynmbr" />
    <WuiExpression
      description="group by"
      value="right.kytccountynmbr"
      onClick={() => {}}
      color="accent"
    />
    <WuiExpression description="sort by" value="count" />
  </div>
);
