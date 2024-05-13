import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiBottomBar, WuiCode } from '../../../../src/components';

import BottomBar from './bottom_bar';
const bottomBarSource = require('!!raw-loader!./bottom_bar');
const bottomBarHtml = renderToHtml(BottomBar);

const bottomBarSnippet = `<WuiBottomBar paddingSize="s">
  <!-- Content goes here -->
</WuiBottomBar>`;

export const BottomBarExample = {
  title: 'Bottom bar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: bottomBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: bottomBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiBottomBar</strong> is a simple wrapper component that
            does nothing but fix a bottom bar (usually filled with buttons) to
            the bottom of the page. Use it when you have really long pages or
            complicated, multi-page forms. In the case of forms, only invoke it
            if a form is in a savable state.
          </p>
          <p>
            Like many of our other wrapper components,{' '}
            <strong>WuiBottomBar</strong> accepts a{' '}
            <WuiCode>paddingSize</WuiCode> prop, which can be set to{' '}
            <WuiCode>s / m / l / none</WuiCode>.
          </p>
        </div>
      ),
      props: { WuiBottomBar },
      snippet: bottomBarSnippet,
      demo: <BottomBar />,
    },
  ],
};
