import React from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode, WuiToggle, WuiCallOut } from '../../../../src/components';

import { toggleConfig } from './playground';

import Toggle from './toggle';
const toggleSource = require('!!raw-loader!./toggle');
const toggleHtml = renderToHtml(Toggle);
const toggleSnippet = [
  `<WuiToggle
  onChange={onToggleChange}
  label="Is toggle on?"
>
  {toggleOn ? 'On' : 'Off'}
</WuiToggle>`,
];

export const ToggleExample = {
  title: 'Toggle',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: toggleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: toggleHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <strong>WuiToggle</strong> component is a very simplified
            utility for creating toggle-able elements. There is only an on/off
            (checked/unchecked) state. All this creates is a visibly hidden
            input (checkbox or radio) overtop of the children provided.
          </p>
          <p>
            By default, the children will be wrapped in a block element. To
            change the display you can simply use one of the{' '}
            <Link to="/utilities/css-utility-classes">utility classes</Link>{' '}
            like <WuiCode>.wui-displayInlineBlock</WuiCode>.
          </p>
          <WuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <span>
                This utility is just a helper component and comes with no
                inherit styles including no <WuiCode>:hover</WuiCode> or{' '}
                <WuiCode>:focus</WuiCode> states. If you use this utility
                directly, be sure to add these states. Otherwise, you may just
                want to utilize the{' '}
                <Link to="/navigation/button">WuiButtonToggle</Link> component.
              </span>
            }
          />
        </div>
      ),
      components: { WuiToggle },
      snippet: toggleSnippet,
      demo: <Toggle />,
      props: { WuiToggle },
    },
  ],
  playground: toggleConfig,
};
