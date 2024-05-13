import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiBadge,
  WuiCode,
  WuiBetaBadge,
  WuiNotificationBadge,
  WuiBadgeGroup,
  WuiCallOut,
} from '../../../../src/components';
import {
  badgeConfig,
  betaBadgeConfig,
  notificationBadgeConfig,
} from './playground';

import Badge from './badge';

const badgeSource = require('!!raw-loader!./badge');
const badgeHtml = renderToHtml(Badge);
const badgeSnippet = [
  `<WuiBadge>Default</WuiBadge>
`,
  `<WuiBadge color="hollow">Hollow</WuiBadge>
`,
  `<WuiBadge color="primary">Primary</WuiBadge>
`,
  `<WuiBadge color="#BADA55">Custom</WuiBadge>
`,
  `<WuiBadge color="secondary" isDisabled>Disabled</WuiBadge>
`,
];

import BadgeWithIcon from './badge_with_icon';
const badgeWithIconSource = require('!!raw-loader!./badge_with_icon');
const badgeWithIconHtml = renderToHtml(BadgeWithIcon);
const badgeWithIconSnippet = `<WuiBadge color="hollow" iconType="cross" iconSide="right">Label</WuiBadge>
`;

import BadgeButton from './badge_button';
const badgeButtonSource = require('!!raw-loader!./badge_button');
const badgeButtonHtml = renderToHtml(BadgeButton);
const badgeButtonSnippet = [
  `<WuiBadge
  color="primary"
  onClick={onBadgeClick}
  onClickAriaLabel="Aria label applied to text button"
/>
  Clickable text
</WuiBadge>`,
  `<WuiBadge
  iconType="cross"
  iconSide="right"
  color="hollow"
  iconOnClick={onBadgeIconClick}
  iconOnClickAriaLabel="Aria label applied to icon button"
/>
  Text with clickable icon
</WuiBadge>`,
  `<WuiBadge
  iconType="cross"
  iconSide="right"
  color="secondary"
  onClick={onBadgeClick}
  onClickAriaLabel="Aria label applied to text button"
  iconOnClick={onBadgeIconClick}
  iconOnClickAriaLabel="Aria label applied to icon button"
/>
  Clickable text with clickable icon
</WuiBadge>`,
];

import BadgeHealth from './badge_health';
const badgeHealthSource = require('!!raw-loader!./badge_health');
const badgeHealthHtml = renderToHtml(BadgeHealth);
const badgeHealthSnippet = [
  `<WuiBadge color="secondary">Healthy</WuiBadge>
`,
  `<WuiBadge color="warning">Warning</WuiBadge>
`,
  `<WuiBadge color="danger">Critical</WuiBadge>
`,
];

import BadgeHref from './badge_href';
const badgeHrefSource = require('!!raw-loader!./badge_href');
const badgeHrefHtml = renderToHtml(BadgeHref);
const badgeHrefSnippet = ['<WuiBadge href="#" />'];

import BadgeTruncate from './badge_truncate';
const badgeTruncateSource = require('!!raw-loader!./badge_truncate');
const badgeTruncateHtml = renderToHtml(BadgeTruncate);
const badgeTruncateSnippet = [
  `<WuiBadgeGroup gutterSize="s">
  <WuiBadge />
  <WuiBadge />
</WuiBadgeGroup>`,
];

import BetaBadge from './beta_badge';
const betaBadgeSource = require('!!raw-loader!./beta_badge');
const betaBadgeHtml = renderToHtml(BetaBadge);
const betaBadgeSnippet = [
  `<WuiBetaBadge label="Beta" />
`,
  `<WuiBetaBadge label="Lab" tooltipContent="Describe why this is considered beta." />
`,
  `<WuiBetaBadge label="Lab" iconType="beaker" />
`,
];

import NotificationBadge from './notification_badge';
const notificationBadgeSource = require('!!raw-loader!./notification_badge');
const notificationBadgeHtml = renderToHtml(NotificationBadge);
const notificationBadgeSnippet = `<WuiNotificationBadge>3</WuiNotificationBadge>
`;

