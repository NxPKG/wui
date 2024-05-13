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

import { useReducer } from 'react';
import { assertNever } from '../common';
import { WuiTourStepProps } from './tour_step';
import { WuiTourAction, WuiTourActions, WuiTourState } from './types';

export type WuiStatelessTourStep = Omit<WuiTourStepProps, keyof WuiTourState> &
  Partial<WuiTourState>;

export const useWuiTour = (
  stepsArray: WuiStatelessTourStep[],
  initialState: WuiTourState
): [WuiTourStepProps[], WuiTourActions, WuiTourState] => {
  function reducer(state: WuiTourState, action: WuiTourAction): WuiTourState {
    switch (action.type) {
      case 'WUI_TOUR_FINISH': {
        const currentTourStep = action.payload.resetTour
          ? 1
          : state.currentTourStep;
        return {
          ...state,
          currentTourStep,
          isTourActive: false,
        };
      }
      case 'WUI_TOUR_RESET':
        return {
          ...state,
          currentTourStep: 1,
          isTourActive: true,
        };
      case 'WUI_TOUR_NEXT': {
        const nextStep =
          state.currentTourStep === stepsArray.length
            ? state.currentTourStep
            : state.currentTourStep + 1;
        return {
          ...state,
          currentTourStep: nextStep,
        };
      }
      case 'WUI_TOUR_PREVIOUS': {
        const prevStep =
          state.currentTourStep === 1
            ? state.currentTourStep
            : state.currentTourStep - 1;
        return {
          ...state,
          currentTourStep: prevStep,
        };
      }
      case 'WUI_TOUR_GOTO': {
        const step = action.payload.step;
        const isTourActive =
          typeof action.payload.isTourActive !== 'undefined'
            ? action.payload.isTourActive
            : state.isTourActive;
        const goTo =
          step <= stepsArray.length && step > 0 ? step : state.currentTourStep;
        return {
          ...state,
          currentTourStep: goTo,
          isTourActive,
        };
      }
      default:
        assertNever(action);
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions: WuiTourActions = {
    finishTour: (resetTour: boolean = true) =>
      dispatch({ type: 'WUI_TOUR_FINISH', payload: { resetTour } }),
    resetTour: () => dispatch({ type: 'WUI_TOUR_RESET' }),
    decrementStep: () => dispatch({ type: 'WUI_TOUR_PREVIOUS' }),
    incrementStep: () => dispatch({ type: 'WUI_TOUR_NEXT' }),
    goToStep: (step: number, isTourActive?: boolean) =>
      dispatch({ type: 'WUI_TOUR_GOTO', payload: { step, isTourActive } }),
  };

  const steps = stepsArray.map(step => ({
    ...step,
    isStepOpen: state.currentTourStep === step.step && state.isTourActive,
    minWidth: state.tourPopoverWidth,
    onFinish: actions.finishTour,
    stepsTotal: stepsArray.length,
    subtitle: state.tourSubtitle,
  }));

  return [steps, actions, state];
};
