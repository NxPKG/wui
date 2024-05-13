import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiSelectable,
  WuiSelectableMessage,
  WuiText,
  WuiSpacer,
  WuiSelectableTemplateSitewide,
  WuiCodeBlock,
  WuiAccordion,
} from '../../../../src/components';

import {
  WuiSelectableOptionProps,
  WuiSelectableOptionsList,
  Options,
  MetaData,
} from './props';

import Selectable from './selectable';
const selectableSource = require('!!raw-loader!./selectable');
const selectableHtml = renderToHtml(Selectable);

import SelectablePopover from './selectable_popover';
const selectablePopoverSource = require('!!raw-loader!./selectable_popover');
const selectablePopoverHtml = renderToHtml(SelectablePopover);

import SelectableSearch from './selectable_search';
const selectableSearchSource = require('!!raw-loader!./selectable_search');
const selectableSearchHtml = renderToHtml(SelectableSearch);

import SelectableSingle from './selectable_single';
const selectableSingleSource = require('!!raw-loader!./selectable_single');
const selectableSingleHtml = renderToHtml(SelectableSingle);

import SelectableExclusion from './selectable_exclusion';
const selectableExclusionSource = require('!!raw-loader!./selectable_exclusion');
const selectableExclusionHtml = renderToHtml(SelectableExclusion);

import SelectableMessages from './selectable_messages';
const selectableMessagesSource = require('!!raw-loader!./selectable_messages');
const selectableMessagesHtml = renderToHtml(SelectableMessages);

import SelectableCustomRender from './selectable_custom_render';
const selectableCustomRenderSource = require('!!raw-loader!./selectable_custom_render');
const selectableCustomRenderHtml = renderToHtml(SelectableCustomRender);

import SearchOption from './sitewide_option';
import Search from './search';
import { WuiCallOut } from '../../../../src/components/call_out';
const searchSource = require('!!raw-loader!./search');
const searchHtml = renderToHtml(Search);

