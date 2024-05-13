import React from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiButton,
  WuiButtonEmpty,
  WuiButtonIcon,
  WuiCode,
  WuiButtonGroup,
  WuiButtonToggle,
  WuiCallOut,
  WuiText,
} from '../../../../src/components';
import Guidelines from './guidelines';
import buttonConfig from './playground';

import Button from './button';
const buttonSource = require('!!raw-loader!./button');
const buttonHtml = renderToHtml(Button);
const buttonSnippet = [
  `<WuiButton><!-- Primary button --></WuiButton>
`,
  `<WuiButton fill><!-- Filled button --></WuiButton>
`,
  `<WuiButton size="s"><!-- Small button --></WuiButton>
`,
  `<WuiButton size="s" fill><!-- Small and filled button --></WuiButton>
`,
];

import ButtonWithIcon from './button_with_icon';
const buttonWithIconSource = require('!!raw-loader!./button_with_icon');
const buttonWithIconHtml = renderToHtml(Button);
const buttonWithIconSnippet = `<WuiButton iconType={icon}><!-- Button text --></WuiButton>
`;

import ButtonOption from './button_empty';
const buttonOptionSource = require('!!raw-loader!./button_empty');
const buttonOptionHtml = renderToHtml(ButtonOption);
const buttonOptionSnippet = `<WuiButtonEmpty>
  <!-- Button text -->
</WuiButtonEmpty>`;

import ButtonOptionFlush from './button_empty_flush';
const buttonOptionFlushSource = require('!!raw-loader!./button_empty_flush');
const buttonOptionFlushHtml = renderToHtml(ButtonOptionFlush);
const buttonOptionFlushSnippet = `<WuiButtonEmpty flush="left"><!-- Button text --></WuiButtonEmpty>
`;

import ButtonIcon from './button_icon';
const buttonIconSource = require('!!raw-loader!./button_icon');
const buttonIconHtml = renderToHtml(ButtonIcon);
const buttonIconSnippet = `<WuiButtonIcon
  iconType={icon}
/>`;

import ButtonGhost from './button_ghost';
const buttonGhostSource = require('!!raw-loader!./button_ghost');
const buttonGhostHtml = renderToHtml(ButtonGhost);
const buttonGhostSnippet = `<WuiButton color="ghost">
  <!-- Button text -->
</WuiButton>`;

import ButtonAsLink from './button_as_link';
const buttonAsLinkSource = require('!!raw-loader!./button_as_link');
const buttonAsLinkHtml = renderToHtml(ButtonAsLink);
const buttonAsLinkSnippet = `<WuiButton href={someUrl}><!-- Button text --></WuiButton>
`;

import ButtonLoading from './button_loading';
const buttonLoadingSource = require('!!raw-loader!./button_loading');
const buttonLoadingHtml = renderToHtml(ButtonLoading);
const buttonLoadingSnippet = `<WuiButton isLoading={true}>
  <!-- Button text -->
</WuiButton>`;

import ButtonToggle from './button_toggle';
const buttonToggleSource = require('!!raw-loader!./button_toggle');
const buttonToggleHtml = renderToHtml(ButtonToggle);
const buttonToggleSnippet = `<WuiButtonToggle
  label={label}
  iconType={toggleOn ? onIcon : offIcon}
  onChange={onToggleChange}
  isSelected={toggleOn}
/>`;

import ButtonGroup from './button_group';
const buttonGroupSource = require('!!raw-loader!./button_group');
const buttonGroupHtml = renderToHtml(ButtonGroup);
const buttonGroupSnippet = [
  `<WuiButtonGroup
  legend={legend}
  options={toggleButtons}
  idSelected={toggleIdSelected}
  onChange={onChange}
/>`,
  `<WuiButtonGroup
  legend={legend}
  options={toggleButtonsIconsMulti}
  idToSelectedMap={toggleIconIdToSelectedMap}
  onChange={onChangeIconsMulti}
  type="multi"
  isIconOnly
/>`,
];

