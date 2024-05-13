import React from 'react';

import {
  WuiCard,
  WuiFlexGroup,
  WuiFlexItem,
  WuiCodeBlock,
  WuiRadioGroup,
  WuiText,
  WuiButton,
  WuiCode,
} from '../../../../src/components';

const radios = [
  {
    id: 'radios0',
    label: 'Option one',
  },
  {
    id: 'radios1',
    label: 'Option two',
  },
  {
    id: 'radios2',
    label: 'Option three',
    disabled: true,
  },
];

export default () => {
  return (
    <WuiFlexGroup gutterSize="l">
      <WuiFlexItem>
        <WuiCard
          textAlign="left"
          title="Lists"
          description={
            <span>
              Wrap a lists with <strong>WuiText size=&quot;s&quot;</strong> to
              match the description text.
            </span>
          }>
          <WuiText size="s">
            <ul>
              <li>Bullet 1</li>
              <li>Bullet 2</li>
              <li>Bullet 3</li>
            </ul>
          </WuiText>
        </WuiCard>
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          textAlign="left"
          title="Form controls"
          description="Add any controls you need."
          footer={
            <WuiFlexGroup justifyContent="flexEnd">
              <WuiFlexItem grow={false}>
                <WuiButton size="s" fill>
                  Send
                </WuiButton>
              </WuiFlexItem>
            </WuiFlexGroup>
          }>
          <WuiRadioGroup
            options={radios}
            idSelected={radios[0].id}
            onChange={() => {}}
            compressed
          />
        </WuiCard>
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          textAlign="left"
          title="Just about anything"
          description={
            <span>
              Just be sure not to add any <WuiCode>onClick</WuiCode> handler to
              the card if the children are also interactable.
            </span>
          }>
          <WuiCodeBlock language="html" paddingSize="s">
            {'<yoda>Hello, young Skywalker</yoda>'}
          </WuiCodeBlock>
        </WuiCard>
      </WuiFlexItem>
    </WuiFlexGroup>
  );
};
