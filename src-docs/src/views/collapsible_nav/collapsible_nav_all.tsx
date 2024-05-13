import React, { useState } from 'react';
import _ from 'lodash';

import {
  WuiCollapsibleNav,
  WuiCollapsibleNavGroup,
} from '../../../../src/components/collapsible_nav';
import {
  WuiHeaderSectionItemButton,
  WuiHeaderLogo,
  WuiHeader,
} from '../../../../src/components/header';
import { WuiIcon } from '../../../../src/components/icon';
import { WuiButtonEmpty } from '../../../../src/components/button';
import { WuiPage } from '../../../../src/components/page';
import {
  WuiPinnableListGroup,
  WuiListGroupItem,
  WuiPinnableListGroupItemProps,
} from '../../../../src/components/list_group';
import { WuiFlexItem } from '../../../../src/components/flex';
import { WuiHorizontalRule } from '../../../../src/components/horizontal_rule';
import { GuideFullScreen } from '../../services/full_screen/full_screen';

import {
  DeploymentsGroup,
  WazuhNavLinks,
  SecurityGroup,
} from './collapsible_nav_list';
import { WuiShowFor } from '../../../../src/components/responsive';

const TopLinks: WuiPinnableListGroupItemProps[] = [
  {
    label: 'Home',
    iconType: 'home',
    isActive: true,
    'aria-current': true,
    href: '#/navigation/collapsible-nav',
    pinnable: false,
  },
];
const WazuhLinks: WuiPinnableListGroupItemProps[] = WazuhNavLinks.map(link => {
  return {
    ...link,
    href: '#/navigation/collapsible-nav',
  };
});
const LearnLinks: WuiPinnableListGroupItemProps[] = [
  { label: 'Docs', href: '#/navigation/collapsible-nav' },
  { label: 'Blogs', href: '#/navigation/collapsible-nav' },
  { label: 'Webinars', href: '#/navigation/collapsible-nav' },
  { label: 'Wazuh.com', href: 'https://www.wazuh.com' },
];

export default () => {
  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );

  /**
   * Accordion toggling
   */
  const [openGroups, setOpenGroups] = useState(
    JSON.parse(String(localStorage.getItem('openNavGroups'))) || [
      'Wazuh',
      'Learn',
    ]
  );

  // Save which groups are open and which are not with state and local store
  const toggleAccordion = (isOpen: boolean, title?: string) => {
    if (!title) return;
    const itExists = openGroups.includes(title);
    if (isOpen) {
      if (itExists) return;
      openGroups.push(title);
    } else {
      const index = openGroups.indexOf(title);
      if (index > -1) {
        openGroups.splice(index, 1);
      }
    }
    setOpenGroups([...openGroups]);
    localStorage.setItem('openNavGroups', JSON.stringify(openGroups));
  };

  /**
   * Pinning
   */
  const [pinnedItems, setPinnedItems] = useState<
    WuiPinnableListGroupItemProps[]
  >(JSON.parse(String(localStorage.getItem('pinnedItems'))) || []);

  const addPin = (item: any) => {
    if (!item || _.find(pinnedItems, { label: item.label })) {
      return;
    }
    item.pinned = true;
    const newPinnedItems = pinnedItems ? pinnedItems.concat(item) : [item];
    setPinnedItems(newPinnedItems);
    localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
  };

  const removePin = (item: any) => {
    const pinIndex = _.findIndex(pinnedItems, { label: item.label });
    if (pinIndex > -1) {
      item.pinned = false;
      const newPinnedItems = pinnedItems;
      newPinnedItems.splice(pinIndex, 1);
      setPinnedItems([...newPinnedItems]);
      localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
    }
  };

  function alterLinksWithCurrentState(
    links: WuiPinnableListGroupItemProps[],
    showPinned = false
  ): WuiPinnableListGroupItemProps[] {
    return links.map(link => {
      const { pinned, ...rest } = link;
      return {
        pinned: showPinned ? pinned : false,
        ...rest,
      };
    });
  }

  function addLinkNameToPinTitle(listItem: WuiPinnableListGroupItemProps) {
    return `Pin ${listItem.label} to top`;
  }

  function addLinkNameToUnpinTitle(listItem: WuiPinnableListGroupItemProps) {
    return `Unpin ${listItem.label}`;
  }

  const collapsibleNav = (
    <WuiCollapsibleNav
      id="guideCollapsibleNavAllExampleNav"
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
      {/* Dark deployments section */}
      <WuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        {DeploymentsGroup}
      </WuiFlexItem>

      {/* Shaded pinned section always with a home item */}
      <WuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <WuiCollapsibleNavGroup
          background="light"
          className="wui-yScroll"
          style={{ maxHeight: '40vh' }}>
          <WuiPinnableListGroup
            aria-label="Pinned links" // A11y : Since this group doesn't have a visible `title` it should be provided an accessible description
            listItems={alterLinksWithCurrentState(TopLinks).concat(
              alterLinksWithCurrentState(pinnedItems, true)
            )}
            unpinTitle={addLinkNameToUnpinTitle}
            onPinClick={removePin}
            maxWidth="none"
            color="text"
            gutterSize="none"
            size="s"
          />
        </WuiCollapsibleNavGroup>
      </WuiFlexItem>

      <WuiHorizontalRule margin="none" />

      {/* BOTTOM */}
      <WuiFlexItem className="wui-yScroll">
        {/* Wazuh section */}
        <WuiCollapsibleNavGroup
          title="Wazuh"
          iconType="logoWazuh"
          isCollapsible={true}
          initialIsOpen={openGroups.includes('Wazuh')}
          onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Wazuh')}>
          <WuiPinnableListGroup
            aria-label="Wazuh" // A11y : WuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(WazuhLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </WuiCollapsibleNavGroup>

        {/* Security callout */}
        {SecurityGroup}

        {/* Learn section */}
        <WuiCollapsibleNavGroup
          title="Learn"
          iconType="training"
          isCollapsible={true}
          initialIsOpen={openGroups.includes('Learn')}
          onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Learn')}>
          <WuiPinnableListGroup
            aria-label="Learn" // A11y : WuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(LearnLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </WuiCollapsibleNavGroup>

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

  const leftSectionItems = [
    collapsibleNav,
    <WuiHeaderLogo iconType="logoWazuh">Wazuh</WuiHeaderLogo>,
  ];

  return (
    <GuideFullScreen>
      {setIsFullScreen => (
        <React.Fragment>
          <WuiHeader
            position="fixed"
            sections={[
              {
                items: leftSectionItems,
                borders: 'right',
              },
              {
                items: [
                  <WuiButtonEmpty
                    iconType="minimize"
                    onClick={() => setIsFullScreen(false)}>
                    Exit full screen
                  </WuiButtonEmpty>,
                ],
              },
            ]}
          />

          <WuiPage className="guideFullScreenOverlay" />
        </React.Fragment>
      )}
    </GuideFullScreen>
  );
};
