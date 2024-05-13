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
  Fragment,
  FunctionComponent,
  ReactElement,
  ReactNode,
  TdHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from '../../services';

import { resolveWidthAsStyle } from './utils';

interface WuiTableRowCellSharedPropsShape {
  /**
   * Horizontal alignment of the text in the cell
   */
  align?: HorizontalAlignment;
  /**
   * Don't allow line breaks within cells
   */
  showOnHover?: boolean;
  /**
   * Setting `textOnly` to `false` will break words unnecessarily on FF and
   * IE.  To combat this problem on FF, wrap contents with the css utility
   * `.wui-textBreakWord`.
   */
  textOnly?: boolean;
  /**
   * _Should only be used for action cells_
   */
  truncateText?: boolean;
  width?: string | number;
}

interface WuiTableRowCellMobileOptionsShape {
  /**
   * If false, will not render the cell at all for mobile
   */
  show?: boolean;
  /**
   * Only show for mobile? If true, will not render the column at all for desktop
   */
  only?: boolean;
  /**
   * Custom render/children if different from desktop
   */
  render?: ReactNode;
  /**
   * The column's header for use in mobile view (automatically passed down
   * when using `WuiBasicTable`).
   * Or pass `false` to not show a header at all.
   */
  header?: ReactNode | boolean;
  /**
   * Increase text size compared to rest of cells
   */
  enlarge?: boolean;
  /**
   * Allocates 100% of the width of the container in mobile view
   * (typically cells are contained to 50%)
   */
  fullWidth?: boolean;
}

interface WuiTableRowCellProps {
  /**
   * Indicates if the column is dedicated to icon-only actions (currently
   * affects mobile only)
   */
  hasActions?: boolean;
  /**
   * _DEPRECATED: use `mobileOptions.header`_
   * The column's header title for use in mobile view (will be added as a
   * data-attr)
   */
  header?: string;
  /**
   * _DEPRECATED: use `mobileOptions.show = false`_
   * Indicates if the column should not show for mobile users (typically
   * hidden because a custom mobile header utilizes the column's contents)
   */
  hideForMobile?: boolean;
  /**
   * Indicates if the column is dedicated as the expandable row toggle
   */
  isExpander?: boolean;
  /**
   * _DEPRECATED: use `mobileOptions.fullWidth`_
   * Allocates 100% of the width of the container in mobile view
   * (typically cells are contained to 50%)
   */
  isMobileFullWidth?: boolean;
  /**
   * _DEPRECATED: use `mobileOptions.only = true & mobileOptions.header = * false`_
   * Indicates if the column was created to be the row's heading in mobile
   * view.  It won't display column's header inline and it the column will
   * be hidden at larger screens)
   */
  isMobileHeader?: boolean;
  /**
   * Mobile options for displaying differently at small screens
   */
  mobileOptions?: WuiTableRowCellMobileOptionsShape &
    WuiTableRowCellSharedPropsShape;
  /**
   * Indicates whether the cell should be marked as the heading for its row
   */
  setScopeRow?: boolean;
}

type Props = CommonProps &
  TdHTMLAttributes<HTMLTableCellElement> &
  WuiTableRowCellSharedPropsShape &
  WuiTableRowCellProps;

export const WuiTableRowCell: FunctionComponent<Props> = ({
  align = LEFT_ALIGNMENT,
  children,
  className,
  truncateText,
  setScopeRow,
  showOnHover,
  textOnly = true,
  hasActions,
  isExpander,
  mobileOptions = {
    show: true,
  },
  // Soon to be deprecated for {...mobileOptions}
  header,
  hideForMobile,
  isMobileHeader,
  isMobileFullWidth,
  style,
  width,
  ...rest
}) => {
  const cellClasses = classNames('wuiTableRowCell', {
    'wuiTableRowCell--hasActions': hasActions,
    'wuiTableRowCell--isExpander': isExpander,
    'wuiTableRowCell--hideForDesktop': mobileOptions.only || isMobileHeader,
    'wuiTableRowCell--enlargeForMobile':
      mobileOptions.enlarge || isMobileHeader,
    'wuiTableRowCell--isMobileFullWidth':
      mobileOptions.fullWidth || isMobileFullWidth || isMobileHeader,
  });

  const contentClasses = classNames('wuiTableCellContent', className, {
    'wuiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'wuiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
    'wuiTableCellContent--showOnHover': showOnHover,
    'wuiTableCellContent--truncateText': truncateText,
    // We're doing this rigamarole instead of creating `wuiTableCellContent--textOnly` for BWC
    // purposes for the time-being.
    'wuiTableCellContent--overflowingContent': textOnly !== true,
  });

  const mobileContentClasses = classNames('wuiTableCellContent', className, {
    'wuiTableCellContent--alignRight':
      mobileOptions.align === RIGHT_ALIGNMENT || align === RIGHT_ALIGNMENT,
    'wuiTableCellContent--alignCenter':
      mobileOptions.align === CENTER_ALIGNMENT || align === RIGHT_ALIGNMENT,
    'wuiTableCellContent--showOnHover':
      mobileOptions.showOnHover || showOnHover,
    'wuiTableCellContent--truncateText':
      mobileOptions.truncateText || truncateText,
    // We're doing this rigamarole instead of creating `wuiTableCellContent--textOnly` for BWC
    // purposes for the time-being.
    'wuiTableCellContent--overflowingContent':
      mobileOptions.textOnly !== true || textOnly !== true,
  });

  const childClasses = classNames({
    wuiTableCellContent__text: textOnly === true,
    wuiTableCellContent__hoverItem: showOnHover,
  });

  const styleObj = resolveWidthAsStyle(style, width);

  function modifyChildren(children: ReactNode) {
    let modifiedChildren = children;

    if (textOnly === true) {
      modifiedChildren = <span className={childClasses}>{children}</span>;
    } else if (React.isValidElement(children)) {
      modifiedChildren = React.Children.map(
        children,
        (child: ReactElement<CommonProps>) =>
          React.cloneElement(child, {
            className: classNames(child.props.className, childClasses),
          })
      );
    }

    return modifiedChildren;
  }

  const childrenNode = modifyChildren(children);

  const hideForMobileClasses = 'wuiTableRowCell--hideForMobile';
  const showForMobileClasses = 'wuiTableRowCell--hideForDesktop';

  const Element = setScopeRow ? 'th' : 'td';
  const sharedProps = {
    scope: setScopeRow ? 'row' : undefined,
    style: styleObj,
    ...rest,
  };
  if (mobileOptions.show === false || hideForMobile) {
    return (
      <Element
        className={`${cellClasses} ${hideForMobileClasses}`}
        {...sharedProps}>
        <div className={contentClasses}>{childrenNode}</div>
      </Element>
    );
  } else {
    return (
      <Element className={cellClasses} {...sharedProps}>
        {/* Mobile-only header */}
        {(mobileOptions.header || header) && !isMobileHeader && (
          <div
            className={`wuiTableRowCell__mobileHeader ${showForMobileClasses}`}>
            {mobileOptions.header || header}
          </div>
        )}

        {/* Content depending on mobile render existing */}
        {mobileOptions.render ? (
          <Fragment>
            <div className={`${mobileContentClasses} ${showForMobileClasses}`}>
              {modifyChildren(mobileOptions.render)}
            </div>
            <div className={`${contentClasses} ${hideForMobileClasses}`}>
              {childrenNode}
            </div>
          </Fragment>
        ) : (
          <div className={contentClasses}>{childrenNode}</div>
        )}
      </Element>
    );
  }
};
