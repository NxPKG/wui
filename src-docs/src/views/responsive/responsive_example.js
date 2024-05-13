import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiShowFor,
  WuiHideFor,
  WuiCodeBlock,
} from '../../../../src/components';

import { BREAKPOINTS, BREAKPOINT_KEYS } from '../../../../src/services';
import { WuiBreakpointSize } from '!!prop-loader!../../../../src/services/breakpoint';

import Responsive from './responsive';
const responsiveSource = require('!!raw-loader!./responsive');
const responsiveHtml = renderToHtml(Responsive);
const responsiveSnippet = [
  `<WuiHideFor sizes={['xs', 's']}>
  <!-- Content to hide from xs and s screens -->
</WuiHideFor>`,
  `<WuiShowFor sizes={['l', 'xl']}>
  <!-- <div>Content only showing for l and xl screens</div> -->
</WuiShowFor>`,
];

function renderSizes(size, index) {
  let code = `'${size}': ${BREAKPOINTS[size]}px`;

  if (index > 0) {
    code += ` (to ${BREAKPOINTS[BREAKPOINT_KEYS[index - 1]] - 1}px)`;
  } else {
    code += ' +';
  }

  return <div key={index}>{code}</div>;
}

export const ResponsiveExample = {
  title: 'Responsive',
  sections: [
    {
      title: 'WuiShowFor and WuiHideFor',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: responsiveSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: responsiveHtml,
        },
      ],
      text: (
        <div>
          <p>
            These components will either render or not render their children
            based on the current window width. Pass an array of named
            breakpoints to the <WuiCode>sizes</WuiCode> prop to either show or
            hide their children respectively.
          </p>

          <p>
            The sizing options correlate with the keys in the{' '}
            <WuiCode language="ts">WuiBreakpoints</WuiCode> type. The named
            breakpoint starts at the pixel value provided and ends before the
            next one.
          </p>

          <WuiCodeBlock language="scss" paddingSize="s">
            {BREAKPOINT_KEYS.map(function(size, index) {
              return renderSizes(size, index);
            })}
          </WuiCodeBlock>
        </div>
      ),
      snippet: responsiveSnippet,
      props: { WuiShowFor, WuiHideFor, WuiBreakpointSize },
      demo: <Responsive />,
    },
  ],
};
