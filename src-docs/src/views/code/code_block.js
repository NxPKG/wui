import React from 'react';

import { WuiCodeBlock, WuiSpacer } from '../../../../src/components';

const htmlCode = require('!!raw-loader!./code_examples/example.html').default;

const jsCode = require('!!raw-loader!./code_examples/example.js').default;

const sqlCode = require('!!raw-loader!./code_examples/example.sql').default;

export default () => (
  <div>
    <WuiCodeBlock language="html">{htmlCode}</WuiCodeBlock>

    <WuiSpacer />

    <WuiCodeBlock
      language="js"
      fontSize="m"
      paddingSize="m"
      overflowHeight={300}
      isCopyable>
      {jsCode}
    </WuiCodeBlock>

    <WuiSpacer />

    <WuiCodeBlock
      language="sql"
      fontSize="m"
      paddingSize="m"
      overflowHeight={300}
      isCopyable>
      {sqlCode}
    </WuiCodeBlock>
  </div>
);
