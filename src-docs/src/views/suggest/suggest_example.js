import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCallOut,
  WuiCode,
  WuiSpacer,
  WuiSuggest,
  WuiSuggestItem,
} from '../../../../src/components';

import Suggest from './suggest';
const suggestSource = require('!!raw-loader!./suggest');
const suggestHtml = renderToHtml(Suggest);

import SavedQueries from './saved_queries';
const savedQueriesSource = require('!!raw-loader!./saved_queries');
const savedQueriesHtml = renderToHtml(SavedQueries);

import SuggestItem from './suggest_item';
const suggestItemSource = require('!!raw-loader!./suggest_item');
const suggestItemHtml = renderToHtml(SuggestItem);
const suggestItemSnippet = [
  `<WuiSuggestItem
  type={sampleItem.type}
  label={sampleItem.label}
  description={sampleItem.description}
/>
`,
  `<WuiSuggestItem
  type={sampleItem.type}
  label={sampleItem.label}
  description={sampleItem.description}
  labelDisplay="expand"
/>`,
];

const suggestSnippet = [
  `<WuiSuggest
  status={status}
  tooltipContent={tooltipContent}
  onInputChange={getInputValue}
  onItemClick={onItemClick}
  suggestions={[
    {
      type: { iconType: 'qryField', color: 'tint4' },
      label: 'Field sample',
      description: 'This is the description',
    },
    {
      type: { iconType: 'qryValue', color: 'tint0' },
      label: 'Value sample',
      description: 'This is the description',
    },
  ]}
/>`,
];

export const SuggestExample = {
  title: 'Suggest',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: suggestSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: suggestHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiSuggest</strong> is a text field component used to
            display suggestions. The status of the component is shown on its
            right side. The available <WuiCode>status</WuiCode> are:{' '}
            <WuiCode>unsaved</WuiCode>, <WuiCode>saved</WuiCode>,
            <WuiCode>unchanged</WuiCode> and <WuiCode>isLoading</WuiCode>.
          </p>
        </div>
      ),
      props: { WuiSuggest },
      snippet: suggestSnippet,
      demo: <Suggest />,
    },
    {
      title: 'Suggest item',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: suggestItemSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: suggestItemHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiSuggestItem</strong> is a list item component to display
            suggestions when typing queries in <strong>WuiSuggest</strong>. Use{' '}
            <WuiCode>labelDisplay</WuiCode> to set whether the{' '}
            <WuiCode>label</WuiCode> has a fixed width or not.
          </p>
        </div>
      ),
      props: { WuiSuggestItem },
      snippet: suggestItemSnippet,
      demo: <SuggestItem />,
    },
    {
      title: 'Saved queries and filters',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: savedQueriesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: savedQueriesHtml,
        },
      ],
      text: (
        <div>
          <WuiCallOut color="warning" title="Demo of visual pattern only">
            <p>
              This documents a <strong>visual</strong> pattern for Wazuh&apos;s
              global query and filter bars. The filter bar has been broken down
              into multiple components. There are still bugs and not all the
              logic is well-formed.
            </p>
          </WuiCallOut>
          <WuiSpacer />
        </div>
      ),
      props: { WuiSuggest },
      demo: <SavedQueries />,
    },
  ],
};
