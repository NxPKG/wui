/**
 * This demo has been simplified to showcase just the buttons within sections.
 * See the main example for all the menu items.
 */

import React from 'react';

import {
  WuiHeader,
  WuiHeaderLogo,
  WuiHeaderSectionItemButton,
  WuiIcon,
  WuiAvatar,
} from '../../../../src/components';

export default () => {
  const renderLogo = (
    <WuiHeaderLogo
      iconType="logoWazuh"
      href="#"
      onClick={e => e.preventDefault()}
      aria-label="Go to home page"
    />
  );

  const renderSpaces = (
    <WuiHeaderSectionItemButton aria-label="Spaces menu">
      <WuiAvatar type="space" name="Sales Team" size="s" />
    </WuiHeaderSectionItemButton>
  );

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
      href: '#',
      onClick: e => {
        e.preventDefault();
      },
    },
    {
      text: 'Create',
    },
  ];

  const renderSearch = (
    <WuiHeaderSectionItemButton aria-label="Sitewide search">
      <WuiIcon type="search" size="m" />
    </WuiHeaderSectionItemButton>
  );
  const renderUser = (
    <WuiHeaderSectionItemButton aria-label="Account menu">
      <WuiAvatar name="John Username" size="s" />
    </WuiHeaderSectionItemButton>
  );

  const renderApps = (
    <WuiHeaderSectionItemButton
      aria-label="Apps menu with 1 new app"
      notification="1">
      <WuiIcon type="apps" size="m" />
    </WuiHeaderSectionItemButton>
  );

  const sections = [
    {
      items: [renderLogo, renderSpaces],
      borders: 'right',
      breadcrumbs: breadcrumbs,
      breadcrumbProps: {
        'aria-label': 'Header sections breadcrumbs',
      },
    },
    {
      items: [renderSearch, renderUser, renderApps],
    },
  ];

  return <WuiHeader sections={sections} />;
};
