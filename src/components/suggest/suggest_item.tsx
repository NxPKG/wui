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
  FunctionComponent,
  HTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from 'react';
import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import classNames from 'classnames';
import { WuiIcon, IconType } from '../icon';

interface Type {
  iconType: IconType;
  color: string | keyof typeof colorToClassNameMap;
}

interface WuiSuggestItemPropsBase {
  /**
   * Takes 'iconType' for WuiIcon and 'color'. 'color' can be tint1 through tint9.
   */
  type: Type;

  /**
   * Label or primary text.
   */
  label: string;

  /**
   * Description or secondary text (optional).
   */
  description?: string;

  /**
   * Label display is 'fixed' by default. Label will increase its width beyond 50% if needed with 'expand'.
   */
  labelDisplay?: keyof typeof labelDisplayToClassMap;
}

type PropsForDiv = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>;
type PropsForButton = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'type'
> & {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export type WuiSuggestItemProps = CommonProps &
  WuiSuggestItemPropsBase &
  ExclusiveUnion<PropsForDiv, PropsForButton>;

interface ColorToClassMap {
  tint0: string;
  tint1: string;
  tint2: string;
  tint3: string;
  tint4: string;
  tint5: string;
  tint6: string;
  tint7: string;
  tint8: string;
  tint9: string;
  tint10: string;
  [key: string]: string;
}

const colorToClassNameMap: ColorToClassMap = {
  tint0: 'wuiSuggestItem__type--tint0',
  tint1: 'wuiSuggestItem__type--tint1',
  tint2: 'wuiSuggestItem__type--tint2',
  tint3: 'wuiSuggestItem__type--tint3',
  tint4: 'wuiSuggestItem__type--tint4',
  tint5: 'wuiSuggestItem__type--tint5',
  tint6: 'wuiSuggestItem__type--tint6',
  tint7: 'wuiSuggestItem__type--tint7',
  tint8: 'wuiSuggestItem__type--tint8',
  tint9: 'wuiSuggestItem__type--tint9',
  tint10: 'wuiSuggestItem__type--tint10',
};

export const COLORS = keysOf(colorToClassNameMap);

const labelDisplayToClassMap = {
  fixed: 'wuiSuggestItem__labelDisplay--fixed',
  expand: 'wuiSuggestItem__labelDisplay--expand',
};

export const DISPLAYS = keysOf(labelDisplayToClassMap);

export const WuiSuggestItem: FunctionComponent<WuiSuggestItemProps> = ({
  className,
  label,
  type,
  labelDisplay = 'fixed',
  description,
  onClick,
  ...rest
}) => {
  const classes = classNames(
    'wuiSuggestItem',
    {
      'wuiSuggestItem-isClickable': onClick,
    },
    className
  );

  let colorClass = '';

  const labelDisplayClass = classNames(
    'wuiSuggestItem__label',
    labelDisplayToClassMap[labelDisplay],
    {
      'wuiSuggestItem__labelDisplay--expand': !description,
    }
  );

  if (type && type.color) {
    if (COLORS.indexOf(type.color as string) > -1) {
      colorClass = colorToClassNameMap[type.color];
    }
  }

  const innerContent = (
    <React.Fragment>
      <span className={`wuiSuggestItem__type ${colorClass}`}>
        <WuiIcon type={type.iconType} />
      </span>
      <span className={labelDisplayClass}>{label}</span>
      <span className="wuiSuggestItem__description">{description}</span>
    </React.Fragment>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={classes}
        {...(rest as PropsForButton)}>
        {innerContent}
      </button>
    );
  } else {
    return (
      <div className={classes} {...(rest as PropsForDiv)}>
        {innerContent}
      </div>
    );
  }
};
