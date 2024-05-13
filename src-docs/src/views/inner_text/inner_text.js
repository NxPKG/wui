import React, { useEffect, useState } from 'react';

import {
  WuiBadge,
  WuiCode,
  WuiHighlight,
  WuiHorizontalRule,
  WuiPanel,
  WuiText,
  WuiSpacer,
  WuiInnerText,
} from '../../../../src/components';

export default () => {
  const first = 'First';
  const second = 'Second';
  const [thing, setThing] = useState(first);
  const [[thing2, type], setThingAndType] = useState([first, 'span']);
  useEffect(() => {
    setTimeout(() => {
      const newThing = thing === second ? first : second;
      const newType = type === 'div' ? 'span' : 'div';
      setThing(newThing);
      setThingAndType([newThing, newType]);
    }, 5000);
  }, [thing, type]);

  return (
    <WuiText size="s">
      <p>
        <strong>Example:</strong>
      </p>
      <WuiInnerText>
        {(ref, innerText) => (
          <React.Fragment>
            <WuiPanel paddingSize="s" className="wui-displayInlineBlock">
              <span ref={ref} title={innerText}>
                Simple string content
              </span>
            </WuiPanel>
            <WuiSpacer />
            <p className="wui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <WuiCode>{innerText}</WuiCode>
          </React.Fragment>
        )}
      </WuiInnerText>

      <WuiHorizontalRule margin="xl" />

      <p>
        <strong>Example with complex children:</strong>
      </p>
      <WuiInnerText>
        {(ref, innerText) => (
          <React.Fragment>
            <WuiPanel paddingSize="s" className="wui-displayInlineBlock">
              <span ref={ref} title={innerText}>
                <WuiHighlight search="content">
                  WuiHighlight content
                </WuiHighlight>{' '}
                <WuiBadge>with WuiBadge</WuiBadge>
              </span>
            </WuiPanel>
            <WuiSpacer />
            <p className="wui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <WuiCode>{innerText}</WuiCode>
          </React.Fragment>
        )}
      </WuiInnerText>

      <WuiHorizontalRule margin="xl" />

      <p>
        <strong>Example with updating content:</strong>
      </p>
      <WuiInnerText>
        {(ref, innerText) => (
          <React.Fragment>
            <WuiPanel paddingSize="s" className="wui-displayInlineBlock">
              <span ref={ref} title={innerText}>
                {thing}
              </span>
            </WuiPanel>
            <WuiSpacer />
            <p className="wui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <WuiCode>{innerText}</WuiCode>
          </React.Fragment>
        )}
      </WuiInnerText>

      <WuiHorizontalRule margin="xl" />

      <p>
        <strong>Example with updating element:</strong>
      </p>
      <WuiInnerText>
        {(ref, innerText) => (
          <React.Fragment>
            <WuiPanel paddingSize="s" className="wui-displayInlineBlock">
              {React.createElement(
                type,
                {
                  ref,
                  title: innerText,
                },
                thing2
              )}
            </WuiPanel>
            <WuiSpacer />
            <p className="wui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <WuiCode>{innerText}</WuiCode>
          </React.Fragment>
        )}
      </WuiInnerText>
    </WuiText>
  );
};
