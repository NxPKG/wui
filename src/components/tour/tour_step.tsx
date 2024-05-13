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
  CSSProperties,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, NoArgCallback } from '../common';

import { WuiBeacon } from '../beacon';
import { WuiButtonEmpty, WuiButtonEmptyProps } from '../button';
import { WuiFlexGroup, WuiFlexItem } from '../flex';
import { WuiI18n } from '../i18n';
import {
  WuiPopover,
  WuiPopoverFooter,
  WuiPopoverProps,
  WuiPopoverTitle,
} from '../popover';
import { WuiTitle } from '../title';

import { WuiTourStepIndicator, WuiTourStepStatus } from './tour_step_indicator';

type PopoverOverrides = 'button' | 'closePopover';

type WuiPopoverPartials = Partial<Pick<WuiPopoverProps, PopoverOverrides>>;

export interface WuiTourStepProps
  extends CommonProps,
    Omit<WuiPopoverProps, PopoverOverrides>,
    WuiPopoverPartials {
  /**
   * Element to which the tour step popover attaches when open
   */
  children: ReactElement;

  /**
   * Contents of the tour step popover
   */
  content: ReactNode;

  /**
   * Step will display if set to `true`
   */
  isStepOpen?: boolean;

  /**
   * Sets the min-width of the tour popover,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  minWidth?: boolean | number | string;

  /**
   * Function to call for 'Skip tour' and 'End tour' actions
   */
  onFinish: NoArgCallback<void>;

  /**
   * The number of the step within the parent tour. 1-based indexing.
   */
  step: number;

  /**
   * The total number of steps in the tour
   */
  stepsTotal: number;

  /**
   * Optional, standard DOM `style` attribute. Passed to the WuiPopover panel.
   */
  style?: CSSProperties;

  /**
   * Smaller title text that appears atop each step in the tour
   */
  subtitle: string;

  /**
   * Larger title text specific to this step
   */
  title: string;

  /**
   * Extra visual indication of step location
   */
  decoration?: 'none' | 'beacon';

  /**
   * Element to replace the 'Skip tour' link in the footer
   */
  footerAction?: ReactElement;
}

export const WuiTourStep: FunctionComponent<WuiTourStepProps> = ({
  anchorPosition = 'leftUp',
  children,
  className,
  closePopover = () => {},
  content,
  isStepOpen = false,
  minWidth = true,
  onFinish,
  step = 1,
  stepsTotal,
  style,
  subtitle,
  title,
  decoration = 'beacon',
  footerAction,
  ...rest
}) => {
  if (step === 0) {
    console.warn(
      'WuiTourStep `step` should 1-based indexing. Please update to eliminate 0 indexes.'
    );
  }
  let newStyle;

  let widthClassName;
  if (minWidth === true) {
    widthClassName = 'wuiTour--minWidth-default';
  } else if (minWidth !== false) {
    const value = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
    newStyle = { ...style, minWidth: value };
  }

  const classes = classNames('wuiTour', widthClassName, className);

  const finishButtonProps: WuiButtonEmptyProps = {
    color: 'text',
    flush: 'right',
    size: 'xs',
  };

  const footer = (
    <WuiFlexGroup
      responsive={false}
      justifyContent={stepsTotal > 1 ? 'spaceBetween' : 'flexEnd'}>
      {stepsTotal > 1 && (
        <WuiFlexItem grow={false}>
          <ul className="wuiTourFooter__stepList">
            {[...Array(stepsTotal).keys()].map((_, i) => {
              let status: WuiTourStepStatus = 'complete';
              if (step === i + 1) {
                status = 'active';
              } else if (step <= i) {
                status = 'incomplete';
              }
              return (
                <WuiTourStepIndicator key={i} number={i + 1} status={status} />
              );
            })}
          </ul>
        </WuiFlexItem>
      )}

      {footerAction ? (
        <WuiFlexItem grow={false}>{footerAction}</WuiFlexItem>
      ) : (
        <WuiFlexItem grow={false}>
          <WuiI18n
            tokens={[
              'wuiTourStep.endTour',
              'wuiTourStep.skipTour',
              'wuiTourStep.closeTour',
            ]}
            defaults={['End tour', 'Skip tour', 'Close']}>
            {([endTour, skipTour, closeTour]: string[]) => {
              let content = closeTour;
              if (stepsTotal > 1) {
                content = stepsTotal === step ? endTour : skipTour;
              }
              return (
                <WuiButtonEmpty onClick={onFinish} {...finishButtonProps}>
                  {content}
                </WuiButtonEmpty>
              );
            }}
          </WuiI18n>
        </WuiFlexItem>
      )}
    </WuiFlexGroup>
  );

  const hasBeacon = decoration === 'beacon';

  return (
    <WuiPopover
      anchorPosition={anchorPosition}
      button={children}
      closePopover={closePopover}
      isOpen={isStepOpen}
      panelClassName={classes}
      panelStyle={newStyle || style}
      offset={hasBeacon ? 10 : 0}
      arrowChildren={hasBeacon && <WuiBeacon className="wuiTour__beacon" />}
      withTitle
      {...rest}>
      <WuiPopoverTitle className="wuiTourHeader">
        <WuiTitle size="xxxs" className="wuiTourHeader__subtitle">
          <h1>{subtitle}</h1>
        </WuiTitle>
        <WuiTitle size="xxs" className="wuiTourHeader__title">
          <h2>{title}</h2>
        </WuiTitle>
      </WuiPopoverTitle>
      <div className="wuiTour__content">{content}</div>
      <WuiPopoverFooter className="wuiTourFooter">{footer}</WuiPopoverFooter>
    </WuiPopover>
  );
};
