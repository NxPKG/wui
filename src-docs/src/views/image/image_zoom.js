import React from 'react';

import {
  WuiImage,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => (
  <WuiFlexGroup>
    <WuiFlexItem grow={false}>
      <WuiImage
        size="m"
        hasShadow
        allowFullScreen
        caption="Click me"
        alt="Accessible image alt goes here"
        url="https://source.unsplash.com/2000x1000/?Nature"
      />
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiImage
        size="m"
        hasShadow
        allowFullScreen
        caption="Click me"
        alt="Accessible image alt goes here"
        fullScreenIconColor="dark"
        url="https://source.unsplash.com/1000x2000/?Nature"
      />
    </WuiFlexItem>
  </WuiFlexGroup>
);
