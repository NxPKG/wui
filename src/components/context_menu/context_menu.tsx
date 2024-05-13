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
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../common';
import {
  WuiContextMenuPanel,
  WuiContextMenuPanelTransitionDirection,
  WuiContextMenuPanelTransitionType,
} from './context_menu_panel';
import {
  WuiContextMenuItem,
  WuiContextMenuItemProps,
} from './context_menu_item';
import { WuiHorizontalRule, WuiHorizontalRuleProps } from '../horizontal_rule';

export type WuiContextMenuPanelId = string | number;

export type WuiContextMenuPanelItemDescriptorEntry = Omit<
  WuiContextMenuItemProps,
  'hasPanel'
> & {
  name: React.ReactNode;
  key?: string;
  panel?: WuiContextMenuPanelId;
};

export interface WuiContextMenuPanelItemSeparator
  extends WuiHorizontalRuleProps {
  isSeparator: true;
  key?: string;
}

export type WuiContextMenuPanelItemDescriptor = ExclusiveUnion<
  WuiContextMenuPanelItemDescriptorEntry,
  WuiContextMenuPanelItemSeparator
>;

export interface WuiContextMenuPanelDescriptor {
  id: WuiContextMenuPanelId;
  title?: string;
  items?: WuiContextMenuPanelItemDescriptor[];
  content?: ReactNode;
  width?: number;
}

export type WuiContextMenuProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
    panels?: WuiContextMenuPanelDescriptor[];
    initialPanelId?: WuiContextMenuPanelId;
  };

const isItemSeparator = (
  item: WuiContextMenuPanelItemDescriptor
): item is WuiContextMenuPanelItemSeparator =>
  (item as WuiContextMenuPanelItemSeparator).isSeparator === true;

function mapIdsToPanels(panels: WuiContextMenuPanelDescriptor[]) {
  const map: { [id: string]: WuiContextMenuPanelDescriptor } = {};

  panels.forEach(panel => {
    map[panel.id] = panel;
  });

  return map;
}

function mapIdsToPreviousPanels(panels: WuiContextMenuPanelDescriptor[]) {
  const idToPreviousPanelIdMap: { [panel: string]: WuiContextMenuPanelId } = {};

  panels.forEach(panel => {
    if (Array.isArray(panel.items)) {
      panel.items.forEach(item => {
        if (isItemSeparator(item)) return;
        const isCloseable = item.panel !== undefined;
        if (isCloseable) {
          idToPreviousPanelIdMap[item.panel!] = panel.id;
        }
      });
    }
  });

  return idToPreviousPanelIdMap;
}

function mapPanelItemsToPanels(panels: WuiContextMenuPanelDescriptor[]) {
  const idAndItemIndexToPanelIdMap: {
    [id: string]: { [index: string]: WuiContextMenuPanelId };
  } = {};

  panels.forEach(panel => {
    idAndItemIndexToPanelIdMap[panel.id] = {};

    if (panel.items) {
      panel.items.forEach((item, index) => {
        if (isItemSeparator(item)) return;
        if (item.panel) {
          idAndItemIndexToPanelIdMap[panel.id][index] = item.panel;
        }
      });
    }
  });

  return idAndItemIndexToPanelIdMap;
}

interface State {
  prevProps: {
    panels?: WuiContextMenuPanelDescriptor[];
  };
  idToPanelMap: { [id: string]: WuiContextMenuPanelDescriptor };
  idToPreviousPanelIdMap: { [panel: string]: WuiContextMenuPanelId };
  idAndItemIndexToPanelIdMap: {
    [id: string]: { [index: string]: WuiContextMenuPanelId };
  };
  idToRenderedItemsMap: { [id: string]: ReactElement[] };

  height?: number;
  outgoingPanelId?: WuiContextMenuPanelId;
  incomingPanelId?: WuiContextMenuPanelId;
  transitionDirection?: WuiContextMenuPanelTransitionDirection;
  isOutgoingPanelVisible: boolean;
  focusedItemIndex?: number;
  isUsingKeyboardToNavigate: boolean;
}

