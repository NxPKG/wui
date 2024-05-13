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
  FunctionComponent,
  ReactElement,
  useContext,
} from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { WuiDragDropContextContext } from './drag_drop_context';

const spacingToClassNameMap = {
  none: null,
  s: 'wuiDroppable--s',
  m: 'wuiDroppable--m',
  l: 'wuiDroppable--l',
};

export type WuiDroppableSpacing = keyof typeof spacingToClassNameMap;

export interface WuiDroppableProps
  extends CommonProps,
    Omit<DroppableProps, 'children'> {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactElement | ReactElement[] | DroppableProps['children'];
  className?: string;
  /**
   * Makes its items immutable. Dragging creates cloned items that can be dropped elsewhere.
   */
  cloneDraggables?: boolean;
  style?: CSSProperties;
  /**
   * Adds padding to the droppable area
   */
  spacing?: WuiDroppableSpacing;
  /**
   * Adds an WuiPanel style to the droppable area
   */
  withPanel?: boolean;
  /**
   * Allow the panel to flex-grow?
   */
  grow?: boolean;
}

export const WuiDroppableContext = React.createContext({
  cloneItems: false,
});

export const WuiDroppable: FunctionComponent<WuiDroppableProps> = ({
  droppableId,
  direction,
  isDropDisabled = false,
  children,
  className,
  cloneDraggables = false,
  spacing = 'none',
  style,
  type = 'WUI_DEFAULT',
  withPanel = false,
  grow = false,
  'data-test-subj': dataTestSubj = 'droppable',
  ...rest
}) => {
  const { isDraggingType } = useContext(WuiDragDropContextContext);
  const dropIsDisabled: boolean = cloneDraggables ? true : isDropDisabled;
  return (
    <Droppable
      isDropDisabled={dropIsDisabled}
      droppableId={droppableId}
      direction={direction}
      type={type}
      {...rest}>
      {(provided, snapshot) => {
        const classes = classNames(
          'wuiDroppable',
          {
            'wuiDroppable--isDisabled': dropIsDisabled,
            'wuiDroppable--isDraggingOver': snapshot.isDraggingOver,
            'wuiDroppable--isDraggingType': isDraggingType === type,
            'wuiDroppable--withPanel': withPanel,
            'wuiDroppable--grow': grow,
            'wuiDroppable--noGrow': !grow,
          },
          spacingToClassNameMap[spacing],
          className
        );
        const placeholderClasses = classNames('wuiDroppable__placeholder', {
          'wuiDroppable__placeholder--isHidden': cloneDraggables,
        });
        const DroppableElement =
          typeof children === 'function'
            ? children(provided, snapshot)
            : children;
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={style}
            data-test-subj={dataTestSubj}
            className={classes}>
            <WuiDroppableContext.Provider
              value={{
                cloneItems: cloneDraggables,
              }}>
              {DroppableElement}
            </WuiDroppableContext.Provider>
            <div className={placeholderClasses}>{provided.placeholder}</div>
          </div>
        );
      }}
    </Droppable>
  );
};
