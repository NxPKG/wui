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

import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { useInnerText } from './inner_text';

export function useRenderToText(node: ReactNode, placeholder = ''): string {
  const [ref, text] = useInnerText(placeholder);
  const hostNode = useRef<Element | null>(null);

  const onUnmount = () => {
    if (hostNode.current) {
      unmountComponentAtNode(hostNode.current);
      hostNode.current = null;
    }
  };

  const setRef = useCallback(
    (node: Element | null) => {
      if (hostNode.current) {
        ref(node);
      }
    },
    [ref]
  );

  useEffect(() => {
    hostNode.current = (document.createDocumentFragment() as unknown) as Element;
    render(<div ref={setRef}>{node}</div>, hostNode.current);
    return () => {
      onUnmount();
    };
  }, [node, setRef]);

  return text || placeholder;
}