export class WuiContextMenu extends Component<WuiContextMenuProps, State> {
  static defaultProps: Partial<WuiContextMenuProps> = {
    panels: [],
  };

  static getDerivedStateFromProps(
    nextProps: WuiContextMenuProps,
    prevState: State
  ): Partial<State> | null {
    const { panels } = nextProps;

    if (panels && prevState.prevProps.panels !== panels) {
      return {
        prevProps: { panels },
        idToPanelMap: mapIdsToPanels(panels),
        idToPreviousPanelIdMap: mapIdsToPreviousPanels(panels),
        idAndItemIndexToPanelIdMap: mapPanelItemsToPanels(panels),
      };
    }

    return null;
  }

  constructor(props: WuiContextMenuProps) {
    super(props);

    this.state = {
      prevProps: {},
      idToPanelMap: {},
      idToPreviousPanelIdMap: {},
      idAndItemIndexToPanelIdMap: {},
      idToRenderedItemsMap: this.mapIdsToRenderedItems(this.props.panels),

      height: undefined,
      outgoingPanelId: undefined,
      incomingPanelId: props.initialPanelId,
      transitionDirection: undefined,
      isOutgoingPanelVisible: false,
      focusedItemIndex: undefined,
      isUsingKeyboardToNavigate: false,
    };
  }

