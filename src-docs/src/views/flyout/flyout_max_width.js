import React, { useState } from 'react';

import {
  WuiFlyout,
  WuiFlyoutBody,
  WuiFlyoutHeader,
  WuiLink,
  WuiText,
  WuiTitle,
  WuiFieldText,
  WuiForm,
  WuiFormRow,
  WuiFilePicker,
  WuiRange,
  WuiSelect,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [flyoutSize, setFlyoutSize] = useState('m');
  const [flyoutMaxWidth, setFlyoutMaxWidth] = useState(false);

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = (size = 'm', maxWidth = false) => {
    setFlyoutSize(size);
    setFlyoutMaxWidth(maxWidth);
    setIsFlyoutVisible(true);
  };

  let flyout;

  if (isFlyoutVisible) {
    let maxWidthTitle;
    switch (flyoutMaxWidth) {
      case true:
        maxWidthTitle = 'Default';
        break;
      case false:
        maxWidthTitle = 'No';
        break;
      default:
        maxWidthTitle = `${flyoutMaxWidth}px`;
        break;
    }

    flyout = (
      <WuiFlyout
        ownFocus
        onClose={closeFlyout}
        aria-labelledby="flyoutMaxWidthTitle"
        size={flyoutSize}
        maxWidth={flyoutMaxWidth}>
        <WuiFlyoutHeader hasBorder>
          <WuiTitle size="m">
            <h2 id="flyoutMaxWidthTitle">{maxWidthTitle} maxWidth</h2>
          </WuiTitle>
        </WuiFlyoutHeader>
        <WuiFlyoutBody>
          <WuiText>
            <p>
              In many cases, you&rsquo;ll want to set a custom width
              that&rsquo;s tailored to your content. In this case, the flyout is
              an ideal width for form elements.
            </p>
          </WuiText>

          <WuiSpacer />

          <WuiForm>
            <WuiFormRow
              label="Text field"
              helpText="I am some friendly help text.">
              <WuiFieldText name="first" />
            </WuiFormRow>

            <WuiFormRow label="Select (with no initial selection)">
              <WuiSelect
                hasNoInitialSelection
                options={[
                  { value: 'option_one', text: 'Option one' },
                  { value: 'option_two', text: 'Option two' },
                  { value: 'option_three', text: 'Option three' },
                ]}
              />
            </WuiFormRow>

            <WuiFormRow label="File picker">
              <WuiFilePicker />
            </WuiFormRow>

            <WuiFormRow label="Range">
              <WuiRange min={0} max={100} name="range" id="range" />
            </WuiFormRow>
          </WuiForm>
        </WuiFlyoutBody>
      </WuiFlyout>
    );
  }
  return (
    <div>
      <WuiLink color="secondary" onClick={() => showFlyout('s')}>
        Show <strong>small</strong> flyout with <strong>no max-width</strong>
      </WuiLink>
      <WuiSpacer size="s" />
      <WuiLink color="secondary" onClick={() => showFlyout('s', true)}>
        Show <strong>small</strong> flyout with{' '}
        <strong>default max-width</strong>
      </WuiLink>
      <WuiSpacer size="s" />
      <WuiLink color="danger" onClick={() => showFlyout('s', 200)}>
        Show <strong>small</strong> flyout with{' '}
        <strong>smaller custom max-width</strong> -- minWidth wins except for on
        small screens
      </WuiLink>
      <WuiSpacer size="s" />
      <WuiLink color="danger" onClick={() => showFlyout('s', 448)}>
        Show <strong>small</strong> flyout with{' '}
        <strong>larger custom max-width</strong> -- minWidth wins except for on
        small screens
      </WuiLink>

      <WuiSpacer />

      <WuiLink color="secondary" onClick={() => showFlyout('m')}>
        Show <strong>medium</strong> flyout with <strong>no max-width</strong>
      </WuiLink>
      <WuiSpacer size="s" />
      <WuiLink color="secondary" onClick={() => showFlyout('m', true)}>
        Show <strong>medium</strong> flyout with{' '}
        <strong>default max-width</strong>
      </WuiLink>
      <WuiSpacer size="s" />
      <WuiLink color="danger" onClick={() => showFlyout('m', 448)}>
        Show <strong>medium</strong> flyout with{' '}
        <strong>smaller custom max-width</strong> -- minWidth wins and full
        100vw wins on small screens
      </WuiLink>
      <WuiSpacer size="s" />
      <WuiLink color="secondary" onClick={() => showFlyout('m', 900)}>
        Show <strong>medium</strong> flyout with{' '}
        <strong>larger custom max-width</strong>
      </WuiLink>

      <WuiSpacer />

      <WuiLink color="secondary" onClick={() => showFlyout('l')}>
        Show <strong>large</strong> flyout with <strong>no max-width</strong>
      </WuiLink>
      <WuiSpacer size="s" />
      <WuiLink color="secondary" onClick={() => showFlyout('l', true)}>
        Show <strong>large</strong> flyout with{' '}
        <strong>default max-width</strong>
      </WuiLink>
      <WuiSpacer size="s" />
      <WuiLink color="danger" onClick={() => showFlyout('l', 448)}>
        Show <strong>large</strong> flyout with{' '}
        <strong>smaller custom max-width</strong> -- minWidth wins and full
        100vw wins on small screens
      </WuiLink>
      <WuiSpacer size="s" />
      <WuiLink color="secondary" onClick={() => showFlyout('l', 1600)}>
        Show <strong>large</strong> flyout with{' '}
        <strong>larger custom max-width</strong>
      </WuiLink>

      <WuiSpacer />

      <WuiLink color="primary" onClick={() => showFlyout('m', 0)}>
        Trick for forms: <strong>Medium</strong> flyout with{' '}
        <strong>0 as max-width</strong>
      </WuiLink>

      {flyout}
    </div>
  );
};
