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
  useState,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { WuiOverlayMask } from '../overlay_mask';

import { WuiIcon } from '../icon';

import { useWuiI18n } from '../i18n';

import { WuiFocusTrap } from '../focus_trap';

import { keys } from '../../services';
import { useInnerText } from '../inner_text';

type ImageSize = 's' | 'm' | 'l' | 'xl' | 'fullWidth' | 'original';

const sizeToClassNameMap: { [size in ImageSize]: string } = {
  s: 'wuiImage--small',
  m: 'wuiImage--medium',
  l: 'wuiImage--large',
  xl: 'wuiImage--xlarge',
  fullWidth: 'wuiImage--fullWidth',
  original: '',
};

export const SIZES = Object.keys(sizeToClassNameMap);

type FullScreenIconColor = 'light' | 'dark';

const fullScreenIconColorMap: { [color in FullScreenIconColor]: string } = {
  light: 'ghost',
  dark: 'default',
};

interface WuiImageProps extends CommonProps, HTMLAttributes<HTMLImageElement> {
  /**
   * Separate from the caption is a title on the alt tag itself.
   * This one is required for accessibility.
   */
  alt: string;
  /**
   * Accepts `s` / `m` / `l` / `xl` / `original` / `fullWidth` / or a CSS size of `number` or `string`.
   * `fullWidth` will set the figure to stretch to 100% of its container.
   * `string` and `number` types will max both the width or height, whichever is greater.
   */
  size?: ImageSize | number | string;
  /**
   * Changes the color of the icon that floats above the image when it can be clicked to fullscreen.
   * The default value of `light` is fine unless your image has a white background, in which case you should change it to `dark`.
   */
  fullScreenIconColor?: FullScreenIconColor;
  url: string;
  /**
   * Provides the visible caption to the image
   */
  caption?: ReactNode;
  /**
   * When set to `true` (default) will apply a slight shadow to the image
   */
  hasShadow?: boolean;
  /**
   * When set to `true` will make the image clickable to a larger version
   */
  allowFullScreen?: boolean;
}

export const WuiImage: FunctionComponent<WuiImageProps> = ({
  className,
  url,
  size = 'original',
  caption,
  hasShadow,
  allowFullScreen,
  fullScreenIconColor = 'light',
  alt,
  style,
  ...rest
}) => {
  const [isFullScreenActive, setIsFullScreenActive] = useState(false);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      closeFullScreen();
    }
  };

  const closeFullScreen = () => {
    setIsFullScreenActive(false);
  };

  const openFullScreen = () => {
    setIsFullScreenActive(true);
  };

  const customStyle: React.CSSProperties = { ...style };

  let classes = classNames(
    'wuiImage',
    {
      'wuiImage--hasShadow': hasShadow,
      'wuiImage--allowFullScreen': allowFullScreen,
    },
    className
  );

  if (typeof size === 'string' && SIZES.includes(size)) {
    classes = `${classes} ${sizeToClassNameMap[size as ImageSize]}`;
  } else {
    classes = `${classes}`;
    customStyle.maxWidth = size;
    customStyle.maxHeight = size;
    // Set width back to auto to ensure aspect ratio is kept
    customStyle.width = 'auto';
  }

  const [optionalCaptionRef, optionalCaptionText] = useInnerText();
  let optionalCaption;
  if (caption) {
    optionalCaption = (
      <figcaption ref={optionalCaptionRef} className="wuiImage__caption">
        {caption}
      </figcaption>
    );
  }

  const allowFullScreenIcon = (
    <WuiIcon
      type="fullScreen"
      color={fullScreenIconColorMap[fullScreenIconColor]}
      className="wuiImage__icon"
    />
  );

  const fullScreenDisplay = (
    <WuiOverlayMask
      data-test-subj="fullScreenOverlayMask"
      onClick={closeFullScreen}>
      <WuiFocusTrap clickOutsideDisables={true}>
        <figure
          className="wuiImage wuiImage-isFullScreen"
          aria-label={optionalCaptionText}>
          <button
            type="button"
            aria-label={useWuiI18n(
              'wuiImage.closeImage',
              'Close full screen {alt} image',
              { alt }
            )}
            className="wuiImage__button"
            data-test-subj="deactivateFullScreenButton"
            onClick={closeFullScreen}
            onKeyDown={onKeyDown}>
            <img
              src={url}
              alt={alt}
              className="wuiImage-isFullScreen__img"
              {...rest}
            />
            <WuiIcon
              type="cross"
              color={fullScreenIconColorMap[fullScreenIconColor]}
              className="wuiImage-isFullScreen__icon"
            />
          </button>
          {optionalCaption}
        </figure>
      </WuiFocusTrap>
    </WuiOverlayMask>
  );

  const fullscreenLabel = useWuiI18n(
    'wuiImage.openImage',
    'Open full screen {alt} image',
    { alt }
  );
  if (allowFullScreen) {
    return (
      <figure className={classes} aria-label={optionalCaptionText}>
        <button
          type="button"
          aria-label={fullscreenLabel}
          className="wuiImage__button"
          data-test-subj="activateFullScreenButton"
          onClick={openFullScreen}>
          <img
            src={url}
            alt={alt}
            className="wuiImage__img"
            style={customStyle}
            {...rest}
          />
          {allowFullScreenIcon}
        </button>
        {isFullScreenActive && fullScreenDisplay}
        {optionalCaption}
      </figure>
    );
  } else {
    return (
      <figure className={classes} aria-label={optionalCaptionText}>
        <img
          style={customStyle}
          src={url}
          className="wuiImage__img"
          alt={alt}
          {...rest}
        />
        {optionalCaption}
      </figure>
    );
  }
};
