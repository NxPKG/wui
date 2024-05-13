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
  Component,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import moment from 'moment';
import dateMath from '@elastic/datemath';
import { htmlIdGenerator } from '../../../../services';
import { WuiButton, WuiButtonIcon } from '../../../button';
import { WuiFlexGroup, WuiFlexItem } from '../../../flex';
import { WuiSpacer } from '../../../spacer';
import { WuiSelect, WuiFieldNumber } from '../../../form';
import { WuiToolTip } from '../../../tool_tip';
import { WuiHorizontalRule } from '../../../horizontal_rule';
import { WuiI18n } from '../../../i18n';
import { timeUnits } from '../time_units';
import { WuiScreenReaderOnly } from '../../../accessibility';
import { ApplyTime, QuickSelect, TimeUnitId } from '../../types';
import { keysOf } from '../../../common';
import { parseTimeParts } from './quick_select_utils';

const LAST = 'last';
const NEXT = 'next';

const timeTenseOptions = [
  { value: LAST, text: 'Last' },
  { value: NEXT, text: 'Next' },
];
const timeUnitsOptions = keysOf(timeUnits).map(key => {
  return { value: key, text: `${timeUnits[key]}s` };
});

type WuiQuickSelectState = QuickSelect;

export interface WuiQuickSelectProps {
  applyTime: ApplyTime;
  start: string;
  end: string;
  prevQuickSelect?: WuiQuickSelectState;
}

export class WuiQuickSelect extends Component<
  WuiQuickSelectProps,
  WuiQuickSelectState
