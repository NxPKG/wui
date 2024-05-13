import React from 'react';

import { WuiPanel, WuiCode, WuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <WuiPanel paddingSize="none">
      <WuiCode>paddingSize=&quot;none&quot;</WuiCode>
    </WuiPanel>

    <WuiSpacer size="l" />

    <WuiPanel paddingSize="s">
      <WuiCode>paddingSize=&quot;s&quot;</WuiCode>
    </WuiPanel>

    <WuiSpacer size="l" />

    <WuiPanel paddingSize="m">
      <WuiCode>paddingSize=&quot;m&quot;</WuiCode>
    </WuiPanel>

    <WuiSpacer size="l" />

    <WuiPanel paddingSize="l">
      <WuiCode>paddingSize=&quot;l&quot;</WuiCode>
    </WuiPanel>

    <WuiSpacer size="l" />

    <WuiPanel paddingSize="l" hasShadow>
      <WuiCode>paddingSize=&quot;l&quot;</WuiCode>, <WuiCode>hasShadow</WuiCode>
    </WuiPanel>
  </div>
);
