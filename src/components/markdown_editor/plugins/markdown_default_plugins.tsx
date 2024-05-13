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

import { PluggableList } from 'unified';
import remark2rehype from 'remark-rehype';
import rehype2react from 'rehype-react';
import * as MarkdownTooltip from './markdown_tooltip';
import * as MarkdownCheckbox from './markdown_checkbox';
import { markdownLinkValidator } from './markdown_link_validator';
import React, { createElement } from 'react';
import { WuiLink } from '../../link';
import { WuiCodeBlock, WuiCode } from '../../code';
import markdown from 'remark-parse';
import highlight from 'remark-highlight.js';
import emoji from 'remark-emoji';
import { RemarkRehypeHandler } from '../markdown_types';
import all from 'mdast-util-to-hast/lib/all';

export const getDefaultWuiMarkdownParsingPlugins = (): PluggableList => [
  [markdown, {}],
  [highlight, {}],
  [emoji, { emoticon: true }],
  [MarkdownTooltip.parser, {}],
  [MarkdownCheckbox.parser, {}],
  [markdownLinkValidator, {}],
];

export const defaultParsingPlugins = getDefaultWuiMarkdownParsingPlugins();

const unknownHandler: RemarkRehypeHandler = (h, node) => {
  return h(node.position!, node.type, node, all(h, node));
};

interface Remark2RehypeOptions {
  allowDangerousHtml: boolean;
  handlers: { [key: string]: RemarkRehypeHandler };
  [key: string]: any;
}

interface Rehype2ReactOptions {
  components: { [key: string]: React.ComponentType<any> };
  [key: string]: any;
}

export const getDefaultWuiMarkdownProcessingPlugins = (): [
  [typeof remark2rehype, Remark2RehypeOptions], // first is well known
  [typeof rehype2react, Rehype2ReactOptions], // second is well known
  ...PluggableList // any additional are generic
] => [
  [
    remark2rehype,
    {
      allowDangerousHtml: true,
      unknownHandler,
      handlers: {}, // intentionally empty, allows plugins to extend if they need to
    },
  ],
  [
    rehype2react,
    {
      createElement: createElement,
      components: {
        a: WuiLink,
        code: (props: any) =>
          // If there are linebreaks use codeblock, otherwise code
          /\r|\n/.exec(props.children) ? (
            <WuiCodeBlock fontSize="m" paddingSize="s" {...props} />
          ) : (
            <WuiCode {...props} />
          ),
        tooltipPlugin: MarkdownTooltip.renderer,
        checkboxPlugin: MarkdownCheckbox.renderer,
      },
    },
  ],
];

export const defaultProcessingPlugins = getDefaultWuiMarkdownProcessingPlugins();
