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

import React, { Fragment, FunctionComponent } from 'react';
import { prettyDuration } from '../pretty_duration';

import { WuiFlexGroup, WuiFlexItem } from '../../../flex';
import { WuiTitle } from '../../../title';
import { WuiSpacer } from '../../../spacer';
import { WuiLink } from '../../../link';
import { WuiText } from '../../../text';
import { WuiHorizontalRule } from '../../../horizontal_rule';
import { DurationRange, ApplyTime } from '../../types';

export interface WuiRecentlyUsedProps {
  applyTime: ApplyTime;
  commonlyUsedRanges: DurationRange[];
  dateFormat: string;
  recentlyUsedRanges?: DurationRange[];
}

export const WuiRecentlyUsed: FunctionComponent<WuiRecentlyUsedProps> = ({
  applyTime,
  commonlyUsedRanges,
  dateFormat,
  recentlyUsedRanges = [],
}) => {
  if (recentlyUsedRanges.length === 0) {
    return null;
  }

  const links = recentlyUsedRanges.map(({ start, end }) => {
    const applyRecentlyUsed = () => {
      applyTime({ start, end });
    };
    return (
      <WuiFlexItem grow={false} key={`${start}-${end}`}>
        <WuiLink onClick={applyRecentlyUsed}>
          {prettyDuration(start, end, commonlyUsedRanges, dateFormat)}
        </WuiLink>
      </WuiFlexItem>
    );
  });

  return (
    <Fragment>
      <WuiTitle size="xxxs">
        <span>Recently used date ranges</span>
      </WuiTitle>
      <WuiSpacer size="s" />
      <WuiText size="s" className="wuiQuickSelectPopover__section">
        <WuiFlexGroup gutterSize="s" direction="column">
          {links}
        </WuiFlexGroup>
      </WuiText>
      <WuiHorizontalRule margin="s" />
    </Fragment>
  );
};

WuiRecentlyUsed.displayName = 'WuiRecentlyUsed';
