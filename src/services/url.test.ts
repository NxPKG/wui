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

import { isDomainSecure } from './url';

describe('url', () => {
  describe('#isDomainSecure', () => {
    it('returns true for secure domains', () => {
      expect(isDomainSecure('https://wazuh.co')).toEqual(true);
      expect(isDomainSecure('https://wazuh.co?foo=bar')).toEqual(true);
      expect(isDomainSecure('https://wazuh.co/')).toEqual(true);
      expect(isDomainSecure('https://www.wazuh.co')).toEqual(true);
      expect(isDomainSecure('https://docs.wazuh.co')).toEqual(true);
      expect(isDomainSecure('https://stats.wazuh.co')).toEqual(true);
      expect(isDomainSecure('https://lots.of.kids.wazuh.co')).toEqual(true);
      expect(
        isDomainSecure('https://wazuh.co/cool/url/with?lots=of&params')
      ).toEqual(true);
    });

    it('returns false for unsecure domains', () => {
      expect(isDomainSecure('https://wwwwazuh.co')).toEqual(false);
      expect(isDomainSecure('https://www.zwazuh.co')).toEqual(false);
      expect(isDomainSecure('https://*wazuh.co')).toEqual(false);
      expect(isDomainSecure('http://wazuh.com')).toEqual(false);
      expect(isDomainSecure('https://wazuh.co.now')).toEqual(false);
      expect(isDomainSecure('wazuh.co')).toEqual(false);
      expect(isDomainSecure('smb://www.wazuh.co')).toEqual(false);
      expect(
        isDomainSecure(
          'https://wwwwazuh.co/cool/url/with?lots=of&params/https://wazuh.co'
        )
      ).toEqual(false);
    });
  });
});
