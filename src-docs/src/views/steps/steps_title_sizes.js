import React from 'react';

import { WuiCode, WuiSteps } from '../../../../src/components';

const firstSetOfSteps = [
  {
    title: 'Step 1',
    children: (
      <p>
        Steps with <WuiCode>titleSize</WuiCode> set to <WuiCode>xs</WuiCode>{' '}
        like this one, get a smaller step circle
      </p>
    ),
  },
  {
    title: 'Step 2',
    children: (
      <p>
        Steps with <WuiCode>titleSize</WuiCode> set to <WuiCode>xs</WuiCode>{' '}
        like this one, get a smaller step circle
      </p>
    ),
  },
];

export default () => (
  <div>
    <WuiSteps titleSize="xs" steps={firstSetOfSteps} />
  </div>
);
