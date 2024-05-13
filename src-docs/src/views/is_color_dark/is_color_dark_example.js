import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode } from '../../../../src/components';

import IsColorDark from './is_color_dark';
const isColorDarkSource = require('!!raw-loader!./is_color_dark');
const isColorDarkHtml = renderToHtml(IsColorDark);

export const IsColorDarkExample = {
  title: 'Color',
  sections: [
    {
      title: 'Is color dark',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: isColorDarkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: isColorDarkHtml,
        },
      ],
      text: (
        <p>
          Use <WuiCode>isColorDark</WuiCode> to determine whether or not to use
          light or dark text against a background of a given color.
        </p>
      ),
      demo: <IsColorDark />,
    },
  ],
};
