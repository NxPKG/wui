import React, { useState } from 'react';

import {
  WuiAvatar,
  WuiBadge,
  WuiButtonEmpty,
  WuiFlexGroup,
  WuiFlexItem,
  WuiFlyout,
  WuiFlyoutBody,
  WuiFlyoutFooter,
  WuiFlyoutHeader,
  WuiHeader,
  WuiHeaderAlert,
  WuiHeaderLogo,
  WuiHeaderSection,
  WuiHeaderSectionItem,
  WuiHeaderSectionItemButton,
  WuiIcon,
  WuiLink,
  WuiPopover,
  WuiPopoverFooter,
  WuiPopoverTitle,
  WuiPortal,
  WuiSpacer,
  WuiSwitch,
  WuiText,
  WuiTitle,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [position, setPosition] = useState('static');

  return (
    <>
      <WuiSwitch
        label={'Make header fixed position and put alerts in flyout'}
        checked={position === 'fixed'}
        onChange={e => setPosition(e.target.checked ? 'fixed' : 'static')}
      />
      <WuiSpacer />
      <WuiHeader position={position}>
        <WuiHeaderSection grow={false}>
          <WuiHeaderSectionItem border="right">
            <WuiHeaderLogo>Wazuh</WuiHeaderLogo>
          </WuiHeaderSectionItem>
        </WuiHeaderSection>

        <WuiHeaderSection side="right">
          <WuiHeaderSectionItem>
            <HeaderUpdates
              flyoutOrPopover={position === 'fixed' ? 'flyout' : 'popover'}
            />
          </WuiHeaderSectionItem>
          <WuiHeaderSectionItem>
            <HeaderUserMenu />
          </WuiHeaderSectionItem>
        </WuiHeaderSection>
      </WuiHeader>
    </>
  );
};

const HeaderUpdates = ({ flyoutOrPopover = 'flyout' }) => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const alerts = [
    {
      title: 'Control access to features',
      text: 'Show or hide applications and features per space.',
      action: <WuiLink href="">Learn about feature controls</WuiLink>,
      date: '1 May 2019',
      badge: <WuiBadge>7.1</WuiBadge>,
    },
    {
      title: 'Rollups made simple',
      text:
        'Save space and preserve the integrity of your data directly in the UI.',
      action: (
        <WuiLink target="_blank" external href="https://www.wazuh.com">
          Read the blog
        </WuiLink>
      ),
      date: '10 January 2019',
      badge: <WuiBadge color="hollow">6.5</WuiBadge>,
    },
  ];

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  const showFlyout = () => {
    setShowBadge(false);
    setIsFlyoutVisible(!isFlyoutVisible);
  };

  const button = (
    <WuiHeaderSectionItemButton
      aria-controls="headerNewsFeed"
      aria-expanded={isFlyoutVisible}
      aria-haspopup="true"
      aria-label={`News feed: ${
        showBadge ? 'Updates available' : 'No updates'
      }`}
      onClick={() => showFlyout()}
      notification={showBadge}>
      <WuiIcon type="cheer" size="m" />
    </WuiHeaderSectionItemButton>
  );

  let content;
  if (flyoutOrPopover === 'flyout') {
    content = (
      <>
        {button}
        {isFlyoutVisible && (
          <WuiPortal>
            <WuiFlyout
              onClose={() => closeFlyout()}
              size="s"
              id="headerNewsFeed"
              aria-labelledby="flyoutSmallTitle">
              <WuiFlyoutHeader hasBorder>
                <WuiTitle size="s">
                  <h2 id="flyoutSmallTitle">What&apos;s new</h2>
                </WuiTitle>
              </WuiFlyoutHeader>
              <WuiFlyoutBody>
                {alerts.map((alert, i) => (
                  <WuiHeaderAlert
                    key={`alert-${i}`}
                    title={alert.title}
                    action={alert.action}
                    text={alert.text}
                    date={alert.date}
                    badge={alert.badge}
                  />
                ))}
              </WuiFlyoutBody>
              <WuiFlyoutFooter>
                <WuiFlexGroup justifyContent="spaceBetween" alignItems="center">
                  <WuiFlexItem grow={false}>
                    <WuiButtonEmpty
                      iconType="cross"
                      onClick={() => closeFlyout()}
                      flush="left">
                      Close
                    </WuiButtonEmpty>
                  </WuiFlexItem>
                  <WuiFlexItem grow={false}>
                    <WuiText color="subdued" size="s">
                      <p>Version 7.0</p>
                    </WuiText>
                  </WuiFlexItem>
                </WuiFlexGroup>
              </WuiFlyoutFooter>
            </WuiFlyout>
          </WuiPortal>
        )}
      </>
    );
  }

  if (flyoutOrPopover === 'popover') {
    content = (
      <WuiPopover
        button={button}
        isOpen={isFlyoutVisible}
        closePopover={() => closeFlyout()}
        panelPaddingSize="none">
        <WuiPopoverTitle>What&apos;s new</WuiPopoverTitle>
        <div style={{ maxHeight: '40vh', overflowY: 'auto', padding: 4 }}>
          <WuiSpacer size="s" />
          {alerts.map((alert, i) => (
            <WuiHeaderAlert
              key={`alert-${i}`}
              title={alert.title}
              action={alert.action}
              text={alert.text}
              date={alert.date}
              badge={alert.badge}
            />
          ))}
        </div>
        <WuiPopoverFooter>
          <WuiText color="subdued" size="s">
            <p>Version 7.0</p>
          </WuiText>
        </WuiPopoverFooter>
      </WuiPopover>
    );
  }

  return content;
};

const HeaderUserMenu = () => {
  const id = htmlIdGenerator()();
  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const button = (
    <WuiHeaderSectionItemButton
      aria-controls={id}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}>
      <WuiAvatar name="John Username" size="s" />
    </WuiHeaderSectionItemButton>
  );

  return (
    <WuiPopover
      id={id}
      ownFocus
      repositionOnScroll
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none">
      <div style={{ width: 320 }}>
        <WuiFlexGroup
          gutterSize="m"
          className="wuiHeaderProfile"
          responsive={false}>
          <WuiFlexItem grow={false}>
            <WuiAvatar name="John Username" size="xl" />
          </WuiFlexItem>

          <WuiFlexItem>
            <WuiText>
              <p>John Username</p>
            </WuiText>

            <WuiSpacer size="m" />

            <WuiFlexGroup>
              <WuiFlexItem>
                <WuiFlexGroup justifyContent="spaceBetween">
                  <WuiFlexItem grow={false}>
                    <WuiLink>Edit profile</WuiLink>
                  </WuiFlexItem>

                  <WuiFlexItem grow={false}>
                    <WuiLink>Log out</WuiLink>
                  </WuiFlexItem>
                </WuiFlexGroup>
              </WuiFlexItem>
            </WuiFlexGroup>
          </WuiFlexItem>
        </WuiFlexGroup>
      </div>
    </WuiPopover>
  );
};
