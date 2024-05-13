import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode, WuiLink } from '../../../../src/components';

import linkConfig from './playground';

import Link from './link';
import { LinkDisable } from './link_disable';
import { LinkValidation } from './link_validation';

const linkSource = require('!!raw-loader!./link');
const linkHtml = renderToHtml(Link);

const linkDisableSource = require('!!raw-loader!./link_disable');
const linkDisableHtml = renderToHtml(LinkDisable);

const linkValidationSource = require('!!raw-loader!./link_validation');
const linkValidationHtml = renderToHtml(LinkValidation);

const linkSnippet = [
  `<WuiLink href="#"><!-- Link text --></WuiLink>
`,
  `<WuiLink href="#" color="secondary">
  <!-- Colored link text -->
</WuiLink>
`,
];

export const LinkExample = {
  title: 'Link',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: linkHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiLink</strong> will apply the correct styling onto links and
          make sure they are accessible. Links can be passed a color. Note that
          the <WuiCode>ghost</WuiCode> type should only be used on dark
          backgrounds (regardless of theming). It will always create a white
          link.
        </p>
      ),
      props: { WuiLink },
      snippet: linkSnippet,
      demo: <Link />,
    },
    {
      title: 'Disabled links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkDisableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: linkDisableHtml,
        },
      ],
      text: (
        <p>
          When an <strong>WuiLink</strong> is passed an{' '}
          <WuiCode>onClick</WuiCode> method, and is not passed an{' '}
          <WuiCode>href</WuiCode>, it can optionally be set to
          <WuiCode>disabled</WuiCode> which disables the click behavior, and
          removes the link styling.
        </p>
      ),
      props: { WuiLink },
      demo: <LinkDisable />,
    },
    {
      title: 'Link validation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkValidationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: linkValidationHtml,
        },
      ],
      text: (
        <p>
          To make links more secure for users, <strong>WuiLink</strong> and
          other components that accept an <WuiCode>href</WuiCode> prop become
          disabled if that <WuiCode>href</WuiCode> uses the{' '}
          <WuiCode>javascript:</WuiCode> protocol. This helps protect consuming
          applications from cross-site scripting (XSS) attacks and mirrors
          React&apos;s{' '}
          <WuiLink
            href="https://github.com/facebook/react/blob/940f48b999a3131e77b2545bd7ae252ef27ae6d1/packages/react-dom/src/shared/sanitizeURL.js#L37"
            target="_blank">
            planned behavior
          </WuiLink>{' '}
          to prevent rendering of <WuiCode>javascript:</WuiCode> links.
        </p>
      ),
      demo: <LinkValidation />,
    },
  ],
  playground: linkConfig,
};
