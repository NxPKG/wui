import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiInputPopover,
  WuiPopover,
  WuiPopoverTitle,
  WuiPopoverFooter,
  WuiCallOut,
} from '../../../../src/components';

import Popover from './popover';
const popoverSource = require('!!raw-loader!./popover');
const popoverHtml = renderToHtml(Popover);

import TrapFocus from './trap_focus';
const trapFocusSource = require('!!raw-loader!./trap_focus');
const trapFocusHtml = renderToHtml(TrapFocus);

import PopoverAnchorPosition from './popover_anchor_position';
const popoverAnchorPositionSource = require('!!raw-loader!./popover_anchor_position');
const popoverAnchorPositionHtml = renderToHtml(PopoverAnchorPosition);

import PopoverPanelClassName from './popover_panel_class_name';
const popoverPanelClassNameSource = require('!!raw-loader!./popover_panel_class_name');
const popoverPanelClassNameHtml = renderToHtml(PopoverPanelClassName);

import PopoverWithTitle from './popover_with_title';
const popoverWithTitleSource = require('!!raw-loader!./popover_with_title');
const popoverWithTitleHtml = renderToHtml(PopoverWithTitle);

import PopoverWithTitlePadding from './popover_with_title_padding';
const popoverWithTitlePaddingSource = require('!!raw-loader!./popover_with_title_padding');
const popoverWithTitlePaddingHtml = renderToHtml(PopoverWithTitlePadding);

import PopoverHTMLElementAnchor from './popover_htmlelement_anchor';
const popoverHTMLElementAnchorSource = require('!!raw-loader!./popover_htmlelement_anchor');
const popoverHTMLElementAnchorHtml = renderToHtml(PopoverHTMLElementAnchor);

import PopoverContainer from './popover_container';
const popoverContainerSource = require('!!raw-loader!./popover_container');
const popoverContainerHtml = renderToHtml(PopoverContainer);

import PopoverFixed from './popover_fixed';
const popoverFixedSource = require('!!raw-loader!./popover_fixed');
const popoverFixedHtml = renderToHtml(PopoverFixed);

import PopoverBlock from './popover_block';
const popoverBlockSource = require('!!raw-loader!./popover_block');
const popoverBlockHtml = renderToHtml(PopoverBlock);

import InputPopover from './input_popover';
const inputPopoverSource = require('!!raw-loader!./input_popover');
const inputPopoverHtml = renderToHtml(PopoverBlock);

const popOverSnippet = `<WuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}>
  <!-- Popover content -->
</WuiPopover>`;

const trapFocusSnippet = `<WuiPopover
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}>
  <!-- Popover content -->
</WuiPopover>`;

const popoverAnchorSnippet = `<WuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  anchorPosition="downLeft">
  <!-- Popover content -->
</WuiPopover>`;

const popoverWithTitleSnippet = `<WuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}>
  <WuiPopoverTitle><!-- Popover title --></WuiPopoverTitle>
  <div><!-- Popover body --></div>
  <WuiPopoverFooter><!-- Popover footer --></WuiPopoverFooter>
</WuiPopover>`;

const popoverPanelClassNameSnippet = `<WuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  panelClassName="yourClassNameHere"
  panelPaddingSize="none">
  <!-- Content for popover with custom class name and custom padding -->
</WuiPopover>`;

const popoverWithTitlePaddingSnippet = `<WuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  panelPaddingSize="s">
  <WuiPopoverTitle><!-- Popover title --></WuiPopoverTitle>
  <!-- Content for popover with small padding -->
</WuiPopover>`;

const popoverContainerSnippet = `<WuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  container={panel}>
  <!-- Content for popover inside a container -->
</WuiPopover>`;

const popoverFixedSnippet = `<WuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  repositionOnScroll={true}>
  <!-- Content for popover on a fixed element -->
</WuiPopover>`;

const popoverBlockSnippet = `<WuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  display="block">
  <!-- Content for popover with display block anchor -->
</WuiPopover>`;

const inputPopoverSnippet = `<WuiInputPopover
  input={input}
  isOpen={isPopoverOpen}
  closePopover={closePopover}>
  <!-- Popover content attached to input -->
</WuiInputPopover>`;

