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
import { requiredProps } from '../../test/required_props';

import { WuiTourStep } from './tour_step';

const steps = [
  {
    step: 1,
    subtitle: 'Step 1',
    content: 'You are here',
  },
];

const config = {
  onFinish: () => {},
  stepsTotal: 1,
  title: 'A demo',
};

describe('WuiTourStep', () => {
  test('is rendered', () => {
    const component = render(
      <WuiTourStep {...config} {...steps[0]} {...requiredProps}>
        <span>Test</span>
      </WuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be closed', () => {
    const component = render(
      <WuiTourStep
        {...config}
        {...steps[0]}
        isStepOpen={false}
        {...requiredProps}>
        <span>Test</span>
      </WuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });

  test('can set a minWidth', () => {
    const component = render(
      <WuiTourStep {...config} {...steps[0]} minWidth={240} {...requiredProps}>
        <span>Test</span>
      </WuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });

  test('can override the footer action', () => {
    const component = render(
      <WuiTourStep
        {...config}
        {...steps[0]}
        footerAction={<button onClick={() => {}}>Test</button>}
        {...requiredProps}>
        <span>Test</span>
      </WuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });

  test('can turn off the beacon', () => {
    const component = render(
      <WuiTourStep
        {...config}
        {...steps[0]}
        decoration="none"
        {...requiredProps}>
        <span>Test</span>
      </WuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });
});
