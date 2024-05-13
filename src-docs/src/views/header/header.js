import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  WuiAvatar,
  WuiButton,
  WuiFlexGroup,
  WuiFlexItem,
  WuiHeader,
  WuiHeaderBreadcrumbs,
  WuiHeaderLogo,
  WuiHeaderSection,
  WuiHeaderSectionItem,
  WuiHeaderSectionItemButton,
  WuiIcon,
  WuiKeyPadMenu,
  WuiKeyPadMenuItem,
  WuiLink,
  WuiPopover,
  WuiPopoverFooter,
  WuiPopoverTitle,
  WuiSelectable,
  WuiSelectableMessage,
  WuiSelectableTemplateSitewide,
  WuiSpacer,
  WuiText,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const renderLogo = () => (
    <WuiHeaderLogo
      iconType="logoWazuh"
      href="#"
      onClick={e => e.preventDefault()}
      aria-label="Go to home page"
    />
  );

  const renderBreadcrumbs = () => {
    const breadcrumbs = [
      {
        text: 'Management',
        href: '#',
        onClick: e => {
          e.preventDefault();
        },
        'data-test-subj': 'breadcrumbsAnimals',
        className: 'customClass',
      },
      {
        text: 'Truncation test is here for a really long item',
        href: '#',
        onClick: e => {
          e.preventDefault();
        },
      },
      {
        text: 'Hidden',
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

    return (
      <WuiHeaderBreadcrumbs
        aria-label="Header breadcrumbs example"
        breadcrumbs={breadcrumbs}
      />
    );
  };

  const search = (
    <WuiSelectableTemplateSitewide
      options={[]}
      searchProps={{
        compressed: true,
      }}
      popoverButton={
        <WuiHeaderSectionItemButton aria-label="Sitewide search">
          <WuiIcon type="search" size="m" />
        </WuiHeaderSectionItemButton>
      }
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
    <WuiHeader>
      <WuiHeaderSection grow={false}>
        <WuiHeaderSectionItem border="right">
          {renderLogo()}
        </WuiHeaderSectionItem>
        <WuiHeaderSectionItem border="right">
          <HeaderSpacesMenu />
        </WuiHeaderSectionItem>
      </WuiHeaderSection>

      {renderBreadcrumbs()}

      <WuiHeaderSection side="right">
        <WuiHeaderSectionItem>{search}</WuiHeaderSectionItem>

        <WuiHeaderSectionItem>
          <HeaderUserMenu />
        </WuiHeaderSectionItem>

        <WuiHeaderSectionItem>
          <HeaderAppMenu />
        </WuiHeaderSectionItem>
      </WuiHeaderSection>
    </WuiHeader>
  );
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

const HeaderSpacesMenu = () => {
  const id = htmlIdGenerator()();
  const spacesValues = [
    {
      label: 'Sales team',
      prepend: <WuiAvatar type="space" name="Sales Team" size="s" />,
      checked: 'on',
    },
    {
      label: 'Engineering',
      prepend: <WuiAvatar type="space" name="Engineering" size="s" />,
    },
    {
      label: 'Security',
      prepend: <WuiAvatar type="space" name="Security" size="s" />,
    },
    {
      label: 'Default',
      prepend: <WuiAvatar type="space" name="Default" size="s" />,
    },
  ];

  const additionalSpaces = [
    {
      label: 'Sales team 2',
      prepend: <WuiAvatar type="space" name="Sales Team 2" size="s" />,
    },
    {
      label: 'Engineering 2',
      prepend: <WuiAvatar type="space" name="Engineering 2" size="s" />,
    },
    {
      label: 'Security 2',
      prepend: <WuiAvatar type="space" name="Security 2" size="s" />,
    },
    {
      label: 'Default 2',
      prepend: <WuiAvatar type="space" name="Default 2" size="s" />,
    },
  ];

  const [spaces, setSpaces] = useState(spacesValues);
  const [selectedSpace, setSelectedSpace] = useState(
    spaces.filter(option => option.checked)[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  const isListExtended = () => {
    return spaces.length > 4 ? true : false;
  };

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  const onChange = options => {
    setSpaces(options);
    setSelectedSpace(options.filter(option => option.checked)[0]);
    setIsOpen(false);
  };

  const addMoreSpaces = () => {
    setSpaces(spaces.concat(additionalSpaces));
  };

  const button = (
    <WuiHeaderSectionItemButton
      aria-controls={id}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Spaces menu"
      onClick={onMenuButtonClick}>
      {selectedSpace.prepend}
    </WuiHeaderSectionItemButton>
  );

  return (
    <WuiPopover
      id={id}
      ownFocus
      button={button}
      isOpen={isOpen}
      anchorPosition="downLeft"
      closePopover={closePopover}
      panelPaddingSize="none">
      <WuiSelectable
        searchable={isListExtended()}
        searchProps={{
          placeholder: 'Find a space',
          compressed: true,
        }}
        options={spaces}
        singleSelection="always"
        style={{ width: 300 }}
        onChange={onChange}
        listProps={{
          rowHeight: 40,
          showIcons: false,
        }}>
        {(list, search) => (
          <>
            <WuiPopoverTitle>{search || 'Your spaces'}</WuiPopoverTitle>
            {list}
            <WuiPopoverFooter>
              <WuiButton
                size="s"
                fullWidth
                onClick={addMoreSpaces}
                disabled={isListExtended()}>
                Add more spaces
              </WuiButton>
            </WuiPopoverFooter>
          </>
        )}
      </WuiSelectable>
    </WuiPopover>
  );
};

const HeaderAppMenu = () => {
  const idGenerator = htmlIdGenerator();
  const popoverId = idGenerator('popover');
  const keypadId = idGenerator('keypad');

  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const button = (
    <WuiHeaderSectionItemButton
      aria-controls={keypadId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Apps menu with 1 new app"
      notification="1"
      onClick={onMenuButtonClick}>
      <WuiIcon type="apps" size="m" />
    </WuiHeaderSectionItemButton>
  );

  return (
    <WuiPopover
      id={popoverId}
      ownFocus
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}>
      <WuiKeyPadMenu id={keypadId} style={{ width: 288 }}>
        <WuiKeyPadMenuItem label="Discover">
          <WuiIcon type="discoverApp" size="l" />
        </WuiKeyPadMenuItem>

        <WuiKeyPadMenuItem label="Dashboard">
          <WuiIcon type="dashboardApp" size="l" />
        </WuiKeyPadMenuItem>

        <WuiKeyPadMenuItem label="Dev Tools">
          <WuiIcon type="devToolsApp" size="l" />
        </WuiKeyPadMenuItem>

        <WuiKeyPadMenuItem label="Machine Learning">
          <WuiIcon type="machineLearningApp" size="l" />
        </WuiKeyPadMenuItem>

        <WuiKeyPadMenuItem label="Graph">
          <WuiIcon type="graphApp" size="l" />
        </WuiKeyPadMenuItem>

        <WuiKeyPadMenuItem label="Visualize">
          <WuiIcon type="visualizeApp" size="l" />
        </WuiKeyPadMenuItem>

        <WuiKeyPadMenuItem label="Timelion" betaBadgeLabel="Beta">
          <WuiIcon type="timelionApp" size="l" />
        </WuiKeyPadMenuItem>
      </WuiKeyPadMenu>
    </WuiPopover>
  );
};
