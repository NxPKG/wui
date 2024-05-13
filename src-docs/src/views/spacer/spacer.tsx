import React from 'react';

import { WuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <p>xs: 4px</p>
    <WuiSpacer size="xs" />

    <br />
    <br />

    <p>s: 8px</p>
    <WuiSpacer size="s" />

    <br />
    <br />

    <p>m: 16px</p>
    <WuiSpacer size="m" />

    <br />
    <br />

    <p>l: 24px (this is the default)</p>
    <WuiSpacer />

    <br />
    <br />

    <p>xl: 32px</p>
    <WuiSpacer size="xl" />

    <br />
    <br />
    <p>xxl: 40px</p>
    <WuiSpacer size="xxl" />
  </div>
);
