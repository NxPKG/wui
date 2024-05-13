import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiLink,
  WuiCallOut,
  WuiCode,
  WuiComboBox,
  WuiSpacer,
  WuiText,
} from '../../../../src/components';

import ComboBox from './combo_box';
const comboBoxSource = require('!!raw-loader!./combo_box');
const comboBoxHtml = renderToHtml(ComboBox);
const comboBoxSnippet = `<WuiComboBox
  placeholder="Select or create options"
  options={[
    {
      label: 'Titan',
    },
  ]}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

import Containers from './containers';
const containersSource = require('!!raw-loader!./containers');
const containersHtml = renderToHtml(Containers);

import Colors from './colors';
const colorsSource = require('!!raw-loader!./colors');
const colorsHtml = renderToHtml(Colors);
const colorsSnippet = `<WuiComboBox
  placeholder="Select or create options"
  options={[
    {
      label: 'Titan',
      color: "#ff0000",
    },
  ]}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

import RenderOption from './render_option';
const renderOptionSource = require('!!raw-loader!./render_option');
const renderOptionHtml = renderToHtml(RenderOption);
const renderOptionSnippet = `<WuiComboBox
  placeholder="Select or create options"
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  renderOption={renderOption}
/>`;

import Groups from './groups';
const groupsSource = require('!!raw-loader!./groups');
const groupsHtml = renderToHtml(Groups);
const groupsSnippet = `<WuiComboBox
  placeholder="These options are grouped"
  options={[colorGroup, soundGroup]}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
/>`;

import SingleSelection from './single_selection';
const singleSelectionSource = require('!!raw-loader!./single_selection');
const singleSelectionHtml = renderToHtml(SingleSelection);
const singleSelectionSnippet = `<WuiComboBox
  placeholder="Select a single option"
  singleSelection={{ asPlainText: true }}
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
/>`;

import SingleSelectionCustomOptions from './single_selection_custom_options';
const singleSelectionCustomOptionsSource = require('!!raw-loader!./single_selection_custom_options');
const singleSelectionCustomOptionsHtml = renderToHtml(
  SingleSelectionCustomOptions
);
const singleSelectionCustomOptionsSnippet = `<WuiComboBox
  placeholder="Select a single option"
  singleSelection={{ asPlainText: true }}
  options={options}
  selectedOptions={selectedOptions}
  onCreateOption={onCreateOption}
  onChange={onChange}
/>`;

import DisallowCustomOptions from './disallow_custom_options';
const disallowCustomOptionsSource = require('!!raw-loader!./disallow_custom_options');
const disallowCustomOptionsHtml = renderToHtml(DisallowCustomOptions);
const disallowCustomOptionsSnippet = `<WuiComboBox
  placeholder="Select one or more options"
  options={options}
  onChange={onChange}
  onSearchChange={onSearchChange}
/>`;

import CustomOptionsOnly from './custom_options_only';
const customOptionsOnlySource = require('!!raw-loader!./custom_options_only');
const customOptionsOnlyHtml = renderToHtml(CustomOptionsOnly);
const customOptionsOnlySnippet = `<WuiComboBox
  noSuggestions
  placeholder="Create some tags (letters only)"
  selectedOptions={selectedOptions}
  onCreateOption={onCreateOption}
  onChange={onChange}
  onSearchChange={onSearchChange}
  isInvalid={isInvalid}
/>`;

import Async from './async';
const asyncSource = require('!!raw-loader!./async');
const asyncHtml = renderToHtml(Async);
const asyncSnippet = `<WuiComboBox
  placeholder="Search asynchronously"
  async
  options={options}
  selectedOptions={selectedOptions}
  isLoading={isLoading}
  onChange={onChange}
  onSearchChange={onSearchChange}
  onCreateOption={onCreateOption}
/>`;

import Virtualized from './virtualized';
const virtualizedSource = require('!!raw-loader!./virtualized');
const virtualizedHtml = renderToHtml(Virtualized);
const virtualizedSnippet = `<WuiComboBox
  placeholder="Select one or more options"
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
/>`;

import Disabled from './disabled';
const disabledSource = require('!!raw-loader!./disabled');
const disabledHtml = renderToHtml(Disabled);
const disabledSnippet = `<WuiComboBox
  placeholder="Select or create options"
  options={options}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isDisabled
/>`;

