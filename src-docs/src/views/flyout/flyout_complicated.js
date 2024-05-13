import React, { useState, Fragment } from 'react';

import {
  WuiButton,
  WuiButtonEmpty,
  WuiCodeBlock,
  WuiComboBox,
  WuiExpression,
  WuiFlexGroup,
  WuiFlexItem,
  WuiFlyout,
  WuiFlyoutBody,
  WuiFlyoutFooter,
  WuiFlyoutHeader,
  WuiForm,
  WuiFormRow,
  WuiPopover,
  WuiSpacer,
  WuiTab,
  WuiTabs,
  WuiText,
  WuiTitle,
  WuiSuperSelect,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [selectedTabId, setSelectedTabId] = useState('1');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [superSelectvalue, setSuperSelectValue] = useState('option_one');
  const [isExpressionOpen, setIsExpressionOpen] = useState(false);

  const tabs = [
    {
      id: '1',
      name: 'Tab 1',
    },
    {
      id: '2',
      name: 'Tab 2',
    },
  ];

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = () => setIsFlyoutVisible(true);

  const closePopover = () => setIsPopoverOpen(false);

  const togglePopover = () => setIsPopoverOpen(isPopoverOpen => !isPopoverOpen);

  const onSelectedTabChanged = id => setSelectedTabId(id);

  const renderTabs = tabs.map((tab, index) => (
    <WuiTab
      onClick={() => onSelectedTabChanged(tab.id)}
      isSelected={tab.id === selectedTabId}
      key={index}>
      {tab.name}
    </WuiTab>
  ));

  const superSelectOptions = [
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      dropdownDisplay: (
        <Fragment>
          <strong>Option one</strong>
          <WuiText size="s" color="subdued">
            <p className="wuiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </WuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_two',
      inputDisplay: 'Option two',
      dropdownDisplay: (
        <Fragment>
          <strong>Option two</strong>
          <WuiText size="s" color="subdued">
            <p className="wuiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </WuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_three',
      inputDisplay: 'Option three',
      dropdownDisplay: (
        <Fragment>
          <strong>Option three</strong>
          <WuiText size="s" color="subdued">
            <p className="wuiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </WuiText>
        </Fragment>
      ),
    },
  ];

  const onSuperSelectChange = value => {
    setSuperSelectValue(value);
  };

  const flyoutContent = (
    <WuiText>
      <p>
        Far out in the uncharted backwaters of the unfashionable end of the
        western spiral arm of the Galaxy lies a small unregarded yellow sun.
      </p>

      <p>
        Orbiting this at a distance of roughly ninety-two million miles is an
        utterly insignificant little blue green planet whose ape- descended life
        forms are so amazingly primitive that they still think digital watches
        are a pretty neat idea.
      </p>

      <ul>
        <li>List item one</li>
        <li>List item two</li>
        <li>Dolphins</li>
      </ul>

      <p>
        This planet has - or rather had - a problem, which was this: most of the
        people living on it were unhappy for pretty much of the time. Many
        solutions were suggested for this problem, but most of these were
        largely concerned with the movements of small green pieces of paper,
        which is odd because on the whole it was not the small green pieces of
        paper that were unhappy.
      </p>

      <h2>This is Heading Two</h2>

      <ol>
        <li>Number one</li>
        <li>Number two</li>
        <li>Dolphins again</li>
      </ol>

      <p>
        But the dog wasn&rsquo;t lazy, it was just practicing mindfulness, so it
        had a greater sense of life-satisfaction than that fox with all its
        silly jumping.
      </p>

      <p>
        And from the fox&rsquo;s perspective, life was full of hoops to jump{' '}
        <em>through</em>, low-hanging fruit to jump <em>for</em>, and dead car
        batteries to jump-<em>start</em>.
      </p>

      <h3>This is Heading Three</h3>

      <p>
        So it thought the dog was making a poor life choice by focusing so much
        on mindfulness. What if its car broke down?
      </p>
    </WuiText>
  );

  const htmlCode = `<!--I'm an example of HTML-->
<div>
  asdf
</div>
`;

  let flyout;

  if (isFlyoutVisible) {
    flyout = (
      <WuiFlyout
        ownFocus
        onClose={closeFlyout}
        hideCloseButton
        aria-labelledby="flyoutComplicatedTitle">
        <WuiFlyoutHeader hasBorder>
          <WuiTitle size="m">
            <h2 id="flyoutComplicatedTitle">Flyout header</h2>
          </WuiTitle>
          <WuiSpacer size="s" />
          <WuiText color="subdued">
            <p>
              Put navigation items in the header, and cross tab actions in a
              footer.
            </p>
          </WuiText>
          <WuiTabs style={{ marginBottom: '-25px' }}>{renderTabs}</WuiTabs>
        </WuiFlyoutHeader>
        <WuiFlyoutBody>
          <WuiPopover
            closePopover={closePopover}
            button={
              <WuiButton onClick={togglePopover}>
                Even popovers can be included
              </WuiButton>
            }
            isOpen={isPopoverOpen}>
            <p>
              This is the popover content, notice how it can overflow the
              flyout!
            </p>
          </WuiPopover>
          <WuiSpacer size="m" />
          <WuiForm>
            <WuiFormRow label="A SuperSelect field">
              <WuiSuperSelect
                options={superSelectOptions}
                valueOfSelected={superSelectvalue}
                onChange={value => onSuperSelectChange(value)}
                itemLayoutAlign="top"
                hasDividers
              />
            </WuiFormRow>
          </WuiForm>
          <WuiSpacer />
          <WuiPopover
            isOpen={isExpressionOpen}
            closePopover={() => setIsExpressionOpen(false)}
            ownFocus={true}
            button={
              <WuiExpression
                description="expression"
                value="configurations"
                onClick={() => setIsExpressionOpen(!isExpressionOpen)}
              />
            }>
            <WuiComboBox
              selectedOptions={[{ label: 'Option one' }]}
              options={[
                { label: 'Option one' },
                { label: 'Option two' },
                { label: 'Option three' },
              ]}
            />
          </WuiPopover>
          <WuiSpacer />
          {flyoutContent}
          <WuiCodeBlock language="html">{htmlCode}</WuiCodeBlock>
        </WuiFlyoutBody>
        <WuiFlyoutFooter>
          <WuiFlexGroup justifyContent="spaceBetween">
            <WuiFlexItem grow={false}>
              <WuiButtonEmpty
                iconType="cross"
                onClick={closeFlyout}
                flush="left">
                Close
              </WuiButtonEmpty>
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiButton onClick={closeFlyout} fill>
                Save
              </WuiButton>
            </WuiFlexItem>
          </WuiFlexGroup>
        </WuiFlyoutFooter>
      </WuiFlyout>
    );
  }

  return (
    <div>
      <WuiButton onClick={showFlyout}>Show flyout</WuiButton>

      {flyout}
    </div>
  );
};
