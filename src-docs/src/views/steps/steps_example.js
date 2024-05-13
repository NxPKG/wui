import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiSteps,
  WuiStep,
  WuiSubSteps,
  WuiStepsHorizontal,
} from '../../../../src/components';

import { WuiStepHorizontal } from '../../../../src/components/steps/step_horizontal';

import { stepConfig } from './playground';

import Steps from './steps';
const stepsSource = require('!!raw-loader!./steps');
const stepsHtml = renderToHtml(Steps);
const stepsSnippet = [
  `<WuiSteps
  steps={[
    {
      title: 'Step 1',
      children: <p>Do this first</p>,
    },
  ]}
/>`,
  `<WuiSteps
  firstStepNumber={3}
  steps={[
    {
      title: 'Step 3',
      children: <p>Do this third first</p>,
    },
  ]}
/>`,
];

import StepsComplex from './steps_complex';
const stepsComplexSource = require('!!raw-loader!./steps_complex');
const stepsComplexHtml = renderToHtml(StepsComplex);

import HeadingElementSteps from './heading_element_steps';
const headingElementStepsSource = require('!!raw-loader!./heading_element_steps');
const headingElementStepsHtml = renderToHtml(HeadingElementSteps);
const headingElementStepsSnippet = `<WuiSteps steps={steps} headingElement="h2" />
`;

import StepsHorizontal from './steps_horizontal';
const stepsHorizontalSource = require('!!raw-loader!./steps_horizontal');
const stepsHorizontalHtml = renderToHtml(StepsHorizontal);
const stepsHorizontalSnippet = `<WuiStepsHorizontal steps={[{
  title: 'Completed step',
  isComplete: true,
  onClick: function,
}]} />
`;

import Status from './status';
const statusSource = require('!!raw-loader!./status');
const statusHtml = renderToHtml(Steps);
const statusSnippet = `<WuiSteps
  steps={[
    {
      title: 'Warning',
      children: 'Example of a warning',
      status: 'warning',
    },
  ]}
/>`;

import StepsTitleSizes from './steps_title_sizes';
const stepsTitleSizesSource = require('!!raw-loader!./steps_title_sizes');
const stepsTitleSizesHtml = renderToHtml(StepsTitleSizes);
const stepsTitleSizesSnippet = `<WuiSteps titleSize="xs" steps={[{
  title: 'Completed step',
}]} />
`;

export const StepsExample = {
  title: 'Steps',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stepsHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiSteps</strong> presents procedural content in a numbered
          outline format.
        </p>
      ),
      props: { WuiSteps, WuiStep },
      snippet: stepsSnippet,
      demo: <Steps />,
    },
    {
      title: 'Complex steps',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsComplexSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stepsComplexHtml,
        },
      ],
      text: (
        <p>
          If you need to call out a set of substeps that are not lines of code,
          most likely a <WuiCode>{'<ol/>'}</WuiCode>, wrap the block in a{' '}
          <WuiCode>{'<WuiSubSteps/>'}</WuiCode>.
        </p>
      ),
      demo: <StepsComplex />,
      props: { WuiSubSteps },
    },
    {
      title: 'Heading elements',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headingElementStepsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headingElementStepsHtml,
        },
      ],
      text: (
        <div>
          <p>
            To aid with accessibility and hierarchical headings, you can and
            should pass in a heading element to use for each step title. The
            example below shows that the logical heading element should be an{' '}
            <WuiCode>h2</WuiCode>
            and therefore adds{' '}
            <WuiCode language="j">{'headingElement="h2"'}</WuiCode> to the
            WuiSteps component.
          </p>
          <p>
            The style of the title will <strong>not</strong> be affected.
          </p>
        </div>
      ),
      snippet: headingElementStepsSnippet,
      demo: <HeadingElementSteps />,
    },
    {
      title: 'Steps status',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statusSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statusHtml,
        },
      ],
      text: (
        <p>
          Steps can optionally include <WuiCode>status</WuiCode> prop that will
          alter the look of the number prefix. The options are{' '}
          <WuiCode>incomplete</WuiCode>, <WuiCode>complete</WuiCode>,{' '}
          <WuiCode>warning</WuiCode>, and <WuiCode>danger</WuiCode>. This is
          used mostly as a final step when you need to make some sort of final
          check.
        </p>
      ),
      snippet: statusSnippet,
      demo: <Status />,
    },
    {
      title: 'Custom title sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsTitleSizesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stepsTitleSizesHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can set a different title size using{' '}
            <WuiCode>titleSize</WuiCode>. If <WuiCode>titleSize</WuiCode> is set
            in both <strong>WuiSteps</strong> and <strong>WuiStep</strong>, the
            latter value will override the former. Additionally, the title size{' '}
            <WuiCode>xs</WuiCode> will automatically generate smaller steps
            circles.
          </p>
        </Fragment>
      ),
      demo: <StepsTitleSizes />,
      snippet: stepsTitleSizesSnippet,
    },
    {
      title: 'Horizontal steps',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsHorizontalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stepsHorizontalHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            For use when forms/setup instructions can and should be split into
            multiple pages.
          </p>
          <p>
            For each step object, be sure to signify previous/completed steps
            with <WuiCode language="ts">isComplete: true</WuiCode> and the
            current/selected step with{' '}
            <WuiCode language="ts">isSelected: true</WuiCode>.
          </p>
        </Fragment>
      ),
      demo: <StepsHorizontal />,
      snippet: stepsHorizontalSnippet,
      props: { WuiStepsHorizontal, WuiStepHorizontal },
    },
  ],
  playground: stepConfig,
};