export const BadgeExample = {
  title: 'Badge',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiBadges</strong> are used to focus on important bits of
          information. Although they will automatically space themselves if you
          use them in a repetitive fashion it is good form to wrap them using a{' '}
          <strong>WuiBadgeGroup</strong> so that they will wrap when width is
          constrained (as seen below).
        </p>
      ),
      props: { WuiBadge },
      snippet: badgeSnippet,
      demo: <Badge />,
    },
    {
      title: 'Badge with Icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeWithIconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeWithIconHtml,
        },
      ],
      text: <p>Badges can use icons on the left and right (default) sides.</p>,
      snippet: badgeWithIconSnippet,
      demo: <BadgeWithIcon />,
    },
    {
      title: 'Badge with onClick events',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeButtonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeButtonHtml,
        },
      ],
      text: (
        <div>
          <p>
            Badges can have <WuiCode>onClick</WuiCode> events applied to the
            badge itself or the icon within the badge. The latter option is
            useful for when you might use badges in other components (like a tag
            system with autocomplete where you need close events).
          </p>
          <WuiCallOut title="onClick with iconOnClick">
            <p>
              When providing both these click handlers,{' '}
              <strong>WuiBadge</strong> must alter the contents so that it does
              not contain nested button tags. Please make note that if you
              provide props other than those explicit to{' '}
              <strong>WuiBadge</strong>, they will always be applied to the main{' '}
              <WuiCode>button</WuiCode> tag which may be inside of the outer
              most tag.
            </p>
          </WuiCallOut>
        </div>
      ),
      snippet: badgeButtonSnippet,
      demo: <BadgeButton />,
    },
    {
      title: 'Badge for health status',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeHealthSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeHealthHtml,
        },
      ],
      text: (
        <div>
          <p>
            Badges can work as health status indicators in places where there
            are a lot of repeated statuses, e.g. in tables.
          </p>
        </div>
      ),
      snippet: badgeHealthSnippet,
      demo: <BadgeHealth />,
    },
    {
      title: 'Badge with href',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeHrefSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeHrefHtml,
        },
      ],
      text: (
        <div>
          <p>
            Badges can also be made to render anchor tags by passing an{' '}
            <WuiCode>href</WuiCode>.
          </p>
        </div>
      ),
      snippet: badgeHrefSnippet,
      demo: <BadgeHref />,
    },
    {
      title: 'Badge groups and truncation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeTruncateSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeTruncateHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Badges, like buttons, will only every be a single line of text. This
            means text will not wrap, but be truncated if the badge&apos;s width
            reaches that of its parent&apos;s.
          </p>
          <p>
            For this reason, badges also auto-apply the inner text of the badge
            to the <WuiCode>title</WuiCode> attribute of the element to provide
            default browser tooltips with the full badge text.
          </p>
          <p>
            To ensure proper wrapping, truncation and spacing of multiple
            badges, it is advisable to wrap them in a{' '}
            <strong>WuiBadgeGroup</strong>.
          </p>
        </Fragment>
      ),
      props: { WuiBadgeGroup },
      demo: <BadgeTruncate />,
      snippet: badgeTruncateSnippet,
    },
    {
      title: 'Beta badge type',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: betaBadgeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: betaBadgeHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <strong>WuiBetaBadge</strong> was created specifically to call
            out modules that are not in GA. Generally the labels used are
            &quot;Beta&quot; or &quot;Lab&quot;. They require an extra{' '}
            <WuiCode>tooltipContent</WuiCode> to describe the purpose of the
            badge. You can pass an optional <WuiCode>title</WuiCode> prop to
            populate the tooltip title or html title attribute but by default it
            will use the <WuiCode>label</WuiCode>.
          </p>
          <p>
            If you pass in an <WuiCode>iconType</WuiCode>, only the icon will be
            used in the badge itself and the label will be applied as the title.
            Only use an icon when attaching the beta badge to small components.
          </p>
          <p>
            They can also be used in conjunction with{' '}
            <Link to="/display/card">
              <strong>WuiCards</strong>
            </Link>{' '}
            and{' '}
            <Link to="/navigation/key-pad-menu">
              <strong>WuiKeyPadMenuItems</strong>
            </Link>
            .
          </p>
        </div>
      ),
      props: { WuiBetaBadge },
      snippet: betaBadgeSnippet,
      demo: <BetaBadge />,
    },
    {
      title: 'Notification badge type',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: notificationBadgeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: notificationBadgeHtml,
        },
      ],
      text: (
        <p>
          Used to showcase the number of notifications, alerts, or hidden
          selections. This badge type is commonly used in the{' '}
          <Link to="/layout/header">
            <strong>WuiHeader</strong>
          </Link>{' '}
          and{' '}
          <Link to="/forms/filter-group">
            <strong>WuiFilterButton</strong>
          </Link>{' '}
          components.
        </p>
      ),
      props: { WuiNotificationBadge },
      snippet: notificationBadgeSnippet,
      demo: <NotificationBadge />,
    },
  ],
  playground: [badgeConfig, betaBadgeConfig, notificationBadgeConfig],
};
