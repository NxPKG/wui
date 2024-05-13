import React, { useState, useEffect } from 'react';

import {
  WuiHeader,
  WuiHeaderLogo,
  WuiHeaderSectionItemButton,
  WuiSwitch,
  WuiSpacer,
  WuiAvatar,
  WuiIcon,
} from '../../../../src/components';

export default () => {
  const [isFixed, setIsFixed] = useState(false);

  const breadcrumbs = [
    {
      text: 'Management',
      href: '#',
      onClick: e => {
        e.preventDefault();
      },
    },
    {
      text: 'Users',
    },
  ];

  /**
   * Docs Note: This additional class is needed only for docs to override the usually single header
   */
  useEffect(() => {
    if (isFixed) document.body.classList.add('wuiBody--headerIsFixed--double');

    return () => {
      document.body.classList.remove('wuiBody--headerIsFixed--double');
    };
  }, [isFixed]);

  const headers = (
    <>
      <WuiHeader
        theme="dark"
        position={isFixed ? 'fixed' : 'static'}
        sections={[
          {
            items: [
              <WuiHeaderLogo mono iconType="logoWazuh">
                Wazuh
              </WuiHeaderLogo>,
            ],
            borders: 'none',
          },
          {
            items: [
              <WuiHeaderSectionItemButton aria-label="Account menu">
                <WuiAvatar name="John Username" size="s" />
              </WuiHeaderSectionItemButton>,
            ],
            borders: 'none',
          },
        ]}
      />
      <WuiHeader
        position={isFixed ? 'fixed' : 'static'}
        sections={[
          {
            items: [
              <WuiHeaderSectionItemButton aria-label="Account menu">
                <WuiAvatar type="space" name="Default Space" size="s" />
              </WuiHeaderSectionItemButton>,
            ],
            breadcrumbs: breadcrumbs,
            borders: 'right',
          },
          {
            items: [
              <WuiHeaderSectionItemButton
                aria-label="News feed: Updates available"
                notification={true}>
                <WuiIcon type="cheer" size="m" />
              </WuiHeaderSectionItemButton>,
            ],
            borders: 'none',
          },
        ]}
      />
    </>
  );

  return (
    <>
      <WuiSwitch
        label={'Make header fixed position'}
        checked={isFixed}
        onChange={e => setIsFixed(e.target.checked)}
      />
      <WuiSpacer />
      {headers}
    </>
  );
};