export const SelectableExample = {
  title: 'Selectable',
  intro: (
    <WuiText>
      <p>
        <strong>WuiSelectable</strong> aims to make the pattern of a selectable
        list (with or without search) consistent across implementations. It is
        the same concept used in{' '}
        <Link to="/forms/combo-box">
          <strong>WuiComboBox</strong>
        </Link>{' '}
        and{' '}
        <Link to="/forms/filter-group">
          <strong>WuiFilterGroup</strong>
        </Link>
        .{' '}
        <strong>
          This is not intended for{' '}
          <Link to="/display/list-group">primary navigation</Link>
        </strong>{' '}
        but can be used to simplify the construction of popover navigational
        menus; i.e. the spaces menu in the{' '}
        <Link to="/layout/header">header</Link>.
      </p>

      <WuiSpacer size="s" />
    </WuiText>
  ),
  sections: [
    {
      title: 'The basics',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            At its simplest, <strong>WuiSelectable</strong> requires an array of{' '}
            <WuiCode>options</WuiCode> and an <WuiCode>onChange</WuiCode>{' '}
            handler which passes back the altered{' '}
            <WuiCode>selectedOptions</WuiCode> array. The{' '}
            <WuiCode>children</WuiCode> is a function that return the{' '}
            <WuiCode>list</WuiCode> and <WuiCode>search</WuiCode> nodes.
          </p>
          <WuiCallOut
            iconType="check"
            title="Selected options are based on the checked = on property">
            <p>
              <strong>WuiSelectable</strong> offers the ability to{' '}
              <strong>exclude</strong> selections. Therefore, the{' '}
              <WuiCode>checked</WuiCode> property is one of{' '}
              <WuiCode>{"undefined | 'on' | 'off'"}</WuiCode>,{' '}
              <WuiCode>{"'on'"}</WuiCode> being the default for selected options
              when <WuiCode>allowExclusions = false</WuiCode>.
            </p>
          </WuiCallOut>
        </Fragment>
      ),
      props: {
        WuiSelectable,
        WuiSelectableOptionProps,
        WuiSelectableOptionsList,
      },
      demo: <Selectable />,
      snippet: `<WuiSelectable
  aria-label="Basic example"
  options={[{ label: '' }, { label: '' }]}
  onChange={newOptions => setOptions(newOptions)}
  listProps={{ bordered: true }}>
  {list => list}
</WuiSelectable>`,
    },
    {
      title: 'Searchable',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableSearchSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableSearchHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            To add a search component to the list, simply add the{' '}
            <WuiCode>searchable</WuiCode> prop. You can optionally pass in a{' '}
            <WuiCode>searchProps</WuiCode> object which will get passed down to
            the actual <strong>WuiFieldSearch</strong> used.
          </p>
          <WuiCallOut
            iconType="search"
            title={
              <>
                The search is performed as a string match against the{' '}
                <WuiCode>option.label</WuiCode> unless a separate{' '}
                <WuiCode>option.searchableLabel</WuiCode> is provided.
              </>
            }
          />
        </Fragment>
      ),
      props: {
        WuiSelectable,
        WuiSelectableOptionProps,
        WuiSelectableOptionsList,
      },
      demo: <SelectableSearch />,
      snippet: `<WuiSelectable
  aria-label="Searchable example"
  searchable
  searchProps={{
    'data-test-subj': dataTestSubj,
  }}
  options={[]}
  onChange={newOptions => setOptions(newOptions)}>
  {(list, search) => (
    <Fragment>
      {search}
      {list}
    </Fragment>
  )}
</WuiSelectable>`,
    },
    {
      title: 'Single selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableSingleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableSingleHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Selection can be restricted to a single option at a time with the{' '}
            <WuiCode>singleSelection</WuiCode> prop. Passing{' '}
            <WuiCode>true</WuiCode> allows for 0 or 1 option to be selected,
            while <WuiCode language="js">{'"always"'}</WuiCode> requires 1
            option to be selected at all times. The default value is{' '}
            <WuiCode>false</WuiCode>.
          </p>
        </Fragment>
      ),
      props: { WuiSelectable },
      demo: <SelectableSingle />,
      snippet: `
      <WuiSelectable
  aria-label="Single selection example"
  options={options}
  onChange={newOptions => setOptions(newOptions)}
  singleSelection={true}
  listProps={{ bordered: true }}>
  {list => list}
</WuiSelectable>`,
    },
    {
      title: 'Sizing and containers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectablePopoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectablePopoverHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            The component&apos;s children, <WuiCode>list, search</WuiCode>, are
            returned via the <WuiCode>children</WuiCode> function, which means
            you can wrap the indivial elements in anything you want.
          </p>
          <h3>Width and height</h3>
          <p>
            The width has been made to always be 100% of its container,
            including stretching the search input. By default, the height is
            capped at showing up to 7.5 items. It shows half of the last one to
            help indicate that there are more options to scroll to. To stretch
            the box to fill its container, pass &apos;full&apos; to the{' '}
            <WuiCode>height</WuiCode> prop.
          </p>
          <h3>Flexbox</h3>
          <p>
            Be aware that <WuiCode language="sass">display: flex</WuiCode> with
            column layout is applied to the wrapping container. This is so that
            you can opt in to allow the height of the list stretch to fill its
            container. See the flyout example.
          </p>
        </Fragment>
      ),
      props: { WuiSelectable },
      demo: <SelectablePopover />,
    },
    {
      title: 'Options can be excluded',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableExclusionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableExclusionHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Currently, adding <WuiCode>allowExclusions</WuiCode> simply allows
            cycling through the checked options (on {'-> off ->'} undefined).
            Should this be allowed by holding down a modifier key instead?
          </p>
        </Fragment>
      ),
      props: { WuiSelectable },
      demo: <SelectableExclusion />,
      snippet: `<WuiSelectable
  aria-label="Example supporting exclusions"
  allowExclusions
  options={[]}
  onChange={newOptions => setOptions(newOptions)}>
  {list => list}
</WuiSelectable>`,
    },
    {
      title: 'Messages and loading',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableMessagesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableMessagesHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            The component comes with pre-composed messages for loading, empty,
            and no search result states. To display your own messages, pass{' '}
            <WuiCode>loadingMessage</WuiCode>, <WuiCode>emptyMessage</WuiCode>,
            or <WuiCode>noMatchesMessage</WuiCode> respectively. Alternatively,
            you can replace the entire <WuiCode>list</WuiCode> display with your
            own message for any state. In which case, we recommend wrapping your
            custom message in an <strong>WuiSelectableMessage</strong>{' '}
            component.
          </p>
        </Fragment>
      ),
      props: { WuiSelectable, WuiSelectableMessage },
      demo: <SelectableMessages />,
      snippet: [
        `<WuiSelectable
  aria-label="Messaging example"
  options={[]}
  listProps={{ bordered: true }}
  isLoading={isLoading}
  loadingMessage={customLoadingMessage}
  emptyMessage={customEmptyMessage}
  noMatchesMessage={customNoMatchesMessage}>
  {list => list}
</WuiSelectable>`,
        `<WuiSelectable
  aria-label="Messaging example"
  options={[]}
  listProps={{ bordered: true }}
  isLoading={isLoading}>
  {list => isLoading ? <WuiSelectableMessage bordered={true}>You have no spice</WuiSelectableMessage> : list}
</WuiSelectable>`,
      ],
    },
    {
      title: 'Rendering the options',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableCustomRenderSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableCustomRenderHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            There are two object properties you can add to enhance the content
            of you options, <WuiCode>option.prepend</WuiCode> and{' '}
            <WuiCode>option.append</WuiCode>. These will add nodes before and
            after the option label respectively. They will not be included in
            the searchable content as this only matches against the label
            property.
          </p>
          <h3>Selection icons</h3>
          <p>
            You can choose not to display the check and cross icons indicating
            selection by passing{' '}
            <WuiCode language="js">showIcons=false</WuiCode>. This is useful for
            instances that navigate elsewhere on selection or hide their
            selected options from the list.
          </p>
          <h3>Group labels</h3>
          <p>
            An option is allowed to be passed that is just a header for the
            options that follow it. It takes no mouse handlers and renders
            similar to a title. Add one of these by setting the{' '}
            <WuiCode>option.isGroupLabel</WuiCode> to true.{' '}
          </p>
          <h3>Custom content</h3>
          <p>
            While it is best to stick to the{' '}
            <WuiCode>option.label, option.append, option.prepend</WuiCode> and{' '}
            <WuiCode>showIcons</WuiCode> props, you can pass a custom{' '}
            <WuiCode>renderOption</WuiCode> function which will pass back the
            single <WuiCode>option</WuiCode> object and the{' '}
            <WuiCode>searchValue</WuiCode> to use for highlighting.
          </p>
          <p>
            In order for the list to know how to scroll to the selected or
            highlighted option, it must also know the height of the rows. It
            applies this pixel height directly to options. If your custom
            content is taller than the default of <WuiCode>32px</WuiCode> tall,
            you will need to recalculate this height and apply it via{' '}
            <WuiCode>listProps.rowHeight</WuiCode>.
          </p>
          <p>
            <strong>Every row must be the same height.</strong>
          </p>
        </Fragment>
      ),
      demo: <SelectableCustomRender />,
      snippet: `<WuiSelectable
  searchable
  options={[]}
  onChange={newOptions => setOptions(newOptions)}
  height={240}
  renderOption={renderCountryOption}
  listProps={{
    rowHeight: 50,
    showIcons: false,
  }}
>
  {(list, search) => (
    <Fragment>
      {search}
      {list}
    </Fragment>
  )}
</WuiSelectable>`,
    },
    {
      title: 'Sitewide search template',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: searchSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: searchHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>WuiSelectableTemplateSitewide</strong> is an opinionated
            wrapper around <strong>WuiSelectable</strong> to provide a reusable
            template across the Elastic products that will share the same global
            search capabilities. It creates the search input that triggers a
            popover containing the list of options.
          </p>
          <h3>Search input</h3>
          <p>
            The search ability of WuiSelectable is still hooked up to the
            options provided. It will highlight the portion of the label that
            matches the search string.
          </p>
          <WuiCallOut
            size="s"
            iconType="keyboardShortcut"
            title="The demo showcases the possibility to allow a keyboard shortcut (command + K) to trigger the search input focus, but the template does not come with this ability."
          />
          <h3>Popover</h3>
          <p>
            The popover itself allows you to display a{' '}
            <WuiCode>popoverTitle</WuiCode> node,{' '}
            <WuiCode>popoverFooter</WuiCode> node, or pass any of the{' '}
            <WuiCode>popoverProps</WuiCode> to the{' '}
            <Link to="/layout/popover">
              <strong>WuiPopover</strong>
            </Link>{' '}
            component.
          </p>
          <h3>Options</h3>
          <p>
            The <WuiCode>options</WuiCode> are the most opinionated portion of
            the template. Their display is determined by the props passed in and
            extends the normal <WuiCode>WuiSelectable.option</WuiCode> type. All
            parts are optional with the exception of the label (B).
          </p>

          <SearchOption />
          <WuiSpacer size="xs" />
          <WuiAccordion
            id="optionSnippet"
            buttonContent={<small>Code snippet</small>}>
            <WuiSpacer size="xs" />
            <WuiCodeBlock language="ts" isCopyable paddingSize="s">
              {`const options: WuiSelectableTemplateSitewideOption[] = [
  {
    label: 'Label',
    icon: {
      type: 'logoWazuh'
    }
    avatar: {
      name: 'Default',
    },
    meta: [
      {
        text: 'Meta',
        type: 'application',
      },
      {
        text: 'Deployment',
        type: 'deployment',
      },
      {
        text: 'Default display',
      },
    ],
  }
]`}
            </WuiCodeBlock>
          </WuiAccordion>
          <WuiSpacer />
          <ul style={{ listStyleType: 'upper-alpha' }}>
            <li>
              <WuiCode>label</WuiCode> (required): The name of the item itself.
              By default, the search box will only use this to match the search
              term against, but you can supply a separate{' '}
              <WuiCode>searchableLabel</WuiCode> that combines the label and
              meta data to search on.
            </li>
            <li>
              <WuiCode>icon</WuiCode>: Only display the solution or
              application&apos;s logo when the option links to the application
              itself (Dashboard app) and not lower-level items such as
              individual dashboards. Size and color are predetermined but can be
              overridden.
            </li>
            <li>
              <WuiCode>avatar</WuiCode>: Represents the Wazuh Space that the
              item is located in, <strong>if</strong> multiple spaces are
              present. Type and size are predetermined but can be overridden.
            </li>
            <li>
              <WuiCode>meta</WuiCode>: This bottom line should only contain
              items if the option is a lower-level item (individual dashboard).
              The display of which defaults to simple text, but if you pass one
              of the predetermined <WuiCode>types</WuiCode>, they will be styled
              according to the design pattern.
            </li>
          </ul>
          <WuiCallOut
            size="s"
            iconType="clock"
            title="The demo shows how you can temporarily replace the icon for a subset of options to display a short list of recently viewed options."
          />
          <h3>Selection</h3>
          <p>
            The options themselves are simply rendered as list items with no
            interactive behavior like buttons or links. You must handle the
            interaction when the component passes back the altered array of
            options with the selected option having{' '}
            <WuiCode>{"checked: 'on'"}</WuiCode>.
          </p>
          <h3>Popover toggle and responsiveness</h3>
          <p>
            The default display is to render the search input inline which
            triggers a popover with the results. Or you can decide to trigger
            the whole selectable component from a single button. By passing your
            own button to <WuiCode>popoverButton</WuiCode>, the component will
            use this to trigger the popover, putting the search inside.
          </p>
          <p>
            This is a great way to handle reducing the size of the component for
            smaller screens. The component offers a helper prop called{' '}
            <WuiCode>popoverButtonBreakpoints</WuiCode> which will only render
            the <WuiCode>popoverButton</WuiCode> if the window size matches
            named breakpoint(s).
          </p>
        </Fragment>
      ),
      props: { WuiSelectableTemplateSitewide, Options, MetaData },
      demo: <Search />,
    },
  ],
};
