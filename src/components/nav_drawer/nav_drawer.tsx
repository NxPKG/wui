/*
 * Copyright 2022 Wazuh Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * NOTICE: THIS FILE HAS BEEN MODIFIED BY WAZUH INC UNDER COMPLIANCE WITH THE APACHE 2.0 LICENSE FROM THE ORIGINAL WORK
 * OF THE COMPANY Elasticsearch B.V.
 *
 * THE FOLLOWING IS THE COPYRIGHT OF THE ORIGINAL DOCUMENT:
 *
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  Component,
  ReactNode,
  createRef,
  MouseEventHandler,
  isValidElement,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { WuiListGroup, WuiListGroupItem } from '../list_group';
import { WuiNavDrawerFlyout } from './nav_drawer_flyout';
import {
  WuiNavDrawerGroup,
  ATTR_SELECTOR,
  FlyoutMenuItem,
} from './nav_drawer_group';
import { WuiOutsideClickDetector } from '../outside_click_detector';
import { WuiI18n } from '../i18n';
import { WuiFlexItem, WuiFlexGroup } from '../flex';
import { throttle } from '../color_picker/utils';
import { CommonProps } from '../common';
import { WuiAccordion } from '../accordion';

const MENU_ELEMENT_ID = 'navDrawerMenu';

export interface WuiNavDrawerProps
  extends CommonProps,
    HTMLAttributes<HTMLElement> {
  /**
   * One or more ReactNodes to render as this component's content
   */
  children?: ReactNode | ReactNode[];

  /**
   * Keep drawer locked open by default
   */
  isLocked?: boolean;

  /**
   * Returns the current state of isLocked
   */
  onIsLockedUpdate?: (isLocked: boolean) => void;

  /**
   * Adds fixed toggle button to bottom of menu area
   */
  showExpandButton?: boolean;

  /**
   * Display tooltips on side nav items
   */
  showToolTips?: boolean;
}

interface WuiNavDrawerState {
  flyoutIsCollapsed: boolean;
  flyoutListItems: FlyoutMenuItem[] | null;
  focusReturnRef: ReactNode | null;
  isCollapsed: boolean;
  isLocked: boolean;
  isManagingFocus: boolean;
  navFlyoutTitle: string | undefined;
  outsideClickDisabled: boolean;
  toolTipsEnabled: boolean;
}

export class WuiNavDrawer extends Component<
  WuiNavDrawerProps,
  WuiNavDrawerState
