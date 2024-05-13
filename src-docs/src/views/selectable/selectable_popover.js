import React, { Fragment, useState } from 'react';
import {
  WuiButton,
  WuiCode,
  WuiFlyout,
  WuiFlyoutFooter,
  WuiFlyoutHeader,
  WuiPopover,
  WuiPopoverFooter,
  WuiPopoverTitle,
  WuiSelectable,
  WuiSpacer,
  WuiTitle,
} from '../../../../src/components';
import { Comparators } from '../../../../src/services/sort';

import { Options } from './data';
import { createDataStore } from '../tables/data_store';

export default () => {
  const countriesStore = createDataStore().countries.map(country => {
    return {
      id: country.code,
      label: `${country.name}`,
      append: country.flag,
    };
  });

  const [options, setOptions] = useState(Options);
  const [countries, setCountries] = useState(countriesStore);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const onButtonClick = () => {
    setOptions(options.slice().sort(Comparators.property('checked')));
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const onChange = options => {
    setOptions(options);
  };

  const onFlyoutChange = options => {
    setCountries(options);
  };

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  const showFlyout = () => {
    setIsFlyoutVisible(true);
  };

  const button = (
    <WuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Show popover
    </WuiButton>
  );

  return (
    <Fragment>
      <WuiPopover
        id="popover"
        panelPaddingSize="none"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}>
        <WuiSelectable
          searchable
          searchProps={{
            placeholder: 'Filter list',
            compressed: true,
          }}
          options={options}
          onChange={onChange}>
          {(list, search) => (
            <div style={{ width: 240 }}>
              <WuiPopoverTitle>{search}</WuiPopoverTitle>
              {list}
              <WuiPopoverFooter>
                <WuiButton size="s" fullWidth>
                  Manage this list
                </WuiButton>
              </WuiPopoverFooter>
            </div>
          )}
        </WuiSelectable>
      </WuiPopover>

      <WuiSpacer />

      <WuiButton onClick={showFlyout}>Show flyout</WuiButton>

      {isFlyoutVisible && (
        <WuiFlyout ownFocus onClose={closeFlyout} aria-labelledby="flyoutTitle">
          <WuiSelectable
            aria-label="Popover example"
            searchable
            options={countries}
            onChange={onFlyoutChange}
            height="full">
            {(list, search) => (
              <Fragment>
                <WuiFlyoutHeader hasBorder>
                  <WuiTitle size="m">
                    <h2 id="flyoutTitle">Be mindful of the flexbox</h2>
                  </WuiTitle>
                  <WuiSpacer />
                  {search}
                </WuiFlyoutHeader>
                <WuiSpacer size="xs" />
                {list}
              </Fragment>
            )}
          </WuiSelectable>
          <WuiSpacer size="xs" />
          <WuiFlyoutFooter>
            <WuiButton fill>Some extra action</WuiButton>
          </WuiFlyoutFooter>
        </WuiFlyout>
      )}

      <WuiSpacer />

      <WuiTitle size="xxs">
        <h4>
          Using <WuiCode language="js">listProps.bordered=true</WuiCode>
        </h4>
      </WuiTitle>

      <WuiSpacer />

      <WuiSelectable
        aria-label="Bordered selectable example"
        options={options}
        onChange={() => {}}
        style={{ width: 300 }}
        listProps={{ bordered: true }}>
        {list => list}
      </WuiSelectable>
    </Fragment>
  );
};
