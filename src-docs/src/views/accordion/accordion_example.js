import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiAccordion,
  WuiCode,
  WuiCallOut,
  WuiSpacer,
} from '../../../../src/components';

import { accordionConfig } from './playground';

import Accordion from './accordion';
const accordionSource = require('!!raw-loader!./accordion');
const accordionHtml = renderToHtml(Accordion);
const accordionSnippet = `<WuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  >
    <!-- Content to show when expanded -->
</WuiAccordion>
`;

import AccordionArrow from './accordion_arrow';
const accordionArrowSource = require('!!raw-loader!./accordion_arrow');
const accordionArrowHtml = renderToHtml(AccordionArrow);
const accordionArrowSnippet = `<WuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  arrowDisplay="right"
  >
    <!-- Content to show when expanded -->
</WuiAccordion>
`;

import AccordionMultiple from './accordion_multiple';
const accordionMultipleSource = require('!!raw-loader!./accordion_multiple');
const accordionMultipleHtml = renderToHtml(AccordionMultiple);
const accordionMultipleSnippet = `<WuiAccordion
  id={accordionId}
  buttonContent="Clickable title for first item"
  paddingSize="l"
  >
    <!-- Content to show when expanded -->
</WuiAccordion>
<WuiSpacer />
<WuiAccordion
  id={accordionId}
  buttonContent="Clickable title for second item"
  paddingSize="l"
  >
    <!-- Content to show when expanded -->
</WuiAccordion>
`;

import AccordionForm from './accordion_form';
const accordionFormSource = require('!!raw-loader!./accordion_form');
const accordionFormHtml = renderToHtml(AccordionForm);

import AccordionExtra from './accordion_extra';
const accordionExtraSource = require('!!raw-loader!./accordion_extra');
const accordionExtraHtml = renderToHtml(AccordionExtra);
const accordionExtraSnippet = `<WuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  extraAction={<WuiButton size="s">Extra action!</WuiButton>}
  paddingSize="l"
  >
    <!-- Content to show when expanded -->
</WuiAccordion>
`;

import AccordionOpen from './accordion_open';
const accordionOpenSource = require('!!raw-loader!./accordion_open');
const accordionOpenHtml = renderToHtml(AccordionOpen);
const accordionOpenSnippet = `<WuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  initialIsOpen={true}
  >
    <!-- Content to show when expanded -->
</WuiAccordion>
`;

import AccordionCallback from './accordion_callback';
const accordionCallbackSource = require('!!raw-loader!./accordion_callback');
const accordionCallbackHtml = renderToHtml(AccordionCallback);
const accordionCallbackSnippet = `<WuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  onToggle={isOpen => handleOnToggle(isOpen)}
  >
    <!-- Content to show when expanded -->
</WuiAccordion>
`;

import AccordionGrow from './accordion_grow';
const accordionGrowSource = require('!!raw-loader!./accordion_grow');
const accordionGrowHtml = renderToHtml(AccordionGrow);

import AccordionForceState from './accordion_forceState';
const accordionForceStateSource = require('!!raw-loader!./accordion_forceState');
const accordionForceStateHtml = renderToHtml(AccordionForceState);
const accordionForceStateSnippet = `<WuiAccordion
  id={accordionId}
  forceState="open"
  buttonContent="Controlled via outside prop">
    <!-- Content to show when expanded -->
</WuiAccordion>`;

import AccordionIsLoading from './accordion_isLoading';
const accordionIsLoadingSource = require('!!raw-loader!./accordion_isLoading');
const accordionIsLoadingHtml = renderToHtml(AccordionIsLoading);
const accordionIsLoadingSnippet = [
  `<WuiAccordion
  id={accordionId}
  isLoading
  >
    <!-- Content to show when expanded -->
</WuiAccordion>
`,
  `<WuiAccordion
  id={accordionId}
  isLoading
  isLoadingMessage={customMessage}
  >
  <!-- Content that will be replaced by isLoadingMessage -->
</WuiAccordion>`,
];

