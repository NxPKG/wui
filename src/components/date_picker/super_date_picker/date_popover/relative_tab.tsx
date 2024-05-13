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

import React, { Component, ChangeEventHandler } from 'react';
import dateMath from '@elastic/datemath';
import { toSentenceCase } from '../../../../services/string/to_case';
import { htmlIdGenerator } from '../../../../services';
import { WuiFlexGroup, WuiFlexItem } from '../../../flex';
import {
  WuiForm,
  WuiFormRow,
  WuiSelect,
  WuiFieldNumber,
  WuiFieldText,
  WuiSwitch,
  WuiFormLabel,
  WuiSwitchEvent,
} from '../../../form';
import { WuiSpacer } from '../../../spacer';

import { timeUnits } from '../time_units';
import { relativeOptions } from '../relative_options';
import {
  parseRelativeParts,
  toRelativeStringFromParts,
} from '../relative_utils';
import { WuiScreenReaderOnly } from '../../../accessibility';
import { WuiI18n } from '../../../i18n';
import { RelativeParts, TimeUnitId } from '../../types';
import { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named
import { WuiDatePopoverContentProps } from './date_popover_content';

export interface WuiRelativeTabProps {
  dateFormat: string;
  locale?: LocaleSpecifier;
  value: string;
  onChange: WuiDatePopoverContentProps['onChange'];
  roundUp?: boolean;
  position: 'start' | 'end';
}

interface WuiRelativeTabState
  extends Pick<RelativeParts, 'unit' | 'round' | 'roundUnit'> {
  count: number | undefined;
  sentenceCasedPosition: string;
}

export class WuiRelativeTab extends Component<
  WuiRelativeTabProps,
  WuiRelativeTabState
> {
  state: WuiRelativeTabState = {
    ...parseRelativeParts(this.props.value),
    sentenceCasedPosition: toSentenceCase(this.props.position),
  };

  generateId = htmlIdGenerator();

  onCountChange: ChangeEventHandler<HTMLInputElement> = event => {
    const sanitizedValue = parseInt(event.target.value, 10);
    this.setState(
      {
        count: isNaN(sanitizedValue) ? undefined : sanitizedValue,
      },
      this.handleChange
    );
  };

  onUnitChange: ChangeEventHandler<HTMLSelectElement> = event => {
    this.setState(
      {
        unit: event.target.value,
      },
      this.handleChange
    );
  };

  onRoundChange = (event: WuiSwitchEvent) => {
    this.setState(
      {
        round: event.target.checked,
      },
      this.handleChange
    );
  };

  handleChange = () => {
    const { count, round, roundUnit, unit } = this.state;
    const { onChange } = this.props;
    if (count === undefined || count < 0) {
      return;
    }
    const date = toRelativeStringFromParts({
      count,
      round,
      roundUnit,
      unit,
    });
    onChange(date);
  };

  render() {
    const { count, unit } = this.state;
    const relativeDateInputNumberDescriptionId = this.generateId();
    const isInvalid = count === undefined || count < 0;
    const parsedValue = dateMath.parse(this.props.value, {
      roundUp: this.props.roundUp,
    });
    const formatedValue =
      isInvalid || !parsedValue || !parsedValue.isValid()
        ? ''
        : parsedValue
            .locale(this.props.locale || 'en')
            .format(this.props.dateFormat);
    return (
      <WuiForm className="wuiDatePopoverContent__padded">
        <WuiFlexGroup gutterSize="s" responsive={false}>
          <WuiFlexItem>
            <WuiI18n
              tokens={[
                'wuiRelativeTab.numberInputError',
                'wuiRelativeTab.numberInputLabel',
              ]}
              defaults={['Must be >= 0', 'Time span amount']}>
              {([numberInputError, numberInputLabel]: string[]) => (
                <WuiFormRow
                  isInvalid={isInvalid}
                  error={isInvalid ? numberInputError : null}>
                  <WuiFieldNumber
                    compressed
                    aria-label={numberInputLabel}
                    aria-describedby={relativeDateInputNumberDescriptionId}
                    data-test-subj={'superDatePickerRelativeDateInputNumber'}
                    value={count}
                    onChange={this.onCountChange}
                    isInvalid={isInvalid}
                  />
                </WuiFormRow>
              )}
            </WuiI18n>
          </WuiFlexItem>
          <WuiFlexItem>
            <WuiI18n
              token="wuiRelativeTab.unitInputLabel"
              default="Relative time span">
              {(unitInputLabel: string) => (
                <WuiSelect
                  compressed
                  aria-label={unitInputLabel}
                  data-test-subj={
                    'superDatePickerRelativeDateInputUnitSelector'
                  }
                  value={unit}
                  options={relativeOptions}
                  onChange={this.onUnitChange}
                />
              )}
            </WuiI18n>
          </WuiFlexItem>
        </WuiFlexGroup>
        <WuiSpacer size="m" />
        <WuiI18n
          token="wuiRelativeTab.roundingLabel"
          default="Round to the {unit}"
          values={{ unit: timeUnits[unit.substring(0, 1) as TimeUnitId] }}>
          {(roundingLabel: string) => (
            <WuiSwitch
              data-test-subj={'superDatePickerRelativeDateRoundSwitch'}
              label={roundingLabel}
              checked={this.state.round}
              onChange={this.onRoundChange}
            />
          )}
        </WuiI18n>

        <WuiSpacer size="m" />
        <WuiFieldText
          compressed
          value={formatedValue}
          readOnly
          prepend={
            <WuiFormLabel>
              <WuiI18n
                token="wuiRelativeTab.relativeDate"
                default="{position} date"
                values={{ position: this.state.sentenceCasedPosition }}
              />
            </WuiFormLabel>
          }
        />
        <WuiScreenReaderOnly>
          <p id={relativeDateInputNumberDescriptionId}>
            <WuiI18n
              token="wuiRelativeTab.fullDescription"
              default="The unit is changeable. Currently set to {unit}."
              values={{ unit }}
            />
          </p>
        </WuiScreenReaderOnly>
      </WuiForm>
    );
  }
}
