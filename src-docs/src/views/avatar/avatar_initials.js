import React from 'react';

import { WuiAvatar, WuiTitle, WuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <WuiTitle size="xs">
      <h3>Single vs multi-word</h3>
    </WuiTitle>
    <WuiSpacer />
    <WuiAvatar size="m" name="Single" />
    &emsp;
    <WuiAvatar size="m" name="Two Words" />
    &emsp;
    <WuiAvatar size="m" name="More Than Two Words" />
    &emsp;
    <WuiAvatar size="m" name="lowercase words" />
    <WuiSpacer />
    <WuiTitle size="xs">
      <h4>Custom &amp; Spaces type</h4>
    </WuiTitle>
    <WuiSpacer />
    <WuiAvatar size="m" type="space" name="Wazuh" initialsLength={2} />
    &emsp;
    <WuiAvatar size="m" type="space" name="Leonardo Dude" initialsLength={1} />
    &emsp;
    <WuiAvatar size="m" type="space" name="Not provided" initials="?" />
    &emsp;
    <WuiAvatar
      size="m"
      type="space"
      name="Engineering Space"
      initials="En"
      initialsLength={2}
    />
  </div>
);
