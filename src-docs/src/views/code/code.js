import React from 'react';

import { WuiCode, WuiText } from '../../../../src/components';

const htmlCode = `<!--I'm an example of HTML-->
<div>
  asdf
</div>
`;

export default () => (
  <WuiText>
    <p>
      Sometimes you need to emphasize <WuiCode>code</WuiCode> like this.
    </p>
    <p>
      You can also pass a language in like{' '}
      <WuiCode language="html">{htmlCode.trim()}</WuiCode>.
    </p>
    <p>
      Make the background transparent like this{' '}
      <WuiCode language="html" transparentBackground>
        {htmlCode.trim()}
      </WuiCode>
      .
    </p>
  </WuiText>
);
