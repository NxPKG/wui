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

import React, {
  Component,
  ComponentProps,
  ReactNode,
  RefCallback,
} from 'react';
import classNames from 'classnames';
import {
  FixedSizeList,
  ListProps,
  ListChildComponentProps,
} from 'react-window';

import { WuiFlexGroup, WuiFlexItem } from '../../flex';
import { WuiHighlight } from '../../highlight';
import { WuiPanel } from '../../panel';
import { WuiText } from '../../text';
import { WuiLoadingSpinner } from '../../loading';
import { WuiComboBoxTitle } from './combo_box_title';
import { WuiI18n } from '../../i18n';
import {
  WuiFilterSelectItem,
  FilterChecked,
} from '../../filter_group/filter_select_item';
import { htmlIdGenerator } from '../../../services';
import {
  WuiComboBoxOptionOption,
  WuiComboBoxOptionsListPosition,
  WuiComboBoxSingleSelectionShape,
  OptionHandler,
  RefInstance,
  UpdatePositionHandler,
} from '../types';
import { CommonProps } from '../../common';
import { WuiBadge } from '../../badge/';

const positionToClassNameMap: {
  [position in WuiComboBoxOptionsListPosition]: string;
} = {
  top: 'wuiComboBoxOptionsList--top',
  bottom: 'wuiComboBoxOptionsList--bottom',
};

const OPTION_CONTENT_CLASSNAME = 'wuiComboBoxOption__content';

export type WuiComboBoxOptionsListProps<T> = CommonProps &
  ComponentProps<typeof WuiPanel> & {
    'data-test-subj': string;
    activeOptionIndex?: number;
    areAllOptionsSelected?: boolean;
    /**
     * Creates a custom text option. You can use `{searchValue}` inside your string to better customize your text.
     * It won't show if there's no onCreateOption.
     */
    customOptionText?: string;
    fullWidth?: boolean;
    getSelectedOptionForSearchValue?: (
      searchValue: string,
      selectedOptions: any[]
    ) => WuiComboBoxOptionOption<T> | undefined;
    isLoading?: boolean;
    listRef: RefCallback<HTMLDivElement>;
    matchingOptions: Array<WuiComboBoxOptionOption<T>>;
    onCloseList: (event: Event) => void;
    onCreateOption?: (
      searchValue: string,
      options: Array<WuiComboBoxOptionOption<T>>
    ) => boolean | void;
    onOptionClick?: OptionHandler<T>;
    onOptionEnterKey?: OptionHandler<T>;
    onScroll?: ListProps['onScroll'];
    optionRef: (index: number, node: RefInstance<WuiFilterSelectItem>) => void;
    options: Array<WuiComboBoxOptionOption<T>>;
    position?: WuiComboBoxOptionsListPosition;
    renderOption?: (
      option: WuiComboBoxOptionOption<T>,
      searchValue: string,
      OPTION_CONTENT_CLASSNAME: string
    ) => ReactNode;
    rootId: ReturnType<typeof htmlIdGenerator>;
    rowHeight: number;
    scrollToIndex?: number;
    searchValue: string;
    selectedOptions: Array<WuiComboBoxOptionOption<T>>;
    updatePosition: UpdatePositionHandler;
    width: number;
    singleSelection?: boolean | WuiComboBoxSingleSelectionShape;
    delimiter?: string;
    zIndex?: number;
  };

const hitEnterBadge = (
  <WuiBadge
    className="wuiComboBoxOption__enterBadge"
    color="hollow"
    iconType="returnKey"
    aria-hidden="true"
  />
);

export class WuiComboBoxOptionsList<T> extends Component<
  WuiComboBoxOptionsListProps<T>
