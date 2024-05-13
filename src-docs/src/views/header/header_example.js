import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import lightColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss';

import {
  WuiHeader,
  WuiHeaderAlert,
  WuiHeaderBreadcrumbs,
  WuiHeaderSection,
  WuiHeaderSectionItem,
  WuiHeaderSectionItemButton,
  WuiHeaderLogo,
  WuiCode,
  WuiHeaderLinks,
  WuiHeaderLink,
} from '../../../../src/components';

import { WuiHeaderSectionsProp } from './props';

import Header from './header';
const headerSource = require('!!raw-loader!./header');
const headerHtml = renderToHtml(Header);

import HeaderSections from './header_sections';
const headerSectionsSource = require('!!raw-loader!./header_sections');
const headerSectionsHtml = renderToHtml(HeaderSections);

import HeaderPosition from './header_position';
const headerPositionSource = require('!!raw-loader!./header_position');
const headerPositionHtml = renderToHtml(HeaderPosition);

import HeaderAlert from './header_alert';
const headerAlertSource = require('!!raw-loader!./header_alert');
const headerAlertHtml = renderToHtml(HeaderAlert);

import HeaderLinks from './header_links';
const headerLinksSource = require('!!raw-loader!./header_links');
const headerLinksHtml = renderToHtml(HeaderLinks);

import HeaderDark from './header_dark';
const headerDarkSource = require('!!raw-loader!./header_dark');
const headerDarkHtml = renderToHtml(HeaderDark);

import HeaderStacked from './header_stacked';
const headerStackedSource = require('!!raw-loader!./header_stacked');
const headerStackedHtml = renderToHtml(HeaderStacked);

import HeaderWazuhPattern from './header_pattern';
const headerWazuhPatternSource = require('!!raw-loader!./header_pattern');
const headerWazuhPatternHtml = renderToHtml(HeaderWazuhPattern);

const headerSnippet = `<WuiHeader>
  <WuiHeaderSection grow={false}>
    <WuiHeaderSectionItem border="right">
      <!-- HeaderSectionItem content -->
    </WuiHeaderSectionItem>
  </WuiHeaderSection>

  <!-- You can render breadcrumbs here using WuiHeaderBreadcrumbs -->

  <WuiHeaderSection side="right">
    <WuiHeaderSectionItem>
      <!-- HeaderSectionItem content -->
    </WuiHeaderSectionItem>
  </WuiHeaderSection>
</WuiHeader>`;

const headerSectionsSnippet = `<WuiHeader
  sections={[
    {
      items: [...],
      borders: 'right',
      breadcrumbs: [...],
    },
    {
      items: [...],
      borders: 'none',
    },
    {
      items: [...],
    },
  ]}
/>`;

const headerLinksSnippet = `<WuiHeader>
  <WuiHeaderSectionItem border="right">
    <WuiHeaderLogo
      iconType="iconName"
      href=""
    />
  </WuiHeaderSectionItem>

  <WuiHeaderLinks>
    <WuiHeaderLink href="" isActive>
      <!-- First link -->
    </WuiHeaderLink>

    <WuiHeaderLink href="">
      <!-- Second link -->
    </WuiHeaderLink>
  </WuiHeaderLinks>
</WuiHeader>`;

