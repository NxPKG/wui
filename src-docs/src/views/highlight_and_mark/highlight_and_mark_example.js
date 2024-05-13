import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode, WuiHighlight, WuiMark } from '../../../../src/components';

import { highlightConfig, markConfig } from './playground';

import { Highlight } from './highlight';
import { Mark } from './mark';

const highlightSource = require('!!raw-loader!./highlight');
const highlightHtml = renderToHtml(Highlight);
const highlightSnippet = `<WuiHighlight search={searchValue} highlightAll={isHighlightAll}>
  <!-- A text where all your search matches will be highlighted -->
</WuiHighlight>
`;

const markSource = require('!!raw-loader!./mark');
const markHtml = renderToHtml(Mark);
const markSnippet = '<WuiMark><!-- Mark text --></WuiMark>';

export const HighlightAndMarkExample = {
  title: 'Highlight and mark',
  sections: [
    {
      title: 'Highlight',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: highlightSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: highlightHtml,
        },
      ],
      text: (
        <p>
          Use <strong>WuiHighlight</strong> to highlight substrings within a
          string, typically in response to user input.
        </p>
      ),
      props: { WuiHighlight },
      components: { WuiHighlight },
      snippet: highlightSnippet,
      demo: <Highlight />,
    },
    {
      title: 'Mark',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markHtml,
        },
      ],
      text: (
        <p>
          Use <strong>WuiMark</strong> to wrap a string in a{' '}
          <WuiCode>mark</WuiCode> element.
        </p>
      ),
      components: { WuiMark },
      snippet: markSnippet,
      demo: <Mark />,
    },
  ],
  playground: [highlightConfig, markConfig],
};
