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

import React, { Component } from 'react';

import { WuiButtonEmpty } from '../../button';
import { WuiContextMenuItem, WuiContextMenuPanel } from '../../context_menu';
import { WuiFlexGroup, WuiFlexItem } from '../../flex';
import { WuiPagination } from '../../pagination';
import { WuiPopover } from '../../popover';
import { WuiI18n } from '../../i18n';

export type PageChangeHandler = (pageIndex: number) => void;
export type ItemsPerPageChangeHandler = (pageSize: number) => void;

export interface Props {
  activePage?: number;
  hidePerPageOptions?: boolean;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  onChangeItemsPerPage?: ItemsPerPageChangeHandler;
  onChangePage?: PageChangeHandler;
  pageCount?: number;
  /**
   * id of the table being controlled
   */
  'aria-controls'?: string;
}

interface State {
  isPopoverOpen: boolean;
}

export class WuiTablePagination extends Component<Props, State> {
  state = {
    isPopoverOpen: false,
  };

  onButtonClick = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  render() {
    const {
      activePage,
      itemsPerPage = 50,
      itemsPerPageOptions = [10, 20, 50, 100],
      hidePerPageOptions = false,
      onChangeItemsPerPage = () => {},
      onChangePage,
      pageCount,
      'aria-controls': ariaControls,
      ...rest
    } = this.props;

    const button = (
      <WuiButtonEmpty
        size="xs"
        color="text"
        iconType="arrowDown"
        iconSide="right"
        data-test-subj="tablePaginationPopoverButton"
        onClick={this.onButtonClick}>
        <WuiI18n
          token="wuiTablePagination.rowsPerPage"
          default="Rows per page"
        />
        : {itemsPerPage}
      </WuiButtonEmpty>
    );

    const items = itemsPerPageOptions.map(itemsPerPageOption => (
      <WuiContextMenuItem
        key={itemsPerPageOption}
        icon={itemsPerPageOption === itemsPerPage ? 'check' : 'empty'}
        onClick={() => {
          this.closePopover();
          onChangeItemsPerPage(itemsPerPageOption);
        }}
        data-test-subj={`tablePagination-${itemsPerPageOption}-rows`}>
        <WuiI18n
          token="wuiTablePagination.rowsPerPageOption"
          values={{ rowsPerPage: itemsPerPageOption }}
          default="{rowsPerPage} rows"
        />
      </WuiContextMenuItem>
    ));

    const itemsPerPagePopover = (
      <WuiPopover
        button={button}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        withTitle
        anchorPosition="upRight">
        <WuiContextMenuPanel items={items} />
      </WuiPopover>
    );

    return (
      <WuiFlexGroup
        justifyContent="spaceBetween"
        alignItems="center"
        responsive={false}>
        <WuiFlexItem grow={false}>
          {hidePerPageOptions ? null : itemsPerPagePopover}
        </WuiFlexItem>

        <WuiFlexItem grow={false}>
          <WuiPagination
            aria-controls={ariaControls}
            pageCount={pageCount}
            activePage={activePage}
            onPageClick={onChangePage}
            {...rest}
          />
        </WuiFlexItem>
      </WuiFlexGroup>
    );
  }
}
