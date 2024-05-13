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
import { CommonProps } from '../common';

import classNames from 'classnames';

import { WuiTitle, WuiTitleProps, WuiTitleSize } from '../title';

import { WuiStepStatus, WuiStepNumber } from './step_number';

import { WuiI18n } from '../i18n';

export interface WuiStepInterface {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  /**
   * The HTML tag used for the title
   */
  headingElement?: string;
  /**
   * The number of the step in the list of steps
   */
  step?: number;
  title: string;
  /**
   * May replace the number provided in props.step with alternate styling.
   */
  status?: WuiStepStatus;
  /**
   * Title sizing equivalent to WuiTitle, but only `m`, `s` and `xs`. Defaults to `s`
   */
  titleSize?: Exclude<WuiTitleProps['size'], 'xxxs' | 'xxs' | 'l'>;
}

export type WuiStepProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> &
  WuiStepInterface;

export const WuiStep: FunctionComponent<WuiStepProps> = ({
  className,
  children,
  headingElement = 'p',
  step = 1,
  title,
  titleSize = 's',
  status,
  ...rest
}) => {
  const classes = classNames(
    'wuiStep',
    {
      'wuiStep--small': titleSize === 'xs',
    },
    className
  );
  const numberClasses = classNames('wuiStep__circle', {
    'wuiStepNumber--small': titleSize === 'xs',
  });

  return (
    <div className={classes} {...rest}>
      <div className="wuiStep__titleWrapper">
        <WuiI18n
          token="wuiStep.ariaLabel"
          default={({ status }: { status?: WuiStepStatus }) => {
            if (status === 'incomplete') return 'Incomplete Step';
            return 'Step';
          }}
          values={{ status }}>
          {(ariaLabel: string) => (
            <WuiStepNumber
              className={numberClasses}
              aria-label={`${ariaLabel} ${step}`}
              number={step}
              status={status}
              titleSize={titleSize}
              isHollow={status === 'incomplete'}
            />
          )}
        </WuiI18n>

        <WuiTitle size={titleSize as WuiTitleSize} className="wuiStep__title">
          {React.createElement(headingElement, null, title)}
        </WuiTitle>
      </div>

      <div className="wuiStep__content">{children}</div>
    </div>
  );
};
