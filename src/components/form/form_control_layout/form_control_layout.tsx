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
  cloneElement,
  Component,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import {
  WuiFormControlLayoutIcons,
  WuiFormControlLayoutIconsProps,
} from './form_control_layout_icons';
import { CommonProps } from '../../common';
import { WuiFormLabel } from '../form_label';

export { ICON_SIDES } from './form_control_layout_icons';

type StringOrReactElement = string | ReactElement;
type PrependAppendType = StringOrReactElement | StringOrReactElement[];

export type WuiFormControlLayoutProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Creates an input group with element(s) coming before children.
     * `string` | `ReactElement` or an array of these
     */
    prepend?: PrependAppendType;
    /**
     * Creates an input group with element(s) coming after children.
     * `string` | `ReactElement` or an array of these
     */
    append?: PrependAppendType;
    children?: ReactNode;
    icon?: WuiFormControlLayoutIconsProps['icon'];
    clear?: WuiFormControlLayoutIconsProps['clear'];
    fullWidth?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    className?: string;
    compressed?: boolean;
    readOnly?: boolean;
    /**
     * Connects the prepend and append labels to the input
     */
    inputId?: string;
  };

export class WuiFormControlLayout extends Component<WuiFormControlLayoutProps> {
  render() {
    const {
      children,
      icon,
      clear,
      fullWidth,
      isLoading,
      isDisabled,
      compressed,
      className,
      prepend,
      append,
      readOnly,
      inputId,
      ...rest
    } = this.props;

    const classes = classNames(
      'wuiFormControlLayout',
      {
        'wuiFormControlLayout--fullWidth': fullWidth,
        'wuiFormControlLayout--compressed': compressed,
        'wuiFormControlLayout--readOnly': readOnly,
        'wuiFormControlLayout--group': prepend || append,
        'wuiFormControlLayout-isDisabled': isDisabled,
      },
      className
    );

    const prependNodes = this.renderSideNode('prepend', prepend, inputId);
    const appendNodes = this.renderSideNode('append', append, inputId);

    return (
      <div className={classes} {...rest}>
        {prependNodes}
        <div className="wuiFormControlLayout__childrenWrapper">
          {children}

          <WuiFormControlLayoutIcons
            icon={icon}
            clear={clear}
            isLoading={isLoading}
          />
        </div>
        {appendNodes}
      </div>
    );
  }

  renderSideNode(
    side: 'append' | 'prepend',
    nodes?: PrependAppendType,
    inputId?: string
  ) {
    if (!nodes) {
      return;
    }

    if (typeof nodes === 'string') {
      return this.createFormLabel(side, nodes, inputId);
    }

    const appendNodes = React.Children.map(nodes, (item, index) =>
      typeof item === 'string'
        ? this.createFormLabel(side, item, inputId)
        : this.createSideNode(side, item, index)
    );

    return appendNodes;
  }

  createFormLabel(
    side: 'append' | 'prepend',
    string: string,
    inputId?: string
  ) {
    return (
      <WuiFormLabel
        htmlFor={inputId}
        className={`wuiFormControlLayout__${side}`}>
        {string}
      </WuiFormLabel>
    );
  }

  createSideNode(
    side: 'append' | 'prepend',
    node: ReactElement,
    key: React.Key
  ) {
    return cloneElement(node, {
      className: classNames(
        `wuiFormControlLayout__${side}`,
        node.props.className
      ),
      key: key,
    });
  }
}
