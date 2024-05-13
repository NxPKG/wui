import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiText,
  WuiTextColor,
  WuiTextAlign,
} from '../../../../src/components';
import Guidelines from '../text_scaling/text_scaling_sandbox';
import { textConfig, textColorConfig } from './playground';

import Text from './text';
const textSource = require('!!raw-loader!./text');
const textHtml = renderToHtml(Text);
const textSnippet = `<WuiText grow={false}><!-- Raw HTML content --></WuiText>
`;

import TextSmall from './text_small';
const textSmallSource = require('!!raw-loader!./text_small');
const textSmallHtml = renderToHtml(TextSmall);
const textSmallSnippet = [
  `<WuiText size="s"><!-- Raw HTML content --></WuiText>
`,
];

import TextColor from './text_color';
const textColorSource = require('!!raw-loader!./text_color');
const textColorHtml = renderToHtml(TextColor);
const textColorSnippet = [
  `<WuiText color="danger"><!-- Raw HTML content --></WuiText>
`,
  `<WuiTextColor color="subdued">Subdued text color</WuiTextColor>
`,
];

import TextAlign from './text_align';
const textAlignSource = require('!!raw-loader!./text_align');
const textAlignHtml = renderToHtml(TextAlign);
const textAlignSnippet = [
  `<WuiText textAlign="center"><!-- Raw HTML content --></WuiText>
`,
  `<WuiTextAlign textAlign="center"><!-- Raw HTML content --></WuiTextAlign>
`,
];

export const TextExample = {
  title: 'Text',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiText</strong> is a generic catchall wrapper that will
            apply our standard typography styling and spacing to naked HTML.
            Because of its forced style it{' '}
            <strong>only accepts raw HTML</strong> and can not / should not be
            used to wrap React components (which would break their styling).
          </p>
          <p>
            <strong>WuiText</strong> can ensure proper line-length for
            readability by setting a{' '}
            <WuiCode language="sass">max-width</WuiCode> on the entire
            component. To add the max-width setting, set{' '}
            <WuiCode language="js">grow=false</WuiCode>.
          </p>
        </div>
      ),
      props: { WuiText },
      snippet: textSnippet,
      demo: <Text />,
    },
    {
      title: 'Text can come in various sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textSmallSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textSmallHtml,
        },
      ],
      text: (
        <p>
          Using the <WuiCode>size</WuiCode> prop on <strong>WuiText</strong> you
          can get smaller sizes of text than the default.
        </p>
      ),
      snippet: textSmallSnippet,
      demo: <TextSmall />,
    },
    {
      title: 'Coloring text',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textColorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textColorHtml,
        },
      ],
      text: (
        <p>
          There are two ways to color text. Either individually by applying{' '}
          <strong>WuiTextColor</strong> on individual text objects, or by
          passing the <WuiCode>color</WuiCode> prop directly on{' '}
          <strong>WuiText</strong> for a blanket approach across the entirety of
          your text.
        </p>
      ),
      props: { WuiTextColor },
      snippet: textColorSnippet,
      demo: <TextColor />,
    },
    {
      title: 'Alignment',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textAlignSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textAlignHtml,
        },
      ],
      text: (
        <p>
          There are two ways to align text. Either individually by applying{' '}
          <strong>WuiTextAlign</strong> on individual text objects, or by
          passing the <WuiCode>textAlign</WuiCode> prop directly on{' '}
          <strong>WuiText</strong> for a blanket approach across the entirety of
          your text.
        </p>
      ),
      props: { WuiTextAlign },
      snippet: textAlignSnippet,
      demo: <TextAlign />,
    },
  ],
  guidelines: <Guidelines />,
  playground: [textConfig, textColorConfig],
};
