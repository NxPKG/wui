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
  Fragment,
  FunctionComponent,
  ReactElement,
  cloneElement,
  useContext,
} from 'react';
import { Draggable, DraggableProps } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { WuiDroppableContext } from './droppable';

const spacingToClassNameMap = {
  none: null,
  s: 'wuiDraggable--s',
  m: 'wuiDraggable--m',
  l: 'wuiDraggable--l',
};

export type WuiDraggableSpacing = keyof typeof spacingToClassNameMap;

export interface WuiDraggableProps
  extends CommonProps,
    Omit<DraggableProps, 'children'> {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactElement | DraggableProps['children'];
  className?: string;
  /**
   * Whether the `children` will provide and set up its own drag handle
   */
  customDragHandle?: boolean;
  /**
   * Whether the item is currently in a position to be removed
   */
  isRemovable?: boolean;
  /**
   * Adds padding to the draggable item
   */
  spacing?: WuiDraggableSpacing;
  style?: CSSProperties;
}

export const WuiDraggable: FunctionComponent<WuiDraggableProps> = ({
  customDragHandle = false,
  draggableId,
  isDragDisabled = false,
  isRemovable = false,
  index,
  children,
  className,
  spacing = 'none',
  style,
  'data-test-subj': dataTestSubj = 'draggable',
  ...rest
}) => {
  const { cloneItems } = useContext(WuiDroppableContext);

  return (
    <Draggable
      draggableId={draggableId}
      index={index}
      isDragDisabled={isDragDisabled}
      {...rest}>
      {(provided, snapshot, rubric) => {
        const classes = classNames(
          'wuiDraggable',
          {
            'wuiDraggable--hasClone': cloneItems,
            'wuiDraggable--hasCustomDragHandle': customDragHandle,
            'wuiDraggable--isDragging': snapshot.isDragging,
            'wuiDraggable--withoutDropAnimation': isRemovable,
          },
          spacingToClassNameMap[spacing],
          className
        );
        const childClasses = classNames('wuiDraggable__item', {
          'wuiDraggable__item--hasCustomDragHandle': customDragHandle,
          'wuiDraggable__item--isDisabled': isDragDisabled,
          'wuiDraggable__item--isDragging': snapshot.isDragging,
          'wuiDraggable__item--isDropAnimating': snapshot.isDropAnimating,
        });
        const DraggableElement =
          typeof children === 'function'
            ? children(provided, snapshot, rubric)
            : (children as ReactElement); // as specified by `DraggableProps`
        return (
          <Fragment>
            <div
              {...provided.draggableProps}
              {...(!customDragHandle ? provided.dragHandleProps : {})}
              ref={provided.innerRef}
              data-test-subj={dataTestSubj}
              className={classes}
              style={{ ...style, ...provided.draggableProps.style }}>
              {cloneElement(DraggableElement, {
                className: classNames(
                  DraggableElement.props.className,
                  childClasses
                ),
              })}
            </div>
            {cloneItems && snapshot.isDragging && (
              <div className={classNames(classes, 'wuiDraggable--clone')}>
                {DraggableElement}
              </div>
            )}
          </Fragment>
        );
      }}
    </Draggable>
  );
};
