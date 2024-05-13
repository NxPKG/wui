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
  cloneElement,
  Component,
  Children,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { ExclusiveUnion, CommonProps, keysOf } from '../../common';

import { get } from '../../../services/objects';

import { WuiFormHelpText } from '../form_help_text';
import { WuiFormErrorText } from '../form_error_text';
import { WuiFormLabel } from '../form_label';

import { htmlIdGenerator } from '../../../services/accessibility';

const displayToClassNameMap = {
  row: null,
  rowCompressed: 'wuiFormRow--compressed',
  columnCompressed: 'wuiFormRow--compressed wuiFormRow--horizontal',
  center: null,
  centerCompressed: 'wuiFormRow--compressed',
  columnCompressedSwitch:
    'wuiFormRow--compressed wuiFormRow--horizontal wuiFormRow--hasSwitch',
};

export const DISPLAYS = keysOf(displayToClassNameMap);

export type WuiFormRowDisplayKeys = keyof typeof displayToClassNameMap;

interface WuiFormRowState {
  isFocused: boolean;
  id: string;
}

type WuiFormRowCommonProps = CommonProps & {
  /**
   * When `rowCompressed`, just tightens up the spacing;
   * Set to `columnCompressed` if compressed
   * and horizontal layout is needed.
   * Set to `center` or `centerCompressed` to align non-input
   * content better with inline rows.
   * Set to `columnCompressedSwitch` if the form control being passed
   * as the child is a switch.
   */
  display?: WuiFormRowDisplayKeys;
  hasEmptyLabelSpace?: boolean;
  fullWidth?: boolean;
  /**
   * IDs of additional elements that should be part of children's `aria-describedby`
   */
  describedByIds?: string[];
  /**
   * Escape hatch to not render duplicate labels if the child also renders a label
   */
  hasChildLabel?: boolean;
  /**
   * ReactElement to render as this component's content
   */
  children: ReactElement;
  label?: ReactNode;
  /**
   * Adds an extra node to the right of the form label without
   * being contained inside the form label. Good for things
   * like documentation links.
   */
  labelAppend?: any;
  id?: string;
  isInvalid?: boolean;
  error?: ReactNode | ReactNode[];
  helpText?: ReactNode;
  /**
   * **DEPRECATED: use `display: rowCompressed` instead.**
   * When `true`, tightens up the spacing.
   */
  compressed?: boolean;
  /**
   * **DEPRECATED: use `display: center` instead.**
   * Vertically centers non-input style content so it aligns
   * better with input style content.
   */
  displayOnly?: boolean;
};

type LabelProps = {
  labelType?: 'label';
} & WuiFormRowCommonProps &
  HTMLAttributes<HTMLDivElement>;

type LegendProps = {
  /**
   * Defaults to rendering a `<label>` but if passed `'legend'` for labelType,
   * will render both a `<legend>` and the surrounding container as a `<fieldset>`
   */
  labelType?: 'legend';
} & WuiFormRowCommonProps &
  HTMLAttributes<HTMLFieldSetElement>;

export type WuiFormRowProps = ExclusiveUnion<LabelProps, LegendProps>;

export class WuiFormRow extends Component<WuiFormRowProps, WuiFormRowState> {
  static defaultProps = {
    display: 'row',
    hasEmptyLabelSpace: false,
    fullWidth: false,
    describedByIds: [],
    labelType: 'label',
    hasChildLabel: true,
  };

  state: WuiFormRowState = {
    isFocused: false,
    id: this.props.id || htmlIdGenerator()(),
  };

  onFocus = (...args: any[]) => {
    // Doing this to allow onFocus to be called correctly from the child input element as this component overrides it
    const onChildFocus = get(this.props, 'children.props.onFocus');
    if (onChildFocus) {
      onChildFocus(...args);
    }

    this.setState(({ isFocused }) => {
      if (!isFocused) {
        return {
          isFocused: true,
        };
      } else {
        return null;
      }
    });
  };

  onBlur = (...args: any[]) => {
    // Doing this to allow onBlur to be called correctly from the child input element as this component overrides it
    const onChildBlur = get(this.props, 'children.props.onBlur');
    if (onChildBlur) {
      onChildBlur(...args);
    }

    this.setState({
      isFocused: false,
    });
  };

