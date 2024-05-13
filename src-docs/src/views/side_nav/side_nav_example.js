import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode, WuiSideNav } from '../../../../src/components';

import SideNav from './side_nav';
const sideNavSource = require('!!raw-loader!./side_nav');
const sideNavHtml = renderToHtml(SideNav);
const sideNavSnippet = `<WuiSideNav
  mobileTitle="Navbar Items"
  toggleOpenOnMobile={toggleOpenOnMobile}
  isOpenOnMobile={isSideNavOpenOnMobile}
  items={[
    {
      name: 'Wazuh',
      id: 0,
      items: [
        {
          name: 'Advanced settings',
          id: 1,
          onClick: () => selectItem('Advanced settings'),
        },
        {
          name: 'Index Patterns (link)',
          id: 2,
          href: '#',
        },
      ]
    }
  ]}
/>
`;

import SideNavComplex from './side_nav_complex';
const sideNavComplexSource = require('!!raw-loader!./side_nav_complex');
const sideNavComplexHtml = renderToHtml(SideNavComplex);
const sideNavComplexSnippet = `<WuiSideNav
  mobileTitle="Navbar Items"
  toggleOpenOnMobile={toggleOpenOnMobile}
  isOpenOnMobile={isSideNavOpenOnMobile}
  items={[
    {
      name: 'Wazuh',
      icon: <WuiIcon type="logoWazuh" />,
      id: '0',
      items: [
        {
          name: 'Data source',
          id: '0.1',
          onClick: () => selectItem('Data source'),
        },
        {
          name: 'Users',
          id: '0.2',
          href: '#',
        },
      ],
    },
    {
      name: 'Wazuh',
      icon: <WuiIcon type="logoWazuh" />,
      id: '1',
      items: [
        {
          name: 'Advanced settings',
          id: '1.1',
          onClick: () => selectItem('Advanced settings'),
          items: [
            {
              name: 'General',
              id: '1.1.1',
              onClick: () => selectItem('General'),
            },
            {
              name: 'Timelion',
              id: '1.1.2',
              onClick: () => selectItem('Timelion'),
              items: [
                {
                  name: 'Time Stuff',
                  id: '1.1.2.1',
                  onClick: () => selectItem('Time Stuff'),
                },
                {
                  name: 'Lion Stuff',
                  id: '1.1.2.2',
                  onClick: () => selectItem('Lion Stuff'),
                  isSelected: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ]}
/>
`;

import SideNavForceOpen from './side_nav_force_open';
const sideNavForceOpenSource = require('!!raw-loader!./side_nav_force_open');
const sideNavForceOpenHtml = renderToHtml(SideNavForceOpen);
const sideNavForceSnippet = `<WuiSideNav
  mobileTitle="Navbar Items"
  toggleOpenOnMobile={toggleOpenOnMobile}
  isOpenOnMobile={isSideNavOpenOnMobile}
  items={[
    {
      name: 'Wazuh',
      id: '1',
      items: [
        {
          name: 'Wazuh',
          id: '1',
          items: [
            {
              name: 'Forced open items',
              id: '0.1',
              onClick: () => selectItem('Forced open items'),
              forceOpen: true,
              items: [
                {
                  name: 'General',
                  id: '0.1.1',
                  onClick: () => selectItem('General'),
                },
                {
                  name: 'Timelion',
                  id: '0.1.2',
                  onClick: () => selectItem('Timelion'),
                },
              ],
            },
            {
              name: 'Closed items',
              id: '1.1',
              onClick: () => selectItem('Closed items'),
              forceOpen: false,
              items: [
                {
                  name: 'General',
                  id: '1.1.1',
                  onClick: () => this.selectItem('General'),
                },
                {
                  name: 'Timelion',
                  id: '1.1.2',
                  onClick: () => selectItem('Timelion'),
                },
              ],
            },
          ],
        },
      ],
    },
  ]}
/>
`;

import { SideNavItem } from './props';

export const SideNavExample = {
  title: 'Side nav',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: sideNavHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiSideNav</strong> is a responsive menu system that usually
            sits on the left side of a page layout. It will expand to the width
            of its container. This is the menu that is used on the left side of
            the page you are currently looking at.
          </p>

          <p>
            Configure the content of a <strong>WuiSideNav</strong> by passing in
            an <WuiCode>items</WuiCode> prop. Refer to the source code for an
            example of this data structure&rsquo;s anatomy.
          </p>
        </div>
      ),
      props: { WuiSideNav, WuiSideNavItem: SideNavItem },
      snippet: sideNavSnippet,
      demo: <SideNav />,
    },
    {
      title: 'Complex side nav',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavComplexSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: sideNavComplexHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiSideNav</strong> also supports deeply-nested tree-based
          data.
        </p>
      ),
      snippet: sideNavComplexSnippet,
      demo: <SideNavComplex />,
    },
    {
      title: 'Forced open side nav',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavForceOpenSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: sideNavForceOpenHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiSideNav</strong> items can be forced open by setting{' '}
          <WuiCode>items[n].forceOpen = true</WuiCode>
        </p>
      ),
      snippet: sideNavForceSnippet,
      demo: <SideNavForceOpen />,
    },
  ],
};
