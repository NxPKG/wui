import React, { useState } from 'react';

import {
  WuiCopy,
  WuiButton,
  WuiFieldText,
  WuiSpacer,
  WuiFormRow,
} from '../../../../src/components/';

export default () => {
  const [copyText, setCopyText] = useState('I am the text that will be copied');

  const onChange = e => {
    setCopyText(e.target.value);
  };

  return (
    <div>
      <WuiFormRow label="Enter text that will be copied to clipboard">
        <WuiFieldText value={copyText} onChange={onChange} />
      </WuiFormRow>

      <WuiSpacer size="m" />

      <WuiCopy textToCopy={copyText}>
        {copy => <WuiButton onClick={copy}>Click to copy input text</WuiButton>}
      </WuiCopy>
    </div>
  );
};
