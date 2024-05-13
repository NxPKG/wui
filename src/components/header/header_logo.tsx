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
  AnchorHTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { WuiIcon, IconType } from '../icon';
import { CommonProps } from '../common';
import { getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';

export type WuiHeaderLogoProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    rel?: string;
    target?: string;
    iconType?: IconType;
    iconTitle?: string;
    /**
     * ReactNode to render as this component's content
     */
    children?: ReactNode;
  };

export const WuiHeaderLogo: FunctionComponent<WuiHeaderLogoProps> = ({
  iconType = 'logoWazuh',
  iconTitle = 'Wazuh',
  href,
  rel,
  target,
  children,
  className,
  ...rest
}) => {
  const classes = classNames('wuiHeaderLogo', className);
  const secureRel = getSecureRelForTarget({ href, rel, target });
  const isHrefValid = !href || validateHref(href);
  return (
    <a
      href={isHrefValid ? href : ''}
      rel={secureRel}
      target={target}
      className={classes}
      {...rest}>
      <WuiIcon
        aria-label={iconTitle}
        className="wuiHeaderLogo__icon"
        size="l"
        type={iconType}
      />

      {children && <span className="wuiHeaderLogo__text">{children}</span>}
    </a>
  );
};
