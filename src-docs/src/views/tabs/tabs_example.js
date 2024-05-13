import React from 'react';
import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiTabs,
  WuiTab,
  WuiTabbedContent,
} from '../../../../src/components';
import { tabConfig } from './playground';

import Tabs from './tabs';
const tabsSource = require('!!raw-loader!./tabs');
const tabsHtml = renderToHtml(Tabs);

import TabsCondensed from './tabs_condensed';
const tabsCondensedSource = require('!!raw-loader!./tabs_condensed');
const tabsCondensedHtml = renderToHtml(TabsCondensed);

import TabbedContent from './tabbed_content';
const tabbedContentSource = require('!!raw-loader!./tabbed_content');
const tabbedContentHtml = renderToHtml(TabbedContent);

import Controlled from './controlled';
const controlledSource = require('!!raw-loader!./controlled');
const controlledHtml = renderToHtml(Controlled);
const controlledSnippet = `<WuiTabbedContent
  tabs={tabs}
  selectedTab={selectedTab}
  onTabClick={onTabClick}
/>
`;

export const TabsExample = {
  title: 'Tabs',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tabsHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiTabs</strong> allow a <WuiCode>size</WuiCode> prop. In
          general you should always use the default size, but in rare cases
          (like putting tabs within a popover of other small menu) it is OK to
          use the smaller sizing.
        </p>
      ),
      props: {
        WuiTabs,
        WuiTab,
      },
      demo: <Tabs />,
      snippet: `<WuiTabs>
  <WuiTab onClick={onClick}>Example 1</WuiTab>
  <WuiTab onClick={onClick}>Example 2</WuiTab>
</WuiTabs>`,
    },
    {
      title: 'Condensed tabs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabsCondensedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tabsCondensedHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiTabs</strong> allow a <WuiCode>display</WuiCode> prop. In
          general you should always use the default display. However, it is
          acceptable to use the alternative <WuiCode>condensed</WuiCode> display
          in situations where it is desirable to display a bolder, more compact
          and borderless tab interface (for use as primary navigation within
          your application or to establish a higher level hierarchy of tabs).
        </p>
      ),
      props: {
        WuiTabs,
      },
      demo: <TabsCondensed />,
      snippet: `<WuiTabs display="condensed">
  <WuiTab onClick={onClick}>Example 1</WuiTab>
  <WuiTab onClick={onClick}>Example 2</WuiTab>
</WuiTabs>`,
    },
    {
      title: 'Tabbed content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabbedContentSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tabbedContentHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiTabbedContent</strong> makes it easier to associate tabs
          with content based on the selected tab. Use the{' '}
          <WuiCode>initialSelectedTab</WuiCode> prop to specify which tab to
          initially select.
        </p>
      ),
      props: {
        WuiTabbedContent,
      },
      demo: <TabbedContent />,
      snippet: `<WuiTabbedContent
  tabs={[
    {
      id: 'example1',
      name: 'Example 1',
      content: 'Example 1 content.',
    },
    {
      id: 'example2',
      name: 'Example 2',
      content: 'Example 2 content.',
    },
  ]}
/>`,
    },
    {
      title: 'Controlled tabbed content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlledSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: controlledHtml,
        },
      ],
      text: (
        <p>
          You can also use the <WuiCode>selectedTab</WuiCode> and{' '}
          <WuiCode>onTabClick</WuiCode> props to take complete control over tab
          selection. This can be useful if you want to change tabs based on user
          interaction with another part of the UI.
        </p>
      ),
      props: {
        WuiTabbedContent,
      },
      snippet: controlledSnippet,
      demo: <Controlled />,
    },
  ],
  playground: tabConfig,
};