> {
  constructor(props: WuiQuickSelectProps) {
    super(props);

    const {
      timeTense: timeTenseDefault,
      timeUnits: timeUnitsDefault,
      timeValue: timeValueDefault,
    } = parseTimeParts(props.start, props.end);

    this.state = {
      timeTense:
        props.prevQuickSelect && props.prevQuickSelect.timeTense
          ? props.prevQuickSelect.timeTense
          : timeTenseDefault,
      timeValue:
        props.prevQuickSelect && props.prevQuickSelect.timeValue
          ? props.prevQuickSelect.timeValue
          : timeValueDefault,
      timeUnits:
        props.prevQuickSelect && props.prevQuickSelect.timeUnits
          ? props.prevQuickSelect.timeUnits
          : timeUnitsDefault,
    };
  }

  generateId = htmlIdGenerator();

  onTimeTenseChange: ChangeEventHandler<HTMLSelectElement> = event => {
    this.setState({
      timeTense: event.target.value,
    });
  };

  onTimeValueChange: ChangeEventHandler<HTMLInputElement> = event => {
    const sanitizedValue = parseInt(event.target.value, 10);
    this.setState({
      timeValue: isNaN(sanitizedValue) ? 0 : sanitizedValue,
    });
  };

  onTimeUnitsChange: ChangeEventHandler<HTMLSelectElement> = event => {
    this.setState({
      timeUnits: event.target.value as TimeUnitId,
    });
  };

  handleKeyDown: KeyboardEventHandler<HTMLElement> = ({ key }) => {
    if (key === 'Enter') {
      this.applyQuickSelect();
    }
  };

  applyQuickSelect = () => {
    const { timeTense, timeValue, timeUnits } = this.state;

    if (timeTense === NEXT) {
      this.props.applyTime({
        start: 'now',
        end: `now+${timeValue}${timeUnits}`,
        quickSelect: { ...this.state },
      });
      return;
    }

    this.props.applyTime({
      start: `now-${timeValue}${timeUnits}`,
      end: 'now',
      quickSelect: { ...this.state },
    });
  };

  getBounds = () => {
    const startMoment = dateMath.parse(this.props.start);
    const endMoment = dateMath.parse(this.props.end, { roundUp: true });
    return {
      min:
        startMoment && startMoment.isValid()
          ? startMoment
          : moment().subtract(15, 'minute'),
      max: endMoment && endMoment.isValid() ? endMoment : moment(),
    };
  };

  stepForward = () => {
    const { min, max } = this.getBounds();
    const diff = max.diff(min);
    this.props.applyTime({
      start: moment(max)
        .add(1, 'ms')
        .toISOString(),
      end: moment(max)
        .add(diff + 1, 'ms')
        .toISOString(),
      keepPopoverOpen: true,
    });
  };

  stepBackward = () => {
    const { min, max } = this.getBounds();
    const diff = max.diff(min);
    this.props.applyTime({
      start: moment(min)
        .subtract(diff + 1, 'ms')
        .toISOString(),
      end: moment(min)
        .subtract(1, 'ms')
        .toISOString(),
      keepPopoverOpen: true,
    });
  };

  render() {
    const { timeTense, timeValue, timeUnits } = this.state;
    const timeSelectionId = this.generateId();
    const legendId = this.generateId();
    const matchedTimeUnit = timeUnitsOptions.find(
      ({ value }) => value === timeUnits
    );
    const timeUnit = matchedTimeUnit ? matchedTimeUnit.text : '';

    return (
      <fieldset>
        <WuiI18n
          token="wuiQuickSelect.legendText"
          default="Quick select a time range">
          {(legendText: string) => (
            // Legend needs to be the first thing in a fieldset, but we want the visible title within the flex.
            // So we hide it, but allow screen readers to see it
            <WuiScreenReaderOnly>
              <legend id={legendId} className="wuiFormLabel">
                {legendText}
              </legend>
            </WuiScreenReaderOnly>
          )}
        </WuiI18n>
        <WuiFlexGroup
          responsive={false}
          alignItems="center"
          justifyContent="spaceBetween"
          gutterSize="s">
          <WuiFlexItem grow={false}>
            <WuiI18n
              token="wuiQuickSelect.quickSelectTitle"
              default="Quick select">
              {(quickSelectTitle: string) => (
                <div aria-hidden className="wuiFormLabel">
                  {quickSelectTitle}
                </div>
              )}
            </WuiI18n>
          </WuiFlexItem>
          <WuiFlexItem grow={false}>
            <WuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
              <WuiFlexItem grow={false}>
                <WuiI18n
                  token="wuiQuickSelect.previousLabel"
                  default="Previous time window">
                  {(previousLabel: string) => (
                    <WuiToolTip content={previousLabel}>
                      <WuiButtonIcon
                        aria-label={previousLabel}
                        iconType="arrowLeft"
                        onClick={this.stepBackward}
                      />
                    </WuiToolTip>
                  )}
                </WuiI18n>
              </WuiFlexItem>
              <WuiFlexItem grow={false}>
                <WuiI18n
                  token="wuiQuickSelect.nextLabel"
                  default="Next time window">
                  {(nextLabel: string) => (
                    <WuiToolTip content={nextLabel}>
                      <WuiButtonIcon
                        aria-label={nextLabel}
                        iconType="arrowRight"
                        onClick={this.stepForward}
                      />
                    </WuiToolTip>
                  )}
                </WuiI18n>
              </WuiFlexItem>
            </WuiFlexGroup>
          </WuiFlexItem>
        </WuiFlexGroup>
        <WuiSpacer size="s" />
        <WuiFlexGroup gutterSize="s" responsive={false}>
          <WuiFlexItem>
            <WuiI18n token="wuiQuickSelect.tenseLabel" default="Time tense">
              {(tenseLabel: string) => (
                <WuiSelect
                  compressed
                  onKeyDown={this.handleKeyDown}
                  aria-label={tenseLabel}
                  aria-describedby={`${timeSelectionId} ${legendId}`}
                  value={timeTense}
                  options={timeTenseOptions}
                  onChange={this.onTimeTenseChange}
                />
              )}
            </WuiI18n>
          </WuiFlexItem>
          <WuiFlexItem>
            <WuiI18n token="wuiQuickSelect.valueLabel" default="Time value">
              {(valueLabel: string) => (
                <WuiFieldNumber
                  compressed
                  onKeyDown={this.handleKeyDown}
                  aria-describedby={`${timeSelectionId} ${legendId}`}
                  aria-label={valueLabel}
                  value={timeValue}
                  onChange={this.onTimeValueChange}
                />
              )}
            </WuiI18n>
          </WuiFlexItem>
          <WuiFlexItem>
            <WuiI18n token="wuiQuickSelect.unitLabel" default="Time unit">
              {(unitLabel: string) => (
                <WuiSelect
                  compressed
                  onKeyDown={this.handleKeyDown}
                  aria-label={unitLabel}
                  aria-describedby={`${timeSelectionId} ${legendId}`}
                  value={timeUnits}
                  options={timeUnitsOptions}
                  onChange={this.onTimeUnitsChange}
                />
              )}
            </WuiI18n>
          </WuiFlexItem>
          <WuiFlexItem grow={false}>
            <WuiButton
              aria-describedby={`${timeSelectionId} ${legendId}`}
              className="wuiQuickSelect__applyButton"
              size="s"
              onClick={this.applyQuickSelect}
              disabled={timeValue <= 0}>
              <WuiI18n token="wuiQuickSelect.applyButton" default="Apply" />
            </WuiButton>
          </WuiFlexItem>
        </WuiFlexGroup>
        <WuiHorizontalRule margin="s" />
        <WuiScreenReaderOnly>
          <p id={timeSelectionId}>
            <WuiI18n
              token="wuiQuickSelect.fullDescription"
              default="Currently set to {timeTense} {timeValue} {timeUnit}."
              values={{
                timeTense,
                timeValue,
                timeUnit,
              }}
            />
          </p>
        </WuiScreenReaderOnly>
      </fieldset>
    );
  }
}
