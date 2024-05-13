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

import React, { Component, ReactElement, ReactNode } from 'react';
import { CommonProps } from '../common';
import { copyToClipboard } from '../../services';
import { WuiToolTip, WuiToolTipProps } from '../tool_tip';

interface WuiCopyProps
  extends CommonProps,
    Partial<Omit<WuiToolTipProps, 'children'>> {
  /**
   * Text that will be copied to clipboard when copy function is executed.
   */
  textToCopy: string;
  /**
   * Tooltip message displayed before copy function is called.
   */
  beforeMessage?: ReactNode;
  /**
   * Tooltip message displayed after copy function is called that lets the user know that
   * 'textToCopy' has been copied to the clipboard.
   */
  afterMessage?: ReactNode;
  /**
   * Function that must return a component. First argument is 'copy' function.
   * Use your own logic to create the component that users interact with when triggering copy.
   */
  children(copy: () => void): ReactElement;
}

interface WuiCopyState {
  tooltipText: ReactNode;
}

export class WuiCopy extends Component<WuiCopyProps, WuiCopyState> {
  static defaultProps = {
    afterMessage: 'Copied',
  };

  constructor(props: WuiCopyProps) {
    super(props);

    this.state = {
      tooltipText: this.props.beforeMessage,
    };
  }

  copy = () => {
    const isCopied = copyToClipboard(this.props.textToCopy);
    if (isCopied) {
      this.setState({
        tooltipText: this.props.afterMessage,
      });
    }
  };

  resetTooltipText = () => {
    this.setState({
      tooltipText: this.props.beforeMessage,
    });
  };

  render() {
    const {
      children,
      textToCopy,
      beforeMessage,
      afterMessage,
      ...rest
    } = this.props;

    return (
      // See `src/components/tool_tip/tool_tip.js` for explanation of below eslint-disable
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <WuiToolTip
        content={this.state.tooltipText}
        onMouseOut={this.resetTooltipText}
        {...rest}>
        {children(this.copy)}
      </WuiToolTip>
    );
  }
}
