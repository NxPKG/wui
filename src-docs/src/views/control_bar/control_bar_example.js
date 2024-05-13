import React from 'react';
import { Link } from 'react-router-dom';

import { WuiCode, WuiControlBar } from '../../../../src/components';

import {
  BreadcrumbControlProps,
  ButtonControlProps,
  DividerControlProps,
  IconControlTypeProps,
  IconButtonControlTypeProps,
  SpacerControlProps,
  TabControlProps,
  TextControlProps,
} from './props';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import ControlBar from './control_bar';
import Controls from './controls';
import ControlBarWithTabs from './tabs';
import ControlBarMobile from './mobile';

const controlsSource = require('!!raw-loader!./controls');
const controlsHtml = renderToHtml(Controls);

const controlBarSource = require('!!raw-loader!./control_bar');
const controlBarHtml = renderToHtml(ControlBar);
const controlBarSnippet = `<WuiControlBar
  showContent={false}
  controls={
    [{
      iconType: 'submodule',
      id: 'root_icon',
      controlType: 'icon',
      'aria-label': 'Project Root',
    },
    {
      controlType: 'breadcrumbs',
      id: 'current_file_path',
      responsive: true,
      breadcrumbs: [
        {
          text: 'src',
        },
        {
          text: 'components',
        },
      ],
    },
    {
      controlType: 'spacer',
    },
    {
      controlType: 'icon',
      id: 'status_icon',
      iconType: 'alert',
      color: 'warning',
      'aria-label': 'Repo Status',
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'button',
      id: 'open_history_view',
      label: 'Show history',
      color: 'primary',
      onClick: this.toggleContent,
    }]
  }
/>`;

const tabsBarSource = require('!!raw-loader!./tabs');
const tabsBarHtml = renderToHtml(ControlBarWithTabs);
const tabsBarSnippet = '<WuiControlBar controls={items} size="m"/>';

const mobileBarSource = require('!!raw-loader!./mobile');
const mobileBarHtml = renderToHtml(ControlBarMobile);
const mobileBarSnippet = `<WuiControlBar
  showOnMobile
  controls={[
    {
      controlType: 'icon',
      id: 'icon',
      iconType: 'folderClosed',
      'aria-label': 'folder',
      className: 'wui-hideFor--m wui-hideFor--l wui-hideFor--xl',
    },
    {
      controlType: 'breadcrumbs',
      id: 'current_file_path',
      className: 'wui-hideFor--s wui-hideFor--xs',
      responsive: true,
      breadcrumbs: [
        {
          text: 'src',
        },
        {
          text: 'components',
        },
      ],
    },
    {
      controlType: 'spacer',
    },
    {
      controlType: 'icon',
      id: 'github_icon',
      iconType: 'logoGithub',
    },
    {
      controlType: 'text',
      id: 'github_text',
      text: 'Open in Github',
    },
  ]}/>`;

