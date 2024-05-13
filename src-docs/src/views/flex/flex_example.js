import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  WuiCallOut,
  WuiSpacer,
  WuiCode,
  WuiFlexGroup,
  WuiFlexItem,
  WuiFlexGrid,
  WuiLink,
} from '../../../../src/components';

import { flexGroupConfig, flexGridConfig } from './playground';

import FlexGroup from './flex_group';
const flexGroupSource = require('!!raw-loader!./flex_group');
const flexGroupHtml = renderToHtml(FlexGroup);

import FlexGroupWrap from './flex_group_wrap';
const flexGroupWrapSource = require('!!raw-loader!./flex_group_wrap');
const flexGroupWrapHtml = renderToHtml(FlexGroupWrap);

import FlexItems from './flex_items';
const flexItemsSource = require('!!raw-loader!./flex_items');
const flexItemsHtml = renderToHtml(FlexItems);

import ComponentSpan from './component_span';
const componentSpanSource = require('!!raw-loader!./component_span');
const componentSpanHtml = renderToHtml(ComponentSpan);

import FlexGutter from './flex_gutter';
const flexGutterSource = require('!!raw-loader!./flex_gutter');
const flexGutterHtml = renderToHtml(FlexGutter);

import FlexGrowZero from './flex_grow_zero';
const flexGrowZeroSource = require('!!raw-loader!./flex_grow_zero');
const flexGrowZeroHtml = renderToHtml(FlexGrowZero);

import FlexGrowNumeric from './flex_grow_numeric';
const flexGrowNumericSource = require('!!raw-loader!./flex_grow_numeric');
const flexGrowNumericHtml = renderToHtml(FlexGrowNumeric);

import FlexJustify from './flex_justify';
const flexJustifySource = require('!!raw-loader!./flex_justify');
const flexJustifyHtml = renderToHtml(FlexJustify);

import Direction from './direction';
const directionSource = require('!!raw-loader!./direction');
const directionHtml = renderToHtml(Direction);

import FlexGrid from './flex_grid';
const flexGridSource = require('!!raw-loader!./flex_grid');
const flexGridHtml = renderToHtml(FlexGrid);

import FlexGridColumns from './flex_grid_columns';
const flexGridColumnsSource = require('!!raw-loader!./flex_grid_columns');
const flexGridColumnsHtml = renderToHtml(FlexGridColumns);

import FlexGridColumnFirst from './flex_grid_column_first';
const flexGridColumnFirstSource = require('!!raw-loader!./flex_grid_column_first');
const flexGridColumnFirstHtml = renderToHtml(FlexGridColumnFirst);

import FlexNest from './flex_nest';
const flexNestSource = require('!!raw-loader!./flex_nest');
const flexNestHtml = renderToHtml(FlexNest);

import FlexItemPanel from './flex_item_panel';
const flexItemPanelSource = require('!!raw-loader!./flex_item_panel');
const flexItemPanelHtml = renderToHtml(FlexItemPanel);

import FlexGroupResponsive from './flex_responsive';
const flexGroupResponsiveSource = require('!!raw-loader!./flex_responsive');
const flexGroupResponsiveHtml = renderToHtml(FlexGroupResponsive);

const flexSnippet = `<WuiFlexGroup>
  <WuiFlexItem><!-- FlexItem content --></WuiFlexItem>
  <WuiFlexItem><!-- FlexItem content --></WuiFlexItem>
</WuiFlexGroup>`;

const flexGroupWrap = `<WuiFlexGroup wrap>
  <WuiFlexItem><!-- FlexItem content --></WuiFlexItem>
  <WuiFlexItem><!-- FlexItem content --></WuiFlexItem>
</WuiFlexGroup>`;

const componentSpanSnippet = `<WuiFlexGroup component="span">
  <WuiFlexItem component="span"><!-- FlexItem content --></WuiFlexItem>
  <WuiFlexItem component="span"><!-- FlexItem content --></WuiFlexItem>
</WuiFlexGroup>`;

const flexItemPanelSnippet = `<WuiFlexGroup>
  <WuiFlexItem>
    <WuiPanel><!-- Panel content --></WuiPanel>
  </WuiFlexItem>

  <WuiFlexItem>
    <WuiPanel grow={false}><!-- Panel content --></WuiPanel>
  </WuiFlexItem>
</WuiFlexGroup>`;

