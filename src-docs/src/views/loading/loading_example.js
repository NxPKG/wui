import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiLoadingWazuh,
  WuiLoadingSpinner,
  WuiLoadingChart,
  WuiLoadingContent,
  WuiLoadingRunningLines,
  WuiLoadingDots,
} from '../../../../src/components';
import {
  loadingWazuhConfig,
  loadingChartConfig,
  loadingSpinnerConfig,
  loadingContentConfig,
} from './playground';

import LoadingWazuh from './loading_wazuh';
const loadingWazuhSource = require('!!raw-loader!./loading_wazuh');
const loadingWazuhHtml = renderToHtml(LoadingWazuh);

import LoadingChart from './loading_chart';
const loadingChartSource = require('!!raw-loader!./loading_chart');
const loadingChartHtml = renderToHtml(LoadingChart);

import LoadingSpinner from './loading_spinner';
const loadingSpinnerSource = require('!!raw-loader!./loading_spinner');
const loadingSpinnerHtml = renderToHtml(LoadingSpinner);

import LoadingContent from './loading_content';
const loadingContentSource = require('!!raw-loader!./loading_content');
const loadingContentHtml = renderToHtml(LoadingContent);

import LoadingRunningLines from './loading_running_lines';
const loadingRunningLinesSource = require('!!raw-loader!./loading_running_lines');
const loadingRunningLinesHtml = renderToHtml(LoadingRunningLines);

import LoadingDots from './loading_dots';
const loadingDotsSource = require('!!raw-loader!./loading_dots');
const loadingDotsHtml = renderToHtml(LoadingDots);

export const LoadingExample = {
  title: 'Loading',
  sections: [
    {
      title: 'Wazuh',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingWazuhSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: loadingWazuhHtml,
        },
      ],
      text: (
        <p>
          Wazuh logo based load. Should only be used in very large panels, like
          bootup screens.
        </p>
      ),
      props: { WuiLoadingWazuh },
      demo: <LoadingWazuh />,
      snippet: '<WuiLoadingWazuh size="m" />',
    },
    {
      title: 'Chart',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingChartSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: loadingChartHtml,
        },
      ],
      text: (
        <p>
          Loader for the loading of chart or dashboard and visualization
          elements. The colored versions should be used sparingly, only when a
          single large visualization is loaded. When loading smaller groups of
          panels, the smaller, mono versions should be used.
        </p>
      ),
      props: { WuiLoadingChart },
      demo: <LoadingChart />,
      snippet: '<WuiLoadingChart size="m" />',
    },
    {
      title: 'Spinner',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingSpinnerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: loadingSpinnerHtml,
        },
      ],
      text: <p>A simple spinner for most loading applications.</p>,
      props: { WuiLoadingSpinner },
      demo: <LoadingSpinner />,
      snippet: '<WuiLoadingSpinner size="m" />',
    },
    {
      title: 'Text content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingContentSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: loadingContentHtml,
        },
      ],
      text: (
        <p>
          A simple loading animation for displaying placeholder text content.
          You can pass in a number of <WuiCode>lines</WuiCode> between 1 and 10.
        </p>
      ),
      props: { WuiLoadingContent },
      demo: <LoadingContent />,
      snippet: '<WuiLoadingContent lines={3} />',
    },
    {
      title: 'Dots',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingDotsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: loadingDotsHtml,
        },
      ],
      text: (
        <p>
          A big loading animation for displaying big placeholder containers.
        </p>
      ),
      props: { WuiLoadingDots },
      demo: <LoadingDots />,
      snippet: '<WuiLoadingDots />',
    },
    {
      title: 'Running lines',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingRunningLinesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: loadingRunningLinesHtml,
        },
      ],
      text: (
        <p>
          A simple loading animation for displaying placeholder text content.
        </p>
      ),
      props: { WuiLoadingRunningLines },
      demo: <LoadingRunningLines />,
      snippet: '<WuiLoadingRunningLines />',
    },
  ],
  playground: [
    loadingWazuhConfig,
    loadingChartConfig,
    loadingSpinnerConfig,
    loadingContentConfig,
  ],
};
