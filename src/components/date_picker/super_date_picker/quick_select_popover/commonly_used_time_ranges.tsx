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
import { WuiI18n } from '../../../i18n';
import { WuiFlexGrid, WuiFlexItem } from '../../../flex';
import { WuiTitle } from '../../../title';
import { WuiLink } from '../../../link';
import { WuiHorizontalRule } from '../../../horizontal_rule';
import { htmlIdGenerator } from '../../../../services';
import { DurationRange, ApplyTime } from '../../types';

const generateId = htmlIdGenerator();

export interface WuiCommonlyUsedTimeRangesProps {
  applyTime: ApplyTime;
  commonlyUsedRanges: DurationRange[];
}

export const WuiCommonlyUsedTimeRanges: FunctionComponent<WuiCommonlyUsedTimeRangesProps> = ({
  applyTime,
  commonlyUsedRanges,
}) => {
  const legendId = generateId();
  const links = commonlyUsedRanges.map(({ start, end, label }) => {
    const applyCommonlyUsed = () => {
      applyTime({ start, end });
    };
    const dataTestSubj = label
      ? `superDatePickerCommonlyUsed_${label.replace(' ', '_')}`
      : undefined;
    return (
      <WuiFlexItem
        key={label}
        component="li"
        className="wuiCommonlyUsedTimeRanges__item">
        <WuiLink onClick={applyCommonlyUsed} data-test-subj={dataTestSubj}>
          {label}
        </WuiLink>
      </WuiFlexItem>
    );
  });

  return (
    <fieldset>
      <WuiTitle size="xxxs">
        <legend id={legendId} aria-label="Commonly used time ranges">
          <WuiI18n
            token="wuiCommonlyUsedTimeRanges.legend"
            default="Commonly used"
          />
        </legend>
      </WuiTitle>
      <div className="wuiQuickSelectPopover__section">
        <WuiFlexGrid
          aria-labelledby={legendId}
          gutterSize="s"
          columns={2}
          direction="column"
          responsive={false}
          component="ul">
          {links}
        </WuiFlexGrid>
      </div>
      <WuiHorizontalRule margin="s" />
    </fieldset>
  );
};

WuiCommonlyUsedTimeRanges.displayName = 'WuiCommonlyUsedTimeRanges';
