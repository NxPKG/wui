import React, { Fragment } from 'react';
import { WuiComment } from '../../../../src/components/comment_list';
import { WuiText } from '../../../../src/components/text';
import { WuiAvatar } from '../../../../src/components/avatar';
import { WuiCode } from '../../../../src/components/code';

const defaultBody = (
  <WuiText size="s">
    <p>
      This comment and the one below are using the default{' '}
      <WuiCode>timelineIcon</WuiCode>.
    </p>
  </WuiText>
);

const iconStringBody = (
  <WuiText size="s">
    <p>
      This comment passed the string &ldquo;tag&rdquo; to the{' '}
      <WuiCode>timelineIcon</WuiCode> prop.
    </p>
  </WuiText>
);

const customIconBody = (
  <WuiText size="s">
    <p>
      This comment has a custom element as its <WuiCode>timelineIcon</WuiCode>.
    </p>
  </WuiText>
);

export default () => (
  <Fragment>
    <WuiComment
      username="janed"
      event="added a comment"
      timestamp="Jan 1, 2020">
      {defaultBody}
    </WuiComment>
    <WuiComment
      username="pancho1"
      type="update"
      event="edited case"
      timestamp="Jan 3, 2020"
    />
    <WuiComment
      username="janed"
      event="added a comment"
      timestamp="Jan 1, 2020"
      timelineIcon="tag">
      {iconStringBody}
    </WuiComment>
    <WuiComment
      username="juanab"
      event="added a comment"
      timestamp="Jan 3, 2020"
      timelineIcon={
        <WuiAvatar
          imageUrl="https://source.unsplash.com/64x64/?woman"
          size="l"
          name="Juana"
        />
      }>
      {customIconBody}
    </WuiComment>
  </Fragment>
);
