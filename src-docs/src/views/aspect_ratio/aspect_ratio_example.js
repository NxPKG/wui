import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import {
  WuiLink,
  WuiCallOut,
  WuiAspectRatio,
  WuiSpacer,
} from '../../../../src/components';
import aspectRatioConfig from './playground';

import AspectRatio from './aspect_ratio';
const aspectRatioSource = require('!!raw-loader!./aspect_ratio');
const aspectRatioHtml = renderToHtml(AspectRatio);

const aspectRatioSnippet = `<WuiAspectRatio width={16} height={9}>
  <!-- Embed goes here -->
</WuiAspectRatio>`;

export const AspectRatioExample = {
  title: 'Aspect ratio',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: aspectRatioSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: aspectRatioHtml,
        },
      ],
      text: (
        <Fragment>
          <WuiCallOut
            size="s"
            color="warning"
            title="In some cases, aspect ratio sizing may not be supported by the embed. This component will only work with ones that do, like YouTube."
          />
          <WuiSpacer />
          <p>
            <strong>WuiAspectRatio</strong> provides a way to responsively
            resize a single block level child element to a specificied ratio.
            This is useful for things like YouTube iframes or other embeds that
            initially have a fixed size. If you need something similar for
            images, take a look at CSS&apos;s{' '}
            <WuiLink href="https://www.w3schools.com/css/css3_object-fit.asp">
              object-fit property
            </WuiLink>
            .
          </p>
        </Fragment>
      ),
      props: { WuiAspectRatio },
      demo: <AspectRatio />,
      snippet: aspectRatioSnippet,
    },
  ],
  playground: aspectRatioConfig,
};
