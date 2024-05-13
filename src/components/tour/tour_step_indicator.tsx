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

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

import { WuiIcon } from '../icon';
import { WuiI18n } from '../i18n';

const statusToClassNameMap = {
  complete: 'wuiTourStepIndicator--complete',
  incomplete: 'wuiTourStepIndicator--incomplete',
  active: 'wuiTourStepIndicator--active',
};

export const STATUS = keysOf(statusToClassNameMap);

export type WuiTourStepStatus = keyof typeof statusToClassNameMap;

export interface WuiTourStepIndicatorProps
  extends CommonProps,
    HTMLAttributes<HTMLLIElement> {
  number: number;
  status: WuiTourStepStatus;
}

export const WuiTourStepIndicator: FunctionComponent<WuiTourStepIndicatorProps> = ({
  className,
  number,
  status,
  ...rest
}) => {
  const classes = classNames(
    'wuiTourStepIndicator',
    status ? statusToClassNameMap[status] : undefined,
    className
  );

  let indicatorIcon: ReactNode;
  if (status === 'active') {
    indicatorIcon = (
      <WuiI18n token="wuiTourStepIndicator.isActive" default="active">
        {(isActive: string) => (
          <WuiIcon
            type="dot"
            className="wuiStepNumber__icon"
            aria-label={isActive}
            color="secondary"
            aria-current="step"
          />
        )}
      </WuiI18n>
    );
  } else if (status === 'complete') {
    indicatorIcon = (
      <WuiI18n token="wuiTourStepIndicator.isComplete" default="complete">
        {(isComplete: string) => (
          <WuiIcon
            type="dot"
            className="wuiStepNumber__icon"
            aria-label={isComplete}
            color="subdued"
          />
        )}
      </WuiI18n>
    );
  } else if (status === 'incomplete') {
    indicatorIcon = (
      <WuiI18n token="wuiTourStepIndicator.isIncomplete" default="incomplete">
        {(isIncomplete: string) => (
          <WuiIcon
            type="dot"
            className="wuiStepNumber__icon"
            aria-label={isIncomplete}
            color="subdued"
          />
        )}
      </WuiI18n>
    );
  }

  return (
    <WuiI18n
      token="wuiTourStepIndicator.ariaLabel"
      default={({ status }: { status: WuiTourStepStatus }) => {
        return `Step ${number} ${status}`;
      }}
      values={{ status }}>
      {(ariaLabel: string) => (
        <li className={classes} aria-label={ariaLabel} {...rest}>
          {indicatorIcon}
        </li>
      )}
    </WuiI18n>
  );
};
