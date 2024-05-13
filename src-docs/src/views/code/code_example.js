import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode, WuiCodeBlockImpl } from '../../../../src/components';
import { codeBlockConfig, codeConfig } from './playground';

import Code from './code';
const codeSource = require('!!raw-loader!./code');
const codeHtml = renderToHtml(Code);
const codeSnippet = '<WuiCode>Text to be formatted</WuiCode>';

import CodeBlock from './code_block';
const codeBlockSource = require('!!raw-loader!./code_block');
const codeBlockHtml = renderToHtml(CodeBlock);
const codeBlockSnippet = `<WuiCodeBlock language="html" paddingSize="s" isCopyable>
{ \`<h1>Title</h1>\` }
</WuiCodeBlock>
`;

import CodeBlockPre from './code_block_pre';
const codeBlockPreSource = require('!!raw-loader!./code_block_pre');
const codeBlockPreHtml = renderToHtml(CodeBlockPre);

export const CodeExample = {
  title: 'Code',
  sections: [
    {
      title: 'Inline',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: codeHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiCode</strong> is for making inline code snippets that can
          work within or next to bodies of text.
        </p>
      ),
      snippet: codeSnippet,
      demo: <Code />,
    },
    {
      title: 'Code block',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: codeBlockHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiCodeBlock</strong> can be used to create multi-line code
          blocks. Copy and fullscreen buttons can be enabled via the
          <WuiCode>isCopyable</WuiCode> and <WuiCode>overflowHeight</WuiCode>
          props, respectively.
        </p>
      ),
      snippet: codeBlockSnippet,
      props: { WuiCodeBlockImpl },
      demo: <CodeBlock />,
    },
    {
      title: 'Code block and white-space',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockPreSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: codeBlockPreHtml,
        },
      ],
      text: (
        <p>
          By default, the <WuiCode>whiteSpace</WuiCode> property is set to{' '}
          <WuiCode>pre-wrap</WuiCode>. This makes the text wrap when needed. You
          can, however, pass <WuiCode>pre</WuiCode> to the{' '}
          <WuiCode>whiteSpace</WuiCode> prop and the text won&apos;t wrap unless
          line breaks are in the content.
        </p>
      ),
      props: { WuiCodeBlockImpl },
      demo: <CodeBlockPre />,
    },
  ],
  playground: [codeBlockConfig, codeConfig],
};
