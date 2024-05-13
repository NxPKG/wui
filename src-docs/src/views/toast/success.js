import React from 'react';

import {
  WuiButton,
  WuiLink,
  WuiToast,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => (
  <WuiToast
    title="Created report for dashboard 'Tuba Sales by Region'"
    color="success"
    iconType="check">
    <p>
      While the layout will adjust properly for wrapping titles, they do not
      look particularly good. Similarily, do not use a whole lot of text in your
      body either. At a certain point people will not have enough time to read
      these things. Like, you probably are not even reading this now.
    </p>

    <p>
      And some other stuff on another line, just for kicks. And{' '}
      <WuiLink href="#">here&rsquo;s a link</WuiLink>.
    </p>

    <WuiFlexGroup justifyContent="flexEnd" gutterSize="s">
      <WuiFlexItem grow={false}>
        <WuiButton size="s">Download report</WuiButton>
      </WuiFlexItem>
    </WuiFlexGroup>
  </WuiToast>
);
