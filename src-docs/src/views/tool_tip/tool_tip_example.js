import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCallOut,
  WuiCode,
  WuiToolTip,
  WuiIconTip,
  WuiSpacer,
  WuiText,
  WuiTitle,
} from '../../../../src/components';
import toolTipConfig from './playground';

import ToolTip from './tool_tip';
const toolTipSource = require('!!raw-loader!./tool_tip');
const toolTipHtml = renderToHtml(ToolTip);
const tooltipSnippet = [
  `<WuiToolTip position="top" content="Tooltip text">
  <!-- An inline element to trigger the tooltip -->
</WuiToolTip>
`,
  `<WuiToolTip title="Tooltip title" content="Tooltip text">
  <!-- An inline element to trigger the tooltip -->
</WuiToolTip>
`,
  `<WuiToolTip content="A tooltip with a long delay" delay="long">
  <!-- An inline element to trigger the tooltip -->
</WuiToolTip>
`,
];

import IconTip from './icon_tip';
const infoTipSource = require('!!raw-loader!./icon_tip');
const infoTipHtml = renderToHtml(IconTip);
const infoTipSnippet = `<WuiIconTip
  content="Tooltip text for the icon"
  position="top"
  type="iInCircle"
/>
`;

export const ToolTipExample = {
  title: 'Tooltip',
  intro: (
    <Fragment>
      <WuiCallOut title="WuiToolTip only applies to inline elements">
        <p>
          WuiToolTip wraps its children in a span element, so if you pass in a
          block-level child (e.g. a div) the resulting DOM will be in violation
          of the HTML5 spec.
        </p>
      </WuiCallOut>

      <WuiSpacer size="l" />

      <WuiText>
        Wrap <strong>WuiToolTip</strong> around any item that you need a tooltip
        for. The <WuiCode>position</WuiCode> prop will take a suggested
        position, but will change it if the tooltip gets too close to the edge
        of the screen.
      </WuiText>

      <WuiSpacer size="l" />

      <WuiTitle size="xs">
        <h2>Applying tooltips to custom components</h2>
      </WuiTitle>

      <WuiSpacer size="s" />

      <WuiText>
        Internally, <strong>WuiToolTip</strong> applies{' '}
        <WuiCode>onFocus</WuiCode>, <WuiCode>onBlur</WuiCode>,{' '}
        <WuiCode>onMouseOver</WuiCode>, and <WuiCode>onMouseOut</WuiCode> props
        to whatever you pass as <WuiCode>children</WuiCode>. If you pass in a
        custom component, then you&rsquo;ll need to make sure these props are
        applied to the root element rendered by your component. The best way to
        do that is to follow{' '}
        <a href="https://github.com/wazuh/wui/blob/master/wiki/component-design.md#pass-through-props">
          WUI&rsquo;s guidelines on pass-through props
        </a>
        .
      </WuiText>

      <WuiSpacer size="l" />

      <WuiCallOut
        iconType="accessibility"
        color="warning"
        title={
          <>
            Anchoring a tooltip to a non-interactive element makes it difficult
            for keyboard-only and screen reader users to read.
          </>
        }
      />

      <WuiSpacer size="l" />

      <WuiCallOut
        iconType="accessibility"
        color="warning"
        title={
          <>
            Putting anything other than plain text in a tooltip is lost on
            screen readers. Consider switching to{' '}
            <Link to="/layout/popover">
              <strong>WuiPopover</strong>
            </Link>{' '}
            if you need more content inside a tooltip.
          </>
        }
      />

      <WuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: toolTipSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: toolTipHtml,
        },
      ],

      props: { WuiToolTip },
      snippet: tooltipSnippet,
      demo: <ToolTip />,
    },
    {
      title: 'IconTip',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: infoTipSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: infoTipHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can use <strong>WuiIconTip</strong> to explain options, other
            controls, or entire parts of the user interface. When possible,
            surface explanations inline within the UI, and only hide them behind
            a <strong>WuiIconTip</strong> as a last resort.
          </p>
          <p>
            It accepts all the same props as <strong>WuiToolTip</strong>. For
            convenience, you can also specify optional icon{' '}
            <WuiCode>size</WuiCode>, <WuiCode>type</WuiCode>, and
            <WuiCode>color</WuiCode> props.
          </p>
        </Fragment>
      ),
      props: { WuiToolTip, WuiIconTip },
      snippet: infoTipSnippet,
      demo: <IconTip />,
    },
  ],
  playground: toolTipConfig,
};