  componentDidUpdate(prevProps: WuiContextMenuProps) {
    if (prevProps.panels !== this.props.panels) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        idToRenderedItemsMap: this.mapIdsToRenderedItems(this.props.panels),
      });
    }
  }

  hasPreviousPanel = (panelId: WuiContextMenuPanelId) => {
    const previousPanelId = this.state.idToPreviousPanelIdMap[panelId];
    return typeof previousPanelId !== 'undefined';
  };

  showPanel(
    panelId: WuiContextMenuPanelId,
    direction?: WuiContextMenuPanelTransitionDirection
  ) {
    this.setState({
      outgoingPanelId: this.state.incomingPanelId,
      incomingPanelId: panelId,
      transitionDirection: direction,
      isOutgoingPanelVisible: true,
    });
  }

  showNextPanel = (itemIndex?: number) => {
    if (itemIndex == null) {
      return;
    }

    const nextPanelId = this.state.idAndItemIndexToPanelIdMap[
      this.state.incomingPanelId!
    ][itemIndex];

    if (nextPanelId) {
      if (this.state.isUsingKeyboardToNavigate) {
        this.setState({
          focusedItemIndex: 0,
        });
      }

      this.showPanel(nextPanelId, 'next');
    }
  };

  showPreviousPanel = () => {
    // If there's a previous panel, then we can close the current panel to go back to it.
    if (this.hasPreviousPanel(this.state.incomingPanelId!)) {
      const previousPanelId = this.state.idToPreviousPanelIdMap[
        this.state.incomingPanelId!
      ];

      // Set focus on the item which shows the panel we're leaving.
      const previousPanel = this.state.idToPanelMap[previousPanelId];
      const focusedItemIndex = previousPanel.items!.findIndex(
        item =>
          !isItemSeparator(item) && item.panel === this.state.incomingPanelId
      );

      if (focusedItemIndex !== -1) {
        this.setState({
          focusedItemIndex,
        });
      }

      this.showPanel(previousPanelId, 'previous');
    }
  };

  onIncomingPanelHeightChange = (height: number) => {
    this.setState(({ height: prevHeight }) => {
      if (height === prevHeight) {
        return null;
      }

      return { height };
    });
  };

  onOutGoingPanelTransitionComplete = () => {
    this.setState({
      isOutgoingPanelVisible: false,
    });
  };

  onUseKeyboardToNavigate = () => {
    if (!this.state.isUsingKeyboardToNavigate) {
      this.setState({
        isUsingKeyboardToNavigate: true,
      });
    }
  };

  mapIdsToRenderedItems = (panels: WuiContextMenuPanelDescriptor[] = []) => {
    const idToRenderedItemsMap: { [id: string]: ReactElement[] } = {};

    // Pre-rendering the items lets us check reference equality inside of WuiContextMenuPanel.
    panels.forEach(panel => {
      idToRenderedItemsMap[panel.id] = this.renderItems(panel.items);
    });

    return idToRenderedItemsMap;
  };

  renderItems(items: WuiContextMenuPanelItemDescriptor[] = []) {
    return items.map((item, index) => {
      if (isItemSeparator(item)) {
        const { isSeparator: omit, key = index, ...rest } = item;
        return <WuiHorizontalRule key={key} margin="none" {...rest} />;
      }

      const {
        panel,
        name,
        key,
        icon,
        onClick,
        toolTipTitle,
        toolTipContent,
        ...rest
      } = item;

      const onClickHandler = panel
        ? (event: React.MouseEvent) => {
            if (onClick && event) {
              event.persist();
            }
            // This component is commonly wrapped in a WuiOutsideClickDetector, which means we'll
            // need to wait for that logic to complete before re-rendering the DOM via showPanel.
            window.requestAnimationFrame(() => {
              if (onClick) {
                onClick(event);
              }
              this.showNextPanel(index);
            });
          }
        : onClick;

      return (
        <WuiContextMenuItem
          key={key || (typeof name === 'string' ? name : undefined) || index}
          icon={icon}
          onClick={onClickHandler}
          hasPanel={Boolean(panel)}
          toolTipTitle={toolTipTitle}
          toolTipContent={toolTipContent}
          {...rest}>
          {name}
        </WuiContextMenuItem>
      );
    });
  }

  renderPanel(
    panelId: WuiContextMenuPanelId,
    transitionType: WuiContextMenuPanelTransitionType
  ) {
    const panel = this.state.idToPanelMap[panelId];

    if (!panel) {
      return;
    }

    // As above, we need to wait for WuiOutsideClickDetector to complete its logic before
    // re-rendering via showPanel.
    let onClose;
    if (this.hasPreviousPanel(panelId)) {
      onClose = () => window.requestAnimationFrame(this.showPreviousPanel);
    }

    return (
      <WuiContextMenuPanel
        key={panelId}
        className="wuiContextMenu__panel"
        onHeightChange={
          transitionType === 'in' ? this.onIncomingPanelHeightChange : undefined
        }
        onTransitionComplete={
          transitionType === 'out'
            ? this.onOutGoingPanelTransitionComplete
            : undefined
        }
        title={panel.title}
        onClose={onClose}
        transitionType={
          this.state.isOutgoingPanelVisible ? transitionType : undefined
        }
        transitionDirection={
          this.state.isOutgoingPanelVisible
            ? this.state.transitionDirection
            : undefined
        }
        hasFocus={transitionType === 'in'}
        items={this.state.idToRenderedItemsMap[panelId]}
        initialFocusedItemIndex={
          this.state.isUsingKeyboardToNavigate
            ? this.state.focusedItemIndex
            : undefined
        }
        onUseKeyboardToNavigate={this.onUseKeyboardToNavigate}
        showNextPanel={this.showNextPanel}
        showPreviousPanel={this.showPreviousPanel}>
        {panel.content}
      </WuiContextMenuPanel>
    );
  }

  render() {
    const { panels, className, initialPanelId, ...rest } = this.props;

    const incomingPanel = this.renderPanel(this.state.incomingPanelId!, 'in');
    let outgoingPanel;

    if (this.state.isOutgoingPanelVisible) {
      outgoingPanel = this.renderPanel(this.state.outgoingPanelId!, 'out');
    }

    const width =
      this.state.idToPanelMap[this.state.incomingPanelId!] &&
      this.state.idToPanelMap[this.state.incomingPanelId!].width
        ? this.state.idToPanelMap[this.state.incomingPanelId!].width
        : undefined;

    const classes = classNames('wuiContextMenu', className);

    return (
      <div
        className={classes}
        style={{ height: this.state.height, width: width }}
        {...rest}>
        {outgoingPanel}
        {incomingPanel}
      </div>
    );
  }
}