export const HeaderExample = {
  title: 'Header',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerHtml,
        },
      ],
      text: (
        <p>
          The header is made up of <strong>many</strong> individual components.
        </p>
      ),
      props: {
        WuiHeader,
        WuiHeaderBreadcrumbs,
        WuiHeaderSection,
        WuiHeaderSectionItem,
        WuiHeaderSectionItemButton,
        WuiHeaderLogo,
        WuiHeaderSectionsProp,
      },
      snippet: headerSnippet,
      demo: <Header />,
    },
    {
      title: 'Sections',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerSectionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerSectionsHtml,
        },
      ],
      text: (
        <>
          <p>
            Alternatively, you can pass an array objects to the{' '}
            <WuiCode>sections</WuiCode> props that takes a key of{' '}
            <WuiCode>items</WuiCode> (array of children to wrap in an{' '}
            <strong>WuiHeaderSectionItem</strong>) and/or{' '}
            <WuiCode>breadcrumbs</WuiCode> (array of{' '}
            <Link to="/navigation/breadcrumbs">breadcrumb</Link> objects). Each
            item in the array will be wrapped in an{' '}
            <strong>WuiHeaderSection</strong>.
          </p>
          <p>
            <strong>Note:</strong> Passing <WuiCode>sections</WuiCode> and{' '}
            <WuiCode>children</WuiCode> will disregard the{' '}
            <WuiCode>children</WuiCode> as it is not easily interpreted at what
            location the children should be placed.
          </p>
        </>
      ),
      props: {
        WuiHeader,
        WuiHeaderSectionsProp,
        WuiHeaderSection,
        WuiHeaderSectionItem,
      },
      snippet: headerSectionsSnippet,
      demo: <HeaderSections />,
    },
    {
      title: 'Fixed header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerPositionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerPositionHtml,
        },
      ],
      text: (
        <>
          <p>
            Most consumers need a header that does not scroll away with the page
            contents. You can apply this display by applying the property{' '}
            <WuiCode language="ts">{'position="fixed"'}</WuiCode>. This will
            also add a class of <WuiCode>.wuiBody--headerIsFixed</WuiCode> to
            the window body.
          </p>
          <p>
            You will then need to apply your own padding to this body class to
            afford for the header height. WUI supplies a helper mixin that also
            accounts for this height in flyouts and the collapsible nav. Simply
            add{' '}
            <WuiCode language="scss">@include wuiHeaderAffordForFixed;</WuiCode>{' '}
            anywhere in your SASS.
          </p>
        </>
      ),
      snippet: [
        '<WuiHeader position="fixed" />',
        '@include wuiHeaderAffordForFixed;',
      ],
      demo: <HeaderPosition />,
    },
    {
      title: 'Header links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerLinksSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerLinksHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>WuiHeaderLinks</strong> and <strong>WuiHeaderLink</strong>{' '}
            supply the ability to inline a list of navigational or menu style
            links.
          </p>
          <p>
            <strong>WuiHeaderLinks</strong> comes with responsive functionality
            built-in which will convert the inline list of links to a popover
            list triggered by a <strong>WuiHeaderSectionItemButton</strong>. You
            can adjust at which breakpoints to switch to the popover display by
            passing your own array of named breakpoints to{' '}
            <WuiCode>popoverBreakpoints</WuiCode>.
          </p>
        </>
      ),
      props: {
        WuiHeaderLinks,
        WuiHeaderLink,
      },
      snippet: headerLinksSnippet,
      demo: <HeaderLinks />,
    },
    {
      title: 'Dark theme',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerDarkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerDarkHtml,
        },
      ],
      text: (
        <p>
          To make site-wide navigation more prominent,{' '}
          <strong>WuiHeader</strong> supports reversing the colors to dark theme
          with <WuiCode language="js">{'theme="dark"'}</WuiCode>. However, it
          only supports a <strong>limited set of children</strong> that will
          also shift their theme. These components include{' '}
          <strong>WuiHeaderLogo, WuiHeaderLink(s),</strong>{' '}
          <strong>WuiHeaderSectionItemButton</strong> and{' '}
          <strong>WuiSelectableTemplateSitewide</strong>. Any other content may
          not render correctly without custom configurations.
        </p>
      ),
      snippet: '<WuiHeader theme="dark" />',
      demo: <HeaderDark theme={lightColors} />,
    },
    {
      title: 'Portal content in the header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerAlertSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerAlertHtml,
        },
      ],
      text: (
        <>
          <p>
            Use an <strong>WuiHeaderSectionItemButton</strong> to display
            additional information in <Link to="/layout/popover">popovers</Link>{' '}
            or <Link to="/layout/flyout">flyouts</Link>, such as a user profile
            or news feed. When using{' '}
            <Link to="/layout/flyout">
              <strong>WuiFlyout</strong>
            </Link>
            , be sure to wrap it in a{' '}
            <Link to="/utilities/portal">
              <strong>WuiPortal</strong>
            </Link>
            . When using an{' '}
            <Link to="/layout/popover">
              <strong>WuiPopover</strong>
            </Link>{' '}
            in conjunction with a <strong>fixed</strong> header, be sure to add
            the <WuiCode>repositionOnScroll</WuiCode> prop to the popover.
          </p>
          <p>
            The example below shows how to incorporate{' '}
            <strong>WuiHeaderAlert</strong> components to show a list of
            updates.
          </p>
        </>
      ),
      props: {
        WuiHeaderAlert,
      },
      demo: <HeaderAlert />,
    },
    {
      title: 'Stacked headers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerStackedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerStackedHtml,
        },
      ],
      text: (
        <p>
          Stacking multiple headers provides a great way to separate global
          navigation concerns. However, the{' '}
          <WuiCode language="ts">{'position="fixed"'}</WuiCode> option will not
          be aware of the number of headers. If you do need fixed{' '}
          <strong>and</strong> stacked headers, you will need to apply the SASS
          helper mixin and pass in the correct height to afford for.
        </p>
      ),
      snippet: [
        `<WuiHeader theme="dark" position="fixed" />
<WuiHeader position="fixed" />`,
        '@include wuiHeaderAffordForFixed($wuiHeaderHeightCompensation * 2);',
      ],
      demo: <HeaderStacked />,
    },
    {
      title: 'The Wazuh navigation pattern',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerWazuhPatternSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerWazuhPatternHtml,
        },
      ],
      text: (
        <>
          <h3>Putting it all together</h3>
          <p>
            The button below will launch a full screen example that includes two{' '}
            <strong>WuiHeaders</strong> with all the appropriate navigation
            pieces including{' '}
            <Link to="/navigation/collapsible-nav">
              <strong>WuiCollapsibleNav</strong>,
            </Link>{' '}
            <strong>WuiHeaderAlerts</strong>, user menu, deployment switcher,
            space selector, <strong>WuiHeaderBreadcrumbs</strong> and{' '}
            <strong>WuiHeaderLinks</strong> for app menu items.
          </p>
          <p>
            This is just a pattern and should be treated as such. Consuming
            applications will need to recreate the pattern according to their
            context and save the states as is appropriate to their data store.
          </p>
        </>
      ),
      demo: <HeaderWazuhPattern theme={lightColors} />,
    },
  ],
};
