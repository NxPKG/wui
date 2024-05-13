import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiForm,
  WuiFormRow,
  WuiText,
  WuiSpacer,
  WuiDescribedFormGroup,
} from '../../../../src/components';
import Guidelines from './guidelines';
import FormRows from './form_rows';
const formRowsSource = require('!!raw-loader!./form_rows');
const formRowsHtml = renderToHtml(FormRows);

import DescribedFormGroup from './described_form_group';
const describedFormGroupSource = require('!!raw-loader!./described_form_group');
const describedFormGroupHtml = renderToHtml(DescribedFormGroup);

import FullWidth from './full_width';
const fullWidthSource = require('!!raw-loader!./full_width');
const fullWidthHtml = renderToHtml(FullWidth);

import Inline from './inline';
const inlineSource = require('!!raw-loader!./inline');
const inlineHtml = renderToHtml(Inline);

import InlineSizing from './inline_sizing';
const inlineSizingSource = require('!!raw-loader!./inline_sizing');
const inlineSizingHtml = renderToHtml(InlineSizing);

import InlinePopover from './inline_popover';
const inlinePopoverSource = require('!!raw-loader!./inline_popover');
const inlinePopoverHtml = renderToHtml(InlinePopover);

export const FormLayoutsExample = {
  title: 'Form layouts',
  intro: (
    <WuiText>
      <p>
        Be sure to read the full{' '}
        <Link to="/guidelines/form-layouts">forms usage guidelines</Link>.
      </p>
      <WuiSpacer />
    </WuiText>
  ),
  sections: [
    {
      title: 'Form and form rows',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formRowsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formRowsHtml,
        },
      ],
      text: (
        <p>
          Use the <strong>WuiFormRow</strong> component to easily associate form
          components with labels, help text, and error text. Use the{' '}
          <strong>WuiForm</strong> component to group{' '}
          <strong>WuiFormRows</strong>. By default WuiForm will render as a
          simple div unless you pass{' '}
          <WuiCode language="js">component=&quot;form&quot;</WuiCode>.
        </p>
      ),
      props: {
        WuiForm,
        WuiFormRow,
      },
      demo: <FormRows />,
      snippet: `<WuiFormRow
  label="Text field"
  helpText="I am some friendly help text."
>
  <WuiFieldText />
</WuiFormRow>`,
    },
    {
      title: 'Full-width',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fullWidthSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fullWidthHtml,
        },
      ],
      text: (
        <p>
          Form elements will automatically flex to a max-width of{' '}
          <WuiCode>400px</WuiCode>. You can optionally pass the{' '}
          <WuiCode>fullWidth</WuiCode> prop to the row and form control to
          expand to their container. This should be done rarely and usually you
          will only need it for isolated controls like search bars and sliders.
        </p>
      ),
      props: {
        WuiFormRow,
      },
      demo: <FullWidth />,
      snippet: `<WuiFormRow
  fullWidth
  label="Works on form rows too"
  helpText="Note that the fullWidth prop is not passed to the form row's child"
>
  <WuiRange fullWidth />
</WuiFormRow>`,
    },
    {
      title: 'Described form groups',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: describedFormGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: describedFormGroupHtml,
        },
      ],
      text: (
        <p>
          Use <strong>WuiDescribedFormGroup</strong> component to associate
          multiple <strong>WuiFormRows</strong>. It can also simply be used with
          one <strong>WuiFormRow</strong> as a way to display additional text
          next to the field (on mobile, it will revert to being stacked).
        </p>
      ),
      props: {
        WuiDescribedFormGroup,
      },
      demo: <DescribedFormGroup />,
      snippet: `<WuiDescribedFormGroup
  title={<h3>Set heading level based on context</h3>}
  description={
    <Fragment>
      Will be wrapped in a small, subdued WuiText block.
    </Fragment>
  }
>
  <WuiFormRow
    label="Text field"
  >
    <WuiFieldText />
  </WuiFormRow>
</WuiDescribedFormGroup>`,
    },
    {
      title: 'Inline',
      text: (
        <p>
          Inline forms can be made with{' '}
          <Link to="/layout/flex">
            <strong>WuiFlexGroup</strong>
          </Link>
          . Apply <WuiCode language="js">grow=false</WuiCode> on any of the
          items you want to collapse (like this button). Note that the button
          FormRow component also requires an additional prop because it&rsquo;s
          missing a label.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inlineHtml,
        },
      ],
      demo: <Inline />,
    },
    {
      title: 'Sizing inline form rows',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineSizingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inlineSizingHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Apply a width to the wrapping FlexItem to size individual controls.
            When you need to make a field smaller, always apply the width to the
            FlexItem, not the input. The input inside will resize as needed.
          </p>
          <p>
            When supplying children to an WuiFormRow that is{' '}
            <strong>not</strong> a form control, and you need to the content to
            vertically center with the other form controls, change the{' '}
            <WuiCode>display</WuiCode> prop to <WuiCode>center</WuiCode> or{' '}
            <WuiCode>centerCompressed</WuiCode>.
          </p>
        </Fragment>
      ),
      demo: <InlineSizing />,
      snippet: `<WuiFormRow label="Avatar" display="centerCompressed">
  <WuiAvatar name="John Doe" size="s" />
</WuiFormRow>`,
    },
    {
      title: 'In a popover',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlinePopoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inlinePopoverHtml,
        },
      ],
      text: (
        <p>
          Because forms auto-size to their wrapping elements, it means you can
          do fun things with them like stuff them in popovers and they&rsquo;ll
          still work perfectly.
        </p>
      ),
      demo: <InlinePopover />,
    },
  ],
  guidelines: <Guidelines />,
};
