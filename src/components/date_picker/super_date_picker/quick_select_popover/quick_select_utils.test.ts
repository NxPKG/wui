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

import moment from 'moment';
import { parseTimeParts } from './quick_select_utils';

describe('parseTimeParts', () => {
  it('should parse now', () => {
    const out = parseTimeParts('now', 'now+5m');
    expect(out).toEqual({
      timeTense: 'next',
      timeUnits: 'm',
      timeValue: 5,
    });
  });

  it('should parse now-2h', () => {
    const out = parseTimeParts('now-2h', 'now+5m');
    expect(out).toEqual({
      timeTense: 'last',
      timeUnits: 'h',
      timeValue: 2,
    });
  });

  it('should parse now+2h', () => {
    const out = parseTimeParts('now+2h', 'now+5m');
    expect(out).toEqual({
      timeTense: 'next',
      timeUnits: 'h',
      timeValue: 2,
    });
  });

  describe('duration parsing', () => {
    const duration = moment.duration;
    beforeEach(() => {
      moment.duration = () => duration(6 * 60 * 60 * 1000);
    });

    afterEach(() => {
      moment.duration = duration;
    });

    it('should parse now/d', () => {
      const out = parseTimeParts('now/d', 'now+5m');
      expect(out).toEqual({
        timeTense: 'last',
        timeUnits: 'h',
        timeValue: 6,
      });
    });
  });
});
