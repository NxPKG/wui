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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

export const alignmentToClassNameMap = {
  left: 'wuiTextAlign--left',
  right: 'wuiTextAlign--right',
  center: 'wuiTextAlign--center',
};

export type TextAlignment = keyof typeof alignmentToClassNameMap;

export const ALIGNMENTS = keysOf(alignmentToClassNameMap);

type Props = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    textAlign?: TextAlignment;
  };

export const WuiTextAlign: FunctionComponent<Props> = ({
  children,
  className,
  textAlign = 'left',
  ...rest
}) => {
  const classes = classNames(
    'wuiTextAlign',
    alignmentToClassNameMap[textAlign],
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
