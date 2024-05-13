import React from 'react';

import {
  WuiTitle,
  WuiHorizontalRule,
  WuiSpacer,
  WuiCode,
} from '../../../../src/components';

export default () => (
  <div>
    <WuiTitle size="l">
      <h1>This is a large title, only one should exist per page</h1>
    </WuiTitle>
    <WuiCode language="js">size=&quot;l&quot;</WuiCode>

    <WuiSpacer />
    <WuiTitle>
      <h2>This is the default size for title</h2>
    </WuiTitle>
    <WuiCode language="js">size=&quot;m&quot;</WuiCode>

    <WuiSpacer />
    <WuiTitle size="s">
      <h3>This is a small title</h3>
    </WuiTitle>
    <WuiCode language="js">size=&quot;s&quot;</WuiCode>

    <WuiSpacer />
    <WuiTitle size="xs">
      <h4>This is an extra small title</h4>
    </WuiTitle>
    <WuiCode language="js">size=&quot;xs&quot;</WuiCode>

    <WuiSpacer />
    <WuiTitle size="xxs">
      <h5>This is an extra extra small title</h5>
    </WuiTitle>
    <WuiCode language="js">size=&quot;xxs&quot;</WuiCode>

    <WuiSpacer />
    <WuiTitle size="xxxs">
      <h6>
        This is an extra extra extra small title and should only be used when
        the title is inconsequential (like a label)
      </h6>
    </WuiTitle>
    <WuiCode language="js">size=&quot;xxxs&quot;</WuiCode>

    <WuiHorizontalRule />

    <WuiTitle size="l">
      <span>Titles are markup agnostic, they only confer style</span>
    </WuiTitle>
  </div>
);
