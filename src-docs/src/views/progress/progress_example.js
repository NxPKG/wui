import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCallOut, WuiCode, WuiProgress } from '../../../../src/components';
import progressConfig from './playground';

import Progress from './progress';
const progressSource = require('!!raw-loader!./progress');
const progressHtml = renderToHtml(Progress);
const progressSnippet = '<WuiProgress size="xs" color="accent" />';

import ProgressValue from './progress_value';
const progressValueSource = require('!!raw-loader!./progress_value');
const progressValueHtml = renderToHtml(ProgressValue);
const progressValueSnippet = '<WuiProgress value={22} max={100} size="xs" />';

import ProgressFixed from './progress_fixed';
const progressFixedSource = require('!!raw-loader!./progress_fixed');
const progressFixedHtml = renderToHtml(ProgressFixed);
const progressFixedSnippet = `<!-- Position at top of parent container -->
<WuiProgress size="xs" color="accent" position="absolute" />

<!-- Position at top of screen, above global header -->
<WuiPortal>
  <WuiProgress size="xs" color="accent" position="fixed" />
</WuiPortal>`;

import ProgressSizeColor from './progress_size_color';
const progressSizeColorSource = require('!!raw-loader!./progress_size_color');
const progressSizeColorHtml = renderToHtml(ProgressSizeColor);
const progressSizeColorSnippet = `<WuiProgress
  value={20}
  max={100} 
  size="s"
  color="accent"
/>`;

import ProgressChart from './progress_chart';
const progressChartSource = require('!!raw-loader!./progress_chart');
const progressChartHtml = renderToHtml(ProgressChart);
const progressChartSnippet = `<WuiProgress 
  value={20}
  valueText={true}
  label={label}
  max={100} 
/>`;

export const ProgressExample = {
  title: 'Progress',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressHtml,
        },
      ],
      text: (
        <p>
          The <strong>WuiProgress</strong> component by default will display in
          an indeterminate loading state (rendered as a single div) until you
          define a <WuiCode>max</WuiCode> and <WuiCode>value</WuiCode> prop. The{' '}
          <WuiCode>size</WuiCode> prop refers to its vertical height. It will
          always stretch <WuiCode>100%</WuiCode> to its container.
        </p>
      ),
      snippet: progressSnippet,
      props: { WuiProgress },
      demo: <Progress />,
    },
    {
      title: 'Progress with values',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressValueSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressValueHtml,
        },
      ],
      text: (
        <p>
          Once the <WuiCode>max</WuiCode> and <WuiCode>value</WuiCode> props are
          set, it will act as a determinate progress bar. This is rendered using
          an HTML5 <WuiCode>progress</WuiCode> tag.
        </p>
      ),
      snippet: progressValueSnippet,
      demo: <ProgressValue />,
    },
    {
      title: 'Progress can have absolute or fixed positions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressFixedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressFixedHtml,
        },
      ],
      text: (
        <div>
          <p>
            Using the <WuiCode>position</WuiCode> prop we can align our bar to
            be <WuiCode>fixed</WuiCode> or <WuiCode>absolute</WuiCode>. In both
            options, the background color of the base bar is dropped (since the
            context of width is already known from your wrapping element). For
            the absolute option, make sure that your wrapping element has{' '}
            <WuiCode language="sass">position: relative</WuiCode> applied.
          </p>
          <WuiCallOut
            title="Note about progress bars over fixed headers"
            iconType="iInCircle">
            <p>
              Using <strong>WuiProgress</strong> with a <WuiCode>fixed</WuiCode>{' '}
              position may result in it being overlayed when its parent wrapper
              has a <WuiCode>z-index</WuiCode> value lower than another fixed
              element, such as <strong>WuiHeader</strong>. In that case, wrap{' '}
              <strong>WuiProgress</strong> in an <strong>WuiPortal</strong> as
              seen on the Snippet tab.
            </p>
          </WuiCallOut>
        </div>
      ),
      snippet: progressFixedSnippet,
      demo: <ProgressFixed />,
    },
    {
      title: 'Progress has a range of sizes and colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressSizeColorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressSizeColorHtml,
        },
      ],
      text: (
        <p>
          Both <WuiCode>size</WuiCode> and <WuiCode>color</WuiCode> can be
          provided as props. These values will work on both determinate and
          indeterminate progress bars.
        </p>
      ),
      demo: <ProgressSizeColor />,
      snippet: progressSizeColorSnippet,
    },
    {
      title: 'Progress for charts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressChartSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressChartHtml,
        },
      ],
      text: (
        <div>
          <p>
            Determinate progress bar can be used as simple bar charts. Use them
            with the <WuiCode>label</WuiCode> and <WuiCode>valueText</WuiCode>{' '}
            props to show the data corresponding to each bar. The{' '}
            <WuiCode>valueText</WuiCode> renders as the same color as the{' '}
            <strong>WuiProgress</strong>.
          </p>
          <p>
            Setting <WuiCode language="ts">{'valueText={true}'}</WuiCode> will
            add a % sign next to the<WuiCode>value</WuiCode> passed. If you want
            to display a custom <WuiCode>valueText</WuiCode>, you can pass a
            node instead.
          </p>
        </div>
      ),
      demo: <ProgressChart />,
      snippet: progressChartSnippet,
    },
  ],
  playground: progressConfig,
};
