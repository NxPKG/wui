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
  KeyboardEvent,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import hljs from 'highlight.js';

import { WuiCopy } from '../copy';

import { WuiButtonIcon } from '../button';

import { WuiOverlayMask } from '../overlay_mask';

import { WuiFocusTrap } from '../focus_trap';

import { keys } from '../../services';
import { WuiI18n } from '../i18n';
import { WuiInnerText } from '../inner_text';
import { keysOf } from '../common';
import { FontSize, PaddingSize } from './code_block';

const fontSizeToClassNameMap = {
  s: 'wuiCodeBlock--fontSmall',
  m: 'wuiCodeBlock--fontMedium',
  l: 'wuiCodeBlock--fontLarge',
};

export const FONT_SIZES = keysOf(fontSizeToClassNameMap);

const paddingSizeToClassNameMap: { [paddingSize in PaddingSize]: string } = {
  none: '',
  s: 'wuiCodeBlock--paddingSmall',
  m: 'wuiCodeBlock--paddingMedium',
  l: 'wuiCodeBlock--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

interface Props {
  className?: string;
  fontSize?: FontSize;

  /**
   * Displays the passed code in an inline format. Also removes any margins set.
   */
  inline?: boolean;

  /**
   * Displays an icon button to copy the code snippet to the clipboard.
   */
  isCopyable?: boolean;

  /**
   * Sets the syntax highlighting for a specific language
   */
  language?: string;
  overflowHeight?: number;
  paddingSize?: PaddingSize;
  transparentBackground?: boolean;
  /**
   * Specify how `white-space` inside the element is handled.
   * `pre` respects line breaks/white space but doesn't force them to wrap the line
   * `pre-wrap` respects line breaks/white space but does force them to wrap the line when necessary.
   */
  whiteSpace?: 'pre' | 'pre-wrap';
}

/**
 * This is the base component extended by WuiCode and WuiCodeBlock.
 * These components share the same propTypes definition with WuiCodeBlockImpl.
 */
export const WuiCodeBlockImpl: FunctionComponent<Props> = ({
  transparentBackground = false,
  paddingSize = 'l',
  fontSize = 's',
  isCopyable = false,
  whiteSpace = 'pre-wrap',
  language,
  inline,
  children,
  className,
  overflowHeight,
  ...rest
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPortalTargetReady, setIsPortalTargetReady] = useState(false);
  const codeTarget = useRef<HTMLDivElement | null>(null);
  const code = useRef<HTMLElement | null>(null);
  const [codeFullScreen, setCodeFullScreen] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    codeTarget.current = document.createElement('div');
    setIsPortalTargetReady(true);
  }, []);

  useEffect(() => {
    /**
     * because React maintains a mapping between its Virtual DOM representation and the actual
     * DOM elements (including text nodes), and hljs modifies the DOM structure which leads
     * to React updating detached nodes, we render to a document fragment and
     * copy from that fragment into the target elements
     * (https://github.com/wazuh/wui/issues/2322)
     */
    const html = isPortalTargetReady ? codeTarget.current!.innerHTML : '';

    if (code.current) {
      code.current.innerHTML = html;
    }

    if (language) {
      if (code.current) {
        hljs.highlightBlock(code.current);
      }
    }
  });

  useEffect(() => {
    if (codeFullScreen) {
      const html = isPortalTargetReady ? codeTarget.current!.innerHTML : '';
      codeFullScreen.innerHTML = html;
      if (language) {
        hljs.highlightBlock(codeFullScreen);
      }
    }
  }, [isPortalTargetReady, codeFullScreen, language]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      closeFullScreen();
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const classes = classNames(
    'wuiCodeBlock',
    fontSizeToClassNameMap[fontSize],
    paddingSizeToClassNameMap[paddingSize],
    {
      'wuiCodeBlock--transparentBackground': transparentBackground,
      'wuiCodeBlock--inline': inline,
      'wuiCodeBlock--hasControls': isCopyable || overflowHeight,
    },
    className
  );

  const codeClasses = classNames('wuiCodeBlock__code', language);

  const preClasses = classNames('wuiCodeBlock__pre', {
    'wuiCodeBlock__pre--whiteSpacePre': whiteSpace === 'pre',
    'wuiCodeBlock__pre--whiteSpacePreWrap': whiteSpace === 'pre-wrap',
  });

  const optionalStyles: CSSProperties = {};

  if (overflowHeight) {
    optionalStyles.maxHeight = overflowHeight;
  }

  const codeSnippet = <code ref={code} className={codeClasses} {...rest} />;

  const wrapperProps = {
    className: classes,
    style: optionalStyles,
  };

  if (inline) {
    return isPortalTargetReady ? (
      <>
        {createPortal(children, codeTarget.current!)}
        <span {...wrapperProps}>{codeSnippet}</span>
      </>
    ) : null;
  }

  const getCopyButton = (textToCopy?: string) => {
    let copyButton: JSX.Element | undefined;

    if (isCopyable && textToCopy) {
      copyButton = (
        <div className="wuiCodeBlock__copyButton">
          <WuiI18n token="wuiCodeBlock.copyButton" default="Copy">
            {(copyButton: string) => (
              <WuiCopy textToCopy={textToCopy}>
                {copy => (
                  <WuiButtonIcon
                    size="s"
                    onClick={copy}
                    iconType="copy"
                    color="text"
                    aria-label={copyButton}
                  />
                )}
              </WuiCopy>
            )}
          </WuiI18n>
        </div>
      );
    }

    return copyButton;
  };

  let fullScreenButton: JSX.Element | undefined;

  if (!inline && overflowHeight) {
    fullScreenButton = (
      <WuiI18n
        tokens={[
          'wuiCodeBlock.fullscreenCollapse',
          'wuiCodeBlock.fullscreenExpand',
        ]}
        defaults={['Collapse', 'Expand']}>
        {([fullscreenCollapse, fullscreenExpand]: string[]) => (
          <WuiButtonIcon
            className="wuiCodeBlock__fullScreenButton"
            size="s"
            onClick={toggleFullScreen}
            iconType={isFullScreen ? 'cross' : 'fullScreen'}
            color="text"
            aria-label={isFullScreen ? fullscreenCollapse : fullscreenExpand}
          />
        )}
      </WuiI18n>
    );
  }

  const getCodeBlockControls = (textToCopy?: string) => {
    let codeBlockControls;
    const copyButton = getCopyButton(textToCopy);

    if (copyButton || fullScreenButton) {
      codeBlockControls = (
        <div className="wuiCodeBlock__controls">
          {fullScreenButton}
          {copyButton}
        </div>
      );
    }

    return codeBlockControls;
  };

  const getFullScreenDisplay = (codeBlockControls?: JSX.Element) => {
    let fullScreenDisplay;

    if (isFullScreen) {
      // Force fullscreen to use large font and padding.
      const fullScreenClasses = classNames(
        'wuiCodeBlock',
        fontSizeToClassNameMap[fontSize],
        'wuiCodeBlock-paddingLarge',
        'wuiCodeBlock-isFullScreen',
        className
      );

      fullScreenDisplay = (
        <WuiOverlayMask>
          <WuiFocusTrap clickOutsideDisables={true}>
            <div className={fullScreenClasses}>
              <pre className={preClasses}>
                <code
                  ref={setCodeFullScreen}
                  className={codeClasses}
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                />
              </pre>

              {codeBlockControls}
            </div>
          </WuiFocusTrap>
        </WuiOverlayMask>
      );
    }

    return fullScreenDisplay;
  };

  return isPortalTargetReady ? (
    <>
      {createPortal(children, codeTarget.current!)}
      <WuiInnerText fallback="">
        {(innerTextRef, innerText) => {
          const codeBlockControls = getCodeBlockControls(innerText);
          return (
            <div {...wrapperProps}>
              <pre
                ref={innerTextRef}
                style={optionalStyles}
                className={preClasses}>
                {codeSnippet}
              </pre>

              {/*
                If the below fullScreen code renders, it actually attaches to the body because of
                WuiOverlayMask's React portal usage.
              */}
              {codeBlockControls}
              {getFullScreenDisplay(codeBlockControls)}
            </div>
          );
        }}
      </WuiInnerText>
    </>
  ) : null;
};
