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

import React, { Component, Fragment } from 'react';

import { WuiButtonEmpty } from '../../../button';
import { WuiIcon } from '../../../icon';
import { WuiPopover } from '../../../popover';
import { WuiTitle } from '../../../title';
import { WuiSpacer } from '../../../spacer';
import { WuiHorizontalRule } from '../../../horizontal_rule';
import { WuiText } from '../../../text';

import { WuiQuickSelect } from './quick_select';
import { WuiCommonlyUsedTimeRanges } from './commonly_used_time_ranges';
import { WuiRecentlyUsed } from './recently_used';
import { WuiRefreshInterval } from './refresh_interval';
import {
  DurationRange,
  ApplyRefreshInterval,
  ApplyTime,
  QuickSelect,
  QuickSelectPanel,
} from '../../types';

export interface WuiQuickSelectPopoverProps {
  applyRefreshInterval?: ApplyRefreshInterval;
  applyTime: ApplyTime;
  commonlyUsedRanges: DurationRange[];
  customQuickSelectPanels?: QuickSelectPanel[];
  dateFormat: string;
  end: string;
  isAutoRefreshOnly: boolean;
  isDisabled: boolean;
  isPaused: boolean;
  recentlyUsedRanges: DurationRange[];
  refreshInterval: number;
  start: string;
}

interface WuiQuickSelectPopoverState {
  isOpen: boolean;
  prevQuickSelect?: QuickSelect;
}

export class WuiQuickSelectPopover extends Component<
  WuiQuickSelectPopoverProps,
  WuiQuickSelectPopoverState
> {
  state: WuiQuickSelectPopoverState = {
    isOpen: false,
  };

  closePopover = () => {
    this.setState({ isOpen: false });
  };

  togglePopover = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  applyTime: ApplyTime = ({
    start,
    end,
    quickSelect,
    keepPopoverOpen = false,
  }) => {
    this.props.applyTime({
      start,
      end,
    });
    if (quickSelect) {
      this.setState({ prevQuickSelect: quickSelect });
    }
    if (!keepPopoverOpen) {
      this.closePopover();
    }
  };

  renderDateTimeSections = () => {
    const {
      commonlyUsedRanges,
      dateFormat,
      end,
      isAutoRefreshOnly,
      recentlyUsedRanges,
      start,
    } = this.props;
    const { prevQuickSelect } = this.state;

    if (isAutoRefreshOnly) {
      return null;
    }

    return (
      <Fragment>
        <WuiQuickSelect
          applyTime={this.applyTime}
          start={start}
          end={end}
          prevQuickSelect={prevQuickSelect}
        />
        <WuiCommonlyUsedTimeRanges
          applyTime={this.applyTime}
          commonlyUsedRanges={commonlyUsedRanges}
        />
        <WuiRecentlyUsed
          applyTime={this.applyTime}
          commonlyUsedRanges={commonlyUsedRanges}
          dateFormat={dateFormat}
          recentlyUsedRanges={recentlyUsedRanges}
        />
        {this.renderCustomQuickSelectPanels()}
      </Fragment>
    );
  };

  renderCustomQuickSelectPanels = () => {
    const { customQuickSelectPanels } = this.props;
    if (!customQuickSelectPanels) {
      return null;
    }

    return customQuickSelectPanels.map(({ title, content }) => {
      return (
        <Fragment key={title}>
          <WuiTitle size="xxxs">
            <span>{title}</span>
          </WuiTitle>
          <WuiSpacer size="s" />
          <WuiText size="s" className="wuiQuickSelectPopover__section">
            {React.cloneElement(content, { applyTime: this.applyTime })}
          </WuiText>
          <WuiHorizontalRule margin="s" />
        </Fragment>
      );
    });
  };

  render() {
    const {
      applyRefreshInterval,
      isAutoRefreshOnly,
      isDisabled,
      isPaused,
      refreshInterval,
    } = this.props;
    const { isOpen } = this.state;

    const quickSelectButton = (
      <WuiButtonEmpty
        className="wuiFormControlLayout__prepend"
        textProps={{ className: 'wuiQuickSelectPopover__buttonText' }}
        onClick={this.togglePopover}
        aria-label="Date quick select"
        size="xs"
        iconType="arrowDown"
        iconSide="right"
        isDisabled={isDisabled}
        data-test-subj="superDatePickerToggleQuickMenuButton">
        <WuiIcon type={!isAutoRefreshOnly && isPaused ? 'calendar' : 'clock'} />
      </WuiButtonEmpty>
    );

    return (
      <WuiPopover
        id="QuickSelectPopover"
        button={quickSelectButton}
        isOpen={isOpen}
        closePopover={this.closePopover}
        anchorPosition="downLeft"
        anchorClassName="wuiQuickSelectPopover__anchor"
        ownFocus>
        <div
          className="wuiQuickSelectPopover__content"
          data-test-subj="superDatePickerQuickMenu">
          {this.renderDateTimeSections()}
          <WuiRefreshInterval
            applyRefreshInterval={applyRefreshInterval}
            isPaused={isPaused}
            refreshInterval={refreshInterval}
          />
        </div>
      </WuiPopover>
    );
  }
}
