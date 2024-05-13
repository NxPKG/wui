import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiFacetButton,
  WuiFacetGroup,
  WuiCode,
} from '../../../../src/components';

import { facetButtonConfig, facetLayoutConfig } from './playground';

import Facet from './facet';
const facetSource = require('!!raw-loader!./facet');
const facetHtml = renderToHtml(Facet);
const facetSnippet = `<WuiFacetButton
  quantity={6}
  icon={<WuiIcon type="dot" color="secondary" />}
  isSelected>
  <!-- Facet with WuiIcon content -->
</WuiFacetButton>
`;

import FacetLayout from './facet_layout';
const facetLayoutSource = require('!!raw-loader!./facet_layout');
const facetLayoutHtml = renderToHtml(FacetLayout);

export const FacetExample = {
  title: 'Facet',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: facetSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: facetHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>WuiFacetButtons</strong> are to be used when allowing lists
            with multiple search params to be filtered down by these particular
            params. They allow for an <WuiCode>icon</WuiCode> node and/or{' '}
            <WuiCode>quantity</WuiCode> to be passed. You can also indicate the
            current selection with <WuiCode>isSelected</WuiCode>. Other props
            include <WuiCode>isDisabled</WuiCode> and{' '}
            <WuiCode>isLoading</WuiCode> (which will swap the quantity indicator
            with a loading icon).
          </p>
        </>
      ),
      props: { WuiFacetButton },
      snippet: facetSnippet,
      demo: <Facet />,
    },
    {
      title: 'Facet layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: facetLayoutSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: facetLayoutHtml,
        },
      ],
      text: (
        <>
          <p>
            Utilize the <strong>WuiFacetGroup</strong> wrapper to correctly
            layout multiple facets. You can supply a <WuiCode>layout</WuiCode>{' '}
            of either <WuiCode>horizontal</WuiCode> or{' '}
            <WuiCode>vertical</WuiCode> with the default being{' '}
            <WuiCode>vertical</WuiCode>. Be sure to contain vertical layouts in
            a skinny component or give it a max-width. You can also adjust the
            spacing between items with the <WuiCode>gutterSize</WuiCode> prop.
          </p>
          <p>
            Typically, each facet grouping should display similarly. For
            example, they should all have icons or be similar icon nodes (like
            avatars). It is up to you whether each group should be single or
            multi-selection.
          </p>
        </>
      ),
      props: { WuiFacetGroup },
      demo: <FacetLayout />,
      snippet: [
        `// Restrict the width of default (vertical) if not restricted by parent
<WuiFacetGroup style={{ maxWidth: 200 }}>{facets}</WuiFacetGroup>`,
        `// Horizontal
<WuiFacetGroup layout="horizontal" gutterSize="l">{facets}</WuiFacetGroup>`,
      ],
    },
  ],
  playground: [facetButtonConfig, facetLayoutConfig],
};
