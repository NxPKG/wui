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

import { ButtonHTMLAttributes } from 'react';
import { CommonProps } from '../common';

// note similarity to `Option` in `components/selectable/types.tsx`
export type WuiComboBoxOptionOption<
  T = string | number | string[] | undefined
> = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & {
    isGroupLabelOption?: boolean;
    label: string;
    options?: Array<WuiComboBoxOptionOption<T>>;
    value?: T;
  };

export type UpdatePositionHandler = (
  listElement?: RefInstance<HTMLDivElement>
) => void;
export type OptionHandler<T> = (option: WuiComboBoxOptionOption<T>) => void;

export type RefInstance<T> = T | null;

export type WuiComboBoxOptionsListPosition = 'top' | 'bottom';

export interface WuiComboBoxSingleSelectionShape {
  asPlainText?: boolean;
}
