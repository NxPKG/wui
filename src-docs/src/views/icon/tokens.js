// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS

// This example JS is overly complex for simple icon usage
// and is set up this way for ease of use in our docs.
//
// Check the snippet tab for a more common usage.

import React, { Fragment } from 'react';

import {
  WuiFlexGrid,
  WuiFlexItem,
  WuiPanel,
  WuiText,
  WuiToken,
  WuiSpacer,
  WuiCopy,
  WuiCode,
} from '../../../../src/components';

const tokens = [
  'tokenString',
  'tokenNumber',
  'tokenBoolean',
  'tokenDate',
  'tokenGeo',
  'tokenIP',
  'tokenShape',
  'tokenNested',
  'tokenAlias',
  'tokenRange',
  'tokenAnnotation',
  'tokenArray',
  'tokenClass',
  'tokenConstant',
  'tokenElement',
  'tokenEnum',
  'tokenEnumMember',
  'tokenEvent',
  'tokenException',
  'tokenField',
  'tokenFunction',
  'tokenInterface',
  'tokenKey',
  'tokenMethod',
  'tokenModule',
  'tokenNamespace',
  'tokenNull',
  'tokenObject',
  'tokenOperator',
  'tokenPackage',
  'tokenParameter',
  'tokenProperty',
  'tokenStruct',
  'tokenVariable',
  'tokenFile',
  'tokenSymbol',
  'tokenRepo',
  'tokenBinary',
  'tokenJoin',
  'tokenPercolator',
  'tokenFlattened',
  'tokenRankFeature',
  'tokenRankFeatures',
  'tokenKeyword',
  'tokenCompletionSuggester',
  'tokenDenseVector',
  'tokenText',
  'tokenTokenCount',
  'tokenSearchType',
  'tokenHistogram',
];

export default () => (
  <Fragment>
    <WuiFlexGrid columns={4}>
      {tokens.map(token => (
        <WuiFlexItem
          className="guideDemo__icon"
          key={token}
          style={{ width: '200px' }}>
          <WuiCopy textToCopy={token} afterMessage={`${token} copied`}>
            {copy => (
              <WuiPanel className="wui-textCenter" onClick={copy}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '8px',
                  }}>
                  <WuiToken iconType={token} />
                </div>
                <WuiText size="s">
                  <p>{token}</p>
                </WuiText>
              </WuiPanel>
            )}
          </WuiCopy>
        </WuiFlexItem>
      ))}
    </WuiFlexGrid>

    <WuiSpacer />

    <WuiText size="s">
      <h3>Custom tokens</h3>
      <p>
        By default, an <WuiCode>iconType</WuiCode> with the token prefix (i.e.
        those listed above) will have predefined styles. However, any valid{' '}
        <WuiCode>iconType</WuiCode> can be passed and, in either case, the{' '}
        <WuiCode>shape</WuiCode>, <WuiCode>size</WuiCode>,{' '}
        <WuiCode>color</WuiCode>, and <WuiCode>fill</WuiCode> can be customized.
      </p>
    </WuiText>

    <WuiSpacer />

    <WuiFlexGrid columns={4}>
      <WuiFlexItem className="guideDemo__icon">
        <WuiPanel>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px',
            }}>
            <WuiToken iconType="tokenStruct" size="xs" color="gray" />
          </div>
          <WuiText size="s">
            <p>An xs, gray tokenStruct</p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
      <WuiFlexItem className="guideDemo__icon">
        <WuiPanel>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px',
            }}>
            <WuiToken iconType="tokenStruct" fill="none" />
          </div>
          <WuiText size="s">
            <p>A none fill tokenStruct</p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
      <WuiFlexItem className="guideDemo__icon">
        <WuiPanel>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px',
            }}>
            <WuiToken
              iconType="tokenStruct"
              size="m"
              shape="circle"
              color="#FF0000"
            />
          </div>
          <WuiText size="s">
            <p>A size m, circle, #FF0000 tokenStruct</p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
      <WuiFlexItem className="guideDemo__icon">
        <WuiPanel>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px',
            }}>
            <WuiToken
              iconType="faceNeutral"
              size="l"
              color="wuiColorVis7"
              shape="rectangle"
              fill="dark"
            />
          </div>
          <WuiText size="s">
            <p>A completely custom token</p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
    </WuiFlexGrid>
  </Fragment>
);