> {
  static defaultProps = {
    showExpandButton: true,
    showToolTips: true,
  };

  state: WuiNavDrawerState = {
    flyoutIsCollapsed: true,
    flyoutListItems: null,
    focusReturnRef: null,
    isCollapsed: !this.props.isLocked,
    isLocked: Boolean(this.props.isLocked),
    isManagingFocus: false,
    navFlyoutTitle: undefined,
    outsideClickDisabled: true,
    toolTipsEnabled: true,
  };

  expandButtonRef = createRef<HTMLButtonElement>();

  componentDidMount() {
    if (this.props.isLocked) {
      window.addEventListener('resize', this.functionToCallOnWindowResize);
    }
    this.setBodyDockedClass(this.props.isLocked);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.functionToCallOnWindowResize);
    this.setBodyDockedClass(false);
  }

  setBodyDockedClass = (navIsDocked: boolean | undefined) => {
    if (navIsDocked) {
      document.body.classList.remove('wuiBody--navDrawerNotDocked');
      document.body.classList.add('wuiBody--navDrawerIsDocked');
    } else {
      document.body.classList.remove('wuiBody--navDrawerIsDocked');
      document.body.classList.add('wuiBody--navDrawerNotDocked');
    }
  };

  returnOnIsLockedUpdate = (isLockedState: WuiNavDrawerState['isLocked']) => {
    if (this.props.onIsLockedUpdate) {
      this.props.onIsLockedUpdate(isLockedState);
    }
  };

  functionToCallOnWindowResize = throttle(() => {
    if (window.innerWidth < 1200) {
      this.collapseDrawer();
      this.collapseFlyout();
    }
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  sideNavLockClicked = () => {
    const { isLocked } = this.state;

    if (isLocked) {
      window.removeEventListener('resize', this.functionToCallOnWindowResize);
    } else {
      window.addEventListener('resize', this.functionToCallOnWindowResize);
    }

    this.collapseFlyout();
    this.returnOnIsLockedUpdate(!isLocked);
    this.setBodyDockedClass(!isLocked);
    this.setState({
      isLocked: !isLocked,
      isCollapsed: isLocked,
      outsideClickDisabled: !isLocked,
    });
  };

  // Although not used in `src/`, this method is available to and used in `src-docs/`
  // for implementation-specific nav menu toggling via `ref` reference
  toggleOpen = () => {
    this.setState(
      ({ isCollapsed }) => ({
        isCollapsed: !isCollapsed,
      }),
      () => {
        this.setState(({ isCollapsed }) => ({
          outsideClickDisabled: isCollapsed,
          toolTipsEnabled: isCollapsed,
        }));
      }
    );
  };

  collapseButtonClick = () => {
    if (this.state.isCollapsed) {
      this.expandDrawer();
    } else {
      this.collapseDrawer();
    }

    this.collapseFlyout();

    requestAnimationFrame(() => {
      if (this.expandButtonRef.current) {
        this.expandButtonRef.current.focus();
      }
    });
  };

  expandDrawer = () => {
    this.setState({
      isCollapsed: false,
      outsideClickDisabled: false,
    });

    setTimeout(() => {
      this.setState({
        toolTipsEnabled: false,
      });
    }, 150);
  };

  collapseDrawer = () => {
    this.setState({
      isCollapsed: true,
      outsideClickDisabled: this.state.flyoutIsCollapsed ? true : false,
      toolTipsEnabled: true,
      isLocked: false,
    });

    this.returnOnIsLockedUpdate(false);

    // Scrolls the menu and flyout back to top when the nav drawer collapses
    setTimeout(() => {
      const element = document.getElementById('navDrawerMenu');
      if (element) {
        element.scrollTop = 0;
      }
    }, 50);

    // In case it was locked before, remove the window resize listener
    window.removeEventListener('resize', this.functionToCallOnWindowResize);
  };

  expandFlyout = (
    links: FlyoutMenuItem[],
    title: string,
    item: FlyoutMenuItem
  ) => {
    if (this.state.navFlyoutTitle === title) {
      this.collapseFlyout();
    } else {
      this.setState(
        ({ isLocked }) => ({
          flyoutIsCollapsed: false,
          flyoutListItems: links,
          focusReturnRef: item.label,
          isCollapsed: isLocked ? false : true,
          navFlyoutTitle: title,
          outsideClickDisabled: false,
          toolTipsEnabled: false,
        }),
        () => {
          // Ideally this uses React `ref` instead of `querySelector`, but the menu composition
          // does not allow for deep `ref` element management at present
          const element = document.querySelector(
            `#${MENU_ELEMENT_ID} [${ATTR_SELECTOR}='${item.label}']`
          );
          if (!element) return;
          element.setAttribute('aria-expanded', 'true');
        }
      );
    }
  };

  collapseFlyout = (shouldReturnFocus = true) => {
    const { focusReturnRef: focusReturn } = this.state;
    this.setState(
      {
        flyoutIsCollapsed: true,
        navFlyoutTitle: undefined,
        flyoutListItems: null,
        toolTipsEnabled: this.state.isLocked ? false : true,
        focusReturnRef: null,
      },
      () => {
        // Ideally this uses React `ref` instead of `querySelector`, but the menu composition
        // does not allow for deep `ref` element management at present
        const element = document.querySelector(
          `#${MENU_ELEMENT_ID} [${ATTR_SELECTOR}='${focusReturn}']`
        ) as HTMLElement;
        if (!element) {
          return;
        }
        requestAnimationFrame(() => {
          element.setAttribute('aria-expanded', 'false');
        });
        if (!shouldReturnFocus) return;
        requestAnimationFrame(() => {
          element.focus();
        });
      }
    );
  };

  closeBoth = () => {
    if (!this.state.isLocked) this.collapseDrawer();
    this.collapseFlyout(false);
  };

  handleDrawerMenuClick: MouseEventHandler<HTMLDivElement> = event => {
    // walk up e.target until either:
    // 1. a[href] - close the menu
    // 2. document.body - do nothing

    let element = event.target as HTMLElement | null;
    while (
      element !== null &&
      element !== document.body &&
      (element.tagName !== 'A' || element.getAttribute('href') === undefined)
    ) {
      element = element.parentElement;
    }

    if (element !== document.body) {
      // this is an anchor with an href
      this.closeBoth();
    }
  };

  modifyChildren = (children: ReactNode | ReactNode[]): ReactNode => {
    // Loop through the WuiNavDrawer children (WuiListGroup, WuiHorizontalRules, etc)
    // Filter out falsy items
    const filteredChildren = React.Children.toArray(children);
    return React.Children.map(filteredChildren, child => {
      if (isValidElement(child)) {
        // Allow for Fragments by recursive modification
        if (child.type === React.Fragment) {
          return this.modifyChildren(child.props.children);
        }

        // Check if child is an WuiNavDrawerGroup and if it does have a flyout, add the expand function
        if (child.type === WuiNavDrawerGroup) {
          return !this.state.isLocked
            ? React.cloneElement(child, {
                flyoutMenuButtonClick: this.expandFlyout,
                showToolTips:
                  this.state.toolTipsEnabled && this.props.showToolTips,
              })
            : child.props.listItems.map((listItem: any, key: number) =>
                listItem?.flyoutMenu?.listItems.length ? (
                  <WuiAccordion
                    id={listItem.label}
                    key={key}
                    paddingSize="none"
                    arrowDisplay="right"
                    buttonClassName={
                      listItem.isActive ? 'wuiAccordion__button__isActive' : ''
                    }
                    buttonContent={
                      <WuiListGroup
                        flush
                        gutterSize="none"
                        listItems={[
                          {
                            label: listItem.label,
                            iconType: listItem.iconType,
                          },
                        ]}
                        className={this.props.className}
                      />
                    }>
                    <WuiListGroup
                      flush
                      listItems={listItem?.flyoutMenu?.listItems}
                    />
                  </WuiAccordion>
                ) : (
                  <WuiListGroup
                    key={key}
                    flush
                    gutterSize="none"
                    listItems={[
                      {
                        label: listItem.label,
                        iconType: listItem.iconType,
                        href: listItem.href,
                        isActive: listItem.isActive,
                      },
                    ]}
                    className={this.props.className}
                  />
                )
              );
        }
      }
      return child;
    });
  };

  render() {
    const {
      children,
      className,
      showExpandButton,
      showToolTips,
      isLocked,
      onIsLockedUpdate,
      ...rest
    } = this.props;

    const classes = classNames(
      'wuiNavDrawer',
      {
        'wuiNavDrawer-isCollapsed': this.state.isCollapsed,
        'wuiNavDrawer-isExpanded': !this.state.isCollapsed,
        'wuiNavDrawer-isLocked': this.state.isLocked,
        'wuiNavDrawer-flyoutIsCollapsed': this.state.flyoutIsCollapsed,
        'wuiNavDrawer-flyoutIsExpanded': !this.state.flyoutIsCollapsed,
      },
      className
    );

    let footerContent;
    if (showExpandButton) {
      footerContent = (
        <WuiListGroup
          className="wuiNavDrawer__expandButton"
          flush
          gutterSize="none">
          <WuiI18n
            tokens={[
              'wuiNavDrawer.sideNavLockExpanded',
              'wuiNavDrawer.sideNavLockCollapsed',
            ]}
            defaults={['Docked', 'Undocked']}>
            {([sideNavLockExpanded, sideNavLockCollapsed]: string[]) => (
              <WuiListGroupItem
                buttonRef={this.expandButtonRef}
                className={
                  this.state.isCollapsed
                    ? 'navDrawerExpandButton-isCollapsed'
                    : 'navDrawerExpandButton-isExpanded'
                }
                data-test-subj={
                  this.state.isCollapsed
                    ? 'navDrawerExpandButton-isCollapsed'
                    : 'navDrawerExpandButton-isExpanded'
                }
                iconType={this.state.isLocked ? 'lock' : 'lockOpen'}
                label={
                  this.state.isLocked
                    ? sideNavLockExpanded
                    : sideNavLockCollapsed
                }
                onClick={this.sideNavLockClicked}
                showToolTip={this.state.isLocked}
              />
            )}
          </WuiI18n>
        </WuiListGroup>
      );
    }

    const flyoutContent = !this.state.isLocked ? (
      <WuiNavDrawerFlyout
        id="navDrawerFlyout"
        isCollapsed={this.state.flyoutIsCollapsed}
        listItems={this.state.flyoutListItems}
        onClose={this.collapseFlyout}
        title={this.state.navFlyoutTitle}
        wrapText
      />
    ) : (
      <></>
    );

    // Add an onClick that expands the flyout sub menu for any list items (links) that have a flyoutMenu prop (sub links)
    let modifiedChildren = children;

    modifiedChildren = this.modifyChildren(this.props.children);

    const menuClasses = classNames('wuiNavDrawerMenu', {
      'wuiNavDrawerMenu-hasFooter': footerContent,
    });

    return (
      <WuiOutsideClickDetector
        onOutsideClick={() => this.closeBoth()}
        isDisabled={this.state.outsideClickDisabled}>
        <nav className={classes} {...rest}>
          <WuiFlexGroup gutterSize="none" responsive={false}>
            <WuiFlexItem grow={false}>
              <div
                id={MENU_ELEMENT_ID}
                className={menuClasses}
                onClick={this.handleDrawerMenuClick}>
                {footerContent}
                {modifiedChildren}
              </div>
            </WuiFlexItem>
            {flyoutContent}
          </WuiFlexGroup>
        </nav>
      </WuiOutsideClickDetector>
    );
  }
}
