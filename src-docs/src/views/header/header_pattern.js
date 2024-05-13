import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Uncomment to use in consuming apps or CodeSandbox
// import theme from '@wazuh/wui/dist/wui_theme_light.json';

import {
  WuiAvatar,
  WuiBadge,
  WuiButton,
  WuiCollapsibleNav,
  WuiCollapsibleNavGroup,
  WuiFlexItem,
  WuiFlyout,
  WuiFlyoutBody,
  WuiFlyoutHeader,
  WuiFocusTrap,
  WuiHeader,
  WuiHeaderLink,
  WuiHeaderLinks,
  WuiHeaderLogo,
  WuiHeaderSectionItemButton,
  WuiIcon,
  WuiListGroupItem,
  WuiPage,
  WuiPopover,
  WuiPortal,
  WuiShowFor,
  WuiText,
  WuiTitle,
  WuiSelectableTemplateSitewide,
  WuiSelectableMessage,
} from '../../../../src/components';

export default ({ theme }) => {
  /**
   * FullScreen for docs only
   */
  const [fullScreen, setFullScreen] = useState(false);
  useEffect(() => {
    if (fullScreen) {
      document.body.classList.add('guideBody--overflowHidden');
      document.body.classList.add('wuiBody--headerIsFixed--double');
    }
    return () => {
      document.body.classList.remove('guideBody--overflowHidden');
      document.body.classList.remove('wuiBody--headerIsFixed--double');
    };
  }, [fullScreen]);

  /**
   * Collapsible Nav
   */
  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );
  const collapsibleNav = (
    <WuiCollapsibleNav
      id="guideHeaderCollapsibleNavExample"
      aria-label="Main navigation"
      isOpen={navIsOpen}
      isDocked={navIsDocked}
      button={
        <WuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}>
          <WuiIcon type={'menu'} size="m" aria-hidden="true" />
        </WuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}>
      <WuiFlexItem className="wui-yScroll">
        {/* Docs callout */}
        <WuiCollapsibleNavGroup background="none" title="WuiCollapsibleNav">
          <WuiText size="s" color="subdued" style={{ padding: '0 8px 8px' }}>
            <p>
              Please see the component page for{' '}
              <Link to="/navigation/collapsible-nav">
                <strong>WuiCollapsibleNav</strong>
              </Link>{' '}
              on how to configure your navigation.
            </p>
          </WuiText>
        </WuiCollapsibleNavGroup>
      </WuiFlexItem>
      <WuiFlexItem grow={false}>
        {/* Docking button only for larger screens that can support it*/}
        <WuiShowFor sizes={['l', 'xl']}>
          <WuiCollapsibleNavGroup>
            <WuiListGroupItem
              size="xs"
              color="subdued"
              label={`${navIsDocked ? 'Undock' : 'Dock'} navigation`}
              onClick={() => {
                setNavIsDocked(!navIsDocked);
                localStorage.setItem(
                  'navIsDocked',
                  JSON.stringify(!navIsDocked)
                );
              }}
              iconType={navIsDocked ? 'lock' : 'lockOpen'}
            />
          </WuiCollapsibleNavGroup>
        </WuiShowFor>
      </WuiFlexItem>
    </WuiCollapsibleNav>
  );

  /**
   * Header Alerts
   */
  const [isAlertFlyoutVisible, setIsAlertFlyoutVisible] = useState(false);
  const headerAlerts = (
    <WuiPortal>
      <WuiFlyout
        onClose={() => setIsAlertFlyoutVisible(false)}
        size="s"
        id="guideHeaderAlertExample"
        aria-labelledby="guideHeaderAlertExampleTitle">
        <WuiFlyoutHeader hasBorder>
          <WuiTitle size="s">
            <h2 id="guideHeaderAlertExampleTitle">WuiHeaderAlert</h2>
          </WuiTitle>
        </WuiFlyoutHeader>
        <WuiFlyoutBody>
          <WuiText size="s" color="subdued">
            <p>
              Please see the component page for{' '}
              <Link to="/layout/header">
                <strong>WuiHeaderAlert</strong>
              </Link>{' '}
              on how to configure your alerts.
            </p>
          </WuiText>
        </WuiFlyoutBody>
      </WuiFlyout>
    </WuiPortal>
  );

  /**
   * User Menu
   */
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const userMenu = (
    <WuiPopover
      id="guideHeaderUserMenuExample"
      ownFocus
      repositionOnScroll
      button={
        <WuiHeaderSectionItemButton
          aria-controls="guideHeaderUserMenuExample"
          aria-expanded={isUserMenuVisible}
          aria-haspopup="true"
          aria-label="User menu"
          onClick={() => setIsUserMenuVisible(!isUserMenuVisible)}>
          <WuiAvatar name="John Username" size="s" />
        </WuiHeaderSectionItemButton>
      }
      isOpen={isUserMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsUserMenuVisible(false)}>
      <div style={{ width: 320 }}>
        <WuiText size="s" color="subdued">
          <p>
            Please see the component page for{' '}
            <Link to="/layout/header">
              <strong>WuiHeader</strong>
            </Link>{' '}
            on how to configure your user menu.
          </p>
        </WuiText>
      </div>
    </WuiPopover>
  );

  /**
   * Spaces Menu
   */
  const [isSpacesMenuVisible, setIsSpacesMenuVisible] = useState(false);
  const spacesMenu = (
    <WuiPopover
      id="guideHeaderSpacesMenuExample"
      ownFocus
      repositionOnScroll
      button={
        <WuiHeaderSectionItemButton
          aria-controls="guideHeaderSpacesMenuExample"
          aria-expanded={isSpacesMenuVisible}
          aria-haspopup="true"
          aria-label="Spaces menu"
          onClick={() => setIsSpacesMenuVisible(!isSpacesMenuVisible)}>
          <WuiAvatar type="space" name="Default Space" size="s" />
        </WuiHeaderSectionItemButton>
      }
      isOpen={isSpacesMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsSpacesMenuVisible(false)}>
      <div style={{ width: 320 }}>
        <WuiText size="s" color="subdued">
          <p>
            Please see the component page for{' '}
            <Link to="/layout/header">
              <strong>WuiHeader</strong>
            </Link>{' '}
            on how to configure your spaces menu.
          </p>
        </WuiText>
      </div>
    </WuiPopover>
  );

  /**
   * Deployment Menu
   */
  const [isDeploymentMenuVisible, setIsDeploymentMenuVisible] = useState(false);
  const deploymentMenu = (
    <WuiPopover
      id="guideHeaderDeploymentMenuExample"
      ownFocus
      repositionOnScroll
      button={
        <WuiBadge
          color={theme.wuiColorDarkestShade.rgba}
          iconType="arrowDown"
          iconSide="right"
          aria-controls="guideHeaderDeploymentMenuExample"
          aria-expanded={isDeploymentMenuVisible}
          aria-haspopup="true"
          onClickAriaLabel="Current deployment: Production logs. Click to open deployment menu."
          onClick={() => setIsDeploymentMenuVisible(!isDeploymentMenuVisible)}>
          Production logs
        </WuiBadge>
      }
      isOpen={isDeploymentMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsDeploymentMenuVisible(false)}>
      <WuiText size="s" color="subdued">
        <p>Deployment menu pattern TBD</p>
      </WuiText>
    </WuiPopover>
  );

  /**
   * Sitewide search
   */
  const search = (
    <WuiSelectableTemplateSitewide
      options={[]}
      searchProps={{
        append: '⌘K',
        compressed: true,
      }}
      popoverButton={
        <WuiHeaderSectionItemButton aria-label="Sitewide search">
          <WuiIcon type="search" size="m" />
        </WuiHeaderSectionItemButton>
      }
      popoverButtonBreakpoints={['xs', 's']}
      popoverProps={{
        repositionOnScroll: true, // Necessary when placing search in a fixed component
      }}
      emptyMessage={
        <WuiSelectableMessage style={{ minHeight: 300 }}>
          <p>
            Please see the component page for{' '}
            <Link to="/forms/selectable">
              <strong>WuiSelectableTemplateSitewide</strong>
            </Link>{' '}
            on how to configure your sitewide search.
          </p>
        </WuiSelectableMessage>
      }
    />
  );

  return (
    <>
      <WuiButton onClick={() => setFullScreen(true)} iconType="fullScreen">
        Show fullscreen demo
      </WuiButton>
      {/* FocusTrap for Docs only */}
      {fullScreen && (
        <WuiFocusTrap>
          <WuiHeader
            theme="dark"
            position="fixed"
            sections={[
              {
                items: [
                  <WuiHeaderLogo iconType="logoWazuh" href="">
                    Wazuh
                  </WuiHeaderLogo>,
                  deploymentMenu,
                ],
                borders: 'none',
              },
              {
                items: [
                  <WuiShowFor sizes={['m', 'l', 'xl']}>{search}</WuiShowFor>,
                ],
                borders: 'none',
              },
              {
                items: [
                  <WuiShowFor sizes={['xs', 's']}>{search}</WuiShowFor>,
                  <WuiHeaderSectionItemButton
                    notification={true}
                    aria-label="Notifications: Updates available"
                    onClick={() =>
                      setIsAlertFlyoutVisible(!isAlertFlyoutVisible)
                    }>
                    <WuiIcon type="cheer" size="m" />
                  </WuiHeaderSectionItemButton>,
                  userMenu,
                ],
                borders: 'none',
              },
            ]}
          />
          <WuiHeader
            position="fixed"
            sections={[
              {
                items: [collapsibleNav, spacesMenu],
                breadcrumbs: [
                  {
                    text: 'Management',
                    onClick: () => {},
                  },
                  {
                    text: 'Users',
                  },
                ],
                borders: 'right',
              },
              {
                items: [
                  <WuiHeaderLinks
                    popoverProps={{
                      repositionOnScroll: true, // Necessary when placing search in a fixed component
                    }}>
                    <WuiHeaderLink color="primary">Share</WuiHeaderLink>
                    <WuiHeaderLink color="primary">Clone</WuiHeaderLink>
                    <WuiButton
                      iconType="minimize"
                      style={{ minWidth: 80 }}
                      size="s"
                      color="primary"
                      onClick={() => {
                        setFullScreen(false);
                        document.body.classList.remove(
                          'wuiBody--headerIsFixed--double'
                        );
                      }}>
                      Exit full screen
                    </WuiButton>
                  </WuiHeaderLinks>,
                ],
              },
            ]}
          />

          {isAlertFlyoutVisible ? headerAlerts : null}

          <WuiPage className="guideFullScreenOverlay" />
        </WuiFocusTrap>
      )}
    </>
  );
};
