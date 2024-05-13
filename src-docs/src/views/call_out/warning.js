import React from 'react';

import { WuiCallOut, WuiLink, WuiButton } from '../../../../src/components';

export default () => (
  <WuiCallOut title="Proceed with caution!" color="warning" iconType="help">
    <p>
      Here be dragons. Don&rsquo;t wanna mess with no dragons. And{' '}
      <WuiLink href="#">here&rsquo;s a link</WuiLink>.
    </p>
    <WuiButton href="#" color="warning">
      Link button
    </WuiButton>
  </WuiCallOut>
);
