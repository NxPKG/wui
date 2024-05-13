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

import classNames from 'classnames';
import React, {
  ButtonHTMLAttributes,
  Component,
  HTMLAttributes,
  MouseEventHandler,
  Ref,
  ReactNode,
} from 'react';
import { WuiScreenReaderOnly } from '../accessibility';
import { WuiBreadcrumbs, WuiBreadcrumbsProps } from '../breadcrumbs';
import {
  WuiButton,
  WuiButtonIcon,
  WuiButtonIconProps,
  WuiButtonProps,
} from '../button';
import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
} from '../common';
import { WuiI18n } from '../i18n';
import { WuiIcon } from '../icon';
import { WuiIconProps } from '../icon/icon';
import { WuiPortal } from '../portal';

/**
 * Extends WuiButton excluding `size`. Requires `label` as the `children`.
 */
export interface ButtonControl extends Omit<WuiButtonProps, 'size'> {
  id: string;
  label: ReactNode;
}

type ButtonPropsForAnchor = PropsForAnchor<
  ButtonControl,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

type ButtonPropsForButton = PropsForButton<
  ButtonControl,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

type ButtonControlProps = ExclusiveUnion<
  ButtonPropsForAnchor,
  ButtonPropsForButton
> & {
  controlType: 'button';
};

/**
 * Creates a `button` visually styles as a tab.
 * Requires `label` as the `children`.
 * `onClick` must be provided to handle the content swapping.
 */
export interface TabControl
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'onClick'> {
  controlType: 'tab';
  id: string;
  label: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Extends WuiBreadcrumbs
 */
export interface BreadcrumbControl extends WuiBreadcrumbsProps {
  controlType: 'breadcrumbs';
  id: string;
}

/**
 * Simple div controlling color and size text output.
 * Requires `label` as the `children`.
 */
export interface TextControl
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  controlType: 'text';
  id: string;
  text: ReactNode;
}

export interface SpacerControl {
  controlType: 'spacer';
}

export interface DividerControl {
  controlType: 'divider';
}

/**
 * Custom props specific to the icon control type
 */
export interface IconControlProps {
  controlType: 'icon';
  id: string;
  iconType: string;
  onClick?: MouseEventHandler;
}

/**
 * Icon can extend WuiIcon
 * Had to omit `onClick` as it's a valid prop of SVGElement
 * Also omits `type` and `id` as these are also specific to icon control
 */
export interface IconControlType
  extends Omit<WuiIconProps, 'type' | 'id' | 'onClick'>,
    IconControlProps {}

/**
 * Icon can extend WuiButtonIcon
 * Also omits `iconType` and `id` as these are also specific to icon control
 */
export interface IconButtonControlType
  extends Omit<WuiButtonIconProps, 'iconType' | 'id'>,
    IconControlProps {}

export type IconControl = ExclusiveUnion<
  IconControlType,
  IconButtonControlType
>;

export type Control = ExclusiveUnion<
  ExclusiveUnion<
    ExclusiveUnion<
      ExclusiveUnion<
        ExclusiveUnion<
          ButtonControlProps,
          ExclusiveUnion<BreadcrumbControl, TabControl>
        >,
        TextControl
      >,
      IconControl
    >,
    DividerControl
  >,
  SpacerControl
>;

export type WuiControlBarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * Show or hide the content area containing the `children`
     */
    showContent?: boolean;

    /**
     * An array of controls, actions, and layout spacers to display.
     * Accepts `'button' | 'tab' | 'breadcrumbs' | 'text' | 'icon' | 'spacer' | 'divider'`
     */
    controls: Control[];

    /**
     * The default height of the content area.
     */
    size?: 's' | 'm' | 'l';

    /**
     * Customize the max height.
     * Best when used with `size=l` as this will ensure the actual height equals the max height set.
     */
    maxHeight?: number | string;

    /**
     * Set the offset from the left side of the screen.
     */
    leftOffset?: number | string;

    /**
     * Set the offset from the left side of the screen.
     */
    rightOffset?: number | string;

    /**
     * The control bar is hidden on mobile by default. Use the `showOnMobile` prop to force it's display on mobile screens.
     * You'll need to ensure that the content you place into the bar renders as expected on mobile.
     */
    showOnMobile?: boolean;

    /**
     * By default WuiControlBar will live in a portal, fixed position to the browser window.
     * Change the position of the bar to live inside a container and be positioned against its parent.
     */
    position?: 'fixed' | 'relative' | 'absolute';

    /**
     * Optional class applied to the body used when `position = fixed`
     */
    bodyClassName?: string;

    /**
     * Customize the screen reader heading that helps users find this control. Default is "Page level controls".
     */
    landmarkHeading?: string;
  };

interface WuiControlBarState {
  selectedTab: string;
}

export class WuiControlBar extends Component<
  WuiControlBarProps,
  WuiControlBarState
