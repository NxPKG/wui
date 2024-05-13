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

import classNames from 'classnames';
import React, { Component } from 'react';
import { WuiScreenReaderOnly } from '../accessibility';
import { CommonProps } from '../common';
import { WuiI18n } from '../i18n';
import { WuiPortal } from '../portal';

type BottomBarPaddingSize = 'none' | 's' | 'm' | 'l';

// Exported for testing
export const paddingSizeToClassNameMap: {
  [value in BottomBarPaddingSize]: string | null;
} = {
  none: null,
  s: 'wuiBottomBar--paddingSmall',
  m: 'wuiBottomBar--paddingMedium',
  l: 'wuiBottomBar--paddingLarge',
};

interface Props extends CommonProps {
  /**
   * Optional class applied to the body class
   */
  bodyClassName?: string;

  /**
   * Padding applied to the bar
   */
  paddingSize?: BottomBarPaddingSize;

  /**
   * Customize the screen reader heading that helps users find this control. Default is "Page level controls".
   */
  landmarkHeading?: string;
}

export class WuiBottomBar extends Component<Props> {
  private bar: HTMLElement | null = null;

  componentDidMount() {
    const height = this.bar ? this.bar.clientHeight : -1;
    document.body.style.paddingBottom = `${height}px`;
    if (this.props.bodyClassName) {
      document.body.classList.add(this.props.bodyClassName);
    }
  }

  componentWillUnmount() {
    document.body.style.paddingBottom = '';
    if (this.props.bodyClassName) {
      document.body.classList.remove(this.props.bodyClassName);
    }
  }

  render() {
    const {
      children,
      className,
      paddingSize = 'm',
      bodyClassName,
      landmarkHeading,
      ...rest
    } = this.props;

    const classes = classNames(
      'wuiBottomBar',
      paddingSizeToClassNameMap[paddingSize],
      className
    );

    return (
      <WuiPortal>
        <WuiI18n
          token="wuiBottomBar.screenReaderHeading"
          default="Page level controls">
          {(screenReaderHeading: string) => (
            // Though it would be better to use aria-labelledby than aria-label and not repeat the same string twice
            // A bug in voiceover won't list some landmarks in the rotor without an aria-label
            <section
              aria-label={
                landmarkHeading ? landmarkHeading : screenReaderHeading
              }
              className={classes}
              ref={node => {
                this.bar = node;
              }}
              {...rest}>
              <WuiScreenReaderOnly>
                <h2>
                  {landmarkHeading ? landmarkHeading : screenReaderHeading}
                </h2>
              </WuiScreenReaderOnly>
              {children}
            </section>
          )}
        </WuiI18n>
        <WuiScreenReaderOnly>
          <p aria-live="assertive">
            {landmarkHeading ? (
              <WuiI18n
                token="wuiBottomBar.customScreenReaderAnnouncement"
                default="There is a new region landmark called {landmarkHeading} with page level controls at the end of the document."
                values={{ landmarkHeading }}
              />
            ) : (
              <WuiI18n
                token="wuiBottomBar.screenReaderAnnouncement"
                default="There is a new region landmark with page level controls at the end of the document."
              />
            )}
          </p>
        </WuiScreenReaderOnly>
      </WuiPortal>
    );
  }
}
