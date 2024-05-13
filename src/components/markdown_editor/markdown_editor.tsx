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
  createElement,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useCallback,
  useRef,
  forwardRef,
} from 'react';

import unified, { PluggableList, Processor } from 'unified';
import { VFileMessage } from 'vfile-message';
import classNames from 'classnames';

import { CommonProps, OneOf } from '../common';
import MarkdownActions, { insertText } from './markdown_actions';
import { WuiMarkdownEditorToolbar } from './markdown_editor_toolbar';
import { WuiMarkdownEditorTextArea } from './markdown_editor_text_area';
import { WuiMarkdownFormat } from './markdown_format';
import { WuiMarkdownEditorDropZone } from './markdown_editor_drop_zone';
import { htmlIdGenerator } from '../../services/accessibility';

import { MARKDOWN_MODE, MODE_EDITING, MODE_VIEWING } from './markdown_modes';
import {
  WuiMarkdownAstNode,
  WuiMarkdownDropHandler,
  WuiMarkdownEditorUiPlugin,
  WuiMarkdownParseError,
  WuiMarkdownStringTagConfig,
} from './markdown_types';
import { WuiOverlayMask } from '../overlay_mask';
import { WuiModal } from '../modal';
import { ContextShape, WuiMarkdownContext } from './markdown_context';
import * as MarkdownTooltip from './plugins/markdown_tooltip';
import {
  defaultParsingPlugins,
  defaultProcessingPlugins,
} from './plugins/markdown_default_plugins';

type CommonMarkdownEditorProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> &
  CommonProps & {
    /** aria-label OR aria-labelledby must be set */
    'aria-label'?: string;

    /** aria-label OR aria-labelledby must be set */
    'aria-labelledby'?: string;

    /** ID of an element describing the text editor, useful for associating error messages */
    'aria-describedby'?: string;

    /** a unique ID to attach to the textarea. If one isn't provided, a random one
     * will be generated */
    editorId?: string;

    /** A markdown content */
    value: string;

    /** callback function when markdown content is modified */
    onChange: (value: string) => void;

    /** height of the content/preview area */
    height?: number;

    /** plugins to identify new syntax and parse it into an AST node */
    parsingPluginList?: PluggableList;

    /** plugins to process the markdown AST nodes into a React nodes */
    processingPluginList?: PluggableList;

    /** defines UI for plugins' buttons in the toolbar as well as any modals or extra UI that provides content to the editor */
    uiPlugins?: WuiMarkdownEditorUiPlugin[];

    /** errors to bubble up */
    errors?: WuiMarkdownParseError[];

    /** callback triggered when parsing results are available */
    onParse?: (
      error: WuiMarkdownParseError | null,
      data: {
        messages: VFileMessage[];
        ast: WuiMarkdownAstNode;
      }
    ) => void;

    /** initial display mode for the editor */
    initialViewMode?: MARKDOWN_MODE;

    /** array defining any drag&drop handlers */
    dropHandlers?: WuiMarkdownDropHandler[];
  };
export type WuiMarkdownEditorProps = OneOf<
  CommonMarkdownEditorProps,
  'aria-label' | 'aria-labelledby'
>;

interface WuiMarkdownEditorRef {
  textarea: HTMLTextAreaElement | null;
  replaceNode: ContextShape['replaceNode'];
}

function isNewLine(char: string | undefined): boolean {
  if (char == null) return true;
  return !!char.match(/[\r\n]/);
}
function padWithNewlinesIfNeeded(textarea: HTMLTextAreaElement, text: string) {
  const selectionStart = textarea.selectionStart;
  const selectionEnd = textarea.selectionEnd;

  // block parsing requires two leading new lines and none trailing, but we add an extra trailing line for readability
  const isPrevNewLine = isNewLine(textarea.value[selectionStart - 1]);
  const isPrevPrevNewLine = isNewLine(textarea.value[selectionStart - 2]);
  const isNextNewLine = isNewLine(textarea.value[selectionEnd]);

  // pad text with newlines as needed
  text = `${isPrevNewLine ? '' : '\n'}${isPrevPrevNewLine ? '' : '\n'}${text}${
    isNextNewLine ? '' : '\n'
  }`;
  return text;
}

export const WuiMarkdownEditor = forwardRef<
  WuiMarkdownEditorRef,
  WuiMarkdownEditorProps
