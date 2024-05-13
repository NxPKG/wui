import React from 'react';

import {
  WuiSpacer,
  WuiText,
  WuiTextColor,
  WuiTitle,
} from '../../../../src/components';

export default () => (
  <div>
    <WuiTitle>
      <h2>
        <WuiTextColor color="default">You </WuiTextColor>
        <WuiTextColor color="secondary">use </WuiTextColor>
        <WuiTextColor color="accent">it </WuiTextColor>
        <WuiTextColor color="warning">on </WuiTextColor>
        <WuiTextColor color="danger">anything!</WuiTextColor>
      </h2>
    </WuiTitle>

    <WuiSpacer size="l" />

    <WuiText>
      <p>
        <WuiTextColor color="default">Default text color</WuiTextColor>
      </p>
      <p>
        <WuiTextColor color="subdued">Subdued text color</WuiTextColor>
      </p>
      <p>
        <WuiTextColor color="secondary">Secondary text color</WuiTextColor>
      </p>
      <p>
        <WuiTextColor color="accent">Accent text color</WuiTextColor>
      </p>
      <p>
        <WuiTextColor color="warning">Warning text color</WuiTextColor>
      </p>
      <p>
        <WuiTextColor color="danger">Danger text color</WuiTextColor>
      </p>
      <p>
        <span style={{ background: '#222' }}>
          <WuiTextColor color="ghost">
            Ghost text color is always white regardless of theme.
          </WuiTextColor>
        </span>
      </p>
    </WuiText>

    <WuiSpacer />

    <WuiText color="danger">
      <h2>Works on WuiText as well.</h2>
      <p>
        Sometimes you need to color entire blocks of text, no matter what is in
        them. You can always apply color directly (versus using the separated
        component) to make it easy. Links should still{' '}
        <a href="#">properly color</a>.
      </p>
    </WuiText>
  </div>
);
