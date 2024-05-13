import React from 'react';

import {
  WuiCode,
  WuiSpacer,
  WuiSteps,
  WuiText,
} from '../../../../src/components';

const firstSetOfSteps = [
  {
    title:
      'Step 1 with a long title to check what happens during wrapping which should have been fixed.',
    children: <p>Do this first</p>,
  },
  {
    title: 'Step 2',
    children: <p>Then this</p>,
  },
];

const nextSetOfSteps = [
  {
    title: 'Good step',
    children: <p>Do this first</p>,
  },
  {
    title: 'Better step',
    children: <p>Then this</p>,
  },
];

export default () => (
  <div>
    <WuiSteps steps={firstSetOfSteps} />

    <WuiText>
      <WuiSpacer size="m" />
      <p>
        Set <WuiCode>firstStepNumber</WuiCode> to continue step numbering after
        any type of break in the content
      </p>
      <WuiSpacer size="m" />
    </WuiText>

    <WuiSteps
      firstStepNumber={firstSetOfSteps.length + 1}
      steps={nextSetOfSteps}
    />
  </div>
);
