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
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../test';

import {
  WuiFlexGroup,
  GUTTER_SIZES,
  ALIGN_ITEMS,
  JUSTIFY_CONTENTS,
  DIRECTIONS,
} from './flex_group';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

describe('WuiFlexGroup', () => {
  test('is rendered', () => {
    const component = render(
      <WuiFlexGroup {...requiredProps}>
        <h2>My Child</h2>
      </WuiFlexGroup>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('responsive', () => {
      [true, false].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<WuiFlexGroup responsive={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('gutterSize', () => {
      GUTTER_SIZES.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<WuiFlexGroup gutterSize={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('alignItems', () => {
      ALIGN_ITEMS.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<WuiFlexGroup alignItems={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('justifyContent', () => {
      JUSTIFY_CONTENTS.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<WuiFlexGroup justifyContent={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('direction', () => {
      DIRECTIONS.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<WuiFlexGroup direction={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('component', () => {
      ['div', 'span'].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <WuiFlexGroup component={value as 'div' | 'span'} />
          );

          expect(component).toMatchSnapshot();
        });
      });

      ['h2'].forEach(value => {
        test(`${value} is not rendered`, () => {
          expect(() =>
            render(
              // @ts-ignore intentionally passing an invalid value
              <WuiFlexGroup component={value} />
            )
          ).toThrow();
        });
      });
    });

    describe('wrap', () => {
      [true, false].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<WuiFlexGroup wrap={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
