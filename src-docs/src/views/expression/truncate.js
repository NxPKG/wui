import React, { Fragment } from 'react';

import { WuiExpression, WuiSpacer, WuiTitle } from '../../../../src/components';

const value = 'and a very long string as value';
const description = 'some very very long description';
const nodes = (
  <Fragment>
    <p className="wui-textTruncate">.wazuh_task_manager</p>
    <p className="wui-textTruncate">wazuh_sample_data_ecommerce</p>
  </Fragment>
);

export default () => (
  <div>
    <div style={{ maxWidth: 240 }}>
      <WuiExpression
        onClick={() => {}}
        description={description}
        value={value}
        textWrap="truncate"
      />
      <WuiSpacer />
      <WuiExpression
        description={description}
        display="columns"
        text
        textWrap="truncate"
        value={value}
        onClick={() => {}}
      />
      <WuiSpacer />
    </div>
    <WuiTitle size="xxs">
      <h3>wui-textTruncate applied to sub-children</h3>
    </WuiTitle>
    <div style={{ maxWidth: 310 }}>
      <WuiExpression
        value={nodes}
        display="columns"
        text
        textWrap="truncate"
        description="indices"
        onClick={() => {}}
      />
    </div>
  </div>
);
