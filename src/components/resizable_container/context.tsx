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

import React, { createContext, useContext } from 'react';

export interface WuiResizablePanelController {
  id: string;
  setSize: (panelSize: number) => void;
  getSizePx: () => number;
  minSize: string;
}

export class WuiResizablePanelRegistry {
  private panels: { [key: string]: WuiResizablePanelController } = {};
  private resizerRefs = new Set<HTMLElement>();

  registerPanel(panel: WuiResizablePanelController) {
    this.panels[panel.id] = panel;
  }

  deregisterPanel(id: WuiResizablePanelController['id']) {
    delete this.panels[id];
  }

  registerResizerRef(resizerRef: HTMLElement) {
    this.resizerRefs.add(resizerRef);
  }

  deregisterResizerRef(resizerRef: HTMLElement) {
    this.resizerRefs.delete(resizerRef);
  }

  getResizerSiblings(prevPanelId: string, nextPanelId: string) {
    return [this.panels[prevPanelId], this.panels[nextPanelId]];
  }

  getAllResizers() {
    return Array.from(this.resizerRefs);
  }

  fetchAllPanels(
    prevPanelId: string,
    nextPanelId: string,
    containerSize: number
  ) {
    const panelWithSizes: { [key: string]: number } = {};
    for (const key in this.panels) {
      if (key !== prevPanelId && key !== nextPanelId) {
        panelWithSizes[key] =
          (this.panels[key].getSizePx() / containerSize) * 100;
      }
    }
    return panelWithSizes;
  }
}

interface ContextProps {
  registry?: WuiResizablePanelRegistry;
}

const WuiResizablePanelContext = createContext<ContextProps>({});

interface ContextProviderProps extends Required<ContextProps> {
  /**
   * ReactNode to render as this component's content
   */
  children: any;
}

export function WuiResizablePanelContextProvider({
  children,
  registry,
}: ContextProviderProps) {
  return (
    <WuiResizablePanelContext.Provider value={{ registry }}>
      {children}
    </WuiResizablePanelContext.Provider>
  );
}

export const useWuiResizablePanelContext = () => {
  const context = useContext(WuiResizablePanelContext);
  if (!context.registry) {
    throw new Error(
      'useWuiResizablePanelContext must be used within a <WuiResizablePanelContextProvider />'
    );
  }
  return context;
};
