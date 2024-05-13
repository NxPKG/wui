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

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import {
  WuiPinnableListGroup,
  WuiPinnableListGroupItemProps,
} from './pinnable_list_group';

const someListItems: WuiPinnableListGroupItemProps[] = [
  {
    label: 'Label with iconType',
    iconType: 'stop',
  },
  {
    label: 'Custom extra action',
    extraAction: {
      iconType: 'bell',
      alwaysShow: true,
      'aria-label': 'bell',
    },
  },
  {
    label: 'Active link',
    isActive: true,
    href: '#',
  },
  {
    label: 'Button with onClick',
    pinned: true,
    onClick: e => {
      console.log('Visualize clicked', e);
    },
  },
  {
    label: 'Link with href',
    href: '#',
  },
  {
    label: 'Not pinnable',
    href: '#',
    pinnable: false,
  },
];

describe('WuiPinnableListGroup', () => {
  test('is rendered', () => {
    const component = render(
      <WuiPinnableListGroup
        {...requiredProps}
        listItems={someListItems}
        onPinClick={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('can have custom pin icon titles', () => {
    const component = render(
      <WuiPinnableListGroup
        {...requiredProps}
        listItems={someListItems}
        onPinClick={() => {}}
        pinTitle={(item: WuiPinnableListGroupItemProps) =>
          `Pin ${item.label} to the top`
        }
        unpinTitle={(item: WuiPinnableListGroupItemProps) =>
          `Unpin ${item.label} to the top`
        }
      />
    );

    expect(component).toMatchSnapshot();
  });
});
