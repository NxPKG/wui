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

import { WuiIcon } from '../icon';

import { WuiStepProps } from './step';

import { WuiI18n } from '../i18n';
import { CommonProps, keysOf } from '../common';

const statusToClassNameMap = {
  complete: 'wuiStepNumber--complete',
  incomplete: 'wuiStepNumber--incomplete',
  warning: 'wuiStepNumber--warning',
  danger: 'wuiStepNumber--danger',
  disabled: 'wuiStepNumber--disabled',
};

export const STATUS = keysOf(statusToClassNameMap);

export type WuiStepStatus =
  | 'complete'
  | 'incomplete'
  | 'warning'
  | 'danger'
  | 'disabled';

export interface WuiStepNumberProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * May replace the number provided in props.number with alternate styling
   */
  status?: WuiStepStatus;
  number?: number;
  /**
   * Uses a border and removes the step number
   */
  isHollow?: boolean;
  /**
   * Title sizing equivalent to WuiTitle, but only `m`, `s` and `xs`. Defaults to `s`
   */
  titleSize?: WuiStepProps['titleSize'];
}

export const WuiStepNumber: FunctionComponent<WuiStepNumberProps> = ({
  className,
  status,
  number,
  isHollow,
  titleSize,
  ...rest
}) => {
  const classes = classNames(
    'wuiStepNumber',
    status ? statusToClassNameMap[status] : undefined,
    {
      'wuiStepNumber-isHollow': isHollow,
    },
    className
  );

  const iconSize = titleSize === 'xs' ? 's' : 'm';

  let numberOrIcon;
  if (status === 'complete') {
    numberOrIcon = (
      <WuiI18n token="wuiStepNumber.isComplete" default="complete">
        {(isComplete: string) => (
          <WuiIcon
            type="check"
            className="wuiStepNumber__icon"
            size={iconSize}
            aria-label={isComplete}
          />
        )}
      </WuiI18n>
    );
  } else if (status === 'warning') {
    numberOrIcon = (
      <WuiI18n token="wuiStepNumber.hasWarnings" default="has warnings">
        {(hasWarnings: string) => (
          <WuiIcon
            type="alert"
            className="wuiStepNumber__icon"
            size={iconSize}
            aria-label={hasWarnings}
          />
        )}
      </WuiI18n>
    );
  } else if (status === 'danger') {
    numberOrIcon = (
      <WuiI18n token="wuiStepNumber.hasErrors" default="has errors">
        {(hasErrors: string) => (
          <WuiIcon
            type="cross"
            className="wuiStepNumber__icon"
            size={iconSize}
            aria-label={hasErrors}
          />
        )}
      </WuiI18n>
    );
  } else if (!isHollow) {
    numberOrIcon = number;
  }

  return (
    <div className={classes} {...rest}>
      {numberOrIcon}
    </div>
  );
};
