import React from 'react';

import { WuiAccordion, WuiText, WuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <WuiAccordion
      id="accordion3"
      buttonContent="An accordion with padding applied through props"
      paddingSize="l">
      <WuiText>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
      </WuiText>
    </WuiAccordion>

    <WuiSpacer />

    <WuiAccordion
      id="accordion4"
      buttonContent="A second accordion with padding and a very long title that should truncate because of wui-textTruncate"
      buttonContentClassName="wui-textTruncate"
      paddingSize="l">
      <WuiText>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
      </WuiText>
    </WuiAccordion>

    <WuiSpacer />

    <WuiAccordion
      id="accordion5"
      buttonContent="A third accordion with a nested accordion"
      paddingSize="m">
      <WuiText>
        <p>
          This content area will grow to accomodate when the accordion below
          opens
        </p>
      </WuiText>
      <WuiSpacer />
      <WuiAccordion id="accordion6" buttonContent="A fourth nested accordion">
        <WuiText>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
        </WuiText>
      </WuiAccordion>
      <WuiSpacer />
    </WuiAccordion>
  </div>
);
