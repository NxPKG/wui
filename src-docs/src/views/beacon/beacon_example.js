import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiBeacon, WuiText } from '../../../../src/components';

import { beaconConfig } from './playground';

import Beacon from './beacon';
const beaconSource = require('!!raw-loader!./beacon');
const beaconHtml = renderToHtml(Beacon);
const beaconSnippet = '<WuiBeacon />';

export const BeaconExample = {
  title: 'Beacon',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: beaconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: beaconHtml,
        },
      ],
      text: (
        <WuiText>
          <p>
            Use the <strong>WuiBeacon</strong> component to draw visual
            attention to a specific location or element.
          </p>
        </WuiText>
      ),
      props: { WuiBeacon },
      snippet: beaconSnippet,
      demo: <Beacon />,
    },
  ],
  playground: beaconConfig,
};
