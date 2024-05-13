import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode, WuiTreeView } from '../../../../src/components';
import { WuiTreeViewNode } from './tree_view_props';
import TreeView from './tree_view';
import TreeViewCompressed from './compressed';

const treeViewSource = require('!!raw-loader!./tree_view');
const treeViewHtml = renderToHtml(TreeView);

const treeViewCompressedSource = require('!!raw-loader!./compressed');
const treeViewCompressedHtml = renderToHtml(TreeViewCompressed);

const treeViewSnippet = [
  `<WuiTreeView
  items={[
    {
      label: 'Item One',
      id: 'item_one',
      icon: <WuiIcon type="arrowRight" />,
      iconWhenExpanded: <WuiIcon type="arrowDown" />,
      isExpanded: true,
      children: [
        {
          label: 'Item A',
          id: 'item_a',
          icon: <WuiIcon type="document" />,
        },
        {
          label: 'Item B',
          id: 'item_b',
          icon: <WuiIcon type="document" />,
        },
      ],
    },
    {
      label: 'Item Two',
      id: 'item_two',
    }
  ]}
  aria-label="Sample Tree View"
/>`,
];

export const TreeViewExample = {
  title: 'Tree view',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: treeViewSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: treeViewHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiTreeView</strong> allows you to render recursive objects,
            such as a file directory. The <WuiCode>children</WuiCode> prop takes
            an array of <WuiCode>nodes</WuiCode>.
          </p>
          <p>
            Keyboard navigation allows users to navigate and interact with the
            tree using the arrow keys, spacebar, and return.
          </p>
          <p>
            The <WuiCode>icon</WuiCode> prop accepts any{' '}
            <Link to="/display/icons">icon or token</Link>. You can also
            specifiy a different icon for the open state with the{' '}
            <WuiCode>iconWhenExpanded</WuiCode> prop.
          </p>
        </div>
      ),
      components: { WuiTreeView },
      demo: <TreeView />,
      snippet: treeViewSnippet,
      props: { WuiTreeView, WuiTreeViewNode },
    },
    {
      title: 'Optional styling',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: treeViewCompressedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: treeViewCompressedHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiTreeView</strong> supports a compressed mode with the{' '}
            <WuiCode language="js">{'display="compressed"'}</WuiCode> setting.
            When using the compressed version it&apos;s highly recommended to
            use the small size of <strong>WuiIcon</strong> and the extra small
            size of <strong>WuiToken</strong>. This will help prevent awkard
            alignment issues when used alongside the{' '}
            <WuiCode>showExpansionArrows</WuiCode> prop.
          </p>
          <p>
            The <WuiCode>showExpansionArrows</WuiCode> prop provides an
            additional visual indicator. Ideal for when a tree&apos;s items use
            icons that don&apos;t immediately let a user know that there are
            nested nodes that may not be visible.
          </p>
          <p>
            In some cases, you may want to automatically expand all the items
            with children. In those instances, you can use the{' '}
            <WuiCode>expandByDefault</WuiCode> prop, as seen in the example
            below.
          </p>
          <p>
            Lastly, each node can also accept a custom{' '}
            <WuiCode>className</WuiCode> should you need to style them
            individually.
          </p>
        </div>
      ),
      components: { WuiTreeView },
      demo: <TreeViewCompressed />,
      props: { WuiTreeView, WuiTreeViewNode },
    },
  ],
};
