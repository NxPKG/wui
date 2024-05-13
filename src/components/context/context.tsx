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

import React, { createContext, ReactChild, ReactNode } from 'react';

export interface RenderableValues {
  [key: string]: ReactChild;
}

export type Renderable<T> = ReactChild | ((values: T) => ReactChild);

export interface I18nShape {
  mapping?: {
    [key: string]: Renderable<object>;
  };
  mappingFunc?: (value: string) => string;
  formatNumber?: (x: number) => string;
  formatDateTime?: (x: Date) => string;
  locale?: string;
}

const I18nContext: React.Context<I18nShape> = createContext({});
const { Provider: WuiI18nProvider, Consumer: WuiI18nConsumer } = I18nContext;

interface WuiContextProps {
  i18n: I18nShape;
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
}

const WuiContext: React.FunctionComponent<WuiContextProps> = ({
  i18n = {},
  children,
}) => <WuiI18nProvider value={i18n}>{children}</WuiI18nProvider>;

export { WuiContext, WuiI18nConsumer, I18nContext };
