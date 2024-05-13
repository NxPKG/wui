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
  HTMLAttributes,
  MouseEventHandler,
  useContext,
} from 'react';
import { CommonProps } from '../common';
import { WuiButtonEmpty, WuiButtonIcon } from '../button';
import { WuiI18n } from '../i18n';
import { WuiToolTip } from '../tool_tip';
import { MARKDOWN_MODE, MODE_VIEWING } from './markdown_modes';
import { WuiMarkdownEditorUiPlugin } from './markdown_types';
import { WuiMarkdownContext } from './markdown_context';
import MarkdownActions from './markdown_actions';
// @ts-ignore a react svg
import MarkdownCheckmarkIcon from './icons/markdown_checkmark';

export type WuiMarkdownEditorToolbarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    selectedNode?: null | any;
    markdownActions: MarkdownActions;
    viewMode: MARKDOWN_MODE;
    onClickPreview: MouseEventHandler<HTMLButtonElement>;
    uiPlugins: WuiMarkdownEditorUiPlugin[];
  };

const boldItalicButtons = [
  {
    id: 'mdBold',
    label: 'Bold',
    name: 'bold',
    iconType: 'editorBold',
  },
  {
    id: 'mdItalic',
    label: 'Italic',
    name: 'italic',
    iconType: 'editorItalic',
  },
];

const listButtons = [
  {
    id: 'mdUl',
    label: 'Unordered list',
    name: 'ul',
    iconType: 'editorUnorderedList',
  },
  {
    id: 'mdOl',
    label: 'Ordered list',
    name: 'ol',
    iconType: 'editorOrderedList',
  },
  {
    id: 'mdTl',
    label: 'Task list',
    name: 'tl',
    iconType: MarkdownCheckmarkIcon,
  },
];

const quoteCodeLinkButtons = [
  {
    id: 'mdQuote',
    label: 'Quote',
    name: 'quote',
    iconType: 'quote',
  },
  {
    id: 'mdCode',
    label: 'Code',
    name: 'code',
    iconType: 'editorCodeBlock',
  },
  {
    id: 'mdLink',
    label: 'Link',
    name: 'link',
    iconType: 'editorLink',
  },
];

export const WuiMarkdownEditorToolbar: FunctionComponent<WuiMarkdownEditorToolbarProps> = ({
  markdownActions,
  viewMode,
  onClickPreview,
  uiPlugins,
  selectedNode,
}) => {
  const { openPluginEditor } = useContext(WuiMarkdownContext);

  const handleMdButtonClick = (mdButtonId: string) => {
    const actionResult = markdownActions.do(mdButtonId);
    if (actionResult !== true) openPluginEditor(actionResult);
  };

  const isPreviewing = viewMode === MODE_VIEWING;

  return (
    <div className="wuiMarkdownEditorToolbar">
      <div className="wuiMarkdownEditorToolbar__buttons">
        {boldItalicButtons.map(item => (
          <WuiToolTip key={item.id} content={item.label} delay="long">
            <WuiButtonIcon
              color="text"
              onClick={() => handleMdButtonClick(item.id)}
              iconType={item.iconType}
              aria-label={item.label}
              isDisabled={isPreviewing}
            />
          </WuiToolTip>
        ))}
        <span className="wuiMarkdownEditorToolbar__divider" />
        {listButtons.map(item => (
          <WuiToolTip key={item.id} content={item.label} delay="long">
            <WuiButtonIcon
              color="text"
              onClick={() => handleMdButtonClick(item.id)}
              iconType={item.iconType}
              aria-label={item.label}
              isDisabled={isPreviewing}
            />
          </WuiToolTip>
        ))}
        <span className="wuiMarkdownEditorToolbar__divider" />
        {quoteCodeLinkButtons.map(item => (
          <WuiToolTip key={item.id} content={item.label} delay="long">
            <WuiButtonIcon
              color="text"
              onClick={() => handleMdButtonClick(item.id)}
              iconType={item.iconType}
              aria-label={item.label}
              isDisabled={isPreviewing}
            />
          </WuiToolTip>
        ))}

        {uiPlugins.length > 0 ? (
          <>
            <span className="wuiMarkdownEditorToolbar__divider" />
            {uiPlugins.map(({ name, button }) => {
              const isSelectedNodeType =
                selectedNode && selectedNode.type === name;
              return (
                <WuiToolTip key={name} content={button.label} delay="long">
                  <WuiButtonIcon
                    color="text"
                    {...(isSelectedNodeType
                      ? {
                          style: { background: 'rgba(0, 0, 0, 0.15)' },
                        }
                      : null)}
                    onClick={() => handleMdButtonClick(name)}
                    iconType={button.iconType}
                    aria-label={button.label}
                    isDisabled={isPreviewing}
                  />
                </WuiToolTip>
              );
            })}
          </>
        ) : null}
      </div>

      {isPreviewing ? (
        <WuiButtonEmpty
          iconType="editorCodeBlock"
          color="text"
          size="s"
          onClick={onClickPreview}>
          <WuiI18n token="wuiMarkdownEditorToolbar.editor" default="Editor" />
        </WuiButtonEmpty>
      ) : (
        <WuiButtonEmpty
          iconType="eye"
          color="text"
          size="s"
          onClick={onClickPreview}>
          <WuiI18n
            token="wuiMarkdownEditorToolbar.previewMarkdown"
            default="Preview"
          />
        </WuiButtonEmpty>
      )}
    </div>
  );
};
