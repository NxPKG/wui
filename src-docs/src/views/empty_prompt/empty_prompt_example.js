import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode, WuiEmptyPrompt } from '../../../../src/components';

import emptyPromptConfig from './playground';

import EmptyPrompt from './empty_prompt';
const emptyPromptSource = require('!!raw-loader!./empty_prompt');
const emptyPromptHtml = renderToHtml(EmptyPrompt);
const emptyPromptSnippet = `<WuiEmptyPrompt
  iconType="editorStrike"
  title={<h2>You have no spice</h2>}
  body={bodyContent}
  actions={actions}
/>`;

import Custom from './custom';
const customSource = require('!!raw-loader!./custom');
const customHtml = renderToHtml(Custom);
const customSnippet = `<WuiEmptyPrompt
  iconType="editorStrike"
  title={<h2>You have no spice</h2>}
  titleSize="xs"
  body={bodyContent}
  actions={actions}
/>`;

import Simple from './simple';
const simpleSource = require('!!raw-loader!./simple');
const simpleHtml = renderToHtml(Simple);
const simpleSnippet = `<WuiEmptyPrompt
  title={<h2>You have no spice</h2>}
  actions={multipleActions}
/>`;

export const EmptyPromptExample = {
  title: 'Empty prompt',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: emptyPromptSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: emptyPromptHtml,
        },
      ],
      text: (
        <p>
          Use the <strong>WuiEmptyPrompt</strong> as a placeholder for an empty
          table or list of content.
        </p>
      ),
      props: { WuiEmptyPrompt },
      demo: <EmptyPrompt />,
      snippet: emptyPromptSnippet,
    },
    {
      title: 'Custom sizes and colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customHtml,
        },
      ],
      text: (
        <p>
          You can control sizes and colors with the <WuiCode>iconColor</WuiCode>
          , and <WuiCode>titleSize</WuiCode> props.
        </p>
      ),
      props: { WuiEmptyPrompt },
      demo: <Custom />,
      snippet: customSnippet,
    },
    {
      title: 'Less content, more actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: simpleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: simpleHtml,
        },
      ],
      text: (
        <Fragment>
          <p>You can remove parts of the prompt to simplify it, if you wish.</p>
          <p>
            You can also provide an array of multiple actions. Be sure to list
            primary actions first and secondary actions last.
          </p>
        </Fragment>
      ),
      props: { WuiEmptyPrompt },
      demo: <Simple />,
      snippet: simpleSnippet,
    },
  ],
  playground: emptyPromptConfig,
};