export const ControlBarExample = {
  title: 'Control bar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: controlBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiControlBar</strong> is a bottom positioned container and
            content well intended to provide additional view controls and
            actions.
          </p>
          <p>
            The control bar provides an easy way to extend the navigation or
            views of the current page by allowing you to place tabs, buttons,
            text, or <WuiCode>children</WuiCode> within it. It can operate
            similarly to a flyout, but (at full height) it covers most of the
            current page; making it a fitting solution for verbose text or
            additional controls. It can also be used without allowing it to
            expand, which makes it an easy way to display status information or
            fixed-position buttons.
          </p>
        </div>
      ),
      props: { WuiControlBar },
      snippet: controlBarSnippet,
      demo: <ControlBar />,
    },
    {
      title: 'Using tabs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabsBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tabsBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            This example demonstrates the use of tabs and reduces the size of
            the content with <WuiCode language="js">size=&quot;m&quot;</WuiCode>
            .
          </p>
          <p>
            Optional children of the <strong>WuiControlBar</strong> are rendered
            in the control bar drawer. You can toggle the visibility of the
            content with the <WuiCode>showContent</WuiCode> prop. When you want
            to display tab content, this is where you&apos;ll do it.
          </p>
        </div>
      ),
      props: { WuiControlBar },
      snippet: tabsBarSnippet,
      demo: <ControlBarWithTabs />,
    },
    {
      title: 'Mobile usage',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: mobileBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: mobileBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <strong>WuiControlBar</strong> is responsive in the sense that
            it utilizes flexbox and overflow scrolls. However, it makes no
            attempts to reorganize the controls you provide. By default the{' '}
            <strong>WuiControlBar</strong> is hidden on mobile devices, but this
            can be overridden with the <WuiCode>showOnMobile</WuiCode> prop.
            You&apos;ll need to take the layout of your{' '}
            <WuiCode>controlTypes</WuiCode> into consideration when choosing to
            display on smaller screens.
          </p>
          <p>
            A simple way of doing this is to pass in WUI responsive utility
            classes into the <WuiCode>className</WuiCode> prop on any of the{' '}
            <WuiCode>controlTypes</WuiCode>. View the snippet tab to see an
            example.
          </p>
        </div>
      ),
      props: { WuiControlBar },
      snippet: mobileBarSnippet,
      demo: <ControlBarMobile />,
    },
    {
      title: 'Control types and position',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: controlsHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <strong>WuiControlBar</strong> accepts an array of{' '}
            <WuiCode>controlTypes</WuiCode> that will be arranged in the order
            in which they are provided. All controls <strong>must</strong> be
            provide a unique <WuiCode>id</WuiCode> to be used as the key.
          </p>
          <ul>
            <li>
              <WuiCode>button</WuiCode>: Extends{' '}
              <Link to="/navigation/button">
                <strong>WuiButton</strong>
              </Link>{' '}
              but always forces to size small. Requires <WuiCode>label</WuiCode>{' '}
              as the children.
            </li>
            <li>
              <WuiCode>icon</WuiCode>: Extends{' '}
              <Link to="/display/icons">
                <strong>WuiIcon</strong>
              </Link>{' '}
              unless provided an <WuiCode>onClick</WuiCode> or{' '}
              <WuiCode>href</WuiCode>, then it will render an{' '}
              <Link to="/navigation/button">
                <strong>WuiButtonIcon</strong>
              </Link>
              .
            </li>
            <li>
              <WuiCode>text</WuiCode>: Simple ghost colored text.
            </li>
            <li>
              <WuiCode>tab</WuiCode>: Renders a button visually as a tab. You
              must provide your own callback to swap the control bar contents
              with <WuiCode>onClick</WuiCode>.
            </li>
            <li>
              <WuiCode>breadcrumbs</WuiCode>: Extends{' '}
              <Link to="/navigation/breadcrumbs">
                <strong>WuiBreadcrumbs</strong>
              </Link>
              .
            </li>
            <li>
              <WuiCode>spacer</WuiCode>: Provides a horizontal space between
              controls. <strong>Id is optional.</strong>
            </li>
            <li>
              <WuiCode>divider</WuiCode>: Provides a <WuiCode>1px</WuiCode>{' '}
              border between controls. Useful when additional visual separation
              is needed. <strong>Id is optional.</strong>
            </li>
          </ul>
          <p>
            Typically, a control bar is fixed positioned against the browser
            window and therefore rendered within a portal. To change the parent
            element of the control bar, change the <WuiCode>position</WuiCode>{' '}
            prop to <WuiCode language="js">{'"absolute"'}</WuiCode> or{' '}
            <WuiCode language="js">{'"relative"'}</WuiCode>.
          </p>
          <p>
            To offest the left and right position of the control bar, for
            example, to adjust for side navigation, use the{' '}
            <WuiCode>leftOffset</WuiCode> or <WuiCode>rightOffset</WuiCode>{' '}
            props.
          </p>
        </div>
      ),
      props: {
        WuiControlBar,
        BreadcrumbControlProps,
        ButtonControlProps,
        DividerControlProps,
        IconControlTypeProps,
        IconButtonControlTypeProps,
        SpacerControlProps,
        TabControlProps,
        TextControlProps,
      },
      demo: <Controls />,
    },
  ],
};
