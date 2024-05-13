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

import React, { Component, HTMLAttributes, createContext } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { WuiI18n } from '../i18n';
import { WuiIcon } from '../icon';
import { WuiScreenReaderOnly } from '../accessibility';
import { WuiText } from '../text';
import { keys, htmlIdGenerator } from '../../services';

const WuiTreeViewContext = createContext<string>('');
const treeIdGenerator = htmlIdGenerator('wuiTreeView');

function hasAriaLabel(
  x: HTMLAttributes<HTMLUListElement>
): x is { 'aria-label': string } {
  return x.hasOwnProperty('aria-label');
}

export interface Node {
  /** An array of WuiTreeViewNodes to render as children
   */
  children?: Node[];
  /** The readable label for the item
   */
  label: string;
  /** A unique ID
   */
  id: string;
  /** An icon to use on the left of the label
   */
  icon?: React.ReactElement;
  /** Display a different icon when the item is expanded.
  For instance, an open folder or a down arrow
  */
  iconWhenExpanded?: React.ReactElement;
  /** Use an empty icon to keep items without an icon
  lined up with their siblings
  */
  useEmptyIcon?: boolean;
  /** Whether or not the item is expanded.
   */
  isExpanded?: boolean;
  /** Optional class to throw on the node
   */
  className?: string;
  /** Function to call when the item is clicked.
   The open state of the item will always be toggled.
   */
  callback?(): string;
}

export type WuiTreeViewDisplayOptions = 'default' | 'compressed';

const displayToClassNameMap: {
  [option in WuiTreeViewDisplayOptions]: string | null;
} = {
  default: null,
  compressed: 'wuiTreeView--compressed',
};

interface WuiTreeViewState {
  openItems: string[];
  activeItem: string;
  treeID: string;
  expandChildNodes: boolean;
}

export type CommonTreeProps = CommonProps &
  HTMLAttributes<HTMLUListElement> & {
    /** An array of WuiTreeViewNodes
     */
    items: Node[];
    /** Optionally use a variation with smaller text and icon sizes
     */
    display?: WuiTreeViewDisplayOptions;
    /** Set all items to open on initial load
     */
    expandByDefault?: boolean;
    /** Display expansion arrows next to all items
     * that contain children
     */
    showExpansionArrows?: boolean;
  };

export type WuiTreeViewProps = Omit<
  CommonTreeProps,
  'aria-label' | 'aria-labelledby'
> &
  ({ 'aria-label': string } | { 'aria-labelledby': string });

export class WuiTreeView extends Component<WuiTreeViewProps, WuiTreeViewState> {
  static contextType = WuiTreeViewContext;
  isNested: boolean = !!this.context;
  state: WuiTreeViewState = {
    openItems: this.props.expandByDefault
      ? this.props.items
          .map<string>(({ id, children }) =>
            children ? id : ((null as unknown) as string)
          )
          .filter(x => x != null)
      : this.props.items
          .map<string>(({ id, children, isExpanded }) =>
            children && isExpanded ? id : ((null as unknown) as string)
          )
          .filter(x => x != null),
    activeItem: '',
    treeID: this.context || treeIdGenerator(),
    expandChildNodes: this.props.expandByDefault || false,
  };

  buttonRef: Array<HTMLButtonElement | undefined> = [];

  setButtonRef = (
    ref: HTMLButtonElement | HTMLAnchorElement | null,
    index: number
  ) => {
    this.buttonRef[index] = ref as HTMLButtonElement;
  };

  handleNodeClick = (node: Node, ignoreCallback: boolean = false) => {
    const index = this.state.openItems.indexOf(node.id);

    this.setState({
      expandChildNodes: false,
    });

    node.isExpanded = !node.isExpanded;

    if (!ignoreCallback && node.callback !== undefined) {
      node.callback();
    }

    if (this.isNodeOpen(node)) {
      // if the node is part of openItems[] then remove it
      this.setState({
        openItems: this.state.openItems.filter((_, i) => i !== index),
      });
    } else {
      // if the node isn't part of openItems[] then add it
      this.setState(prevState => ({
        openItems: [...prevState.openItems, node.id],
        activeItem: node.id,
      }));
    }
  };

  // check if the node is included in openItems[]
  isNodeOpen = (node: Node) => {
    return this.state.openItems.includes(node.id);
  };

  // Enable keyboard navigation
  onKeyDown = (event: React.KeyboardEvent, node: Node) => {
    switch (event.key) {
      case keys.ARROW_DOWN: {
        const nodeButtons = Array.from(
          document.querySelectorAll(
            `[data-test-subj="wuiTreeViewButton-${this.state.treeID}"]`
          )
        );
        const currentIndex = nodeButtons.indexOf(event.currentTarget);
        if (currentIndex > -1) {
          const nextButton = nodeButtons[currentIndex + 1] as HTMLElement;
          if (nextButton) {
            event.preventDefault();
            event.stopPropagation();
            nextButton.focus();
          }
        }
        break;
      }
      case keys.ARROW_UP: {
        const nodeButtons = Array.from(
          document.querySelectorAll(
            `[data-test-subj="wuiTreeViewButton-${this.state.treeID}"]`
          )
        );
        const currentIndex = nodeButtons.indexOf(event.currentTarget);
        if (currentIndex > -1) {
          const prevButton = nodeButtons[currentIndex + -1] as HTMLElement;
          if (prevButton) {
            event.preventDefault();
            event.stopPropagation();
            prevButton.focus();
          }
        }
        break;
      }
      case keys.ARROW_RIGHT: {
        if (!this.isNodeOpen(node)) {
          event.preventDefault();
          event.stopPropagation();
          this.handleNodeClick(node, true);
        }
        break;
      }
      case keys.ARROW_LEFT: {
        if (this.isNodeOpen(node)) {
          event.preventDefault();
          event.stopPropagation();
          this.handleNodeClick(node, true);
        }
      }
      default:
        break;
    }
  };

