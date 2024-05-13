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

import React, { Component, HTMLAttributes, ReactNode } from 'react';
import { CommonProps } from '../common';
import PropTypes from 'prop-types';

import { WuiText } from '../text';

interface WuiErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export type WuiErrorBoundaryProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * ReactNode to render as this component's content
     */
    children: ReactNode;
  };

export class WuiErrorBoundary extends Component<
  WuiErrorBoundaryProps,
  WuiErrorBoundaryState
> {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props: WuiErrorBoundaryProps) {
    super(props);

    const errorState: WuiErrorBoundaryState = {
      hasError: false,
      error: undefined,
    };

    this.state = errorState;
  }

  componentDidCatch(error: Error) {
    // Display fallback UI
    this.setState({
      hasError: true,
      error,
    });
  }

  render() {
    const { children, ...rest } = this.props;

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="wuiErrorBoundary" {...rest}>
          <div className="wuiErrorBoundary__text">
            <WuiText size="xs">
              <h1>Error</h1>
              <pre className="wuiErrorBoundary__stack">
                <p>{this.state.error && this.state.error.stack}</p>
              </pre>
            </WuiText>
          </div>
        </div>
      );
    }

    return children;
  }
}
