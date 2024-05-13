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

import React, { ReactElement, useState } from 'react';
import { WuiDataGridStyle } from './data_grid_types';
import { WuiI18n } from '../i18n';
import { WuiPopover } from '../popover';
import { WuiButtonEmpty, WuiButtonGroup } from '../button';

export const startingStyles: WuiDataGridStyle = {
  cellPadding: 'm',
  fontSize: 'm',
  border: 'all',
  stripes: false,
  rowHover: 'highlight',
  header: 'shade',
  footer: 'overline',
  stickyFooter: true,
};

const densityStyles: { [key: string]: Partial<WuiDataGridStyle> } = {
  expanded: {
    fontSize: 'l',
    cellPadding: 'l',
  },
  normal: {
    fontSize: 'm',
    cellPadding: 'm',
  },
  compact: {
    fontSize: 's',
    cellPadding: 's',
  },
};

export const useStyleSelector = (
  initialStyles: WuiDataGridStyle
): [ReactElement, WuiDataGridStyle] => {
  // track styles specified by the user at run time
  const [userGridStyles, setUserGridStyles] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  // These are the available options. They power the gridDensity hook and also the options in the render
  const densityOptions: string[] = ['expanded', 'normal', 'compact'];

  // Normal is the default density
  const [gridDensity, _setGridDensity] = useState(densityOptions[1]);
  const setGridDensity = (density: string) => {
    _setGridDensity(density);
    setUserGridStyles(densityStyles[density]);
  };

  // merge the developer-specified styles with any user overrides
  const gridStyles = {
    ...initialStyles,
    ...userGridStyles,
  };

  const styleSelector = (
    <WuiPopover
      data-test-subj="dataGridStyleSelectorPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downCenter"
      ownFocus
      panelPaddingSize="s"
      panelClassName="wuiDataGridColumnSelectorPopover"
      button={
        <WuiButtonEmpty
          size="xs"
          iconType="tableDensityExpanded"
          className="wuiDataGrid__controlBtn"
          color="text"
          data-test-subj="dataGridStyleSelectorButton"
          onClick={() => setIsOpen(!isOpen)}>
          <WuiI18n token="wuiStyleSelector.buttonText" default="Density" />
        </WuiButtonEmpty>
      }>
      <WuiI18n
        tokens={[
          'wuiStyleSelector.buttonLegend',
          'wuiStyleSelector.labelExpanded',
          'wuiStyleSelector.labelNormal',
          'wuiStyleSelector.labelCompact',
        ]}
        defaults={[
          'Select the display density for the data grid',
          'Expanded density',
          'Normal density',
          'Compact density',
        ]}>
        {([
          buttonLegend,
          labelExpanded,
          labelNormal,
          labelCompact,
        ]: string[]) => (
          <WuiButtonGroup
            legend={buttonLegend}
            name="density"
            className="wui-displayInlineBlock"
            buttonSize="compressed"
            options={[
              {
                id: densityOptions[0],
                label: labelExpanded,
                iconType: 'tableDensityExpanded',
              },
              {
                id: densityOptions[1],
                label: labelNormal,
                iconType: 'tableDensityNormal',
              },
              {
                id: densityOptions[2],
                label: labelCompact,
                iconType: 'tableDensityCompact',
              },
            ]}
            onChange={setGridDensity}
            idSelected={gridDensity}
            isIconOnly
          />
        )}
      </WuiI18n>
    </WuiPopover>
  );

  return [styleSelector, gridStyles];
};
