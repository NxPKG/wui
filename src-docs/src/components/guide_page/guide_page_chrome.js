import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  WuiFieldSearch,
  WuiFlexGroup,
  WuiFlexItem,
  WuiIcon,
  WuiSideNav,
  WuiSpacer,
  WuiText,
  WuiButtonIcon,
  WuiPopover,
  WuiPopoverTitle,
} from '../../../../src/components';

import { GuideLocaleSelector } from '../guide_locale_selector';
import { GuideThemeSelector } from '../guide_theme_selector';
import { WuiHighlight } from '../../../../src/components/highlight';
import { WuiBadge } from '../../../../src/components/badge';

const scrollTo = position => {
  window.scrollTo({ top: position, behavior: 'smooth' });
};

export function scrollToSelector(selector, attempts = 5) {
  const element = document.querySelector(selector);

  if (element) {
    scrollTo(element.offsetTop - 20);
  } else if (attempts > 0) {
    setTimeout(scrollToSelector.bind(null, selector, attempts - 1), 250);
  }
}

export class GuidePageChrome extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isSideNavOpenOnMobile: false,
      isPopoverOpen: false,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;

    this.scrollNavSectionIntoViewSync();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  toggleOpenOnMobile = () => {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  };

  onSearchChange = event => {
    this.setState({
      search: event.target.value,
      isSideNavOpenOnMobile: event.target.value !== '',
    });
  };

  scrollNavSectionIntoViewSync = () => {
    // wait a bit for react to blow away and re-create the DOM
    // then scroll the selected nav section into view
    const selectedButton = document.querySelector(
      '.wuiSideNavItemButton-isSelected'
    );
    if (selectedButton) {
      let root = selectedButton.parentNode;

      while (
        !root.classList.contains('wuiSideNavItem--root') &&
        !root.classList.contains('guideSideNav')
      ) {
        root = root.parentNode;
      }
      root.scrollIntoView();
    }
  };

  scrollNavSectionIntoView = () => {
    setTimeout(() => {
      this.scrollNavSectionIntoViewSync();
    }, 250);
  };

  onClickRoute = () => {
    if (this._isMounted)
      this.setState(
        {
          search: '',
          isSideNavOpenOnMobile: false,
        },
        this.scrollNavSectionIntoView
      );
  };

  onButtonClick() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  renderIdentity() {
    const button = (
      <WuiButtonIcon
        iconType="gear"
        onClick={this.onButtonClick.bind(this)}
        aria-label="Open WUI options menu"
        color="text"
      />
    );
    return (
      <WuiFlexGroup
        alignItems="center"
        gutterSize="s"
        justifyContent="spaceBetween"
        responsive={false}
        wrap>
        <WuiFlexItem grow={false}>
          <WuiFlexGroup
            alignItems="center"
            gutterSize="s"
            responsive={false}
            wrap>
            <WuiFlexItem grow={false}>
              <Link to="/" className="guideLogo" aria-label="Go to home page">
                <WuiIcon type="logoWazuh" size="l" />
              </Link>
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <Link to="/" aria-label="Go to home page" className="wuiLink">
                <strong>Wazuh UI</strong>
              </Link>
            </WuiFlexItem>
          </WuiFlexGroup>
        </WuiFlexItem>

        <WuiFlexItem grow={false}>
          <WuiPopover
            id="guidePageChromeThemePopover"
            button={button}
            isOpen={this.state.isPopoverOpen}
            closePopover={this.closePopover.bind(this)}>
            <WuiPopoverTitle>Docs options</WuiPopoverTitle>
            <div className="guideOptionsPopover">
              <GuideThemeSelector />
              {location.host === 'localhost:8030' ? ( // eslint-disable-line no-restricted-globals
                <GuideLocaleSelector
                  onToggleLocale={this.props.onToggleLocale}
                  selectedLocale={this.props.selectedLocale}
                />
              ) : null}
            </div>
          </WuiPopover>
        </WuiFlexItem>
      </WuiFlexGroup>
    );
  }

  renderSubSections = (href, subSections = [], searchTerm = '') => {
    const subSectionsWithTitles = subSections.filter(item => {
      if (!item.title) {
        return false;
      }

      if (searchTerm) {
        return item.title.toLowerCase().indexOf(searchTerm) !== -1;
      }

      return true;
    });

    // don't render solitary sub-items unless there's an active search
    if (subSectionsWithTitles.length <= (searchTerm ? 0 : 1)) {
      return;
    }

    return subSectionsWithTitles.map(({ title, id }) => {
      let name = title;
      if (searchTerm) {
        name = (
          <WuiHighlight
            className="guideSideNav__item--inSearch"
            search={searchTerm}>
            {title}
          </WuiHighlight>
        );
      }

      return {
        id: `subSection-${id}`,
        name,
        href: href.concat(`#${id}`),
      };
    });
  };

  renderSideNav = sideNav => {
    // TODO: Add contents pages
    const sideNavSections = [];

    const searchTerm = this.state.search.toLowerCase();

    sideNav.forEach(section => {
      let hasMatchingSubItem = false;

      const matchingItems = section.items.filter(item => {
        if (item.hidden) {
          return false;
        }

        const itemSections = item.sections || [];
        for (let i = 0; i < itemSections.length; i++) {
          const sectionTitle = itemSections[i].title || '';
          if (sectionTitle.toLowerCase().indexOf(searchTerm) !== -1) {
            hasMatchingSubItem = true;
            return true;
          }
        }

        if (item.name.toLowerCase().indexOf(searchTerm) !== -1) {
          return true;
        }
      });

      const items = matchingItems.map(item => {
        const { name, path, sections, isNew } = item;
        const href = `#/${path}`;

        let newBadge;
        if (isNew) {
          newBadge = (
            <WuiBadge color="accent" className="guideSideNav__newBadge">
              NEW
            </WuiBadge>
          );
        }

        let visibleName = name;
        if (searchTerm) {
          visibleName = (
            <WuiHighlight
              className="guideSideNav__item--inSearch"
              search={searchTerm}>
              {name}
            </WuiHighlight>
          );
        }

        return {
          id: `${section.type}-${path}`,
          name: visibleName,
          href,
          onClick: this.onClickRoute.bind(this),
          items: this.renderSubSections(href, sections, searchTerm),
          isSelected: item.path === this.props.currentRoute.path,
          forceOpen: !!(searchTerm && hasMatchingSubItem),
          className: 'guideSideNav__item',
          icon: newBadge,
        };
      });

      if (!items.length) {
        return;
      }

      sideNavSections.push({
        name: section.name,
        id: section.type,
        items,
      });
    });

    return sideNavSections;
  };

  render() {
    const sideNav = this.renderSideNav(this.props.navigation);

    let sideNavContent;

    if (sideNav.length) {
      sideNavContent = (
        <WuiSideNav
          mobileTitle="Navigate components"
          toggleOpenOnMobile={this.toggleOpenOnMobile}
          isOpenOnMobile={this.state.isSideNavOpenOnMobile}
          items={sideNav}
          aria-label="WUI"
        />
      );
    } else {
      sideNavContent = (
        <WuiText color="subdued" size="s">
          <p>No matches</p>
        </WuiText>
      );
    }

    return (
      <div className="guideSideNav">
        <div className="guideSideNav__identity">
          {this.renderIdentity()}

          <WuiSpacer size="m" />

          <div className="guideSideNav__search">
            <WuiFieldSearch
              placeholder="Search"
              value={this.state.search}
              onChange={this.onSearchChange}
              aria-label="Search for a docs section"
            />
          </div>
        </div>

        <div className="guideSideNav__content">{sideNavContent}</div>
      </div>
    );
  }
}

GuidePageChrome.propTypes = {
  currentRoute: PropTypes.object.isRequired,
  onToggleLocale: PropTypes.func.isRequired,
  selectedLocale: PropTypes.string.isRequired,
  navigation: PropTypes.array.isRequired,
};
