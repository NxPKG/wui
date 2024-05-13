import React from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode, WuiPanel } from '../../../../src/components';

import { panelConfig } from './playground';

import Panel from './panel';
const panelSource = require('!!raw-loader!./panel');
const panelHtml = renderToHtml(Panel);

import PanelHover from './panel_hover';
const panelHoverSource = require('!!raw-loader!./panel_hover');
const panelHoverHtml = renderToHtml(PanelHover);

import PanelBadge from './panel_badge';
const panelBadgeSource = require('!!raw-loader!./panel_badge');
const panelBadgeHtml = renderToHtml(PanelBadge);

const panelSnippet = `<WuiPanel paddingSize="none">
  <!-- Panel with no padding -->
</WuiPanel>`;

const panelHoverSnippet = `<WuiPanel onClick={handleClick}>
  <!-- Panel with onClick handler -->
</WuiPanel>`;

const panelBadgeSnippet = `<WuiPanel betaBadgeLabel={badgeLabel}>
  <!-- Panel with BetaBadge -->
</WuiPanel>`;

export const PanelExample = {
  title: 'Panel',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiPanel</strong> is a simple wrapper component to add depth
          to a contained layout. It is commonly used as a base for other larger
          components like{' '}
          <Link to="/layout/page">
            <strong>WuiPage</strong>
          </Link>{' '}
          and{' '}
          <Link to="/layout/popover">
            <strong>WuiPopover</strong>
          </Link>
          .
        </p>
      ),
      props: { WuiPanel },
      snippet: panelSnippet,
      demo: <Panel />,
    },
    {
      title: 'Panel can be hoverable',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelHoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelHoverHtml,
        },
      ],
      text: (
        <p>
          Adding an <WuiCode>onClick</WuiCode> handler to the{' '}
          <strong>WuiPanel</strong> will turn the wrapping element into a button
          to allow for interaction.
        </p>
      ),
      snippet: panelHoverSnippet,
      demo: <PanelHover />,
    },
    {
      title: 'Panel beta badges',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelBadgeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelBadgeHtml,
        },
      ],
      text: (
        <p>
          Similar to{' '}
          <Link to="/display/card">
            <strong>WuiCard</strong>
          </Link>
          , panels can also accept an{' '}
          <Link to="/display/badge">
            <strong>WuiBetaBadge</strong>
          </Link>
          .
        </p>
      ),
      snippet: panelBadgeSnippet,
      demo: <PanelBadge />,
    },
  ],
  playground: panelConfig,
};
