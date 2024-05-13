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

import React, { FunctionComponent } from 'react';

import { WuiTabbedContent, WuiTabbedContentProps } from '../../../tabs';
import { WuiText } from '../../../text';
import { WuiButton } from '../../../button';

import { WuiAbsoluteTab } from './absolute_tab';
import { WuiRelativeTab } from './relative_tab';

import {
  getDateMode,
  DATE_MODES,
  toAbsoluteString,
  toRelativeString,
} from '../date_modes';
import { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named

export interface WuiDatePopoverContentProps {
  value: string;
  onChange(date: string | null, event?: React.SyntheticEvent<any>): void;
  roundUp?: boolean;
  dateFormat: string;
  timeFormat: string;
  locale?: LocaleSpecifier;
  position: 'start' | 'end';
  utcOffset?: number;
}

export const WuiDatePopoverContent: FunctionComponent<WuiDatePopoverContentProps> = ({
  value,
  roundUp = false,
  onChange,
  dateFormat,
  timeFormat,
  locale,
  position,
  utcOffset,
}) => {
  const onTabClick: WuiTabbedContentProps['onTabClick'] = selectedTab => {
    switch (selectedTab.id) {
      case DATE_MODES.ABSOLUTE:
        onChange(toAbsoluteString(value, roundUp));
        break;
      case DATE_MODES.RELATIVE:
        onChange(toRelativeString(value));
        break;
    }
  };

  const ariaLabel = `${position === 'start' ? 'Start' : 'End'} date:`;

  const renderTabs = [
    {
      id: DATE_MODES.ABSOLUTE,
      name: 'Absolute',
      content: (
        <WuiAbsoluteTab
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          locale={locale}
          value={value}
          onChange={onChange}
          roundUp={roundUp}
          position={position}
          utcOffset={utcOffset}
        />
      ),
      'data-test-subj': 'superDatePickerAbsoluteTab',
      'aria-label': `${ariaLabel} Absolute`,
    },
    {
      id: DATE_MODES.RELATIVE,
      name: 'Relative',
      content: (
        <WuiRelativeTab
          dateFormat={dateFormat}
          locale={locale}
          value={toAbsoluteString(value, roundUp)}
          onChange={onChange}
          roundUp={roundUp}
          position={position}
        />
      ),
      'data-test-subj': 'superDatePickerRelativeTab',
      'aria-label': `${ariaLabel} Relative`,
    },
    {
      id: DATE_MODES.NOW,
      name: 'Now',
      content: (
        <WuiText
          size="s"
          color="subdued"
          className="wuiDatePopoverContent__padded--large">
          <p>
            Setting the time to &quot;now&quot; means that on every refresh this
            time will be set to the time of the refresh.
          </p>
          <WuiButton
            data-test-subj="superDatePickerNowButton"
            onClick={() => {
              onChange('now');
            }}
            fullWidth
            size="s"
            fill>
            Set {position} date and time to now
          </WuiButton>
        </WuiText>
      ),
      'data-test-subj': 'superDatePickerNowTab',
      'aria-label': `${ariaLabel} Now`,
    },
  ];

  const initialSelectedTab = renderTabs.find(
    tab => tab.id === getDateMode(value)
  );

  return (
    <WuiTabbedContent
      className="wuiDatePopoverContent"
      tabs={renderTabs}
      autoFocus="selected"
      initialSelectedTab={initialSelectedTab}
      onTabClick={onTabClick}
      size="s"
      expand
    />
  );
};

WuiDatePopoverContent.displayName = 'WuiDatePopoverContent';
