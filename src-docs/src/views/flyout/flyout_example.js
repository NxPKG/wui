import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiFlyout,
  WuiFlyoutBody,
  WuiFlyoutHeader,
  WuiFlyoutFooter,
  WuiCallOut,
} from '../../../../src/components';

import Flyout from './flyout';
const flyoutSource = require('!!raw-loader!./flyout');
const flyoutHtml = renderToHtml(Flyout);

import FlyoutComplicated from './flyout_complicated';
const flyoutComplicatedSource = require('!!raw-loader!./flyout_complicated');
const flyoutComplicatedHtml = renderToHtml(FlyoutComplicated);

import FlyoutSmall from './flyout_small';
const flyoutSmallSource = require('!!raw-loader!./flyout_small');
const flyoutSmallHtml = renderToHtml(FlyoutSmall);

import FlyoutLarge from './flyout_large';
const flyoutLargeSource = require('!!raw-loader!./flyout_large');
const flyoutLargeHtml = renderToHtml(FlyoutLarge);

import FlyoutMaxWidth from './flyout_max_width';
const flyoutMaxWidthSource = require('!!raw-loader!./flyout_max_width');
const flyoutMaxWidthHtml = renderToHtml(FlyoutMaxWidth);

import FlyoutWithBanner from './flyout_banner';
const flyoutWithBannerSource = require('!!raw-loader!./flyout_banner');
const flyoutWithBannerHtml = renderToHtml(FlyoutWithBanner);

const flyOutSnippet = `<WuiFlyout ownFocus onClose={closeFlyout}>
  <WuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <WuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </WuiTitle>
  </WuiFlyoutHeader>
  <WuiFlyoutBody>
    <!-- Flyout body content -->
  </WuiFlyoutBody>
</WuiFlyout>
`;

const flyoutComplicatedSnippet = `<WuiFlyout ownFocus onClose={closeFlyout}>
  <WuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <WuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </WuiTitle>
  </WuiFlyoutHeader>
  <WuiFlyoutBody>
    <!-- Long content can be placed here -->
  </WuiFlyoutBody>
  <WuiFlyoutFooter>
    <WuiFlexGroup justifyContent="spaceBetween">
      <WuiFlexItem grow={false}><!-- FlexItem content --></WuiFlexItem>
      <WuiFlexItem grow={false}><!-- FlexItem content --></WuiFlexItem>
    </WuiFlexGroup>
  </WuiFlyoutFooter>
</WuiFlyout>
`;

const flyoutSmallSnippet = `<WuiFlyout size="s" onClose={closeFlyout}>
  <WuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <WuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </WuiTitle>
  </WuiFlyoutHeader>
  <WuiFlyoutBody>
    <!-- Flyout body content -->
  </WuiFlyoutBody>
</WuiFlyout>
`;

const flyoutMaxWidthSnippet = `<WuiFlyout ownFocus maxWidth={448} onClose={closeFlyout}>
  <WuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <WuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </WuiTitle>
  </WuiFlyoutHeader>
  <WuiFlyoutBody>
    <!-- Flyout body content -->
  </WuiFlyoutBody>
</WuiFlyout>
`;

const flyoutLargeSnippet = `<WuiFlyout ownFocus size="l" onClose={closeFlyout}>
  <WuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <WuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </WuiTitle>
  </WuiFlyoutHeader>
  <WuiFlyoutBody>
    <!-- Flyout body content -->
  </WuiFlyoutBody>
</WuiFlyout>
`;

const flyoutWithBannerSnippet = `<WuiFlyout ownFocus onClose={closeFlyout}>
  <WuiFlyoutHeader hasBorder aria-labelledby={flyoutHeadingId}>
    <WuiTitle>
      <h2 id={flyoutHeadingId}><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
    </WuiTitle>
  </WuiFlyoutHeader>
  <WuiFlyoutBody banner={callOut}>
    <!-- Flyout body content -->
  </WuiFlyoutBody>
</WuiFlyout>
`;

export const FlyoutExample = {
  title: 'Flyout',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flyoutHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>WuiFlyout</strong> is a fixed position panel that pops in
            from the right side of the screen. It should be used any time you
            need to perform quick, individual actions to a larger page or list.
          </p>

          <WuiCallOut
            iconType="accessibility"
            title={
              <>
                Use <WuiCode>{'aria-labelledby={headingId}'}</WuiCode> and{' '}
                <WuiCode>ownFocus</WuiCode> to announce the flyout to screen
                readers when the user opens it.
              </>
            }
          />
        </>
      ),
      props: { WuiFlyout, WuiFlyoutHeader, WuiFlyoutBody },
      snippet: flyOutSnippet,
      demo: <Flyout />,
    },
    {
      title: 'More complicated flyout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutComplicatedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flyoutComplicatedHtml,
        },
      ],
      text: (
        <p>
          In this example we use <strong>WuiFlyoutHeader</strong> and{' '}
          <strong>WuiFlyoutFooter</strong> to allow for fixed position
          navigation and actions within a flyout. Note that any content within{' '}
          <strong>WuiFlyoutBody</strong> will automatically overflow.
        </p>
      ),
      props: { WuiFlyoutFooter },
      snippet: flyoutComplicatedSnippet,
      demo: <FlyoutComplicated />,
    },
    {
      title: 'Flyout with banner',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutWithBannerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flyoutWithBannerHtml,
        },
      ],
      text: (
        <p>
          To highlight some information at the top of a flyout, you can use the{' '}
          <WuiCode>banner</WuiCode> prop available in{' '}
          <strong>WuiFlyoutBody</strong>.
        </p>
      ),
      snippet: flyoutWithBannerSnippet,
      demo: <FlyoutWithBanner />,
    },
    {
      title: 'Small flyout, without ownFocus',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutSmallSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flyoutSmallHtml,
        },
      ],
      text: (
        <>
          <p>
            In this example, we set <WuiCode>size</WuiCode> to{' '}
            <WuiCode>s</WuiCode> and remove the <WuiCode>ownFocus</WuiCode>{' '}
            prop. The latter not only removes the focus trap around the flyout,
            but also removes the background overlay that reinforces your
            boundaries.
          </p>
          <WuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <>
                Removing <WuiCode>ownFocus</WuiCode> makes it difficult for
                keyboard-only and screen reader users to navigate to and from
                your flyout.
              </>
            }
          />
        </>
      ),
      snippet: flyoutSmallSnippet,
      demo: <FlyoutSmall />,
    },
    {
      title: 'Large flyout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutLargeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flyoutLargeHtml,
        },
      ],
      text: (
        <p>
          In this example, we set <WuiCode>size</WuiCode> to{' '}
          <WuiCode>l</WuiCode>.
        </p>
      ),
      snippet: flyoutLargeSnippet,
      demo: <FlyoutLarge />,
    },
    {
      title: 'Max width',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flyoutMaxWidthSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flyoutMaxWidthHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            By default, flyouts will continue to grow with the width of the
            window. To stop this growth at an ideal width, set{' '}
            <WuiCode>maxWidth</WuiCode> to <WuiCode>true</WuiCode>, or pass your
            own custom size.
          </p>
          <WuiCallOut
            color="warning"
            title="Note that there are some caveats to providing a maxWidth that is smaller than the minWidth."
          />
        </Fragment>
      ),
      snippet: flyoutMaxWidthSnippet,
      demo: <FlyoutMaxWidth />,
      props: { WuiFlyout },
    },
  ],
};
