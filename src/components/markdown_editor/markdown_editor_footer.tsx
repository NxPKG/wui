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
  FunctionComponent,
  useState,
  useMemo,
  Fragment,
  ReactChild,
} from 'react';
import { WuiLoadingSpinner } from '../loading';
import { WuiButtonEmpty, WuiButtonIcon } from '../button';
import { WuiOverlayMask } from '../overlay_mask';
import { WuiTitle } from '../title';
import { WuiModal, WuiModalBody, WuiModalHeader } from '../modal';
import { WuiI18n, useWuiI18n } from '../i18n';
import {
  WuiMarkdownDropHandler,
  WuiMarkdownEditorUiPlugin,
  WuiMarkdownParseError,
} from './markdown_types';
import { WuiPopover, WuiPopoverTitle } from '../popover';
import { WuiText } from '../text';
import { WuiSpacer } from '../spacer';
// @ts-ignore a react svg
import MarkdownLogo from './icons/markdown_logo';
import { WuiHorizontalRule } from '../horizontal_rule';
import { WuiToolTip } from '../tool_tip';

interface WuiMarkdownEditorFooterProps {
  uiPlugins: WuiMarkdownEditorUiPlugin[];
  isUploadingFiles: boolean;
  openFiles: () => void;
  errors: WuiMarkdownParseError[];
  hasUnacceptedItems: boolean;
  dropHandlers: WuiMarkdownDropHandler[];
}

export const WuiMarkdownEditorFooter: FunctionComponent<WuiMarkdownEditorFooterProps> = props => {
  const {
    uiPlugins,
    isUploadingFiles,
    openFiles,
    errors,
    hasUnacceptedItems,
    dropHandlers,
  } = props;
  const [isShowingHelp, setIsShowingHelp] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onButtonClick = () => setIsPopoverOpen(isPopoverOpen => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  let uploadButton;

  const supportedFileTypes = useMemo(
    () =>
      dropHandlers
        .map(({ supportedFiles }) => supportedFiles.join(', '))
        .sort()
        .join(', '),
    [dropHandlers]
  );

  const ariaLabels = {
    uploadingFiles: useWuiI18n(
      'wuiMarkdownEditorFooter.uploadingFiles',
      'Click to upload files'
    ),
    openUploadModal: useWuiI18n(
      'wuiMarkdownEditorFooter.openUploadModal',
      'Open upload files modal'
    ),
    unsupportedFileType: useWuiI18n(
      'wuiMarkdownEditorFooter.unsupportedFileType',
      'File type not supported'
    ),
    supportedFileTypes: useWuiI18n(
      'wuiMarkdownEditorFooter.supportedFileTypes',
      'Supported files: {supportedFileTypes}',
      { supportedFileTypes }
    ),
    showSyntaxErrors: useWuiI18n(
      'wuiMarkdownEditorFooter.showSyntaxErrors',
      'Show errors'
    ),
    showMarkdownHelp: useWuiI18n(
      'wuiMarkdownEditorFooter.showMarkdownHelp',
      'Show markdown help'
    ),
  };

  if (isUploadingFiles) {
    uploadButton = (
      <WuiButtonIcon
        iconType={WuiLoadingSpinner}
        aria-label={ariaLabels.uploadingFiles}
      />
    );
  } else if (dropHandlers.length > 0 && hasUnacceptedItems) {
    uploadButton = (
      <WuiToolTip content={ariaLabels.supportedFileTypes}>
        <WuiButtonEmpty
          className="wuiMarkdownEditorFooter__uploadError"
          autoFocus
          size="xs"
          iconType="paperClip"
          color="danger"
          aria-label={`${ariaLabels.unsupportedFileType}. ${ariaLabels.supportedFileTypes}. ${ariaLabels.uploadingFiles}`}
          onClick={openFiles}>
          {ariaLabels.unsupportedFileType}
        </WuiButtonEmpty>
      </WuiToolTip>
    );
  } else if (dropHandlers.length > 0) {
    uploadButton = (
      <WuiButtonIcon
        iconType="paperClip"
        color="text"
        aria-label={ariaLabels.openUploadModal}
        onClick={openFiles}
      />
    );
  }

  let errorsButton;
  if (errors && errors.length) {
    errorsButton = (
      <WuiPopover
        button={
          <WuiButtonEmpty
            iconType="crossInACircleFilled"
            size="s"
            color="danger"
            aria-label={ariaLabels.showSyntaxErrors}
            onClick={onButtonClick}>
            {errors.length}
          </WuiButtonEmpty>
        }
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        anchorPosition="upCenter">
        <div className="wuiMarkdownEditorFooter__popover">
          <WuiPopoverTitle>
            <WuiI18n
              token="wuiMarkdownEditorFooter.errorsTitle"
              default="Errors"
            />
          </WuiPopoverTitle>
          {errors.map((message, idx) => (
            <WuiText key={idx}>{message.toString()}</WuiText>
          ))}
        </div>
      </WuiPopover>
    );
  }

  return (
    <div className="wuiMarkdownEditorFooter">
      <div className="wuiMarkdownEditorFooter__actions">
        {uploadButton}
        {errorsButton}
      </div>

      <WuiButtonIcon
        className="wuiMarkdownEditorFooter__help"
        iconType={MarkdownLogo}
        color="text"
        aria-label={ariaLabels.showMarkdownHelp}
        onClick={() => setIsShowingHelp(!isShowingHelp)}
      />
      {isShowingHelp && (
        <WuiOverlayMask onClick={() => setIsShowingHelp(false)}>
          <WuiModal onClose={() => setIsShowingHelp(false)}>
            <WuiModalHeader>
              <WuiTitle>
                <h3>
                  <WuiI18n
                    token="wuiMarkdownEditorFooter.syntaxTitle"
                    default="Syntax help"
                  />
                </h3>
              </WuiTitle>
            </WuiModalHeader>
            <WuiModalBody>
              <Fragment>
                <WuiText>
                  <WuiI18n
                    tokens={[
                      'wuiMarkdownEditorFooter.descriptionPrefix',
                      'wuiMarkdownEditorFooter.descriptionSuffix',
                    ]}
                    defaults={[
                      'This editor uses',
                      'You can also utilize these additional syntax plugins to add rich content to your text.',
                    ]}>
                    {([descriptionPrefix, descriptionSuffix]: ReactChild[]) => (
                      <p>
                        {descriptionPrefix}{' '}
                        <a
                          href="https://github.github.com/gfm/"
                          target="_blank">
                          Github flavored markdown
                        </a>
                        . {descriptionSuffix}
                      </p>
                    )}
                  </WuiI18n>
                </WuiText>
                <WuiHorizontalRule />
                {uiPlugins
                  .filter(({ helpText }) => !!helpText)
                  .map(({ name, helpText }) => (
                    <Fragment key={name}>
                      <WuiTitle size="xxs">
                        <p>
                          <strong>{name}</strong>
                        </p>
                      </WuiTitle>
                      <WuiSpacer size="s" />
                      {helpText}
                      <WuiSpacer size="l" />
                    </Fragment>
                  ))}
              </Fragment>
            </WuiModalBody>
          </WuiModal>
        </WuiOverlayMask>
      )}
    </div>
  );
};
