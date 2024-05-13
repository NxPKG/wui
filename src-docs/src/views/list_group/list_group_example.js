import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiListGroup,
  WuiListGroupItem,
  WuiPinnableListGroup,
  WuiCode,
} from '../../../../src/components';
import { WuiPinnableListGroupItem } from './props';

import ListGroup from './list_group';
const listGroupSource = require('!!raw-loader!./list_group');
const listGroupHtml = renderToHtml(ListGroup);

import ListGroupLinks from './list_group_links';
const listGroupLinksSource = require('!!raw-loader!./list_group_links');
const listGroupLinksHtml = renderToHtml(ListGroupLinks);

import ListGroupLinkActions from './list_group_link_actions';
const listGroupLinkActionsSource = require('!!raw-loader!./list_group_link_actions');
const listGroupLinkActionsHtml = renderToHtml(ListGroupLinkActions);

import ListGroupExtra from './list_group_extra';
const listGroupExtraSource = require('!!raw-loader!./list_group_extra');
const listGroupExtraHtml = renderToHtml(ListGroupExtra);

import ListGroupItemColor from './list_group_item_color';
const listGroupItemColorSource = require('!!raw-loader!./list_group_item_color');
const listGroupItemColorHtml = renderToHtml(ListGroupItemColor);

import PinnableListGroup from './pinnable_list_group';
const pinnableListGroupSource = require('!!raw-loader!./pinnable_list_group');
const pinnableListGroupHtml = renderToHtml(PinnableListGroup);

export const ListGroupExample = {
  title: 'List group',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupHtml,
        },
      ],
      text: (
        <>
          <p>
            The <strong>WuiListGroup</strong> component is used to present{' '}
            <strong>WuiListGroupItems</strong> in a neatly formatted list. Use
            the <WuiCode>flush</WuiCode> and <WuiCode>bordered</WuiCode>{' '}
            properties for full-width and bordered presentations, respectively.
          </p>
          <p>
            Adjust the <WuiCode>gutterSize</WuiCode> prop to increase or
            decrease the spacing between items.
          </p>
        </>
      ),
      props: { WuiListGroup, WuiListGroupItem },
      demo: <ListGroup />,
      snippet: `<WuiListGroup flush={true} bordered={true}>
  <WuiListGroupItem onClick={handleOnClick} label="Item" />
</WuiListGroup>`,
    },
    {
      title: 'List of links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupLinksSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupLinksHtml,
        },
      ],
      text: (
        <>
          <p>
            Display <strong>WuiListGroupItems</strong> as links by providing an{' '}
            <WuiCode>href</WuiCode> value and change their state with the{' '}
            <WuiCode>isActive</WuiCode> and <WuiCode>isDisabled</WuiCode>{' '}
            properties.
          </p>
          <p>
            As is done in this example, the <strong>WuiListGroup</strong>{' '}
            component can also accept an array of items via the{' '}
            <WuiCode>listItems</WuiCode> property.
          </p>
        </>
      ),
      demo: <ListGroupLinks />,
      snippet: `<WuiListGroup
  listItems={[
    {
      label: 'First link',
      href: '#',
      iconType: 'calendar',
    },
    {
      label: 'Second link',
      href: '#,
      isActive: true,
      iconType: 'clock',
    }]
  }
/>`,
    },
    {
      title: 'Secondary link actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupLinkActionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupLinkActionsHtml,
        },
      ],
      text: (
        <p>
          The <WuiCode>extraAction</WuiCode> property adds a secondary icon
          button to any list item. It accepts several properties of its own,
          including <WuiCode>color</WuiCode>, <WuiCode>onClick</WuiCode>,{' '}
          <WuiCode>iconType</WuiCode>, and <WuiCode>alwaysShow</WuiCode>, and
          can be used for actions such as pinning, favoriting, or deleting an
          item.
        </p>
      ),
      demo: <ListGroupLinkActions />,
      snippet: `<WuiListGroupItem
  label="WUI button link"
  extraAction={{
    color: 'primary',
    onClick: this.clicked,
    iconType: 'pin',
    iconSize: 's',
    'aria-label': 'Pin link',
    alwaysShow: pinned,
  }}
/>`,
    },
    {
      title: 'Text wrapping and tooltips',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupExtraSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupExtraHtml,
        },
      ],
      text: (
        <p>
          Optional props <WuiCode>showToolTip</WuiCode> and{' '}
          <WuiCode>wrapLines</WuiCode> can be used to augment the display of
          list items. Use these when lists are inside small containers where it
          is likely that the content will be truncated.
        </p>
      ),
      demo: <ListGroupExtra />,
      snippet: `<WuiListGroup showToolTips>
  <WuiListGroupItem
    wrapText
    label="A very long label"
  />
</WuiListGroup>`,
    },
    {
      title: 'List item color and size',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupItemColorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupItemColorHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>WuiListGroupItems</strong> will inherit the color from their
            element type whether it is a <WuiCode>button</WuiCode>,{' '}
            <WuiCode>anchor</WuiCode>, or <WuiCode>span</WuiCode>. You can
            enforce a different color of <WuiCode>primary</WuiCode>,{' '}
            <WuiCode>text</WuiCode>, or <WuiCode>subdued</WuiCode> with the{' '}
            <WuiCode>color</WuiCode> prop. Or provide the prop directly to{' '}
            <strong>WuiListGroup</strong>.
          </p>
          <p>
            They also accept options for text size;{' '}
            <WuiCode language="ts">{"'xs' | 's' | 'm' | 'l'"}</WuiCode>.
          </p>
        </>
      ),
      demo: <ListGroupItemColor />,
      snippet: `<WuiListGroupItem
  label="Primary"
  color="primary"
  size="s"
/>`,
    },
    {
      title: 'Pinnable list group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pinnableListGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pinnableListGroupHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>WuiPinnableListGroup</strong> is simply an extra wrapper
            around an{' '}
            <Link to="/display/list-group">
              <strong>WuiListGroup</strong>
            </Link>{' '}
            that provides visual indicators for <strong>pinning</strong>.
          </p>
          <p>
            Pinning is the concept that users can click a pin icon and add it to
            a subset of links (most likely shown in different list group). By
            providing an <WuiCode>onPinClick</WuiCode> handler, the component
            will automatically add the pin action to the item. However, the
            consuming application must manage the <WuiCode>listItems</WuiCode>
            and their <WuiCode>pinned</WuiCode> state.
          </p>
          <p>
            In order to get the full benefit of using{' '}
            <strong>WuiPinnableListGroup</strong>, the component only supports
            providing list items via the <WuiCode>listItem</WuiCode> prop and
            does not support <WuiCode>children</WuiCode>.
          </p>
        </>
      ),
      props: { WuiPinnableListGroup, WuiPinnableListGroupItem },
      demo: <PinnableListGroup />,
      snippet: `<WuiPinnableListGroup
  onPinClick={item => {}}
  listItems={[
    {
      label: 'A link',
      href: '#',
      pinned: true,
      isActive: true,
    },
  ]}
/>`,
    },
  ],
};
