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

import { TokenProps } from './token';

export type WuiTokenMapType =
  | 'tokenAnnotation'
  | 'tokenArray'
  | 'tokenBoolean'
  | 'tokenClass'
  | 'tokenConstant'
  | 'tokenElement'
  | 'tokenEnum'
  | 'tokenEnumMember'
  | 'tokenEvent'
  | 'tokenException'
  | 'tokenField'
  | 'tokenFile'
  | 'tokenFunction'
  | 'tokenInterface'
  | 'tokenKey'
  | 'tokenMethod'
  | 'tokenModule'
  | 'tokenNamespace'
  | 'tokenNull'
  | 'tokenNumber'
  | 'tokenObject'
  | 'tokenOperator'
  | 'tokenPackage'
  | 'tokenParameter'
  | 'tokenProperty'
  | 'tokenRepo'
  | 'tokenString'
  | 'tokenStruct'
  | 'tokenDate'
  | 'tokenIP'
  | 'tokenNested'
  | 'tokenAlias'
  | 'tokenShape'
  | 'tokenGeo'
  | 'tokenRange'
  | 'tokenSymbol'
  | 'tokenVariable'
  | 'tokenBinary'
  | 'tokenJoin'
  | 'tokenPercolator'
  | 'tokenFlattened'
  | 'tokenRankFeature'
  | 'tokenRankFeatures'
  | 'tokenKeyword'
  | 'tokenCompletionSuggester'
  | 'tokenDenseVector'
  | 'tokenText'
  | 'tokenTokenCount'
  | 'tokenSearchType'
  | 'tokenHistogram';

/**
 * Most of the style combinations for tokens are semi-arbitrary. However, there was an effort
 * to use the square shape for more common token types like string and number. Reserving the
 * circle shape for more uncommon token types so they grab attention.
 */

export const TOKEN_MAP: {
  [mapType in WuiTokenMapType]: Omit<TokenProps, 'iconType'>;
} = {
  tokenClass: {
    shape: 'circle',
    color: 'wuiColorVis1',
  },
  tokenProperty: {
    shape: 'circle',
    color: 'wuiColorVis2',
  },
  tokenEnum: {
    shape: 'circle',
    color: 'wuiColorVis3',
  },
  tokenVariable: {
    shape: 'circle',
    color: 'wuiColorVis7',
  },
  tokenMethod: {
    shape: 'square',
    color: 'wuiColorVis2',
  },
  tokenAnnotation: {
    shape: 'square',
    color: 'wuiColorVis5',
  },
  tokenException: {
    shape: 'circle',
    color: 'wuiColorVis0',
  },
  tokenInterface: {
    shape: 'circle',
    color: 'wuiColorVis9',
  },
  tokenParameter: {
    shape: 'square',
    color: 'wuiColorVis4',
  },
  tokenField: {
    shape: 'circle',
    color: 'wuiColorVis0',
  },
  tokenElement: {
    shape: 'square',
    color: 'wuiColorVis3',
  },
  tokenFunction: {
    shape: 'circle',
    color: 'wuiColorVis2',
  },
  tokenBoolean: {
    shape: 'square',
    color: 'wuiColorVis7',
  },
  tokenString: {
    shape: 'square',
    color: 'wuiColorVis1',
  },
  tokenArray: {
    shape: 'square',
    color: 'wuiColorVis7',
  },
  tokenNumber: {
    shape: 'square',
    color: 'wuiColorVis0',
  },
  tokenConstant: {
    shape: 'circle',
    color: 'wuiColorVis0',
  },
  tokenObject: {
    shape: 'circle',
    color: 'wuiColorVis3',
  },
  tokenEvent: {
    shape: 'circle',
    color: 'wuiColorVis4',
  },
  tokenKey: {
    shape: 'circle',
    color: 'wuiColorVis5',
  },
  tokenNull: {
    shape: 'square',
    color: 'wuiColorVis2',
  },
  tokenStruct: {
    shape: 'square',
    color: 'wuiColorVis0',
  },
  tokenPackage: {
    shape: 'square',
    color: 'wuiColorVis0',
  },
  tokenOperator: {
    shape: 'circle',
    color: 'wuiColorVis4',
  },
  tokenEnumMember: {
    shape: 'square',
    color: 'wuiColorVis7',
  },
  tokenRepo: {
    shape: 'rectangle',
    color: 'wuiColorVis1',
    fill: 'dark',
  },
  tokenSymbol: {
    shape: 'rectangle',
    color: 'wuiColorVis0',
    fill: 'dark',
  },
  tokenFile: {
    shape: 'rectangle',
    color: 'gray',
    fill: 'dark',
  },
  tokenNamespace: {
    shape: 'square',
    color: 'wuiColorVis1',
  },
  tokenModule: {
    shape: 'square',
    color: 'wuiColorVis4',
  },
  tokenDate: {
    shape: 'square',
    color: 'wuiColorVis6',
  },
  tokenGeo: {
    shape: 'square',
    color: 'wuiColorVis5',
  },
  tokenIP: {
    shape: 'square',
    color: 'wuiColorVis9',
  },
  tokenShape: {
    shape: 'circle',
    color: 'wuiColorVis8',
  },
  tokenRange: {
    shape: 'circle',
    color: 'wuiColorVis4',
  },
  tokenNested: {
    shape: 'circle',
    color: 'wuiColorVis2',
  },
  tokenAlias: {
    shape: 'circle',
    color: 'wuiColorVis3',
  },
  tokenBinary: {
    shape: 'square',
    color: 'wuiColorVis4',
  },
  tokenJoin: {
    shape: 'square',
    color: 'wuiColorVis5',
  },
  tokenPercolator: {
    shape: 'square',
    color: 'wuiColorVis6',
  },
  tokenFlattened: {
    shape: 'square',
    color: 'wuiColorVis7',
  },
  tokenRankFeature: {
    shape: 'square',
    color: 'wuiColorVis8',
  },
  tokenRankFeatures: {
    shape: 'square',
    color: 'wuiColorVis3',
  },
  tokenKeyword: {
    shape: 'square',
    color: 'wuiColorVis9',
  },
  tokenCompletionSuggester: {
    shape: 'square',
    color: 'wuiColorVis1',
  },
  tokenDenseVector: {
    shape: 'square',
    color: 'wuiColorVis2',
  },
  tokenText: {
    shape: 'square',
    color: 'wuiColorVis3',
  },
  tokenTokenCount: {
    shape: 'square',
    color: 'wuiColorVis4',
  },
  tokenSearchType: {
    shape: 'square',
    color: 'wuiColorVis5',
  },
  tokenHistogram: {
    shape: 'square',
    color: 'wuiColorVis6',
  },
};
