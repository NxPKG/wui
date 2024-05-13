import React from 'react';
import { WuiComment } from '../../../../src/components/comment_list';
import { WuiText } from '../../../../src/components/text';
import { WuiCode } from '../../../../src/components/code';

const body = (
  <WuiText size="s">
    <p>
      This is the body of a comment of type <WuiCode>regular</WuiCode>
    </p>
  </WuiText>
);

const bodyUpdate = (
  <WuiText size="s">
    <p>
      Comments of type <WuiCode>update</WuiCode> can also have a body
    </p>
  </WuiText>
);

export default () => (
  <div>
    <WuiComment username="andred" event="added a comment" timestamp="yesterday">
      {body}
    </WuiComment>
    <WuiComment
      username="luisg"
      type="update"
      event="edited case"
      timestamp="22 hours ago"
    />
    <WuiComment
      username="milal"
      type="update"
      event="edited case"
      timestamp="6 hours ago">
      {bodyUpdate}
    </WuiComment>
  </div>
);
