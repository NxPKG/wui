import React from 'react';

import {
  WuiCode,
  WuiSteps,
  WuiText,
  WuiCodeBlock,
  WuiSubSteps,
} from '../../../../src/components';

const steps = [
  {
    title: 'Step 1 has intro plus code snippet',
    children: (
      <WuiText>
        <p>Run this code snippet to install things.</p>
        <WuiCodeBlock language="bash">npm install</WuiCodeBlock>
      </WuiText>
    ),
  },
  {
    title: 'Step 2 has sub steps',
    children: (
      <WuiText>
        <p>
          In order to complete this step, do the following things{' '}
          <strong>in order</strong>.
        </p>
        <WuiSubSteps>
          <ol>
            <li>Do thing 1</li>
            <li>Do thing 2</li>
            <li>Do thing 3</li>
          </ol>
        </WuiSubSteps>
        <p>Here are some bullet point reminders.</p>
        <ul>
          <li>Reminder 1</li>
          <li>Reminder 2</li>
          <li>Reminder 3</li>
        </ul>
      </WuiText>
    ),
  },
  {
    title: 'Step 3 has an intro and one line instruction',
    children: (
      <WuiText>
        <p>
          Now that you&apos;ve completed step 2, go find the{' '}
          <WuiCode>thing</WuiCode>.
        </p>
        <p className="wuiStep__subSteps">
          Go to <strong>Overview &gt;&gt; Endpoints</strong> note{' '}
          <strong>Wazuh</strong> as <WuiCode>&lt;thing&gt;</WuiCode>.
        </p>
      </WuiText>
    ),
  },
  {
    title: 'The last step has two options',
    children: (
      <WuiText size="s">
        <h3>
          <strong>Option 1:</strong> If you have this type of instance
        </h3>
        <WuiSubSteps>
          <ol>
            <li>Do thing 1</li>
            <li>Do thing 2</li>
            <li>Do thing 3</li>
          </ol>
        </WuiSubSteps>
        <h3>
          <strong>Option 2:</strong> If you have the other type of instance
        </h3>
        <WuiSubSteps>
          <ol>
            <li>Do thing 1</li>
            <li>Do thing 2</li>
            <li>Do thing 3</li>
          </ol>
        </WuiSubSteps>
      </WuiText>
    ),
  },
];

export default () => (
  <div>
    <WuiSteps headingElement="h2" steps={steps} />
  </div>
);
