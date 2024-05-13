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

import React, { FunctionComponent, HTMLAttributes, useEffect } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import {
  WuiHeaderSectionItem,
  WuiHeaderSectionItemProps,
  WuiHeaderSection,
} from './header_section';
import { WuiHeaderBreadcrumbs } from './header_breadcrumbs';
import { WuiBreadcrumb, WuiBreadcrumbsProps } from '../breadcrumbs';

type WuiHeaderSectionItemType = WuiHeaderSectionItemProps['children'];
type WuiHeaderSectionBorderType = WuiHeaderSectionItemProps['border'];

export interface WuiHeaderSections {
  /**
   * An arry of items that will be wrapped in a #WuiHeaderSectionItem
   */
  items?: WuiHeaderSectionItemType[];
  /**
   * Apply the passed border side to each #WuiHeaderSectionItem
   */
  borders?: WuiHeaderSectionBorderType;
  /**
   * Breadcrumbs in the header cannot be wrapped in a #WuiHeaderSection in order for truncation to work.
   * Simply pass the array of WuiBreadcrumb objects
   */
  breadcrumbs?: WuiBreadcrumb[];
  /**
   * Other props to pass to #WuiHeaderBreadcrumbs
   */
  breadcrumbProps?: Omit<WuiBreadcrumbsProps, 'breadcrumbs'>;
}

function createHeaderSection(
  sections: WuiHeaderSectionItemType[],
  border?: WuiHeaderSectionBorderType
) {
  return sections.map((section, index) => {
    return (
      <WuiHeaderSectionItem key={index} border={border}>
        {section}
      </WuiHeaderSectionItem>
    );
  });
}

export type WuiHeaderProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * An array of objects to wrap in a #WuiHeaderSection.
     * Each section is spaced using `space-between`.
     * See #WuiHeaderSectionsProp for object details.
     * This prop disregards the prop `children` if both are passed.
     */
    sections?: WuiHeaderSections[];
    /**
     * Helper that positions the header against the window body and
     * adds the correct amount of top padding to the window when in `fixed` mode
     */
    position?: 'static' | 'fixed';
    /**
     * The `default` will inherit its coloring from the light or dark theme.
     * Or, force the header into pseudo `dark` theme for all themes.
     */
    theme?: 'default' | 'dark';
  };

// Start a counter to manage the total number of fixed headers that need the body class
let wuiHeaderFixedCounter = 0;

export const WuiHeader: FunctionComponent<WuiHeaderProps> = ({
  children,
  className,
  sections,
  position = 'static',
  theme = 'default',
  ...rest
}) => {
  const classes = classNames(
    'wuiHeader',
    `wuiHeader--${theme}`,
    `wuiHeader--${position}`,
    className
  );

  useEffect(() => {
    if (position === 'fixed') {
      // Increment fixed header counter for each fixed header
      wuiHeaderFixedCounter++;
      document.body.classList.add('wuiBody--headerIsFixed');

      return () => {
        // Both decrement the fixed counter AND then check if there are none
        if (--wuiHeaderFixedCounter === 0) {
          // If there are none, THEN remove class
          document.body.classList.remove('wuiBody--headerIsFixed');
        }
      };
    }
  }, [position]);

  let contents;
  if (sections) {
    if (children) {
      // In case both children and sections are passed, warn in the console that the children will be disregarded
      console.warn(
        'WuiHeader cannot accept both `children` and `sections`. It will disregard the `children`.'
      );
    }

    contents = sections.map((section, index) => {
      const content = [];
      if (section.items) {
        // Items get wrapped in WuiHeaderSection and each item in a WuiHeaderSectionItem
        content.push(
          <WuiHeaderSection key={`items-${index}`}>
            {createHeaderSection(section.items, section.borders)}
          </WuiHeaderSection>
        );
      }
      if (section.breadcrumbs) {
        content.push(
          // Breadcrumbs are separate and cannot be contained in a WuiHeaderSection
          // in order for truncation to work
          <WuiHeaderBreadcrumbs
            key={`breadcrumbs-${index}`}
            breadcrumbs={section.breadcrumbs}
            {...section.breadcrumbProps}
          />
        );
      }
      return content;
    });
  } else {
    contents = children;
  }

  return (
    <div className={classes} {...rest}>
      {contents}
    </div>
  );
};
