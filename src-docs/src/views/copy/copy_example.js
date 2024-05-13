import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCopy, WuiCode } from '../../../../src/components';

import Copy from './copy';
const copySource = require('!!raw-loader!./copy');
const copyHtml = renderToHtml(Copy);

export const CopyExample = {
  title: 'Copy',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: copySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: copyHtml,
        },
      ],
      text: (
        <p>
          The <strong>WuiCopy</strong> component is a utility for copying text
          to clipboard. Wrap a function that returns a component. The first
          argument will be a <WuiCode>copy</WuiCode> function.
        </p>
      ),
      components: { WuiCopy },
      demo: <Copy />,
      props: { WuiCopy },
      snippet: `<WuiCopy textToCopy={textToCopy}>
  {copy => (
    <WuiButton onClick={copy}>Click to copy</WuiButton>
  )}
</WuiCopy>`,
    },
  ],
};
