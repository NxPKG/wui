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

import { WuiTableRowCell } from './table_row_cell';

import { RIGHT_ALIGNMENT, CENTER_ALIGNMENT } from '../../services/alignment';
import { WARNING_MESSAGE } from './utils';

test('renders WuiTableRowCell', () => {
  const component = (
    <WuiTableRowCell {...requiredProps}>children</WuiTableRowCell>
  );

  expect(render(component)).toMatchSnapshot();
});

describe('align', () => {
  test('defaults to left', () => {
    const component = <WuiTableRowCell />;

    expect(render(component)).toMatchSnapshot();
  });

  test('renders right when specified', () => {
    const component = <WuiTableRowCell align={RIGHT_ALIGNMENT} />;

    expect(render(component)).toMatchSnapshot();
  });

  test('renders center when specified', () => {
    const component = <WuiTableRowCell align={CENTER_ALIGNMENT} />;

    expect(render(component)).toMatchSnapshot();
  });
});

describe('textOnly', () => {
  test('defaults to true', () => {
    const component = <WuiTableRowCell />;

    expect(render(component)).toMatchSnapshot();
  });

  test('is rendered when specified', () => {
    const component = <WuiTableRowCell textOnly={false} />;

    expect(render(component)).toMatchSnapshot();
  });
});

describe('truncateText', () => {
  test('defaults to false', () => {
    const component = <WuiTableRowCell />;

    expect(render(component)).toMatchSnapshot();
  });

  test('is rendered when specified', () => {
    const component = <WuiTableRowCell truncateText={true} />;

    expect(render(component)).toMatchSnapshot();
  });
});

describe("children's className", () => {
  test('merges new classnames into existing ones', () => {
    const component = (
      <WuiTableRowCell textOnly={false} showOnHover={true}>
        <div className="testClass" />
      </WuiTableRowCell>
    );

    expect(render(component)).toMatchSnapshot();
  });
});

describe('width and style', () => {
  const _consoleWarn = console.warn;
  beforeAll(() => {
    console.warn = (...args: [any?, ...any[]]) => {
      // Suppress an expected warning
      if (args.length === 1 && args[0] === WARNING_MESSAGE) return;
      _consoleWarn.apply(console, args);
    };
  });
  afterAll(() => {
    console.warn = _consoleWarn;
  });

  test('accepts style attribute', () => {
    const component = (
      <WuiTableRowCell style={{ width: '20%' }}>Test</WuiTableRowCell>
    );

    expect(render(component)).toMatchSnapshot();
  });

  test('accepts width attribute', () => {
    const component = <WuiTableRowCell width="10%">Test</WuiTableRowCell>;

    expect(render(component)).toMatchSnapshot();
  });

  test('accepts width attribute as number', () => {
    const component = <WuiTableRowCell width={100}>Test</WuiTableRowCell>;

    expect(render(component)).toMatchSnapshot();
  });

  test('resolves style and width attribute', () => {
    const component = (
      <WuiTableRowCell width="10%" style={{ width: '20%' }}>
        Test
      </WuiTableRowCell>
    );

    expect(render(component)).toMatchSnapshot();
  });
});
