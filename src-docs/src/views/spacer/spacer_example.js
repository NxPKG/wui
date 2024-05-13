import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode, WuiSpacer } from '../../../../src/components';

import { spacerConfig } from './playground';

import Spacer from './spacer';
const spacerSource = require('!!raw-loader!./spacer');
const spacerHtml = renderToHtml(Spacer);

const spacerSnippet = '<WuiSpacer size="xs" />';

export const SpacerExample = {
  title: 'Spacer',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: spacerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: spacerHtml,
        },
      ],
      text: (
        <p>
          The <strong>WuiSpacer</strong> component is a fancy break tag. Use it
          to add vertical space between items. Please do not stack them. If
          passed without a <WuiCode>size</WuiCode> prop, it will default to the
          large size, which matches the margins of{' '}
          <Link to="/layout/flex">
            <strong>WuiFlexGroup</strong>
          </Link>{' '}
          elements.
        </p>
      ),
      props: { WuiSpacer },
      snippet: spacerSnippet,
      demo: (
        <div className="guideDemo__highlightSpacer">
          <Spacer />
        </div>
      ),
    },
  ],
  playground: spacerConfig,
};
