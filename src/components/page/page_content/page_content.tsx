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

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

import { WuiPanel, PanelPaddingSize, WuiPanelProps } from '../../panel/panel';

export type WuiPageContentVerticalPositions = 'center';
export type WuiPageContentHorizontalPositions = 'center';

const verticalPositionToClassNameMap: {
  [position in WuiPageContentVerticalPositions]: string | null;
} = {
  center: 'wuiPageContent--verticalCenter',
};

const horizontalPositionToClassNameMap: {
  [position in WuiPageContentHorizontalPositions]: string | null;
} = {
  center: 'wuiPageContent--horizontalCenter',
};

export type WuiPageContentProps = CommonProps &
  WuiPanelProps & {
    panelPaddingSize?: PanelPaddingSize;
    verticalPosition?: WuiPageContentVerticalPositions;
    horizontalPosition?: WuiPageContentHorizontalPositions;
  };

export const WuiPageContent: FunctionComponent<WuiPageContentProps> = ({
  verticalPosition,
  horizontalPosition,
  panelPaddingSize = 'l',
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'wuiPageContent',
    verticalPosition ? verticalPositionToClassNameMap[verticalPosition] : null,
    horizontalPosition
      ? horizontalPositionToClassNameMap[horizontalPosition]
      : null,
    className
  );

  return (
    <WuiPanel className={classes} paddingSize={panelPaddingSize} {...rest}>
      {children}
    </WuiPanel>
  );
};