import Delimiter from './combo_box_delimiter';
const delimiterSource = require('!!raw-loader!./combo_box_delimiter');
const delimiterHtml = renderToHtml(Delimiter);
const delimiterSnippet = `<WuiComboBox
  placeholder="Select or create options"
  options={options}
  delimiter=","
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

import StartingWith from './startingWith';
const startingWithSource = require('!!raw-loader!./startingWith');
const startingWithHtml = renderToHtml(StartingWith);
const startingWithSnippet = `<WuiComboBox
  placeholder="Select or create options"
  sortMatchesBy="startsWith"
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

export const ComboBoxExample = {
  title: 'Combo box',
  intro: (
    <Fragment>
      <WuiText>
        <p>
          Use a <strong>WuiComboBox</strong> when the input has so many options
          that the user needs to be able to search them, the user needs to be
          able to select multiple options, and/or the user should have the
          ability to specify a custom value in addition to selecting from a
          predetermined list.
        </p>
      </WuiText>

      <WuiSpacer />

      <WuiCallOut title="No duplicate option labels allowed" color="warning">
        <p>
          The combo box will have errors if any of the options you pass to it
          share the same label property. It&rsquo;s OK if options have duplicate
          values, though. This is because the label is the only thing the combo
          box is concerned about, since this is what the user sees and what is
          matched against when the user searches.
        </p>
      </WuiCallOut>

      <WuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: comboBoxSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: comboBoxHtml,
        },
      ],
      props: { WuiComboBox },
      snippet: comboBoxSnippet,
      demo: <ComboBox />,
    },
    {
      title: 'Disabled',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: disabledSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: disabledHtml,
        },
      ],
      text: (
        <p>
          Set the prop <WuiCode>isDisabled</WuiCode> to make the combo box
          disabled.
        </p>
      ),
      props: { WuiComboBox },
      snippet: disabledSnippet,
      demo: <Disabled />,
    },
    {
      title: 'Virtualized',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: virtualizedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: virtualizedHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiComboBoxList</strong> uses{' '}
          <WuiLink href="https://github.com/bvaughn/react-window">
            react-window
          </WuiLink>{' '}
          to only render visible options to be super fast no matter how many
          options there are.
        </p>
      ),
      props: { WuiComboBox },
      snippet: virtualizedSnippet,
      demo: <Virtualized />,
    },
    {
      title: 'Containers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: containersSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: containersHtml,
        },
      ],
      text: (
        <p>
          This example demonstrates how the combo box works within containers.
          Because this component uses portals, it&rsquo;s important that it
          works within other portal-using components.
        </p>
      ),
      props: { WuiComboBox },
      demo: <Containers />,
    },
    {
      title: 'Pill colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorsHtml,
        },
      ],
      text: (
        <p>
          Useful for visualization or tagging systems. You can also pass a color
          in your option list. The color can be a hex value (like{' '}
          <WuiCode>#000</WuiCode>) or any other named color value accepted by
          the{' '}
          <Link to="/display/badge">
            <strong>WuiBadge</strong>
          </Link>{' '}
          component.
        </p>
      ),
      props: { WuiComboBox },
      snippet: colorsSnippet,
      demo: <Colors />,
    },
    {
      title: 'Option rendering',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: renderOptionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: renderOptionHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can provide a <WuiCode>renderOption</WuiCode> prop which will
            accept <WuiCode>option</WuiCode> and <WuiCode>searchValue</WuiCode>{' '}
            arguments. Use the <WuiCode>value</WuiCode> prop of the{' '}
            <WuiCode>option</WuiCode> object to store metadata about the option
            for use in this callback.
          </p>

          <p>
            <strong>Note:</strong> virtualization (above) requires that each
            option have the same height. Ensure that you render the options so
            that wrapping text is truncated instead of causing the height of the
            option to change.
          </p>
        </Fragment>
      ),
      props: { WuiComboBox },
      snippet: renderOptionSnippet,
      demo: <RenderOption />,
    },
    {
      title: 'Groups',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: groupsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: groupsHtml,
        },
      ],
      text: (
        <p>
          You can group options together. The groups <em>won&rsquo;t</em> match
          against the search value.
        </p>
      ),
      props: { WuiComboBox },
      snippet: groupsSnippet,
      demo: <Groups />,
    },
    {
      title: 'Single selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: singleSelectionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: singleSelectionHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            To only allow the user to select a single option, provide the{' '}
            <WuiCode>singleSelection</WuiCode> prop. You may want to render the
            selected option as plain text instead of pill form. To do this, pass{' '}
            <WuiCode language="js">
              {'singleSelection={{ asPlainText: true }}'}
            </WuiCode>
          </p>
          <p>
            <strong>Note:</strong> <WuiCode>append</WuiCode> and{' '}
            <WuiCode>prepend</WuiCode> props only work if
            <WuiCode>singleSelection</WuiCode> prop is not set to{' '}
            <WuiCode>false</WuiCode> to avoid multilines that makes combobox
            height greater than that of <WuiCode>append</WuiCode> and{' '}
            <WuiCode>prepend</WuiCode>.
          </p>
        </Fragment>
      ),
      props: { WuiComboBox },
      snippet: singleSelectionSnippet,
      demo: <SingleSelection />,
    },
    {
      title: 'Single selection with custom options',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: singleSelectionCustomOptionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: singleSelectionCustomOptionsHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can allow the user to select a single option and also allow the
            creation of custom options. To do that, use the{' '}
            <WuiCode>singleSelection</WuiCode> in conjunction with the{' '}
            <WuiCode>onCreateOption</WuiCode> prop.
          </p>
          <p>
            <strong>Note:</strong> Creating custom options might not be obvious
            to the user, so provide help text explaining that this option is
            available. You can also customize the custom option text by passing
            a text to <WuiCode>customOptionText</WuiCode> prop.
          </p>
        </Fragment>
      ),
      props: { WuiComboBox },
      snippet: singleSelectionCustomOptionsSnippet,
      demo: <SingleSelectionCustomOptions />,
    },
    {
      title: 'Disallowing custom options',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: disallowCustomOptionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: disallowCustomOptionsHtml,
        },
      ],
      text: (
        <p>
          Leave out the <WuiCode>onCreateOption</WuiCode> prop to disallow the
          creation of custom options.
        </p>
      ),
      props: { WuiComboBox },
      snippet: disallowCustomOptionsSnippet,
      demo: <DisallowCustomOptions />,
    },
    {
      title: 'Custom options only, with validation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customOptionsOnlySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customOptionsOnlyHtml,
        },
      ],
      text: (
        <p>
          Alternatively, provide the <WuiCode>noSuggestions</WuiCode> prop to
          hide the suggestions list and <em>only</em> allow the creation of
          custom options.
        </p>
      ),
      props: { WuiComboBox },
      snippet: customOptionsOnlySnippet,
      demo: <CustomOptionsOnly />,
    },
    {
      title: 'Async',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: asyncSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: asyncHtml,
        },
      ],
      text: (
        <p>
          Use the <WuiCode>onSearchChange</WuiCode> code to handle searches
          asynchronously. Use the
          <WuiCode>isLoading</WuiCode> prop to let the user know that something
          async is happening.
        </p>
      ),
      props: { WuiComboBox },
      snippet: asyncSnippet,
      demo: <Async />,
    },
    {
      title: 'With delimiter',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: delimiterSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: delimiterHtml,
        },
      ],
      text: (
        <p>
          Pass a unique character to the <WuiCode>delimiter</WuiCode> prop to
          aid in option creation. This is best used when knowing that content
          may be pasted from elsewhere such as a comma separated list.
        </p>
      ),
      props: { WuiComboBox },
      snippet: delimiterSnippet,
      demo: <Delimiter />,
    },
    {
      title: 'Sorting matches',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: startingWithSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: startingWithHtml,
        },
      ],
      text: (
        <p>
          By default, the matched options will keep their original sort order.
          If you would like to prioritize those options that{' '}
          <strong>start with</strong> the searched string, pass{' '}
          <WuiCode language="js">sortMatchesBy=&quot;startsWith&quot;</WuiCode>
          to display those options at the top of the list.
        </p>
      ),
      props: { WuiComboBox },
      snippet: startingWithSnippet,
      demo: <StartingWith />,
    },
  ],
};
