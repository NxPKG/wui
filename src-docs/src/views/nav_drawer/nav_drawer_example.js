import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiNavDrawer, WuiCode, WuiCallOut } from '../../../../src/components';

import NavDrawer from './nav_drawer';
const navDrawerSource = require('!!raw-loader!./nav_drawer');
const navDrawerHtml = renderToHtml(NavDrawer);
const navDrawerSnippet = `<WuiNavDrawer showToolTips={true}>
  <WuiNavDrawerGroup listItems={navLinks} />
</WuiNavDrawer>`;

export const NavDrawerExample = {
  title: 'Nav drawer',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: navDrawerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: navDrawerHtml,
        },
      ],
      text: (
        <div>
          <p>
            Please use{' '}
            <Link to="/navigation/collapsible-nav">
              <strong>WuiCollapsableNav</strong>
            </Link>{' '}
            instead of <strong>WuiNavDrawer</strong> for your global navigation
            needs. Feature enhancements are no longer being made to this
            component.
          </p>
          <p>
            <strong>WuiNavDrawer</strong> provides a side navigation feature
            that is complete with interactions and a mobile-friendly design. It
            can contain one or more <strong>WuiNavDrawerGroup</strong>{' '}
            components and is designed to be used in conjunction with{' '}
            <Link to="/layout/header">
              <strong>WuiHeader</strong>
            </Link>
            .
          </p>
          <WuiCallOut
            title="Note about displaying flyout menus"
            iconType="iInCircle">
            <p>
              Providing a <WuiCode>flyoutMenu</WuiCode> prop on the{' '}
              <WuiCode>listItems</WuiCode> object of an{' '}
              <strong>WuiNavDrawerGroup</strong> will result in that link
              opening a secondary menu. Note that this will also override the{' '}
              <WuiCode>onClick</WuiCode> event. For more details about other
              props available for the <WuiCode>listItems</WuiCode> object,
              please refer to{' '}
              <Link to="/display/list-group">
                <strong>WuiListGroupItem</strong>
              </Link>
              .
            </p>
          </WuiCallOut>
        </div>
      ),
      snippet: navDrawerSnippet,
      props: {
        WuiNavDrawer,
      },
      demo: <NavDrawer />,
    },
  ],
};
