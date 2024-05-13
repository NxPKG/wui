import React from 'react';

/**
 * Docs note: Consuming apps should import the theme via the export json file
 * import theme from '@wazuh/wui/dist/wui_theme_light.json';
 */

import {
  WuiHeader,
  WuiHeaderLogo,
  WuiHeaderLinks,
  WuiHeaderLink,
  WuiHeaderSectionItemButton,
} from '../../../../src/components/header';
import { WuiBadge } from '../../../../src/components/badge';
import { WuiIcon } from '../../../../src/components/icon';
import { WuiAvatar } from '../../../../src/components/avatar';

export default ({ theme }: { theme: any }) => (
  <WuiHeader
    theme="dark"
    sections={[
      {
        items: [
          <WuiHeaderLogo>Wazuh</WuiHeaderLogo>,
          <WuiHeaderLinks aria-label="App navigation dark theme example">
            <WuiHeaderLink isActive>Docs</WuiHeaderLink>
            <WuiHeaderLink>Code</WuiHeaderLink>
            <WuiHeaderLink iconType="help"> Help</WuiHeaderLink>
          </WuiHeaderLinks>,
        ],
        borders: 'right',
      },
      {
        items: [
          <WuiBadge
            color={theme.wuiColorDarkestShade.rgba}
            iconType="arrowDown"
            iconSide="right">
            Production logs
          </WuiBadge>,
          <WuiHeaderSectionItemButton
            aria-label="2 Notifications"
            notification={'2'}>
            <WuiIcon type="cheer" size="m" />
          </WuiHeaderSectionItemButton>,
          <WuiHeaderSectionItemButton aria-label="Account menu">
            <WuiAvatar name="John Username" size="s" />
          </WuiHeaderSectionItemButton>,
        ],
        borders: 'none',
      },
    ]}
  />
);
