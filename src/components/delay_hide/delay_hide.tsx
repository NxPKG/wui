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

import { Component, ReactNode } from 'react';

function isComponentBecomingVisible(
  prevHide: boolean = false,
  nextHide: boolean = false
) {
  return prevHide === true && nextHide === false;
}

export interface WuiDelayHideProps {
  hide: boolean;
  minimumDuration: number;
  render: () => ReactNode;
}

interface WuiDelayHideState {
  hide: boolean;
  countdownExpired?: boolean;
}

export class WuiDelayHide extends Component<
  WuiDelayHideProps,
  WuiDelayHideState
> {
  static defaultProps = {
    hide: false,
    minimumDuration: 1000,
  };

  static getDerivedStateFromProps(
    nextProps: WuiDelayHideProps,
    prevState: WuiDelayHideState
  ) {
    const isBecomingVisible = isComponentBecomingVisible(
      prevState.hide,
      nextProps.hide
    );
    return {
      hide: nextProps.hide,
      countdownExpired: isBecomingVisible ? false : prevState.countdownExpired,
    };
  }

  state = {
    hide: this.props.hide,
    countdownExpired: this.props.hide,
  };

  private timeoutId?: number;

  componentDidMount() {
    // if the component begins visible start counting
    if (this.props.hide === false) {
      this.startCountdown();
    }
  }

  componentDidUpdate(prevProps: WuiDelayHideProps) {
    const isBecomingVisible = isComponentBecomingVisible(
      prevProps.hide,
      this.props.hide
    );
    if (isBecomingVisible) {
      this.startCountdown();
    }
  }

  componentWillUnmount() {
    if (this.timeoutId != null) {
      clearTimeout(this.timeoutId);
    }
  }

  startCountdown = () => {
    // only start the countdown if there is not one in progress
    if (this.timeoutId == null) {
      this.timeoutId = setTimeout(
        this.finishCountdown,
        // even though `minimumDuration` cannot be undefined, passing a strict number type to setTimeout makes TS interpret
        // it as a NodeJS.Timer instead of a number. The DOM lib defines the setTimeout call as taking `number | undefined`
        // so we cast minimumDuration to this type instead to force TS's cooperation
        this.props.minimumDuration as number | undefined
      );
    }
  };

  finishCountdown = () => {
    this.timeoutId = undefined;
    this.setState({ countdownExpired: true });
  };

  render() {
    const shouldHideContent =
      this.props.hide === true && this.state.countdownExpired;
    return shouldHideContent ? null : this.props.render();
  }
}
