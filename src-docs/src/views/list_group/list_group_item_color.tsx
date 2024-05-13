import React from 'react';

import {
  WuiListGroupItem,
  WuiListGroup,
} from '../../../../src/components/list_group';
import { WuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <>
    <WuiListGroup>
      <WuiListGroupItem href="#" label="Inherit by default (xs)" size="xs" />

      <WuiListGroupItem
        onClick={() => {}}
        label="Primary (s)"
        color="primary"
        size="s"
      />

      <WuiListGroupItem href="#" label="Text (m)" color="text" />

      <WuiListGroupItem href="#" label="Subdued (l)" color="subdued" size="l" />
    </WuiListGroup>

    <WuiSpacer size="s" />

    <WuiListGroup style={{ background: 'black' }}>
      <WuiListGroupItem href="#" label="Ghost" color="ghost" />
    </WuiListGroup>
  </>
);