export const ButtonExample = {
  title: 'Button',
  intro: (
    <WuiText>
      <p>
        <strong>WuiButton</strong> comes in two styles. The{' '}
        <WuiCode>fill</WuiCode> style should be reserved for the main action and
        limited in number for a single page. Be sure to read the full{' '}
        <Link to="/guidelines/button">button usage guidelines</Link>.
      </p>
    </WuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonHtml,
        },
      ],
      props: { WuiButton },
      snippet: buttonSnippet,
      demo: <Button />,
    },
    {
      title: 'Buttons can also be links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonAsLinkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonAsLinkHtml,
        },
      ],
      text: (
        <p>
          Buttons will use an <WuiCode>{'<a>'}</WuiCode> tag if there is a{' '}
          <WuiCode>href</WuiCode> prop present.
        </p>
      ),
      snippet: buttonAsLinkSnippet,
      demo: <ButtonAsLink />,
    },
    {
      title: 'Button with icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonWithIconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonWithIconHtml,
        },
      ],
      text: (
        <p>
          The passed <WuiCode>iconType</WuiCode> must be an acceptable{' '}
          <Link to="/display/icons">
            <strong>WuiIcon</strong>
          </Link>{' '}
          type. It can be flipped{' '}
          {
            // eslint-disable-next-line react/no-unescaped-entities
          }{' '}
          to the opposite side by passing{' '}
          <WuiCode language="js">iconSide=&quot;right&quot;</WuiCode>.
        </p>
      ),
      snippet: buttonWithIconSnippet,
      demo: <ButtonWithIcon />,
    },
    {
      title: 'Loading state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonLoadingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonLoadingHtml,
        },
      ],
      text: (
        <p>
          Setting the <WuiCode>isLoading</WuiCode> prop to true will add the
          loading spinner or swap the existing icon for the loading spinner and
          set the button to disabled. It is good practice to also rename the
          button to &quot;Loading&hellip;&quot;.
        </p>
      ),
      snippet: buttonLoadingSnippet,
      demo: <ButtonLoading />,
    },
    {
      title: 'Empty button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonOptionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonOptionHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiButtonEmpty</strong> is used when you want to make a button
          look like a regular link, but still want to align it to the rest of
          the buttons.
        </p>
      ),
      props: { WuiButtonEmpty },
      snippet: buttonOptionSnippet,
      demo: <ButtonOption />,
    },
    {
      title: 'Flush empty button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonOptionFlushSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonOptionFlushHtml,
        },
      ],
      text: (
        <p>
          When aligning <strong>WuiButtonEmpty</strong> components to the left
          or the right, you should make sure they&rsquo;re flush with the edge
          of their container, so that they&rsquo;re horizontally aligned with
          the other content in the container.
        </p>
      ),
      props: { WuiButtonEmpty },
      snippet: buttonOptionFlushSnippet,
      demo: <ButtonOptionFlush />,
    },
    {
      title: 'Button icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonIconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonIconHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiButtonIcons</strong> are buttons that only contain an icon
          (no text).
        </p>
      ),
      props: { WuiButtonIcon },
      snippet: buttonIconSnippet,
      demo: <ButtonIcon />,
    },
    {
      title: 'Toggle buttons',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonToggleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonToggleHtml,
        },
      ],
      text: (
        <div>
          <p>
            This is a specialized component that combines{' '}
            <strong>WuiButton</strong> and <strong>WuiToggle</strong> to create
            a button with an on/off state. You can pass all the same parameters
            to it as you can to <strong>WuiButton</strong>. The main difference
            is that, it does not accept any children, but a{' '}
            <WuiCode>label</WuiCode> prop instead. This is for the handling of
            accessibility with the <strong>WuiToggle</strong>.
          </p>
          <p>
            The <strong>WuiButtonToggle</strong> does not have any inherit
            visual state differences. These you must apply in your
            implementation.
          </p>
        </div>
      ),
      demo: <ButtonToggle />,
      snippet: buttonToggleSnippet,
      props: { WuiButtonToggle },
    },
    {
      title: 'Button groups',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonGroupHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiButtonGroups</strong> are handled similarly to the way
            checkbox and radio groups are handled but made to look like buttons.
            They group multiple <strong>WuiButtonToggles</strong> and utilize
            the <WuiCode language="js">type=&quot;single&quot;</WuiCode> or{' '}
            <WuiCode language="js">&quot;multi&quot;</WuiCode> prop to determine
            whether multiple or only single selections are allowed per group.
          </p>
          <p>
            Stylistically, all button groups are the size of small buttons, do
            not stretch to fill the container, and typically should only be{' '}
            <WuiCode language="js">color=&quot;text&quot;</WuiCode> (default) or{' '}
            <WuiCode language="js">&quot;primary&quot;</WuiCode>. If you&apos;re
            just displaying a group of icons, add the prop{' '}
            <WuiCode>isIconOnly</WuiCode>.
          </p>
          <WuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <span>
                In order for groups to be properly read as groups with a title,
                add the <WuiCode>legend</WuiCode> prop. This is only for
                accessibility, however, so it will be visibly hidden.
              </span>
            }
          />
        </div>
      ),
      demo: <ButtonGroup />,
      snippet: buttonGroupSnippet,
      props: { WuiButtonGroup },
    },
    {
      title: 'Ghost',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGhostSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonGhostHtml,
        },
      ],
      text: (
        <p>
          For buttons on dark color backgrounds, you can pass{' '}
          <WuiCode language="js">{'color="ghost"'}</WuiCode> to any of the
          button styles on this page. These should be used extremely rarely, and
          are only for placing buttons on top of dark or image-based
          backgrounds. A good example of their use is in the{' '}
          <Link to="/layout/bottom-bar">
            <strong>WuiBottomBar</strong>
          </Link>{' '}
          component.
        </p>
      ),
      snippet: buttonGhostSnippet,
      demo: <ButtonGhost />,
    },
  ],
  guidelines: <Guidelines />,
  playground: buttonConfig,
};
