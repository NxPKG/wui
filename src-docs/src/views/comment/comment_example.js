import React from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiComment,
  WuiCommentList,
} from '../../../../src/components';
import commentConfig from './playground';

import Comment from './comment';
const commentSource = require('!!raw-loader!./comment');
const commentHtml = renderToHtml(Comment);

import CommentTypes from './comment_types';
const commentTypesSource = require('!!raw-loader!./comment_types');
const commentTypesHtml = renderToHtml(CommentTypes);

import CommentTimelineIcons from './comment_timelineIcons';
const commentTimelineIconsSource = require('!!raw-loader!./comment_timelineIcons');
const commentTimelineIconsHtml = renderToHtml(CommentTimelineIcons);

import CommentActions from './comment_actions';
const commentActionsSource = require('!!raw-loader!./comment_actions');
const commentActionsHtml = renderToHtml(CommentActions);

import CommentList from './comment_list';
const commentListSource = require('!!raw-loader!./comment_list');
const commentListHtml = renderToHtml(CommentList);

const commentSnippet = `<WuiComment username="janed">
  {body}
</WuiComment>`;

const commentTypesSnippet = [
  `<WuiComment username="janed">
  {body}
</WuiComment>
`,
  `<WuiComment type="update" username="janed" />
`,
  `<WuiComment type="update" username="janed">
  {body}
</WuiComment>
`,
];

const commentTimelineIconsSnippet = [
  `<WuiComment username="janed">
  {body}
</WuiComment>
`,
  `<WuiComment timelineIcon="tag" username="janed" />
`,
  `<WuiComment timelineIcon={avatar} username="janed">
  {body}
</WuiComment>
`,
];

const commentActionsSnippet = `<WuiComment username="janed" actions={customActions}>
  {body}
</WuiComment>`;

const commentListSnippet = `<WuiCommentList 
  comments={[
    {
      username: username,
      event: event,
      timestamp: timestamp,
      children: body,
    },
]}
/>`;

export const CommentListExample = {
  title: 'Comment list',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentListSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentListHtml,
        },
      ],
      text: (
        <div>
          Use <strong>WuiCommentList</strong> to display a list of{' '}
          <strong>WuiComments</strong>. Pass an array of{' '}
          <strong>WuiComment</strong> objects and{' '}
          <strong>WuiCommentList</strong> will generate a comment thread.
        </div>
      ),
      props: { WuiCommentList, WuiComment },
      snippet: commentListSnippet,
      demo: <CommentList />,
    },
    {
      title: 'Comment',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use <strong>WuiComment</strong> to display comments. Each{' '}
            <strong>WuiComment</strong> has two parts: a{' '}
            <WuiCode>timelineIcon</WuiCode> on the left and content on the
            right. The <WuiCode>timelineIcon</WuiCode> provides a visual
            indication of the <WuiCode>type</WuiCode> of comment it is. For
            example, it can be an icon that represents what action was performed
            or it can be a user avatar. The content has a header with all the
            relevant metadata and a body.
          </p>
        </div>
      ),
      props: { WuiComment },
      snippet: commentSnippet,
      demo: <Comment />,
    },
    {
      title: 'Comment types',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentTypesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentTypesHtml,
        },
      ],
      text: (
        <div>
          <p>
            The default <WuiCode>type</WuiCode> of comment is
            <WuiCode>regular</WuiCode> and displays a comment that a user has
            written.
          </p>
          <p>
            Change the type to <WuiCode>update</WuiCode> to display comments
            that generally do not have a body and are logging actions that
            either the user or the system has performed (e.g. &ldquo;jsmith
            edited a case&rdquo; or &ldquo;wazuhmachine added the review
            label&rdquo;).
          </p>
        </div>
      ),
      props: { WuiComment },
      snippet: commentTypesSnippet,
      demo: <CommentTypes />,
    },
    {
      title: 'Custom timeline icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentTimelineIconsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentTimelineIconsHtml,
        },
      ],
      text: (
        <div>
          <p>
            There are three ways to use <WuiCode>timelineIcon</WuiCode>:
          </p>
          <ol>
            <li>
              Use the defaults; a user icon inside a large container for
              <WuiCode>regular</WuiCode> comments; or a dot icon inside a small
              container for <WuiCode>update</WuiCode> comments.
            </li>
            <li>
              Pass a string with any of the icon types that{' '}
              <strong>WuiIcon</strong> supports and it will receive the default
              styling.
            </li>
            <li>
              Pass any other element (e.g.{' '}
              <Link to="/display/avatar">
                <strong>WuiAvatar</strong>
              </Link>
              ). It is recommended not to use an element larger than 40x40.
            </li>
          </ol>
        </div>
      ),
      props: { WuiComment },
      snippet: commentTimelineIconsSnippet,
      demo: <CommentTimelineIcons />,
    },
    {
      title: 'Actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentActionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentActionsHtml,
        },
      ],
      text: (
        <div>
          <p>
            There are scenarios where you might want to allow the user to
            perform <WuiCode>actions</WuiCode> related to each comment. Some
            common <WuiCode>actions</WuiCode> include: editing, deleting,
            sharing and copying. To add custom <WuiCode>actions</WuiCode> to a
            comment, use the <WuiCode>actions</WuiCode>
            prop. These will be placed to the right of the metadata in the
            comment&apos;s header. You can use any element to display{' '}
            <WuiCode>actions</WuiCode>. For example, for something simple you
            can use{' '}
            <Link to="/navigation/button">
              <strong>WuiButtonIcon</strong>
            </Link>{' '}
            and for something more complex you can combine that with{' '}
            <Link to="/layout/popover">
              <strong>WuiPopover</strong>
            </Link>{' '}
            and{' '}
            <Link to="/navigation/context-menu">
              <strong>WuiContextMenu</strong>
            </Link>
            .
          </p>
        </div>
      ),
      props: { WuiComment },
      snippet: commentActionsSnippet,
      demo: <CommentActions />,
    },
  ],
  playground: commentConfig,
};
