import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCallOut,
  WuiCode,
  WuiLink,
  WuiResizableContainer,
  WuiSpacer,
  WuiText,
} from '../../../../src/components';
import { WuiResizablePanel } from '../../../../src/components/resizable_container/resizable_panel';
import { WuiResizableButton } from '../../../../src/components/resizable_container/resizable_button';

import ResizableContainerBasic from './resizable_container_basic';
import ResizableContainerVertical from './resizable_container_vertical';
import ResizableContainerThreePanels from './resizable_container_three_panels';
import ResizableContainerResetValues from './resizable_container_reset_values';
import ResizableResizerSize from './resizable_resizer_size';

const ResizableContainerSource = require('!!raw-loader!./resizable_container_basic');
const ResizableContainerVericalSource = require('!!raw-loader!./resizable_container_vertical');
const ResizableContainerThreePanelsSource = require('!!raw-loader!./resizable_container_three_panels');
const ResizableContainerResetValuesSource = require('!!raw-loader!./resizable_container_reset_values');
const ResizableResizerSizeSource = require('!!raw-loader!./resizable_resizer_size');

const ResizableContainerHtml = renderToHtml(ResizableContainerBasic);
const ResizableContainerVericalHtml = renderToHtml(ResizableContainerVertical);
const ResizableContainerThreePanelsHtml = renderToHtml(
  ResizableContainerThreePanels
);
const ResizableContainerResetValuesHtml = renderToHtml(
  ResizableContainerResetValues
);
const ResizableResizerSizeHtml = renderToHtml(ResizableResizerSize);

const snippet = `<WuiResizableContainer style={{ height: '400px' }}>
  {(WuiResizablePanel, WuiResizableButton) => (
    <>
      <WuiResizablePanel initialSize={50} minSize="200px">
        <WuiText>
          <p>{text}</p>
        </WuiText>
      </WuiResizablePanel>

      <WuiResizableButton />

      <WuiResizablePanel initialSize={50} minSize="200px">
        <WuiText>
          <p>{text}</p>
        </WuiText>
      </WuiResizablePanel>
    </>
  )}
</WuiResizableContainer>`;

export const ResizableContainerExample = {
  title: 'Resizable container',
  intro: (
    <Fragment>
      <WuiCallOut title="Consuming" color="warning">
        <WuiText size="s">
          <p>
            This component is handy for various resizable containers.{' '}
            <strong>WuiResizableContainer</strong> uses the{' '}
            <WuiLink
              href="https://reactjs.org/docs/render-props.html#using-props-other-than-render"
              external>
              React Render Props
            </WuiLink>{' '}
            technique to provide <strong>WuiResizablePanel</strong> and{' '}
            <strong>WuiResizableButton</strong> components for you layout. Wrap
            parts of your content with the <strong>WuiResizablePanel</strong>{' '}
            component and put the <strong>WuiResizableButton</strong> component
            between.
          </p>
        </WuiText>
      </WuiCallOut>

      <WuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerHtml,
        },
      ],
      title: 'Horizontal resizing',
      text: (
        <div>
          <p>
            Simple resizable container with two panels and a resizer between.
            This is the most common case you&#39;ll need in your app. Just drag{' '}
            <strong>the resizer</strong> button between two panels to
            increase/decrease panel size. You could also use arrow keys{' '}
            <strong>&#x2190;</strong>|<strong>&#x2192;</strong> on{' '}
            <strong>the focused resizer</strong> button to change panel size.
          </p>
          <ul>
            <li>
              add <WuiCode>initialSize</WuiCode> in percents to each panel to
              specify the initial size of it. Other calculations will be
              incapsulated, you don&#39;t worry about it.
            </li>
            <li>
              add <WuiCode>scrollable=false</WuiCode> prop to a panel to
              eliminate overflow scrolling
            </li>
          </ul>
        </div>
      ),
      props: { WuiResizableContainer, WuiResizablePanel, WuiResizableButton },
      snippet,
      demo: <ResizableContainerBasic />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerResetValuesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerResetValuesHtml,
        },
      ],
      title: 'Horizontal resizing with controlled widths',
      text: (
        <div>
          <p>
            Sometimes it&#39;s necessary to control panel sizes from the
            outside. For example to store sizes in{' '}
            <WuiCode>localStorage</WuiCode> or change the layout with predefined
            sizes. Here is the <WuiCode>onPanelWidthChange</WuiCode> and{' '}
            <WuiCode>size</WuiCode> props for help. If you use such an approach,
            you have to specify an <WuiCode>id</WuiCode> prop for each panel to
            track their sizes.
          </p>

          <WuiCallOut title="Required properties" color="warning">
            <WuiText size="s">
              <p>
                Either <WuiCode>initialSize</WuiCode> or <WuiCode>size</WuiCode>{' '}
                must be specified. The <WuiCode>size</WuiCode> prop is for cases
                where a parent component will control sizing updates.
              </p>
            </WuiText>
          </WuiCallOut>
        </div>
      ),
      props: { WuiResizableContainer, WuiResizablePanel, WuiResizableButton },
      demo: <ResizableContainerResetValues />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerThreePanelsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerThreePanelsHtml,
        },
      ],
      title: 'Horizontal resizing with three panels',
      text: (
        <p>
          The <strong>WuiResizablePanel</strong> and{' '}
          <strong>WuiResizableButton</strong> components can each be used
          multiple times to create a more complex layout.
        </p>
      ),
      props: { WuiResizableContainer, WuiResizablePanel, WuiResizableButton },
      demo: <ResizableContainerThreePanels />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerVericalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerVericalHtml,
        },
      ],
      title: 'Vertical resizing',
      text: (
        <p>
          Set <WuiCode>direction=vertical</WuiCode> on{' '}
          <strong>WuiResizableContainer</strong> to set a vertical orientation
          of the resizable panels.
        </p>
      ),
      props: { WuiResizableContainer, WuiResizablePanel, WuiResizableButton },
      demo: (
        <div className="guideDemo__highlightSpacer">
          <ResizableContainerVertical />
        </div>
      ),
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableResizerSizeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableResizerSizeHtml,
        },
      ],
      title: 'Resizable button spacing',
      text: (
        <div>
          <p>
            You can control the space between panels by modifying the{' '}
            <WuiCode>size</WuiCode> prop of the{' '}
            <strong>WuiResizableButton</strong> component. The available sizes
            are <WuiCode>xl</WuiCode>, <WuiCode>l</WuiCode>,{' '}
            <WuiCode>m</WuiCode>, and <WuiCode>s</WuiCode>. You should avoid
            using different sizes within the same{' '}
            <strong>WuiResizableContainer</strong>, as shown in the demo below.
          </p>
        </div>
      ),
      props: { WuiResizableContainer, WuiResizablePanel, WuiResizableButton },
      demo: <ResizableResizerSize />,
    },
  ],
};
