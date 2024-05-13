import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiMarkdownEditor,
  WuiText,
  WuiSpacer,
  WuiCode,
} from '../../../../src/components';

import { Link } from 'react-router-dom';

import MarkdownEditor from './markdown_editor';
const markdownEditorSource = require('!!raw-loader!./markdown_editor');
const markdownEditorHtml = renderToHtml(MarkdownEditor);

import MarkdownEditorErrors from './markdown_editor_errors';
const markdownEditorErrorsSource = require('!!raw-loader!./markdown_editor_errors');
const markdownEditorErrorsHtml = renderToHtml(MarkdownEditorErrors);

export const MarkdownEditorExample = {
  title: 'Markdown editor',
  beta: true,
  intro: (
    <Fragment>
      <WuiText>
        <p>
          <strong>WuiMarkdownEditor</strong> provides a markdown authoring
          experience for the user. The component consists of a toolbar, text
          area, and a drag-and-drop zone to accept files (if configured to do
          so). There are two modes: a textarea that keeps track of cursor
          position, and a rendered preview mode that is powered by{' '}
          <strong>
            <Link to="/editors-syntax/markdown-format/">WuiMarkdownFormat</Link>
          </strong>
          . State is maintained between the two and it is possible to pass
          changes from the preview area to the textarea and vice versa.
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
          code: markdownEditorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownEditorHtml,
        },
      ],
      title: 'Base editor',
      text: (
        <p>
          The base editor can render basic markdown along with some built-in
          plugins.
        </p>
      ),
      props: {
        WuiMarkdownEditor,
      },
      demo: <MarkdownEditor />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownEditorErrorsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownEditorErrorsHtml,
        },
      ],
      title: 'Error handling and feedback',
      text: (
        <p>
          The <WuiCode>errors</WuiCode> prop allows you to pass an array of
          errors if syntax is malformed. The below example starts with an
          incomplete tooltip tag, showing this error message by default. These
          errors are meant to be ephemeral and part of the editing experience.
          They should not be a substitute for{' '}
          <Link to="/forms/form-validation">form validation</Link>.
        </p>
      ),
      props: {
        WuiMarkdownEditor,
      },
      demo: <MarkdownEditorErrors />,
    },
  ],
};
