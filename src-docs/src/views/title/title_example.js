import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiTitle } from '../../../../src/components';
import { titleConfig } from './playground';

import Title from './title';
const titleSource = require('!!raw-loader!./title');
const titleHtml = renderToHtml(Title);
const titleSnippet = [
  `<WuiTitle>
  <h2><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
</WuiTitle>`,
  `<WuiTitle size="s">
  <h2><!-- Small title but heading level can be anything based on your context. --></h2>
</WuiTitle>`,
];

export const TitleExample = {
  title: 'Title',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: titleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: titleHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiTitle</strong> styles the page, section, and content
          headings we use in Wazuh. They can contain any markup, but usually
          contain a heading tag of some sort. Unlike <strong>WuiText</strong>{' '}
          they are margin neutral and more suitable for general layout design.
        </p>
      ),
      snippet: titleSnippet,
      props: { WuiTitle },
      demo: <Title />,
    },
  ],
  playground: titleConfig,
};
