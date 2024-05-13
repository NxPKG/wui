import React from 'react';

import { WuiHealth, WuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <WuiHealth color="subdued">Inactive</WuiHealth>

    <WuiSpacer />

    <WuiHealth color="primary">Active</WuiHealth>

    <WuiSpacer />

    <WuiHealth color="success">Healthy</WuiHealth>

    <WuiSpacer />

    <WuiHealth color="warning">Warning</WuiHealth>

    <WuiSpacer />

    <WuiHealth color="danger">Failure</WuiHealth>

    <WuiSpacer />

    <WuiHealth color="#000000">Custom color as hex</WuiHealth>
  </div>
);
