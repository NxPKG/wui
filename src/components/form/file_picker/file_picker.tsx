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

import React, { Component, InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../../common';

import { WuiValidatableControl } from '../validatable_control';
import { WuiButtonEmpty } from '../../button';
import { WuiProgress } from '../../progress';
import { WuiIcon } from '../../icon';
import { WuiI18n } from '../../i18n';
import { WuiLoadingSpinner } from '../../loading';
import { htmlIdGenerator } from '../../../services/accessibility/html_id_generator';

const displayToClassNameMap = {
  default: null,
  large: 'wuiFilePicker--large',
};

export const DISPLAYS = keysOf(displayToClassNameMap);

export type WuiFilePickerDisplay = keyof typeof displayToClassNameMap;

export interface WuiFilePickerProps
  extends CommonProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id?: string;
  name?: string;
  className?: string;
  /**
   * The content that appears in the dropzone if no file is attached
   */
  initialPromptText?: ReactNode;
  /**
   * Use as a callback to access the HTML FileList API
   */
  onChange?: (files: FileList | null) => void;
  /**
   * Reduces the size to a typical (compressed) input
   */
  compressed?: boolean;
  /**
   * Size or type of display;
   * `default` for normal height, similar to other controls;
   * `large` for taller size
   */
  display?: WuiFilePickerDisplay;
  fullWidth?: boolean;
  isInvalid?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export class WuiFilePicker extends Component<WuiFilePickerProps> {
  static defaultProps = {
    initialPromptText: 'Select or drag and drop a file',
    compressed: false,
    display: 'large',
  };

  state = {
    promptText: null,
    isHoveringDrop: false,
  };

  fileInput: HTMLInputElement | null = null;

  handleChange = (filesSelected?: string | null) => {
    if (!this.fileInput) return;

    if (this.fileInput.files && this.fileInput.files.length > 1) {
      this.setState({
        promptText: `${this.fileInput.files.length} ${filesSelected}`,
      });
    } else if (this.fileInput.files && this.fileInput.files.length === 0) {
      this.setState({ promptText: null });
    } else {
      this.setState({ promptText: this.fileInput.value.split('\\').pop() });
    }

    const { onChange } = this.props;

    if (onChange) {
      onChange(this.fileInput.files);
    }
  };

  removeFiles = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!this.fileInput) return;

    this.fileInput.value = '';
    this.handleChange(null);
  };

  showDrop = () => {
    if (!this.props.disabled) {
      this.setState({ isHoveringDrop: true });
    }
  };

  hideDrop = () => {
    this.setState({ isHoveringDrop: false });
  };

  render() {
    return (
      <WuiI18n
        tokens={[
          'wuiFilePicker.clearSelectedFiles',
          'wuiFilePicker.filesSelected',
        ]}
        defaults={['Clear selected files', 'files selected']}>
        {([clearSelectedFiles, filesSelected]: string[]) => {
          const {
            id,
            name,
            initialPromptText,
            className,
            disabled,
            compressed,
            onChange,
            isInvalid,
            fullWidth,
            isLoading,
            display,
            ...rest
          } = this.props;

          let promptId: string = htmlIdGenerator()();

          if (id) {
            promptId = `${id}-filePicker__prompt`;
          }

          const isOverridingInitialPrompt = this.state.promptText != null;

          const normalFormControl = display === 'default';

          const classes = classNames(
            'wuiFilePicker',
            displayToClassNameMap[display!],
            {
              wuiFilePicker__showDrop: this.state.isHoveringDrop,
              'wuiFilePicker--compressed': compressed,
              'wuiFilePicker--fullWidth': fullWidth,
              'wuiFilePicker-isInvalid': isInvalid,
              'wuiFilePicker-isLoading': isLoading,
              'wuiFilePicker-hasFiles': isOverridingInitialPrompt,
            },
            className
          );

          let clearButton;
          if (isLoading && normalFormControl) {
            // Override clear button with loading spinner if it is in loading state
            clearButton = (
              <WuiLoadingSpinner className="wuiFilePicker__loadingSpinner" />
            );
          } else if (isOverridingInitialPrompt) {
            if (normalFormControl) {
              clearButton = (
                <button
                  type="button"
                  aria-label={clearSelectedFiles}
                  className="wuiFilePicker__clearButton"
                  onClick={this.removeFiles}>
                  <WuiIcon className="wuiFilePicker__clearIcon" type="cross" />
                </button>
              );
            } else {
              clearButton = (
                <WuiButtonEmpty
                  aria-label={clearSelectedFiles}
                  className="wuiFilePicker__clearButton"
                  size="xs"
                  onClick={this.removeFiles}>
                  Remove
                </WuiButtonEmpty>
              );
            }
          } else {
            clearButton = null;
          }

          const loader = !normalFormControl && isLoading && (
            <WuiProgress size="xs" color="accent" position="absolute" />
          );

          return (
            <div className={classes}>
              <div className="wuiFilePicker__wrap">
                <WuiValidatableControl isInvalid={isInvalid}>
                  <input
                    type="file"
                    id={id}
                    name={name}
                    className="wuiFilePicker__input"
                    onChange={() => this.handleChange(filesSelected)}
                    ref={input => {
                      this.fileInput = input;
                    }}
                    onDragOver={this.showDrop}
                    onDragLeave={this.hideDrop}
                    onDrop={this.hideDrop}
                    disabled={disabled}
                    aria-describedby={promptId}
                    {...rest}
                  />
                </WuiValidatableControl>
                <div className="wuiFilePicker__prompt" id={promptId}>
                  <WuiIcon
                    className="wuiFilePicker__icon"
                    type="importAction"
                    size={normalFormControl ? 'm' : 'l'}
                    aria-hidden="true"
                  />
                  <div className="wuiFilePicker__promptText">
                    {this.state.promptText || initialPromptText}
                  </div>
                  {clearButton}
                  {loader}
                </div>
              </div>
            </div>
          );
        }}
      </WuiI18n>
    );
  }
}
