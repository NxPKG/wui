import React, { Fragment } from 'react';

import {
  WuiAspectRatio,
  WuiSpacer,
  WuiTitle,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <WuiTitle size="s">
      <p>16x9 aspect</p>
    </WuiTitle>
    <WuiSpacer size="s" />
    <WuiAspectRatio width={16} height={9}>
      <iframe
        title="Wazuh is a search company"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/yJarWSLRM24"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </WuiAspectRatio>
    <WuiSpacer size="xl" />
    <WuiTitle size="s">
      <p>4x3 aspect</p>
    </WuiTitle>
    <WuiSpacer size="s" />
    <WuiAspectRatio width={4} height={3}>
      <iframe
        title="Wazuh is a search company"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/yJarWSLRM24"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </WuiAspectRatio>
    <WuiSpacer size="xl" />
    <WuiTitle size="s">
      <p>220x150 with a maxWidth set to 500</p>
    </WuiTitle>
    <WuiSpacer size="s" />
    <WuiAspectRatio width={220} height={150} maxWidth={500}>
      <iframe
        src="https://app.stitcher.com/splayer/f/13377/54057816"
        title="something"
        frameBorder="0"
        scrolling="no"
      />
    </WuiAspectRatio>
  </Fragment>
);