const flexGrowZeroSnippet = `<WuiFlexGroup>
  <WuiFlexItem grow={false}><!-- FlexItem content --></WuiFlexItem>
  <WuiFlexItem><!-- FlexItem content --></WuiFlexItem>
</WuiFlexGroup>`;

const flexGrowNumericSnippet = `<WuiFlexGroup>
  <WuiFlexItem grow={1}><!-- FlexItem with flew-grow 1 --></WuiFlexItem>
  <WuiFlexItem grow={2}><!-- FlexItem with flew-grow 2 --></WuiFlexItem>
  ...
  <WuiFlexItem grow={10}><!-- FlexItem with flew-grow 10 --></WuiFlexItem>
</WuiFlexGroup>`;

const flexJustifySnippet = `<WuiFlexGroup justifyContent="spaceBetween">
  <WuiFlexItem><!-- FlexItem with space-between --></WuiFlexItem>
  <WuiFlexItem><!-- FlexItem with space-between --></WuiFlexItem>
</WuiFlexGroup>`;

const directionSnippet = `<WuiFlexGroup direction="column">
  <WuiFlexItem><!-- FlexItem in column FlexGroup --></WuiFlexItem>
  <WuiFlexItem><!-- FlexItem in column FlexGroup --></WuiFlexItem>
</WuiFlexGroup>`;

const flexGridSnippet = `<WuiFlexGrid>
  <WuiFlexItem><!-- FlexItem content --></WuiFlexItem>
  <WuiFlexItem><!-- FlexItem content --></WuiFlexItem>
</WuiFlexGrid>`;

const flexGridColumnsSnippet = `<WuiFlexGrid columns={3}>
  <WuiFlexItem>
    <!-- Item in 3-column FlexGrid-->
  </WuiFlexItem>
  <WuiFlexItem>
    <!-- Item in 3-column FlexGrid-->
  </WuiFlexItem>
  <WuiFlexItem>
    <!-- Item in 3-column FlexGrid-->
  </WuiFlexItem>
</WuiFlexGrid>`;

const flexGridColumnFirstSnippet = `<WuiFlexGrid columns={2} direction="column">
  <WuiFlexItem>
    <!-- Item in FlexGrid-->
  </WuiFlexItem>
  <WuiFlexItem>
    <!-- Item in FlexGrid-->
  </WuiFlexItem>
</WuiFlexGrid>`;

const flexNestSnippet = `<WuiFlexGroup>
  <WuiFlexItem>
    <WuiFlexGroup>
      <WuiFlexItem><!-- FlexGroup inside FlexGroup --></WuiFlexItem>
      <WuiFlexItem><!-- FlexGroup inside FlexGroup --></WuiFlexItem>
    </WuiFlexGroup>
  </WuiFlexItem>
  <WuiFlexItem>
    <WuiFlexGrid>
      <WuiFlexItem><!-- FlexGrid inside FlexGroup --></WuiFlexItem>
      <WuiFlexItem><!-- FlexGrid inside FlexGroup --></WuiFlexItem>
    </WuiFlexGrid>
  </WuiFlexItem>
</WuiFlexGroup>`;

const flexGutterSnippet = `<WuiFlexGroup gutterSize="none">
  <WuiFlexItem><!-- FlexItem without gutter --></WuiFlexItem>
  <WuiFlexItem><!-- FlexItem without gutter --></WuiFlexItem>
</WuiFlexGroup>`;

const flexGroupResponsiveSnippet = `<WuiFlexGroup responsive={false}>
  <WuiFlexItem><!-- FlexItem content --></WuiFlexItem>
  <WuiFlexItem><!-- FlexItem content --></WuiFlexItem>
</WuiFlexGroup>`;

