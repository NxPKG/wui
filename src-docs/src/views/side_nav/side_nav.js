import React, { useState } from 'react';

import { WuiSideNav } from '../../../../src/components';

export default () => {
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const sideNav = [
    {
      name: 'Wazuh',
      id: 0,
      items: [
        {
          name: 'Advanced settings',
          id: 1,
          onClick: () => {
            window.alert('Advanced settings');
          },
        },
        {
          name: 'Index Patterns (link)',
          id: 2,
          href: 'http://www.wazuh.com',
        },
        {
          name: 'Saved Objects',
          id: 3,
          onClick: () => {
            window.alert('Saved Objects');
          },
          isSelected: true,
        },
        {
          name: 'Reporting',
          id: 4,
          onClick: () => {
            window.alert('Reporting');
          },
        },
      ],
    },
  ];

  return (
    <WuiSideNav
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={() => toggleOpenOnMobile()}
      isOpenOnMobile={isSideNavOpenOnMobile}
      style={{ width: 192 }}
      items={sideNav}
    />
  );
};
