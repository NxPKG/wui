import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCallOut,
  WuiCode,
  WuiLink,
  WuiKeyboardAccessible,
  WuiSkipLink,
  WuiScreenReaderOnly,
} from '../../../../src/components';

import KeyboardAccessible from './keyboard_accessible';
import ScreenReaderOnly from './screen_reader';
import SkipLink from './skip_link';

const keyboardAccessibleSource = require('!!raw-loader!./keyboard_accessible');
const keyboardAccessibleHtml = renderToHtml(KeyboardAccessible);
const keyboardAccessibleSnippet = `<WuiKeyboardAccessible>
  <!-- interactive child element -->
</WuiKeyboardAccessible>`;

const screenReaderOnlyHtml = renderToHtml(ScreenReaderOnly);
const screenReaderOnlySource = require('!!raw-loader!./screen_reader');
const screenReaderOnlySnippet = [
  `<WuiScreenReaderOnly>
  <!-- visually hidden content -->
</WuiScreenReaderOnly>
`,
  `<WuiScreenReaderOnly showOnFocus>
  <!-- visually hidden content, displayed on focus -->
</WuiScreenReaderOnly>
`,
];

const skipLinkHtml = renderToHtml(SkipLink);
const skipLinkSource = require('!!raw-loader!./skip_link');
const skipLinkSnippet = [
  `<WuiSkipLink destinationId="myAnchorId">
  Skip to content
</WuiSkipLink>
`,
  `<WuiSkipLink destinationId="myAnchorId" position="fixed">
  Skip to main content
</WuiSkipLink>
`,
];

export const AccessibilityExample = {
  title: 'Accessibility',
  sections: [
    {
      title: 'Keyboard accessible',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyboardAccessibleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: keyboardAccessibleHtml,
        },
      ],
      text: (
        <p>
          You can make interactive elements keyboard-accessible with the{' '}
          <strong>WuiKeyboardAccessible</strong> component. This is necessary
          for non-button elements and <WuiCode>a</WuiCode> tags without{' '}
          <WuiCode>href</WuiCode> attributes.
        </p>
      ),
      props: { WuiKeyboardAccessible },
      snippet: keyboardAccessibleSnippet,
      demo: <KeyboardAccessible />,
    },
    {
      title: 'Screen reader only',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: screenReaderOnlySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: screenReaderOnlyHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use the <strong>WuiScreenReaderOnly</strong> component to visually
            hide elements while still allowing them to be read by screen
            readers. In certain cases, you may want to use the{' '}
            <WuiCode>showOnFocus</WuiCode> prop to display screen reader-only
            content when in focus.
          </p>
          <WuiCallOut
            color="warning"
            iconType="accessibility"
            title="WebAIM recommendation for screen reader-only content">
            <p>
              &quot;In most cases, if content (particularly content that
              provides functionality or interactivity) is important enough to
              provide to screen reader users, it should probably be made
              available to all users.&quot;{' '}
              <WuiLink
                href="http://webaim.org/techniques/css/invisiblecontent/"
                external>
                Learn more about invisible content
              </WuiLink>
            </p>
          </WuiCallOut>
        </div>
      ),
      props: {
        WuiScreenReaderOnly,
      },
      snippet: screenReaderOnlySnippet,
      demo: <ScreenReaderOnly />,
    },
    {
      title: 'Skip link',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skipLinkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: skipLinkHtml,
        },
      ],
      text: (
        <p>
          The <strong>WuiSkipLink</strong> component allows users to bypass
          navigation, or ornamental elements, and quickly reach the main content
          of the page.
        </p>
      ),
      props: { WuiSkipLink },
      snippet: skipLinkSnippet,
      demo: <SkipLink />,
    },
  ],
};