  onChildrenKeydown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === keys.ARROW_LEFT) {
      event.preventDefault();
      event.stopPropagation();
      this.buttonRef[index]!.focus();
    }
  };

  render() {
    const {
      children,
      className,
      items,
      display = 'default',
      expandByDefault,
      showExpansionArrows,
      ...rest
    } = this.props;

    // Computed classNames
    const classes = classNames(
      'wuiTreeView',
      display ? displayToClassNameMap[display] : null,
      { 'wuiTreeView--withArrows': showExpansionArrows },
      className
    );

    const instructionsId = `${this.state.treeID}--instruction`;

    return (
      <WuiTreeViewContext.Provider value={this.state.treeID}>
        <WuiText
          size={display === 'compressed' ? 's' : 'm'}
          className="wuiTreeView__wrapper">
          {!this.isNested && (
            <WuiI18n
              token="wuiTreeView.listNavigationInstructions"
              default="You can quickly navigate this list using arrow keys.">
              {(listNavigationInstructions: string) => (
                <WuiScreenReaderOnly>
                  <p id={instructionsId}>{listNavigationInstructions}</p>
                </WuiScreenReaderOnly>
              )}
            </WuiI18n>
          )}
          <ul
            className={classes}
            id={this.state.treeID}
            aria-describedby={!this.isNested ? instructionsId : undefined}
            {...rest}>
            {items.map((node, index) => {
              const buttonId = `${this.state.treeID}--${index}--node`;

              return (
                <WuiI18n
                  key={node.label + index}
                  token="wuiTreeView.ariaLabel"
                  default="{nodeLabel} child of {ariaLabel}"
                  values={{
                    nodeLabel: node.label,
                    ariaLabel: hasAriaLabel(rest) ? rest['aria-label'] : '',
                  }}>
                  {(ariaLabel: string) => {
                    const label:
                      | { 'aria-label': string }
                      | { 'aria-labelledby': string } = hasAriaLabel(rest)
                      ? {
                          'aria-label': ariaLabel,
                        }
                      : {
                          'aria-labelledby': `${buttonId} ${rest['aria-labelledby']}`,
                        };

                    const nodeClasses = classNames(
                      'wuiTreeView__node',
                      display ? displayToClassNameMap[display] : null,
                      { 'wuiTreeView__node--expanded': this.isNodeOpen(node) }
                    );

                    const nodeButtonClasses = classNames(
                      'wuiTreeView__nodeInner',
                      showExpansionArrows && node.children
                        ? 'wuiTreeView__nodeInner--withArrows'
                        : null,
                      this.state.activeItem === node.id
                        ? 'wuiTreeView__node--active'
                        : null,
                      node.className ? node.className : null
                    );

                    return (
                      <React.Fragment>
                        <li className={nodeClasses}>
                          <button
                            id={buttonId}
                            aria-controls={`wuiNestedTreeView-${this.state.treeID}`}
                            aria-expanded={this.isNodeOpen(node)}
                            ref={ref => this.setButtonRef(ref, index)}
                            data-test-subj={`wuiTreeViewButton-${this.state.treeID}`}
                            onKeyDown={(event: React.KeyboardEvent) =>
                              this.onKeyDown(event, node)
                            }
                            onClick={() => this.handleNodeClick(node)}
                            className={nodeButtonClasses}>
                            {showExpansionArrows && node.children ? (
                              <WuiIcon
                                className="wuiTreeView__expansionArrow"
                                size={display === 'compressed' ? 's' : 'm'}
                                type={
                                  this.isNodeOpen(node)
                                    ? 'arrowDown'
                                    : 'arrowRight'
                                }
                              />
                            ) : null}
                            {node.icon && !node.useEmptyIcon ? (
                              <span className="wuiTreeView__iconWrapper">
                                {this.isNodeOpen(node) && node.iconWhenExpanded
                                  ? node.iconWhenExpanded
                                  : node.icon}
                              </span>
                            ) : null}
                            {node.useEmptyIcon && !node.icon ? (
                              <span className="wuiTreeView__iconPlaceholder" />
                            ) : null}
                            <span className="wuiTreeView__nodeLabel">
                              {node.label}
                            </span>
                          </button>
                          <div
                            id={`wuiNestedTreeView-${this.state.treeID}`}
                            onKeyDown={(event: React.KeyboardEvent) =>
                              this.onChildrenKeydown(event, index)
                            }>
                            {node.children && this.isNodeOpen(node) ? (
                              <WuiTreeView
                                items={node.children}
                                display={display}
                                showExpansionArrows={showExpansionArrows}
                                expandByDefault={this.state.expandChildNodes}
                                {...label}
                              />
                            ) : null}
                          </div>
                        </li>
                      </React.Fragment>
                    );
                  }}
                </WuiI18n>
              );
            })}
          </ul>
        </WuiText>
      </WuiTreeViewContext.Provider>
    );
  }
}