> {
  static defaultProps = {
    leftOffset: 0,
    rightOffset: 0,
    position: 'fixed',
    size: 'l',
    showContent: false,
    showOnMobile: false,
  };
  private bar: HTMLElement | null = null;

  componentDidMount() {
    if (this.props.position === 'fixed') {
      const height = this.bar ? this.bar.clientHeight : -1;
      document.body.style.paddingBottom = `${height}px`;
      if (this.props.bodyClassName) {
        document.body.classList.add(this.props.bodyClassName);
      }
    }
  }

  componentWillUnmount() {
    document.body.style.paddingBottom = '';
    if (this.props.bodyClassName) {
      document.body.classList.remove(this.props.bodyClassName);
    }
  }

  state = {
    selectedTab: '',
  };

  render() {
    const {
      children,
      className,
      showContent,
      controls,
      size,
      leftOffset,
      rightOffset,
      maxHeight,
      showOnMobile,
      style,
      position,
      bodyClassName,
      landmarkHeading,
      ...rest
    } = this.props;

    const styles = {
      ...style,
      left: leftOffset,
      right: rightOffset,
      maxHeight: maxHeight,
    };

    const classes = classNames('wuiControlBar', className, {
      'wuiControlBar-isOpen': showContent,
      'wuiControlBar--large': size === 'l',
      'wuiControlBar--medium': size === 'm',
      'wuiControlBar--small': size === 's',
      'wuiControlBar--fixed': position === 'fixed',
      'wuiControlBar--absolute': position === 'absolute',
      'wuiControlBar--relative': position === 'relative',
      'wuiControlBar--showOnMobile': showOnMobile,
    });

    const handleTabClick = (
      control: TabControl,
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      this.setState(
        {
          selectedTab: control.id,
        },
        () => {
          control.onClick(e);
        }
      );
    };

    const controlItem = (control: Control, index: number) => {
      switch (control.controlType) {
        case 'button': {
          const {
            controlType,
            id,
            color = 'ghost',
            label,
            className,
            ...rest
          } = control;
          return (
            <WuiButton
              key={id + index}
              className={classNames('wuiControlBar__button', className)}
              color={color}
              {...rest}
              size="s">
              {label}
            </WuiButton>
          );
        }
        case 'icon': {
          const {
            controlType,
            id,
            iconType,
            className,
            color = 'ghost',
            onClick,
            href,
            ...rest
          } = control;
          return onClick || href ? (
            <WuiButtonIcon
              key={id + index}
              className={classNames('wuiControlBar__buttonIcon', className)}
              iconType={iconType}
              onClick={onClick}
              href={href}
              color={color as WuiButtonIconProps['color']}
              {...(rest as IconButtonControlType)}
              size="s"
            />
          ) : (
            <WuiIcon
              key={id + index}
              className={classNames('wuiControlBar__icon', className)}
              type={iconType}
              color={color}
              {...rest}
            />
          );
        }
        case 'divider':
          return (
            <div
              key={control.controlType + index}
              className="wuiControlBar__divider"
            />
          );
        case 'spacer':
          return (
            <div
              key={control.controlType + index}
              className="wuiControlBar__spacer"
            />
          );
        case 'text': {
          const { controlType, id, text, className, ...rest } = control;
          return (
            <div
              key={id}
              className={classNames('wuiControlBar__text', className)}
              {...rest}>
              {text}
            </div>
          );
        }
        case 'tab': {
          const {
            controlType,
            id,
            label,
            onClick,
            className,
            ...rest
          } = control;

          const tabClasses = classNames(
            'wuiControlBar__tab',
            {
              'wuiControlBar__tab--active':
                showContent && id === this.state.selectedTab,
            },
            className
          );

          return (
            <button
              key={id + index}
              className={tabClasses}
              onClick={event => handleTabClick(control, event)}
              {...rest}>
              {label}
            </button>
          );
        }
        case 'breadcrumbs': {
          const { controlType, id, ...rest } = control;
          return (
            <WuiBreadcrumbs
              className="wuiControlBar__breadcrumbs"
              key={control.id}
              {...rest}
            />
          );
        }
      }
    };

    const controlBar = (
      <WuiI18n
        token="wuiControlBar.screenReaderHeading"
        default="Page level controls">
        {(screenReaderHeading: string) => (
          // Though it would be better to use aria-labelledby than aria-label and not repeat the same string twice
          // A bug in voiceover won't list some landmarks in the rotor without an aria-label
          <section
            className={classes}
            aria-label={landmarkHeading ? landmarkHeading : screenReaderHeading}
            {...rest}
            style={styles}>
            <WuiScreenReaderOnly>
              <h2>{landmarkHeading ? landmarkHeading : screenReaderHeading}</h2>
            </WuiScreenReaderOnly>
            <div
              className="wuiControlBar__controls"
              ref={node => {
                this.bar = node;
              }}>
              {controls.map((control, index) => controlItem(control, index))}
            </div>
            {this.props.showContent ? (
              <div className="wuiControlBar__content">{children}</div>
            ) : null}
          </section>
        )}
      </WuiI18n>
    );

    return position === 'fixed' ? (
      <WuiPortal>
        {controlBar}
        <WuiScreenReaderOnly>
          <p aria-live="assertive">
            {landmarkHeading ? (
              <WuiI18n
                token="wuiControlBar.customScreenReaderAnnouncement"
                default="There is a new region landmark called {landmarkHeading} with page level controls at the end of the document."
                values={{ landmarkHeading }}
              />
            ) : (
              <WuiI18n
                token="wuiControlBar.screenReaderAnnouncement"
                default="There is a new region landmark with page level controls at the end of the document."
              />
            )}
          </p>
        </WuiScreenReaderOnly>
      </WuiPortal>
    ) : (
      controlBar
    );
  }
}