export const FlexExample = {
  title: 'Flex',
  intro: (
    <Fragment>
      <WuiCallOut
        title="Coloring and padding exist for examples only"
        color="warning">
        <p>
          Padding and background-color are added to all the{' '}
          <strong>WuiFlexItem</strong> components on this documentation page for
          illustrative purposes only. You will need to add padding through
          additional components or classes if you need it.
        </p>
      </WuiCallOut>

      <WuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Flex group is for a single row layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGroupHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiFlexGroup</strong> is useful for setting up layouts for a{' '}
            <strong>single row</strong> of content. By default any{' '}
            <strong>WuiFlexItem</strong> within <strong>WuiFlexGroup</strong>{' '}
            will stretch and grow to match their siblings.
          </p>
        </div>
      ),
      props: { WuiFlexGroup, WuiFlexItem, WuiFlexGrid },
      snippet: flexSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGroup />
        </div>
      ),
    },
    {
      title: 'Flex group can wrap its items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGroupWrapSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGroupWrapHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can set <WuiCode>wrap</WuiCode> on <strong>WuiFlexGroup</strong>{' '}
            if it contains <strong>WuiFlexItems</strong> with minimum widths,
            which you want to wrap as the container becomes narrower.
          </p>
          <WuiCallOut color="warning" title="IE Warning">
            <p>
              IE11 does not properly wrap flex items if the{' '}
              <strong>group</strong> is also within a flex item. To fix this
              rendering issue, you need to add a class of{' '}
              <WuiCode>.wuiIEFlexWrapFix</WuiCode> to the flex-item that{' '}
              <strong>contains</strong> the wrapping group.
            </p>
          </WuiCallOut>
        </Fragment>
      ),
      snippet: flexGroupWrap,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGroupWrap />
        </div>
      ),
    },
    {
      title: 'Flex group accepts infinite items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexItemsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexItemsHtml,
        },
      ],
      text: (
        <p>
          Same code as above. Notice that <strong>WuiFlexItem</strong> creates
          equal width items no matter the number of siblings.{' '}
          <strong>WuiFlexGroup</strong> never wraps.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexItems />
        </div>
      ),
    },
    {
      title: 'Specify spans instead of divs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: componentSpanSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: componentSpanHtml,
        },
      ],
      text: (
        <p>
          <WuiCode>component=&ldquo;span&rdquo;</WuiCode> can be set on{' '}
          <strong>WuiFlexGroup</strong> and/or <strong>WuiFlexItem</strong>.
        </p>
      ),
      snippet: componentSpanSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <ComponentSpan />
        </div>
      ),
    },
    {
      title: 'Panels grow to fill flex items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexItemPanelSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexItemPanelHtml,
        },
      ],
      text: (
        <p>
          The{' '}
          <Link to="/layout/panel">
            <strong>WuiPanel</strong>
          </Link>{' '}
          component will naturally grow to fill the <strong>WuiFlexItem</strong>{' '}
          which contains it.
        </p>
      ),
      snippet: flexItemPanelSnippet,
      demo: <FlexItemPanel />,
    },
    {
      title: 'Flex item can individually turn off stretching',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGrowZeroSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGrowZeroHtml,
        },
      ],
      text: (
        <p>
          Sometimes you do not want a <strong>WuiFlexItem</strong> to grow. It
          can be turned off on each item individually.
        </p>
      ),
      snippet: flexGrowZeroSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGrowZero />
        </div>
      ),
    },
    {
      title: 'Flex item can specify a proportional width',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGrowNumericSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGrowNumericHtml,
        },
      ],
      text: (
        <p>
          You can specify a number between 1 and 10 for a{' '}
          <strong>WuiFlexItem</strong> to try to take up a proportional part of
          the flex box it is in.
        </p>
      ),
      snippet: flexGrowNumericSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGrowNumeric />
        </div>
      ),
    },
    {
      title: 'Flex group can justify and align',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexJustifySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexJustifyHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiFlexGroups</strong> can also use{' '}
          <WuiCode>justifyContent</WuiCode> and <WuiCode>alignItems</WuiCode>{' '}
          props that accept normal flex-box parameters. Below are some common
          scenarios, where you need to separate two items, center justify a
          single one, or center an item vertically. Note the usage of{' '}
          <strong>WuiFlexItems</strong> with <WuiCode>grow=false</WuiCode> so
          that they do not stretch.
        </p>
      ),
      snippet: flexJustifySnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexJustify />
        </div>
      ),
    },
    {
      title: 'Flex group can change direction',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: directionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: directionHtml,
        },
      ],
      text: (
        <div>
          <p>
            You can change direction using the <WuiCode>direction</WuiCode>{' '}
            prop.
          </p>
          <WuiCallOut color="warning" title="IE11 Warning">
            <p>
              Depending on the nested structure of your flex groups, it is
              possible that flex items inside a column directed flex group will
              not show. To counter this, add the <code>grow</code> prop and set
              to either <code>false</code> or a number. Setting{' '}
              <code>grow</code> to <code>true</code> will not suffice. You may
              also need to adjust the <code>flex-basis</code> value.
            </p>
          </WuiCallOut>
        </div>
      ),
      snippet: directionSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <Direction />
        </div>
      ),
    },
    {
      title: 'Flex grids are for repeatable grids',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGridSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGridHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiFlexGrid</strong> is a more rigid component that sets
          multiple, wrapping rows of same width items.
        </p>
      ),
      props: { WuiFlexGrid },
      snippet: flexGridSnippet,
      demo: (
        <div className="guideDemo__highlightGridWrap">
          <FlexGrid />
        </div>
      ),
    },
    {
      title: 'Flex grids can have set column widths',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGridColumnsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGridColumnsHtml,
        },
      ],
      text: (
        <p>
          You can set a <WuiCode>columns</WuiCode> prop to specify anywhere
          between 1-4 columns. Any more would likely break on laptop screens.
        </p>
      ),
      snippet: flexGridColumnsSnippet,
      demo: (
        <div className="guideDemo__highlightGridWrap">
          <FlexGridColumns />
        </div>
      ),
    },
    {
      title: 'Flex grids can change direction',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGridColumnFirstSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGridColumnFirstHtml,
        },
      ],
      text: (
        <p>
          Adding <WuiCode>direction=&quot;column&quot;</WuiCode> will re-orient
          the flex items so they display top-down <strong>then</strong> left to
          right.
        </p>
      ),
      snippet: flexGridColumnFirstSnippet,
      demo: (
        <div className="guideDemo__highlightGridWrap">
          <FlexGridColumnFirst />
        </div>
      ),
    },
    {
      title: 'Flex grids and flex groups can nest',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexNestSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexNestHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>WuiFlexGroup</strong> and <strong>WuiFlexGrid</strong> can
            nest within themselves indefinitely. For example, here we turn off
            the growth on a <strong>WuiFlexGroup</strong>, then nest a grid
            inside of it.
          </p>
          <WuiCallOut color="warning" title="IE11 Warning">
            <p>
              Nesting can cause some nasty bugs in IE11. There is no generalized
              way to fix IE without knowing the exact intention of the layout.
              Please refer to{' '}
              <WuiLink href="https://github.com/philipwalton/flexbugs">
                Flexbugs
              </WuiLink>{' '}
              if you see rendering issues in IE.
            </p>
          </WuiCallOut>
        </Fragment>
      ),
      snippet: flexNestSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexNest />
        </div>
      ),
    },
    {
      title: 'Gutter sizing can be used on either flex groups or flex grids',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGutterSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGutterHtml,
        },
      ],
      text: (
        <p>
          The <WuiCode>gutterSize</WuiCode> prop can be applied to either a{' '}
          <strong>WuiFlexGroup</strong> or a <strong>WuiFlexGrid</strong> to
          adjust the spacing between <strong>WuiFlexItems</strong>.
        </p>
      ),
      snippet: flexGutterSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGutter />
        </div>
      ),
    },
    {
      title: 'Flex groups can turn off responsive layouts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGroupResponsiveSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGroupResponsiveHtml,
        },
      ],
      text: (
        <p>
          By default <strong>WuiFlexGroup</strong> is responsive. However, often
          you only want to use groups for alignment and margins, rather than
          layouts. Simply apply the <WuiCode>responsive={'{false}'}</WuiCode>{' '}
          prop to retain a single row layout for the group.
        </p>
      ),
      snippet: flexGroupResponsiveSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGroupResponsive />
        </div>
      ),
    },
  ],
  playground: [flexGroupConfig, flexGridConfig],
};
