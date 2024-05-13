import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiMarkdownFormat,
  WuiText,
  WuiSpacer,
} from '../../../../src/components';

import { Link } from 'react-router-dom';

import MarkdownFormat from './markdown_format';
const markdownFormatSource = require('!!raw-loader!./markdown_format');
const markdownFormatHtml = renderToHtml(MarkdownFormat);

import MarkdownFormatSink from './markdown_format_sink';
const markdownFormatSinkSource = require('!!raw-loader!./markdown_format_sink');
const markdownFormatSinkHtml = renderToHtml(MarkdownFormatSink);

export const MarkdownFormatExample = {
  title: 'Markdown format',
  beta: true,
  intro: (
    <Fragment>
      <WuiText>
        <p>
          <strong>WuiMarkdownFormat</strong> is a read-only way to render
          markdown-style content in a page. It is a peer component to{' '}
          <strong>
            <Link to="/editors-syntax/markdown-editor/">WuiMarkdownEditor</Link>
          </strong>{' '}
          and has the ability to be modified by additional{' '}
          <Link to="/editors-syntax/markdown-plugins">markdown plugins</Link>.
        </p>
      </WuiText>
      <WuiSpacer size="xxl" />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownFormatSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownFormatHtml,
        },
      ],
      title: 'Built in plugins',
      text: (
        <p>
          <strong>WuiMarkdownFormat</strong> is a wrapper that will render
          Markdown provided. WuiMarkdownFormat uses{' '}
          <Link to="https://github.com/remarkjs/remark)">Remark</Link> by
          default. The translation layer automatically substitutes raw HTML
          output with their WUI equivilant. This means anchor and code blocks
          will become <strong>WuiLink</strong> and <strong>WuiCodeBlock</strong>{' '}
          components respectively.
        </p>
      ),
      props: {
        WuiMarkdownFormat,
      },
      demo: <MarkdownFormat />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownFormatSinkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownFormatSinkHtml,
        },
      ],
      title: 'Kitchen sink',
      text: (
        <p>
          This example shows of all the styling and markup possibilities. It is
          mostly used for testing.
        </p>
      ),
      props: {
        WuiMarkdownFormat,
      },
      demo: <MarkdownFormatSink />,
    },
  ],
};
