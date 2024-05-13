import React from 'react';

import { WuiAvatar, WuiSpacer, WuiTitle } from '../../../../src/components';

export default () => (
  <div>
    <WuiAvatar size="s" name="Raphael" />
    &emsp;
    <WuiAvatar size="m" name="Donatello" />
    &emsp;
    <WuiAvatar size="l" name="Leonardo" color="#BD10E0" />
    &emsp;
    <WuiAvatar size="xl" name="Michelangelo" />
    <WuiSpacer />
    <WuiTitle size="xs">
      <h2>With image</h2>
    </WuiTitle>
    <WuiSpacer />
    <WuiAvatar
      size="s"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
    />
    &emsp;
    <WuiAvatar
      size="m"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
    />
    &emsp;
    <WuiAvatar
      size="l"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
    />
    &emsp;
    <WuiAvatar
      size="xl"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
    />
  </div>
);
