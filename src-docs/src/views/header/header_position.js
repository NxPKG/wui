import React, { useState } from 'react';

import {
  WuiHeader,
  WuiHeaderLogo,
  WuiSwitch,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const [position, setPosition] = useState('static');

  const sections = [
    {
      items: [<WuiHeaderLogo>Wazuh</WuiHeaderLogo>],
      borders: 'right',
    },
  ];

  return (
    <>
      <WuiSwitch
        label={'Make header fixed position'}
        checked={position === 'fixed'}
        onChange={e => setPosition(e.target.checked ? 'fixed' : 'static')}
      />
      <WuiSpacer />
      <WuiHeader position={position} sections={sections} />
    </>
  );
};
