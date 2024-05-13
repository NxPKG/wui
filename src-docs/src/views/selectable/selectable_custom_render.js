import React, { useState } from 'react';

import {
  WuiBadge,
  WuiHighlight,
  WuiSpacer,
  WuiTextColor,
  WuiSwitch,
} from '../../../../src/components';
import { WuiSelectable } from '../../../../src/components/selectable';
import { createDataStore } from '../tables/data_store';

export default () => {
  const [useCustomContent, setUseCustomContent] = useState(false);

  const countries = createDataStore().countries.map(country => {
    return {
      label: `${country.name}`,
      searchableLabel: `${country.name} ${'I am secondary content, I am!'}`,
      prepend: country.flag,
      append: <WuiBadge>{country.code}</WuiBadge>,
    };
  });

  countries.unshift({
    label: 'Country options',
    isGroupLabel: true,
  });

  const [options, setOptions] = useState(countries);

  const onChange = options => {
    setOptions(options);
  };

  const onCustom = e => {
    setUseCustomContent(e.currentTarget.checked);
  };

  const renderCountryOption = (option, searchValue) => {
    return (
      <>
        <WuiHighlight search={searchValue}>{option.label}</WuiHighlight>
        <br />
        <WuiTextColor color="subdued">
          <small>
            <WuiHighlight search={searchValue}>
              I am secondary content, I am!
            </WuiHighlight>
          </small>
        </WuiTextColor>
      </>
    );
  };

  let customProps;
  if (useCustomContent) {
    customProps = {
      height: 240,
      renderOption: renderCountryOption,
      listProps: {
        rowHeight: 50,
        showIcons: false,
      },
    };
  }

  return (
    <>
      <WuiSwitch
        label="Custom content"
        checked={useCustomContent}
        onChange={onCustom}
      />

      <WuiSpacer />

      <WuiSelectable
        aria-label="Selectable example with custom list items"
        searchable
        options={options}
        onChange={onChange}
        {...customProps}>
        {(list, search) => (
          <>
            {search}
            {list}
          </>
        )}
      </WuiSelectable>
    </>
  );
};
