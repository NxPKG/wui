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

import React, { useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { render, mount } from 'enzyme';
import { findTestSubject, requiredProps, sleep } from '../../test';

import { useInnerText, WuiInnerText } from './inner_text';
import { WuiBadge } from '../badge';

describe('useInnerText', () => {
  test('provides a callback `ref`', () => {
    let ref;
    const App = () => {
      [ref] = useInnerText();
      return <span />;
    };
    mount(<App />);

    expect(ref).toBeInstanceOf(Function);
  });

  test('provides the result of `innerText`', () => {
    const text = 'Test';
    let ref;
    let innerText;
    const App = () => {
      [ref, innerText] = useInnerText();
      return <span ref={ref}>{text}</span>;
    };
    mount(<App />);

    expect(innerText).toEqual(text);
  });

  test('accepts a fallback value', () => {
    const text = 'Test';
    const fallback = 'Fallback';
    let innerText;
    const App = () => {
      [, innerText] = useInnerText(fallback);
      return <span>{text}</span>;
    };
    mount(<App />);

    expect(innerText).toEqual(fallback);
  });

  test('handles updated elements', async () => {
    const timeout = 500;
    const first = 'First';
    const second = 'Second';
    let innerText;
    let ref;
    const App = () => {
      const [[thing, type], setThing] = useState([first, 'span']);
      useEffect(() => {
        setTimeout(() => {
          act(() => setThing([second, 'div']));
        }, timeout);
      }, [setThing]);
      [ref, innerText] = useInnerText();
      return (
        <div>
          {React.createElement(
            type,
            {
              ref,
              title: innerText,
            },
            thing
          )}
        </div>
      );
    };
    mount(<App />);

    expect(innerText).toEqual(first);

    await sleep(timeout + 10);

    expect(innerText).toEqual(second);
  });

  test('handles updated content', async () => {
    const timeout = 500;
    const first = 'First';
    const second = 'Second';
    let innerText;
    let ref;
    const App = () => {
      const [thing, setThing] = useState(first);
      useEffect(() => {
        setTimeout(() => {
          act(() => setThing(second));
        }, timeout);
      }, [setThing]);
      [ref, innerText] = useInnerText();
      return (
        <div>
          <span ref={ref} title={innerText}>
            {thing}
          </span>
        </div>
      );
    };
    mount(<App />);

    expect(innerText).toEqual(first);

    // MutationObserver polyfill institutes a 30ms mutation timeout period
    const mutationObserverPolyfillPeriod = 30;
    await sleep(timeout + mutationObserverPolyfillPeriod + 10);

    expect(innerText).toEqual(second);
  });
});

describe('WuiInnerText', () => {
  test('is rendered', () => {
    const component = render(
      <WuiInnerText {...requiredProps}>
        {(ref, innerText) => (
          <span ref={ref} title={innerText}>
            Test
          </span>
        )}
      </WuiInnerText>
    );

    expect(component).toMatchSnapshot();
  });

  test('uses innerText', () => {
    const text = 'Test';
    const component = mount(
      <WuiInnerText {...requiredProps}>
        {(ref, innerText) => (
          <span ref={ref} title={innerText} data-test-subj="span">
            {text}
          </span>
        )}
      </WuiInnerText>
    );

    const span = findTestSubject(component, 'span');
    expect(span.props().title).toBe(text);
  });

  test('accepts fallback prop', () => {
    const text = 'Test';
    const fallback = 'Fallback';
    const component = mount(
      <WuiInnerText {...requiredProps} fallback={fallback}>
        {(_, innerText) => (
          <span title={innerText} data-test-subj="span">
            {text}
          </span>
        )}
      </WuiInnerText>
    );

    const span = findTestSubject(component, 'span');
    expect(span.props().title).toBe(fallback);
  });

  test('works with wrapper and interspersed DOM elements', () => {
    const component = mount(
      <WuiInnerText {...requiredProps}>
        {(ref, innerText) => (
          <span ref={ref} title={innerText} data-test-subj="span">
            <div>
              I{' '}
              <span>
                can{' '}
                <em>
                  still <strong>read </strong>
                  <WuiBadge>this</WuiBadge>
                </em>
              </span>
            </div>
          </span>
        )}
      </WuiInnerText>
    );

    const span = findTestSubject(component, 'span');
    expect(span.props().title).toBe('I can still read this');
  });
});
