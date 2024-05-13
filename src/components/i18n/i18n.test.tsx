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

import React, { ReactChild } from 'react';
import { mount } from 'enzyme';
import { WuiContext } from '../context';
import { WuiI18n, useWuiI18n } from './i18n';

/* eslint-disable local/i18n */

describe('WuiI18n', () => {
  describe('default rendering', () => {
    describe('rendering to dom', () => {
      it('renders a basic string to the dom', () => {
        const component = mount(
          <WuiI18n token="test" default="This is a basic string." />
        );
        expect(component).toMatchSnapshot();
      });

      it('renders a string with placeholders to the dom', () => {
        const component = mount(
          <WuiI18n
            token="test"
            default="This is a {type} with {special}."
            values={{ type: 'string', special: 'values' }}
          />
        );
        expect(component).toMatchSnapshot();
      });

      it('calls a function and renders the result to the dom', () => {
        const values = { type: 'callback', special: 'values' };
        const renderCallback = jest.fn(
          ({ type, special }) => `This is a ${type} with ${special}.`
        );
        const component = mount(
          <WuiI18n token="test" default={renderCallback} values={values} />
        );
        expect(component).toMatchSnapshot();

        expect(renderCallback).toHaveBeenCalledWith(values);
      });

      it('renders when value is null', () => {
        const component = mount(
          <WuiI18n token="test" default="{arg}" values={{ arg: null }} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('render prop with single token', () => {
      it('renders render prop result to the dom', () => {
        const component = mount(
          <WuiI18n token="test" default="This is a basic string.">
            {(result: ReactChild) => `A nifty thing: ${result}`}
          </WuiI18n>
        );
        expect(component).toMatchSnapshot();
      });

      it('renders render prop result with placeholders to the dom', () => {
        const component = mount(
          <WuiI18n
            token="test"
            default="This is a {type} with {special}."
            values={{ type: 'string', special: 'values' }}>
            {(result: ReactChild) => `Here's something cool: ${result}`}
          </WuiI18n>
        );
        expect(component).toMatchSnapshot();
      });

      it('calls a function and renders render prop result to the dom', () => {
        const values = { type: 'callback', special: 'values' };
        const renderCallback = jest.fn(
          ({ type, special }) => `This is a ${type} with ${special}.`
        );
        const component = mount(
          <WuiI18n token="test" default={renderCallback} values={values}>
            {(result: string) => `Here's something neat: ${result}`}
          </WuiI18n>
        );
        expect(component).toMatchSnapshot();

        expect(renderCallback).toHaveBeenCalledWith(values);
      });
    });

    describe('render prop with multiple tokens', () => {
      it('renders render prop result to the dom', () => {
        const component = mount(
          <WuiI18n
            tokens={['test1', 'test2']}
            defaults={[
              'This is the first basic string.',
              'This is the second basic string.',
            ]}>
            {([one, two]: ReactChild[]) => (
              <div>
                {one} {two}
              </div>
            )}
          </WuiI18n>
        );
        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('reading values from context', () => {
    describe('rendering to dom', () => {
      it('renders a mapped basic string to the dom', () => {
        const component = mount(
          <WuiContext i18n={{ mapping: { test: 'An overridden string.' } }}>
            <WuiI18n token="test" default="This is a basic string." />
          </WuiContext>
        );
        expect(component).toMatchSnapshot();
      });

      it('renders a mapped string with placeholders to the dom', () => {
        const component = mount(
          <WuiContext
            i18n={{
              mapping: { test: 'An overridden {type} with {special}.' },
            }}>
            <WuiI18n
              token="test"
              default="This is a {type} with {special}."
              values={{ type: 'string', special: 'values' }}
            />
          </WuiContext>
        );
        expect(component).toMatchSnapshot();
      });

      it('calls a mapped function and renders the result to the dom', () => {
        const values = { type: 'callback', special: 'values' };
        const renderCallback = jest.fn(
          ({ type, special }) => `This is a mapped ${type} with ${special}.`
        );
        const component = mount(
          <WuiContext i18n={{ mapping: { test: renderCallback } }}>
            <WuiI18n token="test" default={() => ''} values={values} />
          </WuiContext>
        );
        expect(component).toMatchSnapshot();

        expect(renderCallback).toHaveBeenCalledWith(values);
      });
    });

    describe('render prop with single token', () => {
      it('renders mapped render prop result to the dom', () => {
        const component = mount(
          <WuiContext i18n={{ mapping: { test: 'An overridden string.' } }}>
            <WuiI18n token="test" default="This is a basic string.">
              {(result: ReactChild) => `A nifty thing: ${result}`}
            </WuiI18n>
          </WuiContext>
        );
        expect(component).toMatchSnapshot();
      });

      it('renders mapped render prop result with placeholders to the dom', () => {
        const component = mount(
          <WuiContext
            i18n={{
              mapping: { test: 'An overridden {type} with {special}.' },
            }}>
            <WuiI18n
              token="test"
              default="This is a {type} with {special}."
              values={{ type: 'string', special: 'values' }}>
              {(result: ReactChild) => `Here's something cool: ${result}`}
            </WuiI18n>
          </WuiContext>
        );
        expect(component).toMatchSnapshot();
      });

      it('calls a mapped function and renders render prop result to the dom', () => {
        const values = { type: 'callback', special: 'values' };
        const renderCallback = jest.fn(
          ({ type, special }) => `This is a ${type} with ${special}.`
        );
        const component = mount(
          <WuiContext i18n={{ mapping: { test: renderCallback } }}>
            <WuiI18n token="test" default={renderCallback} values={values}>
              {(result: ReactChild) => `Here's something neat: ${result}`}
            </WuiI18n>
          </WuiContext>
        );
        expect(component).toMatchSnapshot();

        expect(renderCallback).toHaveBeenCalledWith(values);
      });
    });

    describe('render prop with multiple tokens', () => {
      it('renders mapped render prop result to the dom', () => {
        const component = mount(
          <WuiContext
            i18n={{
              mapping: {
                test1: 'This is the first mapped value.',
                test2: 'This is the second mapped value.',
              },
            }}>
            <WuiI18n
              tokens={['test1', 'test2']}
              defaults={[
                'This is the first basic string.',
                'This is the second basic string.',
              ]}>
              {([one, two]: ReactChild[]) => (
                <div>
                  {one} {two}
                </div>
              )}
            </WuiI18n>
          </WuiContext>
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('mappingFunc', () => {
      it('calls the mapping function with the source string', () => {
        const component = mount(
          <WuiContext
            i18n={{
              mapping: {
                test1: 'This is the mapped value.',
              },
              mappingFunc: (value: string) => value.toUpperCase(),
            }}>
            <WuiI18n token="test1" default="This is the basic string.">
              {(one: string) => <div aria-label={one}>{one}</div>}
            </WuiI18n>
          </WuiContext>
        );
        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('useWuiI18n', () => {
    describe('unmapped', () => {
      it('handles single token without values', () => {
        const Component = () => {
          const value = useWuiI18n('token', 'placeholder');
          return <p>{value}</p>;
        };
        const component = mount(<Component />);
        expect(component).toMatchSnapshot();
      });

      it('handles single token with values', () => {
        const Component = () => {
          const value = useWuiI18n('myToken', 'first {first}, then {second}', {
            first: 'apples',
            second: 'aardvarks',
          });
          return <p>{value}</p>;
        };
        const component = mount(<Component />);
        expect(component).toMatchSnapshot();
      });

      it('handles multiple tokens', () => {
        const Component = () => {
          const [first, second] = useWuiI18n(
            ['test1', 'test2'],
            ['the first placeholder', 'the second placeholder']
          );
          return (
            <p>
              <span>{first}</span>
              <span>{second}</span>
            </p>
          );
        };
        const component = mount(<Component />);
        expect(component).toMatchSnapshot();
      });

      it('calls a function and renders the result to the dom', () => {
        const values = { type: 'callback', special: 'values' };
        const renderCallback = jest.fn(({ type, special }) => (
          <p>
            This is a {type} with {special}.
          </p>
        ));
        const Component = () => (
          <div>{useWuiI18n('test', renderCallback, values)}</div>
        );
        const component = mount(<Component />);
        expect(component).toMatchSnapshot();

        expect(renderCallback).toHaveBeenCalledWith(values);
      });
    });
  });

  describe('mapped tokens', () => {
    it('handles single token without values', () => {
      const Component = () => {
        const value = useWuiI18n('token', 'placeholder');
        return <p>{value}</p>;
      };
      const component = mount(
        <WuiContext
          i18n={{
            mapping: {
              token: 'This is the mapped value.',
            },
          }}>
          <Component />
        </WuiContext>
      );
      expect(component).toMatchSnapshot();
    });

    it('handles single token with values', () => {
      const Component = () => {
        const value = useWuiI18n('myToken', 'first {first}, then {second}', {
          first: 'apples',
          second: 'aardvarks',
        });
        return <p>{value}</p>;
      };
      const component = mount(
        <WuiContext
          i18n={{
            mapping: {
              myToken: 'In reverse order: {second}, then {first}',
            },
          }}>
          <Component />
        </WuiContext>
      );
      expect(component).toMatchSnapshot();
    });

    it('handles multiple tokens', () => {
      const Component = () => {
        const [first, second] = useWuiI18n(
          ['test1', 'test2'],
          ['the first placeholder', 'the second placeholder']
        );
        return (
          <p>
            <span>{first}</span>
            <span>{second}</span>
          </p>
        );
      };
      const component = mount(
        <WuiContext
          i18n={{
            mapping: {
              test1: 'first value',
              test2: 'second value',
            },
          }}>
          <Component />
        </WuiContext>
      );
      expect(component).toMatchSnapshot();
    });

    describe('mappingFunc', () => {
      it('calls the mapping function with the source string', () => {
        const Component = () => {
          const value = useWuiI18n('test1', 'placeholder');
          return <div aria-label={value}>{value}</div>;
        };
        const component = mount(
          <WuiContext
            i18n={{
              mapping: {
                test1: 'This is the mapped value.',
              },
              mappingFunc: (value: string) => value.toUpperCase(),
            }}>
            <Component />
          </WuiContext>
        );
        expect(component).toMatchSnapshot();
      });
    });
  });
});
