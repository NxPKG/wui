import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode, WuiSpacer, WuiText } from '../../../../src/components';

import InnerText from './inner_text';
const innerTextSource = require('!!raw-loader!./inner_text');
const innerTextHtml = renderToHtml(InnerText);
const useInnerTextSnippet = `const [ref, innerText] = useInnerText();
<span ref={ref} title={innerText}>
  Content
</span>`;
const wuiInnerTextSnippet = `<WuiInnerText>
  {(ref, innerText) => (
    <span ref={ref} title={innerText}>
      Content
    </span>
  )}
</WuiInnerText>`;

export const InnerTextExample = {
  title: 'Inner text',
  intro: (
    <React.Fragment>
      <WuiText>
        <p>
          For instances where accessing the text content of a component that may
          be wrapped or interspersed with other components, two utilities are
          available:
        </p>
        <ul>
          <li>
            <WuiCode>useInnerText</WuiCode> - A custom React hook, usable in
            function components
          </li>
          <li>
            <WuiCode>{'<WuiInnerText />'}</WuiCode> - A higher order{' '}
            <WuiCode>useInnerText</WuiCode> component for use in class
            components
          </li>
        </ul>
        <p>
          Both utilities make available a <WuiCode>ref</WuiCode> reference to
          add to the target DOM element, and the resulting{' '}
          <WuiCode>innerText</WuiCode> value to use as needed.
        </p>
      </WuiText>
      <WuiSpacer />
    </React.Fragment>
  ),
  sections: [
    {
      title: 'Rendered',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: innerTextSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: innerTextHtml,
        },
      ],
      demo: <InnerText />,
      snippet: [useInnerTextSnippet, wuiInnerTextSnippet],
    },
  ],
};
