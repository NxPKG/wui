import React from 'react';

import { WuiImage, WuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <WuiImage
      hasShadow
      allowFullScreen
      size={50}
      caption="Custom size (50)"
      alt="Accessible image alt goes here"
      url="https://source.unsplash.com/1000x1000/?Nature"
    />
    <WuiSpacer />
    <WuiImage
      size="s"
      hasShadow
      allowFullScreen
      caption="Small"
      alt="Accessible image alt goes here"
      url="https://source.unsplash.com/1000x1000/?Nature"
    />
    <WuiSpacer />
    <WuiImage
      size="m"
      hasShadow
      allowFullScreen
      caption="Medium"
      alt="Accessible image alt goes here"
      url="https://source.unsplash.com/1000x1000/?Nature"
    />
    <WuiSpacer />
    <WuiImage
      size="l"
      hasShadow
      allowFullScreen
      caption="Large"
      alt="Accessible image alt goes here"
      url="https://source.unsplash.com/1000x1000/?Nature"
    />
    <WuiSpacer />
    <WuiImage
      size="xl"
      hasShadow
      allowFullScreen
      caption="Extra large"
      alt="Accessible image alt goes here"
      url="https://source.unsplash.com/1000x1000/?Nature"
    />
    <WuiSpacer />
    <WuiImage
      hasShadow
      allowFullScreen
      caption="Original"
      alt="Accessible image alt goes here"
      url="https://source.unsplash.com/1000x1000/?Nature"
    />
    <WuiSpacer />
    <WuiImage
      hasShadow
      allowFullScreen
      size="fullWidth"
      caption="Full width"
      alt="Accessible image alt goes here"
      url="https://source.unsplash.com/1000x1000/?Nature"
    />
  </div>
);
