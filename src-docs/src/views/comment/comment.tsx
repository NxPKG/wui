import React from 'react';
import { WuiComment } from '../../../../src/components/comment_list';
import { WuiButtonIcon } from '../../../../src/components/button';
import { WuiText } from '../../../../src/components/text';

const body = (
  <WuiText size="s">
    <p>
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
    </p>
  </WuiText>
);

const copyAction = (
  <WuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="subdued"
    iconType="copy"
  />
);

export default () => (
  <div>
    <WuiComment
      username="janed"
      event="added a comment"
      actions={copyAction}
      timestamp="on Jan 1, 2020">
      {body}
    </WuiComment>
  </div>
);
