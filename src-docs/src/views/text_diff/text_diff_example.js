import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode } from '../../../../src/components';
import { useWuiTextDiffProp } from './props';
import TextDiff from './text_diff';
const textDiffSource = require('!!raw-loader!./text_diff');
const textDiffHtml = renderToHtml(TextDiff);

import TextDiffCustomComponents from './text_diff_custom_components';
const customComponentsSource = require('!!raw-loader!./text_diff_custom_components');
const customComponentsHtml = renderToHtml(TextDiffCustomComponents);

export const TextDiffExample = {
  title: 'Text diff',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textDiffSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textDiffHtml,
        },
      ],
      text: (
        <>
          <p>
            The hook, <strong>useWuiTextDiff</strong>, generates a set of
            changes between two strings. It returns both React elements for
            displaying the diff and an object representing the identified
            changes. The <WuiCode>timeout</WuiCode> prop is used to set how many
            seconds any diff&apos;s exploration phase may take. The default
            value is 0.1, a value of 0 disables the timeout and lets diff run
            until completion. The higher the timeout, the more detailed the
            comparison.
          </p>
          <p>
            <WuiCode language="tsx">
              {
                'const [rendered, textDiffObject] = useWuiTextDiff({ beforeText, afterText })'
              }
            </WuiCode>
          </p>
        </>
      ),
      demo: <TextDiff />,
      props: { useWuiTextDiffProp },
      snippet: `const [rendered, textDiffObject] = useWuiTextDiff({ beforeText, afterText })

<WuiText><p>{rendered}</p></WuiText>`,
    },
    {
      title: 'Custom rendered elements',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customComponentsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customComponentsHtml,
        },
      ],
      text: (
        <>
          <p>
            By default, the hook will wrap deletions with{' '}
            <WuiCode>{'<del>'}</WuiCode> and insertions with{' '}
            <WuiCode>{'<ins>'}</WuiCode> elements. You can replace these
            elements with the <WuiCode>deleteComponent</WuiCode> and{' '}
            <WuiCode>insertComponent</WuiCode>
            props respectively.
          </p>
          <p>
            Also, since <WuiCode>rendered</WuiCode> is simple html string, you
            can wrap it in any contextual element like{' '}
            <Link to="/display/text">
              <strong>WuiText</strong>
            </Link>{' '}
            or{' '}
            <Link to="/display/code">
              <strong>WuiCodeBlock</strong>
            </Link>
            .
          </p>
        </>
      ),
      demo: <TextDiffCustomComponents />,
      snippet: `const [rendered] = useWuiTextDiff({
  beforeText,
  afterText,
  insertComponent: 'strong',
});

<WuiCodeBlock fontSize="m" paddingSize="m">
  {rendered}
</WuiCodeBlock>`,
    },
  ],
};
