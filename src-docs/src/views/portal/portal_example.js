import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode, WuiPortal } from '../../../../src/components';

import { Portal } from './portal';
const portalSource = require('!!raw-loader!./portal');
const portalHtml = renderToHtml(Portal);

import { PortalInsert } from './portal_insert';
const portalInsertSource = require('!!raw-loader!./portal_insert');
const portalInsertHtml = renderToHtml(PortalInsert);

export const PortalExample = {
  title: 'Portal',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: portalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: portalHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiPortal</strong> allows you to append its contained children
          onto the document body. It is useful for moving fixed elements like
          modals, tooltips or toasts when you are worried about a z-index or
          overflow conflict.
        </p>
      ),
      components: { WuiPortal },
      demo: <Portal />,
    },
    {
      title: 'Inserting portals',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: portalInsertSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: portalInsertHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            There is an optional <WuiCode>insert</WuiCode> prop that can specify
            the portal&apos;s location in the DOM. When used, it is important to
            consider how the location relates to the component lifecycle, as it
            could be removed from the DOM by another component update.
          </p>
          <p>
            <WuiCode>insert</WuiCode> is an object with two key-value pairs:{' '}
            <WuiCode>sibling</WuiCode> and <WuiCode>position</WuiCode>.
            <WuiCode>sibling</WuiCode> is the React node or HTMLElement to
            insert the portal next to, and <WuiCode>position</WuiCode> specifies
            the portal&apos;s relative position, either{' '}
            <WuiCode>before</WuiCode> or
            <WuiCode>after</WuiCode>.
          </p>
        </React.Fragment>
      ),
      props: { WuiPortal },
      demo: <PortalInsert />,
    },
  ],
};
