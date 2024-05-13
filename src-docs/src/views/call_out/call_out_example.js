import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCallOut,
  WuiText,
  WuiSpacer,
  WuiCode,
} from '../../../../src/components';
import callOutConfig from './playground';

import Info from './info';
const infoSource = require('!!raw-loader!./info');
const infoHtml = renderToHtml(Info);
const infoSnippet = [
  `<WuiCallOut size="m" title="Just a title. No content." iconType="gear" />
`,
  `<WuiCallOut
  size="s"
  title="A beautiful title"
  iconType="search">
  <p><!-- Content --></p>
</WuiCallOut>
`,
];

import Success from './success';
const successSource = require('!!raw-loader!./success');
const successHtml = renderToHtml(Success);
const successSnippet = [
  `<WuiCallOut title="Good news, everyone!" color="success" iconType="user">
  <p><!-- Content --></p>
</WuiCallOut>
`,
];

import Warning from './warning';
const warningSource = require('!!raw-loader!./warning');
const warningHtml = renderToHtml(Warning);
const warningSnippet = [
  `<WuiCallOut title="Proceed with caution!" color="warning" iconType="help">
  <p><!-- Content --></p>
</WuiCallOut>
`,
];

import Danger from './danger';
const dangerSource = require('!!raw-loader!./danger');
const dangerHtml = renderToHtml(Danger);
const dangerSnippet = [
  `<WuiCallOut title="Sorry, there was an error" color="danger" iconType="alert">
  <p><!-- Content --></p>
</WuiCallOut>
`,
];

export const CallOutExample = {
  title: 'Callout',
  intro: (
    <Fragment>
      <WuiText>
        <p>
          <strong>WuiCallOut</strong> contains a message directly related to
          content on the page. This includes general information, success,
          warning, and error messages.
        </p>
        <p>
          <strong>Keep these guidelines in mind:</strong>
        </p>
        <ul>
          <li>Minimize the number of callouts per page.</li>
          <li>
            Stack callouts in the order in which they require users&apos;
            attention: error, warning, info, and then success.
          </li>
          <li>
            Offer only one action per callout and ensure it&apos;s an action
            users can perform quickly.
          </li>
          <li>
            If the callout has a permanent spot in the UI, but needs to be less
            obstructive, set the <WuiCode>size</WuiCode> property to{' '}
            <WuiCode>s</WuiCode> (small).
          </li>
          <li>
            Use an <WuiCode>icon</WuiCode> prop if it adds context.
          </li>
        </ul>
      </WuiText>
      <WuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Info',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: infoSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: infoHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use <strong>WuiCallOut</strong> to communicate general information
            to the user.
          </p>
        </div>
      ),
      props: { WuiCallOut },
      snippet: infoSnippet,
      demo: <Info />,
    },
    {
      title: 'Success',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: successSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: successHtml,
        },
      ],
      text: (
        <p>
          Use this callout to notify the user of an action that succesfully
          completed. Use success callouts sparingly&mdash;callouts are typically
          used for things that are broken rather than things that succeed.
        </p>
      ),
      snippet: successSnippet,
      demo: <Success />,
    },
    {
      title: 'Warning',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: warningSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: warningHtml,
        },
      ],
      text: (
        <p>
          Use this callout to warn the user against decisions they might regret.
        </p>
      ),
      snippet: warningSnippet,
      demo: <Warning />,
    },
    {
      title: 'Danger',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dangerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dangerHtml,
        },
      ],
      text: (
        <p>Use this callout to let the user know that something went wrong.</p>
      ),
      snippet: dangerSnippet,
      demo: <Danger />,
    },
  ],
  playground: callOutConfig,
};
