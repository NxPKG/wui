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

import React, { Component } from 'react';
import { WuiFieldSearch, WuiFieldSearchProps } from '../form';

export interface SchemaType {
  strict?: boolean;
  fields?: any;
  flags?: string[];
}

export interface WuiSearchBoxProps extends WuiFieldSearchProps {
  query: string;
  // This is optional in WuiFieldSearchProps
  onSearch: (queryText: string) => void;
}

type DefaultProps = Pick<WuiSearchBoxProps, 'placeholder' | 'incremental'>;

export class WuiSearchBox extends Component<WuiSearchBoxProps> {
  static defaultProps: DefaultProps = {
    placeholder: 'Search...',
    incremental: false,
  };

  private inputElement: HTMLInputElement | null = null;

  componentDidUpdate(oldProps: WuiSearchBoxProps) {
    if (oldProps.query !== this.props.query && this.inputElement != null) {
      this.inputElement.value = this.props.query;
      this.inputElement.dispatchEvent(new Event('change'));
    }
  }

  render() {
    const { query, incremental, ...rest } = this.props;

    let ariaLabel;
    if (incremental) {
      ariaLabel =
        'This is a search bar. As you type, the results lower in the page will automatically filter.';
    } else {
      ariaLabel =
        'This is a search bar. After typing your query, hit enter to filter the results lower in the page.';
    }

    return (
      <WuiFieldSearch
        inputRef={input => (this.inputElement = input)}
        fullWidth
        defaultValue={query}
        incremental={incremental}
        aria-label={ariaLabel}
        {...rest}
      />
    );
  }
}
