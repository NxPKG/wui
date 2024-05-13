import React from 'react';

import { WuiText, WuiTextAlign, WuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <WuiText>
      <WuiTextAlign textAlign="left">
        <p>Left aligned paragraph.</p>
      </WuiTextAlign>
      <WuiTextAlign textAlign="center">
        <p>Center aligned paragraph.</p>
      </WuiTextAlign>
      <WuiTextAlign textAlign="right">
        <p>Right aligned paragraph.</p>
      </WuiTextAlign>
    </WuiText>
    <WuiSpacer />
    <WuiText textAlign="center">
      <p>
        You can also pass alignment to <strong>WuiText</strong> directly with a
        prop
      </p>
    </WuiText>
    <WuiText textAlign="center" color="secondary">
      <p>And in conjunction with coloring.</p>
    </WuiText>
  </div>
);
