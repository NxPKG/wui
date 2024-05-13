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

import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';
import { WuiIcon, IconType } from '../icon';

export interface WuiCommentTimelineProps extends CommonProps {
  /**
   * Main icon that accompanies the comment. The default is `user` for regular comments and `dot` for update comments. To customize, pass a `string` as an `WuiIcon['type']` or any `ReactNode`.
   */
  timelineIcon?: ReactNode | IconType;
  type?: WuiCommentType;
}

const typeToClassNameMap = {
  regular: 'wuiCommentTimeline__icon--regular',
  update: 'wuiCommentTimeline__icon--update',
};

export const TYPES = keysOf(typeToClassNameMap);
export type WuiCommentType = keyof typeof typeToClassNameMap;

export const WuiCommentTimeline: FunctionComponent<WuiCommentTimelineProps> = ({
  className,
  timelineIcon,
  type = 'regular',
}) => {
  const classes = classNames('wuiCommentTimeline', className);
  const iconClasses = classNames(
    {
      'wuiCommentTimeline__icon--default':
        !timelineIcon || typeof timelineIcon === 'string',
    },
    typeToClassNameMap[type]
  );

  let iconRender;
  if (typeof timelineIcon === 'string') {
    iconRender = (
      <WuiIcon size={type === 'update' ? 'm' : 'l'} type={timelineIcon} />
    );
  } else if (timelineIcon) {
    iconRender = timelineIcon;
  } else {
    iconRender = (
      <WuiIcon
        type={type === 'update' ? 'dot' : 'user'}
        size={type === 'update' ? 's' : 'l'}
      />
    );
  }

  return (
    <div className={classes}>
      <div className="wuiCommentTimeline__content">
        <div className={iconClasses}>{iconRender}</div>
      </div>
    </div>
  );
};