>(
  (
    {
      className,
      editorId: _editorId,
      value,
      onChange,
      height = 150,
      parsingPluginList = defaultParsingPlugins,
      processingPluginList = defaultProcessingPlugins,
      uiPlugins = [],
      onParse,
      errors = [],
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      initialViewMode = MODE_EDITING,
      dropHandlers = [],
      ...rest
    },
    ref
  ) => {
    const [viewMode, setViewMode] = useState<MARKDOWN_MODE>(initialViewMode);
    const editorId = useMemo(() => _editorId || htmlIdGenerator()(), [
      _editorId,
    ]);

    const [pluginEditorPlugin, setPluginEditorPlugin] = useState<
      WuiMarkdownEditorUiPlugin | undefined
    >(undefined);

    const toolbarPlugins = [MarkdownTooltip.plugin, ...uiPlugins];

    const markdownActions = useMemo(
      () => new MarkdownActions(editorId, toolbarPlugins),
      // toolbarPlugins _is_ accounted for
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [editorId, toolbarPlugins.map(({ name }) => name).join(',')]
    );

    const classes = classNames('wuiMarkdownEditor', className);

    const parser = useMemo(() => {
      const Compiler = (tree: any) => {
        return tree;
      };

      function identityCompiler(this: Processor) {
        this.Compiler = Compiler;
      }
      return unified()
        .use(parsingPluginList)
        .use(identityCompiler);
    }, [parsingPluginList]);

    const [parsed, parseError] = useMemo<
      [any | null, WuiMarkdownParseError | null]
    >(() => {
      try {
        const parsed = parser.processSync(value);
        return [parsed, null];
      } catch (e) {
        return [null, e];
      }
    }, [parser, value]);

    const isPreviewing = viewMode === MODE_VIEWING;

    const replaceNode = useCallback(
      (position, next) => {
        const leading = value.substr(0, position.start.offset);
        const trailing = value.substr(position.end.offset);
        onChange(`${leading}${next}${trailing}`);
      },
      [value, onChange]
    );

    const contextValue = useMemo<ContextShape>(
      () => ({
        openPluginEditor: (plugin: WuiMarkdownEditorUiPlugin) =>
          setPluginEditorPlugin(() => plugin),
        replaceNode,
      }),
      [replaceNode]
    );

    const [selectedNode, setSelectedNode] = useState();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (textareaRef == null) return;
      if (parsed == null) return;

      const getCursorNode = () => {
        const { selectionStart } = textareaRef.current!;

        let node: WuiMarkdownAstNode = parsed.contents;

        outer: while (true) {
          if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
              const child = node.children[i];
              if (
                child.position.start.offset < selectionStart &&
                selectionStart < child.position.end.offset
              ) {
                if (child.type === 'text') break outer; // don't dive into `text` nodes
                node = child;
                continue outer;
              }
            }
          }
          break;
        }

        setSelectedNode(node);
      };

      const textarea = textareaRef.current!;

      textarea.addEventListener('keyup', getCursorNode);
      textarea.addEventListener('mouseup', getCursorNode);

      return () => {
        textarea.removeEventListener('keyup', getCursorNode);
        textarea.removeEventListener('mouseup', getCursorNode);
      };
    }, [parsed]);

    useEffect(() => {
      if (onParse) {
        const messages = parsed ? parsed.messages : [];
        const ast = parsed ? parsed.contents : null;
        onParse(parseError, { messages, ast });
      }
    }, [onParse, parsed, parseError]);

    useImperativeHandle(
      ref,
      () => ({ textarea: textareaRef.current, replaceNode }),
      [replaceNode]
    );

    const [hasUnacceptedItems, setHasUnacceptedItems] = React.useState(false);

    return (
      <WuiMarkdownContext.Provider value={contextValue}>
        <div className={classes} {...rest}>
          <WuiMarkdownEditorToolbar
            selectedNode={selectedNode}
            markdownActions={markdownActions}
            onClickPreview={() =>
              setViewMode(isPreviewing ? MODE_EDITING : MODE_VIEWING)
            }
            viewMode={viewMode}
            uiPlugins={toolbarPlugins}
          />

          {isPreviewing && (
            <div
              className="wuiMarkdownEditorPreview"
              style={{ height: `${height}px` }}>
              <WuiMarkdownFormat
                parsingPluginList={parsingPluginList}
                processingPluginList={processingPluginList}>
                {value}
              </WuiMarkdownFormat>
            </div>
          )}
          {/* Toggle the editor's display instead of unmounting to retain its undo/redo history */}
          <div style={{ display: isPreviewing ? 'none' : 'block' }}>
            <WuiMarkdownEditorDropZone
              dropHandlers={dropHandlers}
              insertText={(
                text: string,
                config: WuiMarkdownStringTagConfig
              ) => {
                if (config.block) {
                  text = padWithNewlinesIfNeeded(textareaRef.current!, text);
                }

                const originalSelectionStart = textareaRef.current!
                  .selectionStart;
                const newSelectionPoint = originalSelectionStart + text.length;

                insertText(textareaRef.current!, {
                  text,
                  selectionStart: newSelectionPoint,
                  selectionEnd: newSelectionPoint,
                });
              }}
              uiPlugins={toolbarPlugins}
              errors={errors}
              hasUnacceptedItems={hasUnacceptedItems}
              setHasUnacceptedItems={setHasUnacceptedItems}>
              <WuiMarkdownEditorTextArea
                ref={textareaRef}
                height={height}
                id={editorId}
                onChange={e => onChange(e.target.value)}
                value={value}
                onFocus={() => setHasUnacceptedItems(false)}
                {...{
                  'aria-label': ariaLabel,
                  'aria-labelledby': ariaLabelledBy,
                  'aria-describedby': ariaDescribedBy,
                }}
              />
            </WuiMarkdownEditorDropZone>

            {pluginEditorPlugin && (
              <WuiOverlayMask>
                <WuiModal onClose={() => setPluginEditorPlugin(undefined)}>
                  {createElement(pluginEditorPlugin.editor!, {
                    node:
                      selectedNode &&
                      selectedNode.type === pluginEditorPlugin.name
                        ? selectedNode
                        : null,
                    onCancel: () => setPluginEditorPlugin(undefined),
                    onSave: (markdown, config) => {
                      if (
                        selectedNode &&
                        selectedNode.type === pluginEditorPlugin.name
                      ) {
                        // modifying an existing node
                        textareaRef.current!.setSelectionRange(
                          selectedNode.position.start.offset,
                          selectedNode.position.end.offset
                        );
                      } else {
                        // creating a new node
                        if (config.block) {
                          // inject newlines if needed
                          markdown = padWithNewlinesIfNeeded(
                            textareaRef.current!,
                            markdown
                          );
                        }
                      }
                      insertText(textareaRef.current!, {
                        text: markdown,
                        selectionStart: undefined,
                        selectionEnd: undefined,
                      });
                      setPluginEditorPlugin(undefined);
                    },
                  })}
                </WuiModal>
              </WuiOverlayMask>
            )}
          </div>
        </div>
      </WuiMarkdownContext.Provider>
    );
  }
);
WuiMarkdownEditor.displayName = 'WuiMarkdownEditor';
