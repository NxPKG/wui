import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode } from '../../../../src/components';

import { WuiExpression } from '../../../../src/components/expression';

import { expressionConfig } from './playground';

import Expression from './expression';
const expressionSource = require('!!raw-loader!./expression');
const expressionHtml = renderToHtml(Expression);
const expressionSnippet = `<WuiExpression
  description={description}
  value={value}
  isActive={isActive}
  onClick={handleClick}
/>`;

import Colors from './colors';
const colorSource = require('!!raw-loader!./colors');
const colorHtml = renderToHtml(Colors);
const colorSnippet = `<WuiExpression 
  description={description} 
  value={value}
  color="primary" 
/>`;

import Stringing from './stringing';
const stringingSource = require('!!raw-loader!./stringing');
const stringingHtml = renderToHtml(Stringing);
const stringingSnippet = `<div>
  <WuiExpression
    description={description1}
    value={value1}
    onClick={handleClick1}
  />
  <WuiExpression
    description={description2}
    value={value2}
    onClick={handleClick2}
  />
</div>`;

import Columns from './columns';
const columnsSource = require('!!raw-loader!./columns');
const columnsHtml = renderToHtml(Columns);
const columnsSnippet = `<WuiExpression
  description={description}
  display="columns"
  value={value}
/>`;

import Invalid from './invalid';
const invalidSource = require('!!raw-loader!./invalid');
const invalidHtml = renderToHtml(Invalid);
const invalidSnippet = `<WuiExpression
  description={description}
  isInvalid
  value={value}
/>`;

import Truncate from './truncate';
const truncateSource = require('!!raw-loader!./truncate');
const truncateHtml = renderToHtml(Truncate);
const truncateSnippet = `<WuiExpression
  description={description}
  value={value}
  textWrap="truncate"
/>`;

export const ExpressionExample = {
  title: 'Expression',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: expressionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: expressionHtml,
        },
      ],
      text: (
        <p>
          Use the <strong>WuiExpression</strong> component to surface
          expressions. It requires both a <WuiCode>description</WuiCode> (left
          side) and <WuiCode>value</WuiCode> (right side). Optionally, you can
          pass it an <WuiCode>onClick</WuiCode> function that will convert it to
          a button and add some additional styling to indicate that it is
          clickable.
        </p>
      ),
      props: { WuiExpression },
      snippet: expressionSnippet,
      demo: <Expression />,
    },
    {
      title: 'Colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorHtml,
        },
      ],
      text: (
        <p>
          You can pass a <WuiCode>color</WuiCode> prop but it will only color
          the <WuiCode>description</WuiCode>.
        </p>
      ),
      snippet: colorSnippet,
      demo: <Colors />,
    },
    {
      title: 'Stringing a bunch together',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stringingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stringingHtml,
        },
      ],
      text: (
        <p>
          If the expression is more than one description and value, you can
          string multiple expressions together and they should inline together
          and wrap at logical points.
        </p>
      ),
      snippet: stringingSnippet,
      demo: <Stringing />,
    },
    {
      title: 'Column display',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: columnsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: columnsHtml,
        },
      ],
      text: (
        <div>
          <p>
            There might be cases where displaying multiple{' '}
            <strong>WuiExpression</strong>s in a paragraph is not ideal. For
            example, when both the <WuiCode>description</WuiCode> and the{' '}
            <WuiCode>value</WuiCode> are variable or when their text is quite
            long. To use a column display instead, pass{' '}
            <WuiCode language="ts">{'display="columns"'}</WuiCode>.
          </p>
          <p>
            In column display, each expression is its own line and the{' '}
            <WuiCode>description</WuiCode> column is aligned to the right. The
            default width for the <WuiCode>description</WuiCode> is 20%, but you
            can customize this with the
            <WuiCode>descriptionWidth</WuiCode> prop. When displaying a group of{' '}
            <strong>WuiExpression</strong>s, make sure to set the same width for
            all descriptions.
          </p>
        </div>
      ),
      snippet: columnsSnippet,
      demo: <Columns />,
    },
    {
      title: 'Invalid state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: invalidSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: invalidHtml,
        },
      ],
      text: (
        <p>
          Set <WuiCode>isInvalid</WuiCode> to true to display{' '}
          <strong>WuiExpression</strong>&apos;s error state. This state will
          override the <WuiCode>color</WuiCode> prop with danger.
        </p>
      ),
      snippet: invalidSnippet,
      demo: <Invalid />,
    },
    {
      title: 'Truncate text',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: truncateSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: truncateHtml,
        },
      ],
      text: (
        <p>
          To truncate <strong>WuiExpression</strong>&apos;s content, pass{' '}
          <WuiCode language="ts">{'textWrap="truncate"'}</WuiCode>. Text
          truncation only works properly if the prop types of{' '}
          <WuiCode>description</WuiCode> and <WuiCode>value</WuiCode> are
          strings. If you&apos;re using nodes, use the{' '}
          <WuiCode>.wui-textTruncate</WuiCode> utility class on all their
          sub-children.
        </p>
      ),
      snippet: truncateSnippet,
      demo: <Truncate />,
    },
  ],
  playground: expressionConfig,
};
