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
import { render, mount } from 'enzyme';

import { WuiValidatableControl } from './validatable_control';

describe('WuiValidatableControl', () => {
  test('is rendered', () => {
    const component = render(
      <WuiValidatableControl>
        <input />
      </WuiValidatableControl>
    );

    expect(component).toMatchSnapshot();
  });

  describe('ref management', () => {
    it('calls a ref function', () => {
      const ref = jest.fn();

      mount(
        <WuiValidatableControl>
          <input id="testInput" ref={ref} />
        </WuiValidatableControl>
      );

      expect(ref).toHaveBeenCalledTimes(1);

      const input = ref.mock.calls[0][0];
      expect(input.getAttribute('id')).toBe('testInput');
    });

    it('sets a ref object\'s "current" property', () => {
      const ref = React.createRef<HTMLInputElement>();

      mount(
        <WuiValidatableControl>
          <input id="testInput" ref={ref} />
        </WuiValidatableControl>
      );

      expect(ref.current).not.toBeNull();
      expect(ref.current!.getAttribute('id')).toBe('testInput');
    });

    it('calls stable ref function only once on re-render', async () => {
      const ref = jest.fn();

      const Component = () => (
        <WuiValidatableControl>
          <input id="testInput" ref={ref} />
        </WuiValidatableControl>
      );

      const wrapper = mount(<Component />);

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref.mock.calls[0][0].getAttribute('id')).toBe('testInput');

      // Force re-render
      wrapper.setProps({});

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref.mock.calls[0][0].getAttribute('id')).toBe('testInput');
    });

    it('calls unstable ref function again on re-render', async () => {
      const ref = jest.fn();

      const Component = () => (
        <WuiValidatableControl>
          <input id="testInput" ref={el => ref(el)} />
        </WuiValidatableControl>
      );

      const wrapper = mount(<Component />);

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref.mock.calls[0][0].getAttribute('id')).toBe('testInput');

      // Force re-render
      wrapper.setProps({});

      expect(ref).toHaveBeenCalledTimes(3);

      expect(ref.mock.calls[1][0]).toBe(null);
      expect(ref.mock.calls[2][0].getAttribute('id')).toBe('testInput');
    });

    it('calls a ref function again when the child element changes', () => {
      const ref = jest.fn();

      const Component = ({ change }: { change: boolean }) => (
        <WuiValidatableControl>
          {!change ? (
            <input key="1" id="testInput" ref={ref} />
          ) : (
            <input key="2" id="testInput2" ref={ref} />
          )}
        </WuiValidatableControl>
      );

      const wrapper = mount(<Component change={false} />);

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref.mock.calls[0][0].getAttribute('id')).toBe('testInput');

      wrapper.setProps({ change: true });

      expect(ref).toHaveBeenCalledTimes(3);

      expect(ref.mock.calls[1][0]).toBe(null);
      expect(ref.mock.calls[2][0].getAttribute('id')).toBe('testInput2');

      // Ensure that the child element has changed
      expect(ref.mock.calls[0][0]).not.toBe(ref.mock.calls[2][0]);
    });

    it('sets a ref object\'s "current" property when the child element changes', () => {
      const ref = React.createRef<HTMLInputElement>();

      const Component = ({ change }: { change: boolean }) => (
        <WuiValidatableControl>
          {!change ? (
            <input key="1" id="testInput" ref={ref} />
          ) : (
            <input key="2" id="testInput2" ref={ref} />
          )}
        </WuiValidatableControl>
      );

      const wrapper = mount(<Component change={false} />);

      expect(ref.current).not.toBeNull();
      expect(ref.current!.getAttribute('id')).toBe('testInput');

      const prevRef = ref.current;

      wrapper.setProps({ change: true });

      expect(ref.current).not.toBeNull();
      expect(ref.current!.getAttribute('id')).toBe('testInput2');

      // Ensure that the child element has changed
      expect(ref.current).not.toBe(prevRef);
    });
  });
});
