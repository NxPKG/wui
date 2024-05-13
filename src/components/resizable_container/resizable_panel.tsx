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
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
  FunctionComponent,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { useWuiResizablePanelContext } from './context';
import { htmlIdGenerator } from '../../services';

interface WuiResizablePanelControls {
  isHorizontal: boolean;
}

export interface WuiResizablePanelProps
  extends HTMLAttributes<HTMLDivElement>,
    CommonProps,
    Partial<WuiResizablePanelControls> {
  /**
   * Specify minimum panel size in pixels or percents,
   * for example "300px" or "30%"
   */
  minSize?: string;
  /**
   * Specify id of panel if you want to track panel size in "onPanelWidthChange" callback
   */
  id?: string;
  /**
   * Initial size of the panel in percents
   * Specify this prop if you don't need to handle the panel size from outside
   */
  initialSize?: number;

  /**
   * Size of the panel in percents.
   * Specify this prop if you want to control the size from outside, the panel will ignore the "initialSize"
   */
  size?: number;

  /**
   * Add Wui scroll and overflow for the panel
   */
  scrollable?: boolean;

  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;

  /**
   * Custom CSS properties
   */
  style?: CSSProperties;
}

const generatePanelId = htmlIdGenerator('resizable-panel');

export const WuiResizablePanel: FunctionComponent<WuiResizablePanelProps> = ({
  children,
  className,
  id,
  isHorizontal,
  size,
  initialSize,
  minSize = '0px',
  scrollable = true,
  style = {},
  ...rest
}) => {
  const [innerSize, setInnerSize] = useState(
    initialSize && !size ? initialSize : 0
  );
  const { registry } = useWuiResizablePanelContext();
  const divRef = useRef<HTMLDivElement>(null);
  const panelId = useRef(id || generatePanelId());

  const classes = classNames(
    {
      wuiResizablePanel: scrollable,
    },
    className
  );

  let dimensions;

  if (size) {
    dimensions = {
      width: isHorizontal ? `${size}%` : '100%',
      height: isHorizontal ? '100%' : `${size}%`,
    };
  } else {
    dimensions = {
      width: isHorizontal ? `${innerSize}%` : '100%',
      height: isHorizontal ? '100%' : `${innerSize}%`,
    };
  }

  const styles = {
    ...style,
    ...dimensions,
    minWidth: isHorizontal ? minSize : 0,
    minHeight: isHorizontal ? 0 : minSize,
  };

  useEffect(() => {
    const id = panelId.current;
    registry &&
      registry.registerPanel({
        id,
        setSize(panelSize) {
          if (initialSize && !size) {
            setInnerSize(panelSize);
          }
        },
        getSizePx() {
          return isHorizontal
            ? divRef.current!.getBoundingClientRect().width
            : divRef.current!.getBoundingClientRect().height;
        },
        minSize,
      });
    return () => {
      registry && registry.deregisterPanel(id);
    };
  }, [initialSize, isHorizontal, minSize, registry, size]);

  return (
    <div
      className={classes}
      id={panelId.current}
      ref={divRef}
      style={styles}
      {...rest}>
      {children}
    </div>
  );
};

export function wuiResizablePanelWithControls(
  controls: WuiResizablePanelControls
) {
  return (props: WuiResizablePanelProps) => (
    <WuiResizablePanel {...controls} {...props} />
  );
}