export const AccordionExample = {
  title: 'Accordion',
  intro: (
    <Fragment>
      <WuiCallOut title="Take care including flex group content within accordions">
        <p>
          <strong>WuiFlexGroup</strong>&apos;s negative margins can sometimes
          create scrollbars within <strong>WuiAccordion</strong> because of the
          overflow tricks used to hide content. If you run into this issue make
          sure your <WuiCode>paddingSize</WuiCode> prop is large enough to
          account for the <WuiCode>gutterSize</WuiCode> of any nested flex
          groups.
        </p>
      </WuiCallOut>

      <WuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Unstyled',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiAccordion</strong> has been purposely designed with
            minimal styles, allowing you to visually enhance it as needed (see
            the accordion form example). The only styling enforced by WUI is the
            caret icon, which indicates to users that the item can be opened.
          </p>
          <p>
            A <WuiCode>buttonContent</WuiCode> prop defines the content of the
            clickable area. On click it will expose the children and animate
            based on the height of those children.
          </p>
          <p>
            For styling needs, classes can be individually applied with{' '}
            <WuiCode>className</WuiCode> (for the entire accordion), and{' '}
            <WuiCode>buttonClassName</WuiCode> (for the clickable area).
          </p>
        </div>
      ),
      props: { WuiAccordion },
      snippet: accordionSnippet,
      demo: <Accordion />,
    },
    {
      title: 'Arrow display',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionArrowSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionArrowHtml,
        },
      ],
      text: (
        <div>
          <p>
            The arrow helps indicate the current state of the accordion (open or
            not) and points to the main triggering button text. If you must hide
            or change the side in which the arrow appears, use{' '}
            <WuiCode>arrowDisplay: &apos;right&apos;</WuiCode> or{' '}
            <WuiCode>&apos;none&apos;</WuiCode>
          </p>
        </div>
      ),
      snippet: accordionArrowSnippet,
      demo: <AccordionArrow />,
    },
    {
      title: 'Multiple accordions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionMultipleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionMultipleHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use any number of <strong>WuiAccordion</strong> elements to visually
            display them as a group.
          </p>
          <p>
            Due to the previously mentioned bare styles, it is recommended to
            place an{' '}
            <Link to="/layout/spacer">
              <strong>WuiSpacer</strong>
            </Link>{' '}
            between accordion items. Padding within each accordion item can be
            applied via the <WuiCode>paddingSize</WuiCode> prop.
          </p>
        </div>
      ),
      snippet: accordionMultipleSnippet,
      demo: <AccordionMultiple />,
    },
    {
      title: 'Accordion can have extra actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionExtraSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionExtraHtml,
        },
      ],
      text: (
        <p>
          Use the <WuiCode>extraAction</WuiCode> prop to pass an extra action
          displayed on the right of any accordion. Usually this is a delete or
          button, but can be anything. Note that this action is separate from
          the click state that expands the accordion. This is needed to make it
          accessible.
        </p>
      ),
      snippet: accordionExtraSnippet,
      demo: <AccordionExtra />,
    },
    {
      title: 'Accordion can be opened on initial render',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionOpenSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionOpenHtml,
        },
      ],
      text: (
        <p>
          Use the <WuiCode>initialIsOpen</WuiCode> prop to open the accordion
          when first rendered.
        </p>
      ),
      snippet: accordionOpenSnippet,
      demo: <AccordionOpen />,
    },
    {
      title: 'Accordion can call a function on open and close',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionCallbackSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionCallbackHtml,
        },
      ],
      text: (
        <p>
          Use the <WuiCode>onToggle</WuiCode> prop to pass a callback method
          that will be called on open and close.
        </p>
      ),
      snippet: accordionCallbackSnippet,
      demo: <AccordionCallback />,
    },

    {
      title: 'Accordion content can dynamically change height',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionGrowSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionGrowHtml,
        },
      ],
      text: (
        <p>
          If an accordion&rsquo;s content changes height while the accordion is
          open, it will resize dynamically.
        </p>
      ),
      demo: <AccordionGrow />,
    },
    {
      title: 'Accordion for forms',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionFormSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionFormHtml,
        },
      ],
      text: (
        <p>
          Putting it all together. Using the <WuiCode>classNames</WuiCode>
          and <WuiCode>extraAction</WuiCode> as explained above, we can style
          the accordion in a way common for form use.
        </p>
      ),
      demo: <AccordionForm />,
    },
    {
      title: 'External state control',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionForceStateSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionForceStateHtml,
        },
      ],
      text: (
        <p>
          Use the <WuiCode>forceState</WuiCode> prop to control open and close
          state. The <WuiCode>onToggle</WuiCode> callback prop can still be used
          to update external state or perform side effects.
        </p>
      ),
      snippet: accordionForceStateSnippet,
      demo: <AccordionForceState />,
    },
    {
      title: 'Loading accordion',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionIsLoadingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionIsLoadingHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use the <WuiCode>isLoading</WuiCode> prop when not all of the
            accordion&apos;s content is ready yet. When using{' '}
            <WuiCode>isLoading</WuiCode>, the content of{' '}
            <WuiCode>extraAction</WuiCode> is replaced with a loading spinner.
          </p>
          <p>
            Manage the behavior of the accordion&apos;s content using{' '}
            <WuiCode>isLoadingMessage</WuiCode>. By default
            <WuiCode>isLoadingMessage</WuiCode> is set to false and the content
            will remain unaltered. Set <WuiCode>isLoadingMessage</WuiCode> to
            true to show the default loading message or pass a node to show a
            custom loading message.
          </p>
        </div>
      ),
      snippet: accordionIsLoadingSnippet,
      demo: <AccordionIsLoading />,
    },
  ],
  playground: accordionConfig,
};
