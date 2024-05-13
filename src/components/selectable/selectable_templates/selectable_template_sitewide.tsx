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
  FunctionComponent,
  ReactNode,
  useState,
  CSSProperties,
  ReactElement,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { useCombinedRefs } from '../../../services';
import { WuiSelectable, WuiSelectableProps } from '../selectable';
import { WuiPopoverTitle, WuiPopoverFooter } from '../../popover';
import { WuiPopover, Props as PopoverProps } from '../../popover/popover';
import { useWuiI18n, WuiI18n } from '../../i18n';
import { WuiSelectableMessage } from '../selectable_message';
import { WuiLoadingSpinner } from '../../loading';
import {
  WuiSelectableTemplateSitewideOption,
  wuiSelectableTemplateSitewideFormatOptions,
  wuiSelectableTemplateSitewideRenderOptions,
} from './selectable_template_sitewide_option';
import {
  WuiBreakpointSize,
  isWithinBreakpoints,
} from '../../../services/breakpoint';
import { throttle } from '../../color_picker/utils';
import { WuiSpacer } from '../../spacer';

export type WuiSelectableTemplateSitewideProps = Partial<
  Omit<WuiSelectableProps<{ [key: string]: any }>, 'options'>
> & {
  /**
   * Extends the typical WuiSelectable #Options with the addition of pre-composed elements
   * such as `icon`, `avatar`and `meta`
   */
  options: WuiSelectableTemplateSitewideOption[];
  /**
   * Override some of the WuiPopover props housing the list.
   * The default width is `600`
   */
  popoverProps?: Partial<PopoverProps> & { width?: CSSProperties['width'] };
  /**
   * Optionally provide a title for the popover
   */
  popoverTitle?: ReactNode;
  /**
   * Optionally provide a footer for the popover
   */
  popoverFooter?: ReactNode;
  /**
   * Optionally provide a separate button for toggling the display of the popover.
   */
  popoverButton?: ReactElement;
  /**
   * Pass an array of named breakpoints for which to show the `popoverButton`.
   * If `undefined`, the `popoverButton` will always show (if provided)
   */
  popoverButtonBreakpoints?: WuiBreakpointSize[];
};

