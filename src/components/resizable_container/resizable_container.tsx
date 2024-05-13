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
  ReactNode,
  useRef,
  useState,
  useCallback,
  CSSProperties,
  FunctionComponent,
  HTMLAttributes,
  ComponentType,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import {
  WuiResizablePanelContextProvider,
  WuiResizablePanelRegistry,
} from './context';
import {
  WuiResizableButtonProps,
  wuiResizableButtonWithControls,
} from './resizable_button';
import {
  WuiResizablePanelProps,
  wuiResizablePanelWithControls,
} from './resizable_panel';
import { useContainerCallbacks } from './helpers';

const containerDirections = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

export interface WuiResizableContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    CommonProps {
  /**
   * Specify the container direction
   */
  direction?: keyof typeof containerDirections;
  /**
   * Pure function which accepts Panel and Resizer components in arguments
   * and returns a component tree
   */
  children: (
    Panel: ComponentType<WuiResizablePanelProps>,
    Resizer: ComponentType<WuiResizableButtonProps>
  ) => ReactNode;
  /**
   * Pure function which accepts an object where keys are IDs of panels, which sizes were changed,
   * and values are actual sizes in percents
   */
  onPanelWidthChange?: ({}: { [key: string]: number }) => any;
  style?: CSSProperties;
}

export interface WuiResizableContainerState {
  isDragging: boolean;
  currentResizerPos: number;
  previousPanelId: string | null;
  nextPanelId: string | null;
  resizersSize: number;
}

const initialState: WuiResizableContainerState = {
  isDragging: false,
  currentResizerPos: -1,
  previousPanelId: null,
  nextPanelId: null,
  resizersSize: 0,
};

export const WuiResizableContainer: FunctionComponent<WuiResizableContainerProps> = ({
  direction = 'horizontal',
  children,
  className,
  onPanelWidthChange,
  ...rest
}) => {
  const registryRef = useRef(new WuiResizablePanelRegistry());
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<WuiResizableContainerState>(initialState);
  const isHorizontal = direction === containerDirections.horizontal;

  const classes = classNames(
    'wuiResizableContainer',
    {
      'wuiResizableContainer--vertical': !isHorizontal,
      'wuiResizableContainer--horizontal': isHorizontal,
    },
    className
  );

  const { onKeyDown, onMouseDown, onMouseMove } = useContainerCallbacks({
    isHorizontal,
    state,
    setState,
    containerRef,
    registryRef,
    onPanelWidthChange,
  });

  const WuiResizableButton = useCallback(
    wuiResizableButtonWithControls({
      onKeyDown,
      onMouseDown,
      onTouchStart: onMouseDown,
      isHorizontal,
      registryRef,
    }),
    [onKeyDown, onMouseDown, isHorizontal, registryRef]
  );

  const WuiResizablePanel = useCallback(
    wuiResizablePanelWithControls({
      isHorizontal,
    }),
    [isHorizontal]
  );

  const onMouseUp = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <WuiResizablePanelContextProvider registry={registryRef.current}>
      <div
        className={classes}
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onMouseMove}
        onTouchEnd={onMouseUp}
        {...rest}>
        {children(WuiResizablePanel, WuiResizableButton)}
      </div>
    </WuiResizablePanelContextProvider>
  );
};
