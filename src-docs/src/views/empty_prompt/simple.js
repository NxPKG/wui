import React from 'react';

import {
  WuiEmptyPrompt,
  WuiButton,
  WuiButtonEmpty,
} from '../../../../src/components';

export default () => (
  <WuiEmptyPrompt
    title={<h2>You have no spice</h2>}
    actions={[
      <WuiButton color="primary" fill>
        Harvest spice
      </WuiButton>,
      <WuiButtonEmpty color="danger">Sabotage all spice fields</WuiButtonEmpty>,
    ]}
  />
);
