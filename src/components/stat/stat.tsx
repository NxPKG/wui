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
  Fragment,
  HTMLAttributes,
  FunctionComponent,
  ReactNode,
  createElement,
} from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';

import { WuiText } from '../text';
import { WuiTitle, WuiTitleSize } from '../title/title';
import { WuiScreenReaderOnly } from '../accessibility';
import { WuiI18n } from '../i18n';

const colorToClassNameMap = {
  default: null,
  subdued: 'wuiStat__title--subdued',
  primary: 'wuiStat__title--primary',
  secondary: 'wuiStat__title--secondary',
  danger: 'wuiStat__title--danger',
  accent: 'wuiStat__title--accent',
};

export const COLORS = keysOf(colorToClassNameMap);

const textAlignToClassNameMap = {
  left: 'wuiStat--leftAligned',
  center: 'wuiStat--centerAligned',
  right: 'wuiStat--rightAligned',
};

export const isColorClass = (
  input: string
): input is keyof typeof colorToClassNameMap => {
  return colorToClassNameMap.hasOwnProperty(input);
};

export const ALIGNMENTS = keysOf(textAlignToClassNameMap);

export interface WuiStatProps {
  /**
   * Set the description (label) text
   */
  description: ReactNode;
  /**
   * Will hide the title with an animation until false
   */
  isLoading?: boolean;
  /**
   * Flips the order of the description and title
   */
  reverse?: boolean;
  textAlign?: keyof typeof textAlignToClassNameMap;
  /**
   * The (value) text
   */
  title: ReactNode;
  /**
   * The color of the title text
   */
  titleColor?: keyof typeof colorToClassNameMap | string;
  /**
   * Size of the title. See WuiTitle for options ('s', 'm', 'l'... etc)
   */
  titleSize?: WuiTitleSize;
  /**
   * HTML Element to be used for title
   */
  titleElement?: string;
  /**
   * HTML Element to be used for description
   */
  descriptionElement?: string;
}

export const WuiStat: FunctionComponent<CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> &
  WuiStatProps> = ({
  children,
  className,
  description,
  isLoading = false,
  reverse = false,
  textAlign = 'left',
  title,
  titleColor = 'default',
  titleSize = 'l',
  titleElement = 'p',
  descriptionElement = 'p',
  ...rest
}) => {
  const classes = classNames(
    'wuiStat',
    textAlignToClassNameMap[textAlign],
    className
  );

  const titleClasses = classNames(
    'wuiStat__title',
    isColorClass(titleColor) ? colorToClassNameMap[titleColor] : null,
    {
      'wuiStat__title-isLoading': isLoading,
    }
  );

  const commonProps = {
    'aria-hidden': true,
  };

  const descriptionDisplay = (
    <WuiText size="s" className="wuiStat__description">
      {createElement(descriptionElement, commonProps, description)}
    </WuiText>
  );

  const titlePropsWithColor = {
    'aria-hidden': true,
    style: {
      color: `${titleColor}`,
    },
  };

  const titleChildren = isLoading ? '--' : title;

  const titleDisplay = isColorClass(titleColor) ? (
    <WuiTitle size={titleSize} className={titleClasses}>
      {createElement(titleElement, commonProps, titleChildren)}
    </WuiTitle>
  ) : (
    <WuiTitle size={titleSize} className={titleClasses}>
      {createElement(titleElement, titlePropsWithColor, titleChildren)}
    </WuiTitle>
  );

  const screenReader = (
    <WuiScreenReaderOnly>
      <p>
        {isLoading ? (
          <WuiI18n token="wuiStat.loadingText" default="Statistic is loading" />
        ) : (
          <Fragment>
            {reverse ? `${title} ${description}` : `${description} ${title}`}
          </Fragment>
        )}
      </p>
    </WuiScreenReaderOnly>
  );

  const statDisplay = (
    <Fragment>
      {!reverse && descriptionDisplay}
      {titleDisplay}
      {reverse && descriptionDisplay}
      {typeof title === 'string' &&
        typeof description === 'string' &&
        screenReader}
    </Fragment>
  );

  return (
    <div className={classes} {...rest}>
      {statDisplay}
      {children}
    </div>
  );
};