export const WuiSelectableTemplateSitewide: FunctionComponent<WuiSelectableTemplateSitewideProps> = ({
  children,
  className,
  options,
  popoverProps,
  popoverTitle,
  popoverFooter,
  searchProps,
  listProps,
  isLoading,
  popoverButton,
  popoverButtonBreakpoints,
  ...rest
}) => {
  /**
   * Breakpoint management
   */
  const [canShowPopoverButton, setCanShowPopoverButton] = useState(
    typeof window !== 'undefined' && popoverButtonBreakpoints
      ? isWithinBreakpoints(window.innerWidth, popoverButtonBreakpoints)
      : true
  );

  const functionToCallOnWindowResize = throttle(() => {
    const newWidthIsWithinBreakpoint = popoverButtonBreakpoints
      ? isWithinBreakpoints(window.innerWidth, popoverButtonBreakpoints)
      : true;

    if (newWidthIsWithinBreakpoint !== canShowPopoverButton) {
      setCanShowPopoverButton(newWidthIsWithinBreakpoint);
    }
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  // Add window resize handlers
  useEffect(() => {
    window.addEventListener('resize', functionToCallOnWindowResize);

    return () => {
      window.removeEventListener('resize', functionToCallOnWindowResize);
    };
  }, [functionToCallOnWindowResize]);

  /**
   * i18n text
   */
  const [searchPlaceholder] = useWuiI18n(
    ['wuiSelectableTemplateSitewide.searchPlaceholder'],
    ['Search for anything...']
  );

  /**
   * Popover helpers
   */
  const [popoverRef, setPopoverRef] = useState<HTMLElement | null>(null);
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const { closePopover: _closePopover, panelRef, width, ...popoverRest } = {
    ...popoverProps,
  };

  const closePopover = () => {
    setPopoverIsOpen(false);
    _closePopover && _closePopover();
  };

  const togglePopover = () => {
    setPopoverIsOpen(!popoverIsOpen);
  };

  // Width applied to the internal div
  const popoverWidth: CSSProperties['width'] = width || 600;
  const setPanelRef = useCombinedRefs([setPopoverRef, panelRef]);

  /**
   * Search helpers
   */
  const searchOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    searchProps && searchProps.onFocus && searchProps.onFocus(e);
    if (canShowPopoverButton) return;

    setPopoverIsOpen(true);
  };

  const onSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    searchProps && searchProps.onInput && searchProps.onInput(e);
    setPopoverIsOpen(true);
  };

  const searchOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    searchProps && searchProps.onBlur && searchProps.onBlur(e);
    if (canShowPopoverButton) return;

    if (!popoverRef?.contains(e.relatedTarget as HTMLElement)) {
      setPopoverIsOpen(false);
    }
  };

  /**
   * Classes
   */
  const classes = classNames('wuiSelectableTemplateSitewide', className);
  const searchClasses = classNames(
    'wuiSelectableTemplateSitewide__search',
    searchProps && searchProps.className
  );
  const listClasses = classNames(
    'wuiSelectableTemplateSitewide__list',
    listProps && listProps.className
  );

  /**
   * List options
   */
  const formattedOptions = wuiSelectableTemplateSitewideFormatOptions(options);

  const loadingMessage = (
    <WuiSelectableMessage style={{ minHeight: 300 }}>
      <WuiLoadingSpinner size="l" />
      <br />
      <p>
        <WuiI18n
          token="wuiSelectableTemplateSitewide.loadingResults"
          default="Loading results"
        />
      </p>
    </WuiSelectableMessage>
  );

  const emptyMessage = (
    <WuiSelectableMessage style={{ minHeight: 300 }}>
      <p>
        <WuiI18n
          token="wuiSelectableTemplateSitewide.noResults"
          default="No results available"
        />
      </p>
    </WuiSelectableMessage>
  );

  /**
   * Changes based on showing the `popoverButton` if provided.
   * This will move the search input into the popover
   * and use the passed `popoverButton` as the popover trigger.
   */
  let popoverTrigger: ReactElement;
  if (popoverButton && canShowPopoverButton) {
    popoverTrigger = React.cloneElement(popoverButton, {
      ...popoverButton.props,
      onClick: togglePopover,
      onKeyDown: (e: KeyboardEvent) => {
        // Selectable preventsDefault on Enter which kills browser controls for pressing the button
        e.stopPropagation();
      },
    });
  }

  return (
    <WuiSelectable
      isLoading={isLoading}
      options={formattedOptions}
      renderOption={wuiSelectableTemplateSitewideRenderOptions}
      singleSelection={true}
      searchProps={{
        placeholder: searchPlaceholder,
        isClearable: true,
        ...searchProps,
        onFocus: searchOnFocus,
        onBlur: searchOnBlur,
        onInput: onSearchInput,
        className: searchClasses,
      }}
      listProps={{
        rowHeight: 68,
        showIcons: false,
        onFocusBadge: {
          iconSide: 'right',
          children: (
            <WuiI18n
              token="wuiSelectableTemplateSitewide.onFocusBadgeGoTo"
              default="Go to"
            />
          ),
        },
        ...listProps,
        className: listClasses,
      }}
      loadingMessage={loadingMessage}
      emptyMessage={emptyMessage}
      noMatchesMessage={emptyMessage}
      {...rest}
      className={classes}
      searchable>
      {(list, search) => (
        <WuiPopover
          panelPaddingSize="none"
          isOpen={popoverIsOpen}
          ownFocus={!!popoverTrigger}
          display={popoverTrigger ? 'inlineBlock' : 'block'}
          {...popoverRest}
          panelRef={setPanelRef}
          button={popoverTrigger ? popoverTrigger : search}
          closePopover={closePopover}>
          <div style={{ width: popoverWidth, maxWidth: '100%' }}>
            {popoverTitle || popoverTrigger ? (
              <WuiPopoverTitle>
                {popoverTitle}
                {popoverTitle && search && <WuiSpacer />}
                {search}
              </WuiPopoverTitle>
            ) : (
              undefined
            )}
            {list}
            {popoverFooter && (
              <WuiPopoverFooter>{popoverFooter}</WuiPopoverFooter>
            )}
          </div>
        </WuiPopover>
      )}
    </WuiSelectable>
  );
};
