import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiAccordion,
  WuiCode,
  WuiCodeBlock,
  WuiSpacer,
  commonDurationRanges,
} from '../../../../src/components';

import PrettyDuration from './pretty_duration';
const prettyDurationSource = require('!!raw-loader!./pretty_duration');
const prettyDurationHtml = renderToHtml(PrettyDuration);

export const PrettyDurationExample = {
  title: 'Pretty duration',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: prettyDurationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: prettyDurationHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Use <WuiCode>prettyDuration</WuiCode> to convert a start and end
            date string to a human-friendly format.
          </p>

          <p>
            Start and end values for the duration are passed as the first and
            second arguments, respectively. These can be timestamps (
            <WuiCode>2018-01-17T18:57:57.149Z</WuiCode>) or relative times (
            <WuiCode>now-15m</WuiCode>).
          </p>

          <p>
            An array of quick range values is passed as the third argument.
            These are used to pretty format custom ranges. WUI exports
            <WuiCode>commonDurationRanges</WuiCode> which can be passed here.
          </p>

          <WuiAccordion
            id="commonDurationRanges"
            buttonContent="Show commonDurationRanges definition">
            <WuiCodeBlock>
              {JSON.stringify(commonDurationRanges, null, 2)}
            </WuiCodeBlock>
          </WuiAccordion>

          <WuiSpacer />

          <p>
            The output date/time format is specified by the fourth argument.
          </p>
        </Fragment>
      ),
      demo: <PrettyDuration />,
    },
  ],
};
