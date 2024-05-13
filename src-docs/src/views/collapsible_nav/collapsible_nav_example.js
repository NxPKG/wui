import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiCollapsibleNav,
  WuiText,
  WuiSpacer,
  WuiCallOut,
  WuiCollapsibleNavGroup,
} from '../../../../src/components';

import CollapsibleNav from './collapsible_nav';
const collapsibleNavSource = require('!!raw-loader!./collapsible_nav');
const collapsibleNavHtml = renderToHtml(CollapsibleNav);

import CollapsibleNavGroup from './collapsible_nav_group';
const collapsibleNavGroupSource = require('!!raw-loader!./collapsible_nav_group');
const collapsibleNavGroupHtml = renderToHtml(CollapsibleNavGroup);

import CollapsibleNavList from './collapsible_nav_list';
const collapsibleNavListSource = require('!!raw-loader!./collapsible_nav_list');
const collapsibleNavListHtml = renderToHtml(CollapsibleNavList);

import CollapsibleNavAll from './collapsible_nav_all';
const collapsibleNavAllSource = require('!!raw-loader!./collapsible_nav_all');
const collapsibleNavAllHtml = renderToHtml(CollapsibleNavAll);

export const CollapsibleNavExample = {
  title: 'Collapsible nav',
  intro: (
    <WuiText>
      <p>
        This is a high level component that creates a flyout-style navigational
        pane. It is the next evolution of{' '}
        <Link to="/layout/nav-drawer">
          <strong>WuiNavDrawer</strong>
        </Link>{' '}
        which will be deprecated soon.
      </p>
      <WuiSpacer size="m" />
    </WuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: collapsibleNavHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>WuiCollapsibleNav</strong> is a similar implementation to{' '}
            <Link to="/layout/flyout">
              <strong>WuiFlyout</strong>
            </Link>
            ; the visibility of which must be maintained by the consuming
            application. An extra feature that it provides is the ability to{' '}
            <WuiCode>dock</WuiCode> the flyout. This affixes the flyout to the
            window and pushes the body content by adding left side padding.
          </p>
          <WuiCallOut
            iconType="tableOfContents"
            title="Docking is not possible on small screens because it would force less real estate for the page content."
          />
        </>
      ),
      props: { WuiCollapsibleNav },
      demo: <CollapsibleNav />,
      snippet: `<WuiCollapsibleNav
  button={<WuiButton onClick={() => setNavIsOpen(!navIsOpen)}>Toggle nav</WuiButton>}
  isOpen={navIsOpen}
  isDocked={navIsDocked}
  onClose={() => setNavIsOpen(false)}
/>`,
    },
    {
      title: 'Collapsible nav group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: collapsibleNavGroupHtml,
        },
      ],
      text: (
        <>
          <p>
            An <strong>WuiCollapsibleNavGroup</strong> adds some basic borders
            and <WuiCode>background</WuiCode> color of <WuiCode>none</WuiCode>,{' '}
            <WuiCode>light</WuiCode>, or <WuiCode>dark</WuiCode>. Give each
            section a heading by providing an optional <WuiCode>title</WuiCode>{' '}
            and <WuiCode>iconType</WuiCode>. Make the section collapsible (
            <Link to="/layout/accordion">accordion style</Link>) with{' '}
            <WuiCode language="js">isCollapsible=true</WuiCode>.
          </p>
          <p>
            When in <WuiCode>isCollapsible</WuiCode> mode, a{' '}
            <WuiCode>title</WuiCode> and{' '}
            <WuiCode language="ts">initialIsOpen:boolean</WuiCode> is required.
          </p>
        </>
      ),
      props: {
        WuiCollapsibleNavGroup,
      },
      demo: <CollapsibleNavGroup />,
      snippet: `<WuiCollapsibleNavGroup
  title="Nav group"
  iconType="logo"
  isCollapsible={true}
  initialIsOpen={true}
  background="none"
/>`,
    },
    {
      title: 'Nav groups with lists and other content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavListSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: collapsibleNavListHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>WuiCollapsibleNavGroups</strong> can contain any children.
            They work well with{' '}
            <Link to="/display/list-group">
              <strong>WuiListGroup, WuiPinnableListGroup</strong>
            </Link>{' '}
            and simple{' '}
            <Link to="/navigation/link">
              <strong>WuiText</strong>
            </Link>
            .
          </p>
          <p>Below are a few established patterns to use.</p>
        </>
      ),
      demo: <CollapsibleNavList />,
      snippet: `<WuiCollapsibleNavGroup
  title="Wazuh"
  iconType="logoWazuh"
  isCollapsible={true}
  initialIsOpen={true}>
  <WuiPinnableListGroup
    aria-label="Wazuh"
    listItems={[
      { label: 'Discover' },
      { label: 'Visualize' }
    ]}
    onPinClick={() => {}}
    maxWidth="none"
    color="subdued"
    gutterSize="none"
    size="s"
  />
</WuiCollapsibleNavGroup>`,
    },
    {
      title: 'Full pattern with header and saved pins',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavAllSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: collapsibleNavAllHtml,
        },
      ],
      text: (
        <>
          <h3>Putting it all together</h3>
          <p>
            The button below will launch a full screen example that includes{' '}
            <Link to="/layout/header">
              <strong>WuiHeader</strong>
            </Link>{' '}
            with a toggle button to open an <strong>WuiCollapsibleNav</strong>.
            The contents of which are multiple{' '}
            <strong>WuiCollapsibleNavGroups</strong> and saves the
            open/closed/pinned state for each section and item in local store.
          </p>
          <p>
            This is just a pattern and should be treated as such. Consuming
            applications will need to create the navigation groups according to
            their context and save the states as is appropriate to their data
            store.
          </p>
        </>
      ),
      demo: <CollapsibleNavAll />,
    },
  ],
};