  render() {
    const {
      children,
      helpText,
      isInvalid,
      error,
      label,
      labelType,
      labelAppend,
      hasEmptyLabelSpace,
      fullWidth,
      className,
      describedByIds,
      compressed,
      display,
      displayOnly,
      hasChildLabel,
      id: propsId,
      ...rest
    } = this.props;

    const { id } = this.state;

    /**
     * Remove when `compressed` is deprecated
     */
    let shimDisplay: WuiFormRowDisplayKeys;
    if (compressed && display === 'row') {
      shimDisplay = 'rowCompressed';
    } else {
      /**
       * Safe use of ! as prop default is 'row'
       */
      shimDisplay = display!;
    }

    /**
     * Remove when `displayOnly` is deprecated
     */
    if (compressed && displayOnly) {
      shimDisplay = 'centerCompressed';
    } else if (displayOnly && display === 'row') {
      shimDisplay = 'center';
    }

    const classes = classNames(
      'wuiFormRow',
      {
        'wuiFormRow--hasEmptyLabelSpace': hasEmptyLabelSpace,
        'wuiFormRow--fullWidth': fullWidth,
      },
      displayToClassNameMap[shimDisplay],
      className
    );

    let optionalHelpText;

    if (helpText) {
      optionalHelpText = (
        <WuiFormHelpText id={`${id}-help`} className="wuiFormRow__text">
          {helpText}
        </WuiFormHelpText>
      );
    }

    let optionalErrors;

    if (error && isInvalid) {
      const errorTexts = Array.isArray(error) ? error : [error];
      optionalErrors = errorTexts.map((error, i) => {
        const key = typeof error === 'string' ? error : i;
        return (
          <WuiFormErrorText
            key={key}
            id={`${id}-error-${i}`}
            className="wuiFormRow__text">
            {error}
          </WuiFormErrorText>
        );
      });
    }

    let optionalLabel;
    const isLegend = label && labelType === 'legend' ? true : false;

    if (label || labelAppend) {
      let labelProps = {};
      if (isLegend) {
        labelProps = {
          type: labelType,
        };
      } else {
        labelProps = {
          htmlFor: hasChildLabel ? id : undefined,
          isFocused: this.state.isFocused,
          type: labelType,
        };
      }
      optionalLabel = (
        <div className="wuiFormRow__labelWrapper">
          <WuiFormLabel
            className="wuiFormRow__label"
            isInvalid={isInvalid}
            aria-invalid={isInvalid}
            {...labelProps}>
            {label}
          </WuiFormLabel>
          {labelAppend && ' '}
          {labelAppend}
        </div>
      );
    }

    const optionalProps: React.AriaAttributes = {};
    /**
     * Safe use of ! as default prop is []
     */
    const describingIds = [...describedByIds!];

    if (optionalHelpText) {
      describingIds.push(optionalHelpText.props.id);
    }

    if (optionalErrors) {
      optionalErrors.forEach(error => describingIds.push(error.props.id));
    }

    if (describingIds.length > 0) {
      optionalProps['aria-describedby'] = describingIds.join(' ');
    }

    const field = cloneElement(Children.only(children), {
      id,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      ...optionalProps,
    });

    const fieldWrapperClasses = classNames('wuiFormRow__fieldWrapper', {
      wuiFormRow__fieldWrapperDisplayOnly:
        /**
         * Safe use of ! as default prop is 'row'
         */
        displayOnly || display!.startsWith('center'),
    });

    const sharedProps = {
      className: classes,
      id: `${id}-row`,
    };

    const contents = (
      <React.Fragment>
        {optionalLabel}
        <div className={fieldWrapperClasses}>
          {field}
          {optionalErrors}
          {optionalHelpText}
        </div>
      </React.Fragment>
    );

    return labelType === 'legend' ? (
      <fieldset
        {...sharedProps}
        {...(rest as HTMLAttributes<HTMLFieldSetElement>)}>
        {contents}
      </fieldset>
    ) : (
      <div {...sharedProps} {...(rest as HTMLAttributes<HTMLDivElement>)}>
        {contents}
      </div>
    );
  }
}
