import React from 'react';

import {
  WuiCode,
  WuiHideFor,
  WuiShowFor,
  WuiText,
  WuiSpacer,
} from '../../../../src/components';

export default () => (
  <WuiText>
    <WuiHideFor sizes={'none'}>
      <p>
        Hiding from <WuiCode>{'"none"'}</WuiCode> of the screen sizes
      </p>
    </WuiHideFor>
    <WuiHideFor sizes={['xs']}>
      <p>
        Hiding from <WuiCode>xs</WuiCode> screens only
      </p>
    </WuiHideFor>
    <WuiHideFor sizes={['xs', 's']}>
      <p>
        Hiding from <WuiCode>xs, s</WuiCode> screens
      </p>
    </WuiHideFor>
    <WuiHideFor sizes={['xs', 's', 'm', 'l']}>
      <p>
        Hiding from <WuiCode>xs, s, m, l</WuiCode> screens
      </p>
    </WuiHideFor>
    <WuiHideFor sizes={['xl']}>
      <p>
        Hiding from <WuiCode>xl</WuiCode> screens only
      </p>
    </WuiHideFor>

    <WuiSpacer size="xxl" />

    <WuiShowFor sizes={'all'}>
      <p>
        Showing for <WuiCode>{'"all"'}</WuiCode> of the screen sizes
      </p>
    </WuiShowFor>
    <WuiShowFor sizes={['xs']}>
      <p>
        Showing for <WuiCode>xs</WuiCode> screens only
      </p>
    </WuiShowFor>
    <WuiShowFor sizes={['xs', 's']}>
      <p>
        Showing for <WuiCode>xs, s</WuiCode> screens
      </p>
    </WuiShowFor>
    <WuiShowFor sizes={['xs', 's', 'm', 'l']}>
      <p>
        Showing for <WuiCode>xs, s, m, l</WuiCode> screens
      </p>
    </WuiShowFor>
    <WuiShowFor sizes={['xl']}>
      <p>
        Showing for <WuiCode>xl</WuiCode> screen only
      </p>
    </WuiShowFor>
    <WuiShowFor sizes={['m', 'l', 'xl']}>
      <p>
        Showing for <WuiCode>m, l, xl</WuiCode> screen only
      </p>
    </WuiShowFor>
  </WuiText>
);
