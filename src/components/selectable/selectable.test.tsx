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
import { mount, render } from 'enzyme';
import { requiredProps } from '../../test';

import { WuiSelectable } from './selectable';
import { WuiSelectableOption } from './selectable_option';

const options: WuiSelectableOption[] = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
];

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => () => 'htmlId',
}));

describe('WuiSelectable', () => {
  test('is rendered', () => {
    const component = render(
      <WuiSelectable options={options} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('searchable', () => {
      const component = render(<WuiSelectable options={options} searchable />);

      expect(component).toMatchSnapshot();
    });

    test('singleSelection', () => {
      const component = render(
        <WuiSelectable options={options} singleSelection />
      );

      expect(component).toMatchSnapshot();
    });

    test('allowExclusions', () => {
      const component = render(
        <WuiSelectable options={options} allowExclusions />
      );

      expect(component).toMatchSnapshot();
    });

    test('isLoading', () => {
      const component = render(<WuiSelectable options={options} isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('height can be forced', () => {
      const component = render(
        <WuiSelectable options={options} height={200} />
      );

      expect(component).toMatchSnapshot();
    });

    test('height can be full', () => {
      const component = render(
        <WuiSelectable options={options} height="full" />
      );

      expect(component).toMatchSnapshot();
    });

    test('renderOption', () => {
      const component = render(
        <WuiSelectable
          options={options}
          renderOption={(option: WuiSelectableOption, searchValue?: string) => {
            return (
              <span>
                {searchValue} =&gt; {option.label}
              </span>
            );
          }}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('listProps', () => {
      const component = render(
        <WuiSelectable
          options={options}
          listProps={{
            windowProps: {
              onScroll: () => {},
            },
          }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('custom options', () => {
    test('optional properties', () => {
      type OptionalOption = WuiSelectableOption<{ value?: string }>;
      const options: OptionalOption[] = [
        {
          label: 'Titan',
          'data-test-subj': 'titanOption',
          value: 'titan',
        },
        {
          label: 'Enceladus',
          value: 'enceladus',
        },
        {
          label:
            "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
        },
      ];

      const onChange = (options: OptionalOption[]) => {
        jest.fn(() => options);
      };

      const component = mount(
        <WuiSelectable<OptionalOption> options={options} onChange={onChange}>
          {list => list}
        </WuiSelectable>
      );

      expect(
        (component.find('WuiSelectableList').props() as any).visibleOptions
      ).toEqual(options);
    });

    test('required properties', () => {
      type ExtendedOption = WuiSelectableOption<{ value: string }>;
      const options: ExtendedOption[] = [
        {
          label: 'Titan',
          'data-test-subj': 'titanOption',
          value: 'titan',
        },
        {
          label: 'Enceladus',
          value: 'enceladus',
        },
        {
          label:
            "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
          value: 'pandora',
        },
      ];

      const onChange = (options: ExtendedOption[]) => {
        jest.fn(() => options);
      };

      const component = mount(
        <WuiSelectable<ExtendedOption> options={options} onChange={onChange}>
          {list => list}
        </WuiSelectable>
      );

      component.update();

      expect(
        (component.find('WuiSelectableList').props() as any).visibleOptions
      ).toEqual(options);
    });
  });
});
