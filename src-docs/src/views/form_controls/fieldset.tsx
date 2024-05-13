import React from 'react';

import { WuiFormFieldset } from '../../../../src/components/form/form_fieldset';
import { WuiSwitch } from '../../../../src/components/form/switch';
import { WuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <WuiFormFieldset legend={{ children: 'Enable these objects' }}>
    <WuiSwitch label="Object 1" onChange={() => {}} checked={false} />
    <WuiSpacer size="s" />
    <WuiSwitch label="Object 2" onChange={() => {}} checked={true} />
  </WuiFormFieldset>
);