> {
  listRefInstance: RefInstance<HTMLDivElement> = null;
  listRef: FixedSizeList | null = null;
  listBoxRef: HTMLUListElement | null = null;

  static defaultProps = {
    'data-test-subj': '',
    rowHeight: 29, // row height of default option renderer
  };

  updatePosition = () => {
    // Wait a beat for the DOM to update, since we depend on DOM elements' bounds.
    requestAnimationFrame(() => {
      this.props.updatePosition(this.listRefInstance);
    });
  };

  componentDidMount() {
    // Wait a frame, otherwise moving focus from one combo box to another will result in the class
    // being removed from the body.
    requestAnimationFrame(() => {
      document.body.classList.add('wuiBody-hasPortalContent');
    });
    this.updatePosition();
    window.addEventListener('resize', this.updatePosition);

    // Firefox will trigger a scroll event in many common situations when the options list div is appended
    // to the DOM; in testing it was always within 100ms, but setting a timeout here for 500ms to be safe
    setTimeout(() => {
      window.addEventListener('scroll', this.closeListOnScroll, {
        passive: true, // for better performance as we won't call preventDefault
        capture: true, // scroll events don't bubble, they must be captured instead
      });
    }, 500);
  }

  componentDidUpdate(prevProps: WuiComboBoxOptionsListProps<T>) {
    const { options, selectedOptions, searchValue } = prevProps;

    // We don't compare matchingOptions because that will result in a loop.
    if (
      searchValue !== this.props.searchValue ||
      options !== this.props.options ||
      selectedOptions !== this.props.selectedOptions
    ) {
      this.updatePosition();
    }

    if (this.listRef && typeof this.props.activeOptionIndex !== 'undefined') {
      this.listRef.scrollToItem(this.props.activeOptionIndex, 'auto');
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('wuiBody-hasPortalContent');
    window.removeEventListener('resize', this.updatePosition);
    window.removeEventListener('scroll', this.closeListOnScroll, {
      capture: true,
    });
  }

  closeListOnScroll = (event: Event) => {
    // Close the list when a scroll event happens, but not if the scroll happened in the options list.
    // This mirrors Firefox's approach of auto-closing `select` elements onscroll.
    if (
      this.listRefInstance &&
      event.target &&
      this.listRefInstance.contains(event.target as Node) === false
    ) {
      this.props.onCloseList(event);
    }
  };

  listRefCallback: RefCallback<HTMLDivElement> = ref => {
    this.props.listRef(ref);
    this.listRefInstance = ref;
  };

  setListRef = (ref: FixedSizeList | null) => {
    this.listRef = ref;
  };

  setListBoxRef = (ref: HTMLUListElement | null) => {
    this.listBoxRef = ref;

    if (ref) {
      ref.setAttribute('id', this.props.rootId('listbox'));
      ref.setAttribute('role', 'listBox');
      ref.setAttribute('tabIndex', '0');
    }
  };

  ListRow = ({ data, index, style }: ListChildComponentProps) => {
    const option = data[index];
    const { isGroupLabelOption, label, value, ...rest } = option;
    const {
      singleSelection,
      selectedOptions,
      onOptionClick,
      optionRef,
      activeOptionIndex,
      renderOption,
      searchValue,
      rootId,
    } = this.props;

    if (isGroupLabelOption) {
      return (
        <div key={label.toLowerCase()} style={style}>
          <WuiComboBoxTitle>{label}</WuiComboBoxTitle>
        </div>
      );
    }

    let checked: FilterChecked | undefined = undefined;
    if (
      singleSelection &&
      selectedOptions.length &&
      selectedOptions[0].label === label
    ) {
      checked = 'on';
    }

    const optionIsFocused = activeOptionIndex === index;
    const optionIsDisabled =
      option.hasOwnProperty('disabled') && option.disabled === true;

    return (
      <WuiFilterSelectItem
        style={style}
        key={option.label.toLowerCase()}
        onClick={() => {
          if (onOptionClick) {
            onOptionClick(option);
          }
        }}
        ref={optionRef.bind(this, index)}
        isFocused={optionIsFocused}
        checked={checked}
        showIcons={singleSelection ? true : false}
        id={rootId(`_option-${index}`)}
        title={label}
        {...rest}>
        <span className="wuiComboBoxOption__contentWrapper">
          {renderOption ? (
            <span className={OPTION_CONTENT_CLASSNAME}>
              {renderOption(
                option,
                searchValue,
                'wuiComboBoxOption__renderOption'
              )}
            </span>
          ) : (
            <WuiHighlight
              search={searchValue}
              className={OPTION_CONTENT_CLASSNAME}>
              {label}
            </WuiHighlight>
          )}
          {optionIsFocused && !optionIsDisabled ? hitEnterBadge : null}
        </span>
      </WuiFilterSelectItem>
    );
  };

  render() {
    const {
      'data-test-subj': dataTestSubj,
      activeOptionIndex,
      areAllOptionsSelected,
      customOptionText,
      fullWidth,
      getSelectedOptionForSearchValue,
      isLoading,
      listRef,
      matchingOptions,
      onCloseList,
      onCreateOption,
      onOptionClick,
      onOptionEnterKey,
      onScroll,
      optionRef,
      options,
      position,
      renderOption,
      rootId,
      rowHeight,
      scrollToIndex,
      searchValue,
      selectedOptions,
      singleSelection,
      updatePosition,
      width,
      delimiter,
      zIndex,
      style,
      ...rest
    } = this.props;

    let emptyStateContent;

    if (isLoading) {
      emptyStateContent = (
        <WuiFlexGroup gutterSize="s" justifyContent="center">
          <WuiFlexItem grow={false}>
            <WuiLoadingSpinner size="m" />
          </WuiFlexItem>
          <WuiFlexItem grow={false}>
            <WuiI18n
              token="wuiComboBoxOptionsList.loadingOptions"
              default="Loading options"
            />
          </WuiFlexItem>
        </WuiFlexGroup>
      );
    } else if (searchValue && matchingOptions && matchingOptions.length === 0) {
      if (onCreateOption && getSelectedOptionForSearchValue) {
        if (delimiter && searchValue.includes(delimiter)) {
          emptyStateContent = (
            <div className="wuiComboBoxOption__contentWrapper">
              <p className="wuiComboBoxOption__emptyStateText">
                <WuiI18n
                  token="wuiComboBoxOptionsList.delimiterMessage"
                  default="Add each item separated by {delimiter}"
                  values={{ delimiter: <strong>{delimiter}</strong> }}
                />
              </p>
              {hitEnterBadge}
            </div>
          );
        } else {
          const selectedOptionForValue = getSelectedOptionForSearchValue(
            searchValue,
            selectedOptions
          );
          if (selectedOptionForValue) {
            // Disallow duplicate custom options.
            emptyStateContent = (
              <p>
                <WuiI18n
                  token="wuiComboBoxOptionsList.alreadyAdded"
                  default="{label} has already been added"
                  values={{
                    label: <strong>{selectedOptionForValue.label}</strong>,
                  }}
                />
              </p>
            );
          } else {
            const highlightSearchValue = (
              text: string,
              searchValue: string
            ) => {
              const reg = new RegExp(/(\{searchValue})/, 'gi');
              const parts = text.split(reg);
              return (
                <p className="wuiComboBoxOption__emptyStateText">
                  {parts.map((part, idx) =>
                    part.match(reg) ? (
                      <strong key={idx}>{searchValue}</strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            };

            emptyStateContent = (
              <div className="wuiComboBoxOption__contentWrapper">
                {customOptionText ? (
                  highlightSearchValue(customOptionText, searchValue)
                ) : (
                  <p className="wuiComboBoxOption__emptyStateText">
                    <WuiI18n
                      token="wuiComboBoxOptionsList.createCustomOption"
                      default="Add {searchValue} as a custom option"
                      values={{
                        searchValue: <strong>{searchValue}</strong>,
                      }}
                    />
                  </p>
                )}
                {hitEnterBadge}
              </div>
            );
          }
        }
      } else {
        emptyStateContent = (
          <p>
            <WuiI18n
              token="wuiComboBoxOptionsList.noMatchingOptions"
              default="{searchValue} doesn't match any options"
              values={{ searchValue: <strong>{searchValue}</strong> }}
            />
          </p>
        );
      }
    } else if (!options.length) {
      emptyStateContent = (
        <p>
          <WuiI18n
            token="wuiComboBoxOptionsList.noAvailableOptions"
            default="There aren't any options available"
          />
        </p>
      );
    } else if (areAllOptionsSelected) {
      emptyStateContent = (
        <p>
          <WuiI18n
            token="wuiComboBoxOptionsList.allOptionsSelected"
            default="You've selected all available options"
          />
        </p>
      );
    }

    const emptyState = emptyStateContent ? (
      <WuiText size="xs" className="wuiComboBoxOptionsList__empty">
        {emptyStateContent}
      </WuiText>
    ) : (
      undefined
    );

    const numVisibleOptions =
      matchingOptions.length < 7 ? matchingOptions.length : 7;
    const height = numVisibleOptions * rowHeight;

    const optionsList = (
      <FixedSizeList
        height={height}
        onScroll={onScroll}
        itemCount={matchingOptions.length}
        itemSize={rowHeight}
        itemData={matchingOptions}
        ref={this.setListRef}
        innerRef={this.setListBoxRef}
        width={width}>
        {this.ListRow}
      </FixedSizeList>
    );

    const classes = classNames(
      'wuiComboBoxOptionsList',
      position ? positionToClassNameMap[position] : '',
      {
        'wuiComboBoxOptionsList--fullWidth': fullWidth,
      }
    );

    return (
      <WuiPanel
        paddingSize="none"
        className={classes}
        panelRef={this.listRefCallback}
        data-test-subj={`comboBoxOptionsList ${dataTestSubj}`}
        style={{ ...style, zIndex: zIndex }}
        {...rest}>
        <div className="wuiComboBoxOptionsList__rowWrap">
          {emptyState || optionsList}
        </div>
      </WuiPanel>
    );
  }
}