export const PopoverExample = {
  title: 'Popover',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverHtml,
        },
      ],
      text: (
        <p>
          Use the <strong>WuiPopover</strong> component to hide controls or
          options behind a clickable element.
        </p>
      ),
      props: { WuiPopover },
      snippet: popOverSnippet,
      demo: <Popover />,
    },
    {
      title: 'Anchor position',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverAnchorPositionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverAnchorPositionHtml,
        },
      ],
      text: (
        <div>
          <p>
            The alignment and arrow on your popover can be set with the{' '}
            <WuiCode>anchorPosition</WuiCode> prop. These positions will not
            update based upon screen real estate and will stick to the positions
            you declare. Because of this,{' '}
            <strong>be careful when using left or right positioning</strong>.
          </p>
          <p>
            <strong>Some tips:</strong>
          </p>
          <ul>
            <li>
              The first word in the <WuiCode>anchorPosition</WuiCode> denotes
              where the popover will appear relative to the button.
            </li>
            <li>
              The second word in the <WuiCode>anchorPosition</WuiCode> denotes
              where the gravity / pin position will appear relative to the
              popover.
            </li>
          </ul>
        </div>
      ),
      snippet: popoverAnchorSnippet,
      demo: <PopoverAnchorPosition />,
    },
    {
      title: 'Popover with title and/or footer',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverWithTitleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverWithTitleHtml,
        },
      ],
      text: (
        <div>
          <p>
            Popovers often need titling. This can be applied through a prop or
            used separately as its own component{' '}
            <strong>WuiPopoverTitle</strong> nested somewhere in the child prop.
          </p>
          <p>
            You can also add a similiarly styled{' '}
            <strong>WuiPopoverFooter</strong> for smaller captions or call to
            action buttons.
          </p>
        </div>
      ),
      props: { WuiPopoverTitle, WuiPopoverFooter },
      demo: <PopoverWithTitle />,
      snippet: popoverWithTitleSnippet,
    },
    {
      title: 'Panel class name and padding size',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverPanelClassNameSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverPanelClassNameHtml,
        },
      ],
      text: (
        <p>
          Use the <WuiCode>panelPaddingSize</WuiCode> prop to adjust the padding
          on the panel within the panel. Use the{' '}
          <WuiCode>panelClassName</WuiCode> prop to pass a custom class to the
          panel inside a popover.
        </p>
      ),
      demo: <PopoverPanelClassName />,
      snippet: popoverPanelClassNameSnippet,
    },
    {
      title: 'Popover with title and padding size',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverWithTitlePaddingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverWithTitlePaddingHtml,
        },
      ],
      text: (
        <div>
          <p>
            When using popover titles, you can still propogate the padding size
            by using <WuiCode>panelPaddingSize</WuiCode>. This will only affect
            the horizontal padding of the title and the overall padding of the
            content.
          </p>
        </div>
      ),
      snippet: popoverWithTitlePaddingSnippet,
      demo: <PopoverWithTitlePadding />,
    },
    {
      title: 'Constraining a popover inside a container',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverContainerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverContainerHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiPopover</strong> can accept a React or DOM element as a{' '}
            <WuiCode>container</WuiCode> prop and restrict the popover from
            overflowing that container.
          </p>
        </div>
      ),
      snippet: popoverContainerSnippet,
      demo: <PopoverContainer />,
    },
    {
      title: 'Popover using an HTMLElement as the anchor',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverHTMLElementAnchorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverHTMLElementAnchorHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiWrappingPopover</strong> is an extra popover component
            that allows any existing DOM element to be passed as the{' '}
            <WuiCode>button</WuiCode> prop.
          </p>
        </div>
      ),
      demo: <PopoverHTMLElementAnchor />,
    },
    {
      title: 'Popover on a fixed element',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverFixedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverFixedHtml,
        },
      ],
      text: (
        <div>
          <p>
            Popover content even works on <WuiCode>position: fixed;</WuiCode>{' '}
            elements.
          </p>
        </div>
      ),
      snippet: popoverFixedSnippet,
      demo: <PopoverFixed />,
    },
    {
      title: 'Popover with block level display',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverBlockSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverBlockHtml,
        },
      ],
      text: (
        <div>
          <p>
            Popover anchors default to{' '}
            <WuiCode language="sass">display: inline-block</WuiCode> so they do
            not force block display on inline triggers. If you do need to change
            this to block display, just add{' '}
            <WuiCode language="js">display=&quot;block&quot;</WuiCode>
          </p>
        </div>
      ),
      snippet: popoverBlockSnippet,
      demo: <PopoverBlock />,
    },
    {
      title: 'Popover attached to input element',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inputPopoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inputPopoverHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiInputPopover</strong> is a specialized popover component
            intended to be used with form elements. Stylistically, the popover
            panel is
            {'"attached"'} to the input. Functionally, consumers have control
            over what events open and close the popover, and it can allow for
            natural tab order.
          </p>
          <p>
            Although some assumptions are made about keyboard behavior,
            consumers should provide specific key event handlers depending on
            the use case. For instance, a <WuiCode>type=text</WuiCode> input
            could use the down key to trigger popover opening, but this
            interaction would not be appropriate for{' '}
            <WuiCode>type=number</WuiCode> inputs as they natively bind to the
            down key.
          </p>
        </div>
      ),
      props: { WuiInputPopover },
      snippet: inputPopoverSnippet,
      demo: <InputPopover />,
    },
    {
      title: 'Removing the focus focus',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: trapFocusSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: trapFocusHtml,
        },
      ],
      text: (
        <>
          <p>
            If the popover cannot trap focus within itself, then you can remove{' '}
            <WuiCode>ownFocus</WuiCode>.
          </p>
          <WuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <>
                Removing <WuiCode>ownFocus</WuiCode> makes it difficult for
                keyboard-only and screen reader users to navigate to and from
                your popover.
              </>
            }
          />
        </>
      ),
      snippet: trapFocusSnippet,
      demo: <TrapFocus />,
    },
  ],
};
