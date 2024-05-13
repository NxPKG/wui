import React from 'react';

import { WuiSteps, WuiTitle, WuiSpacer } from '../../../../src/components';

const steps = [
  {
    title: 'Inspect me',
    children: (
      <WuiTitle size="xs">
        <h3>Did you notice the step title is inside a Heading 2 element?</h3>
      </WuiTitle>
    ),
  },
];

export default () => (
  <div>
    <WuiTitle size="l">
      <h1>Heading 1</h1>
    </WuiTitle>

    <WuiSpacer size="xl" />

    <WuiSteps steps={steps} headingElement="h2" />
  </div>
);
