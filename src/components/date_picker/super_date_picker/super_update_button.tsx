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

import React, { Component, MouseEventHandler, Ref } from 'react';
import classNames from 'classnames';

import { WuiButton } from '../../button';
import { WuiI18n } from '../../i18n';
import { WuiToolTip, WuiToolTipProps } from '../../tool_tip';

export interface WuiSuperUpdateButtonProps {
  className?: string;
  isDisabled: boolean;
  isLoading: boolean;
  needsUpdate: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;

  /**
   * Passes props to `WuiToolTip`
   */
  toolTipProps?: WuiToolTipProps;

  /**
   * Show the "Click to apply" tooltip
   */
  showTooltip: boolean;
}

export class WuiSuperUpdateButton extends Component<WuiSuperUpdateButtonProps> {
  static defaultProps = {
    needsUpdate: false,
    isLoading: false,
    isDisabled: false,
    showTooltip: false,
  };

  _isMounted = false;
  tooltipTimeout: number | undefined;
  tooltip: WuiToolTip | null = null;

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentDidUpdate() {
    if (
      this.props.showTooltip &&
      this.props.needsUpdate &&
      !this.props.isDisabled &&
      !this.props.isLoading
    ) {
      this.showTooltip();
      this.tooltipTimeout = (setTimeout(() => {
        this.hideTooltip();
      }, 2000) as unknown) as number | undefined;
    }
  }

  setTootipRef: Ref<WuiToolTip> = node => {
    this.tooltip = node;
  };

  showTooltip = () => {
    if (!this._isMounted || !this.tooltip) {
      return;
    }
    this.tooltip.showToolTip();
  };

  hideTooltip = () => {
    if (!this._isMounted || !this.tooltip) {
      return;
    }
    this.tooltip.hideToolTip();
  };

  render() {
    const {
      className,
      needsUpdate,
      isLoading,
      isDisabled,
      onClick,
      toolTipProps,
      showTooltip,
      ...rest
    } = this.props;

    const classes = classNames('wuiSuperUpdateButton', className);

    let buttonText = (
      <WuiI18n
        token="wuiSuperUpdateButton.refreshButtonLabel"
        default="Refresh"
      />
    );
    if (needsUpdate || isLoading) {
      buttonText = isLoading ? (
        <WuiI18n
          token="wuiSuperUpdateButton.updatingButtonLabel"
          default="Updating"
        />
      ) : (
        <WuiI18n
          token="wuiSuperUpdateButton.updateButtonLabel"
          default="Update"
        />
      );
    }

    let tooltipContent;
    if (isDisabled) {
      tooltipContent = (
        <WuiI18n
          token="wuiSuperUpdateButton.cannotUpdateTooltip"
          default="Cannot update"
        />
      );
    } else if (needsUpdate && !isLoading) {
      tooltipContent = (
        <WuiI18n
          token="wuiSuperUpdateButton.clickToApplyTooltip"
          default="Click to apply"
        />
      );
    }

    return (
      <WuiToolTip
        ref={this.setTootipRef}
        content={tooltipContent}
        position="bottom"
        {...toolTipProps}>
        <WuiButton
          className={classes}
          color={needsUpdate || isLoading ? 'secondary' : 'primary'}
          fill
          iconType={needsUpdate || isLoading ? 'qryFunction' : 'refresh'}
          textProps={{ className: 'wuiSuperUpdateButton__text' }}
          isDisabled={isDisabled}
          onClick={onClick}
          isLoading={isLoading}
          {...rest}>
          {buttonText}
        </WuiButton>
      </WuiToolTip>
    );
  }
}
