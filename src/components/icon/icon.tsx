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
  PureComponent,
  HTMLAttributes,
  ComponentType,
  SVGAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

// @ts-ignore not generating typescript files or definitions for the generated JS components
// because we'd need to dynamically know if we're importing the
// TS file (dev/docs) or the JS file (distributed), and it's more effort than worth
// to generate & git track a TS module definition for each icon component
import { icon as empty } from './assets/empty.js';
import { enqueueStateChange } from '../../services/react';

import { htmlIdGenerator } from '../../services';

const typeToPathMap = {
  accessibility: 'accessibility',
  aggregate: 'aggregate',
  alert: 'alert',
  analyzeEvent: 'analyze_event',
  annotation: 'annotation',
  apps: 'apps',
  arrowDown: 'arrow_down',
  arrowLeft: 'arrow_left',
  arrowRight: 'arrow_right',
  arrowUp: 'arrow_up',
  asterisk: 'asterisk',
  beaker: 'beaker',
  bell: 'bell',
  bellSlash: 'bellSlash',
  bolt: 'bolt',
  boxesHorizontal: 'boxes_horizontal',
  boxesVertical: 'boxes_vertical',
  branch: 'branch',
  broom: 'broom',
  brush: 'brush',
  bug: 'bug',
  bullseye: 'bullseye',
  calendar: 'calendar',
  check: 'check',
  checkInCircleFilled: 'checkInCircleFilled',
  cheer: 'cheer',
  clock: 'clock',
  cloudDrizzle: 'cloudDrizzle',
  cloudStormy: 'cloudStormy',
  cloudSunny: 'cloudSunny',
  compute: 'compute',
  console: 'console',
  controlsHorizontal: 'controls_horizontal',
  controlsVertical: 'controls_vertical',
  copy: 'copy',
  copyClipboard: 'copy_clipboard',
  cross: 'cross',
  crosshairs: 'crosshairs',
  crossInACircleFilled: 'crossInACircleFilled',
  currency: 'currency',
  cut: 'cut',
  database: 'database',
  document: 'document',
  documentEdit: 'documentEdit',
  documents: 'documents',
  dot: 'dot',
  download: 'download',
  editorAlignCenter: 'editor_align_center',
  editorAlignLeft: 'editor_align_left',
  editorAlignRight: 'editor_align_right',
  editorBold: 'editor_bold',
  editorCodeBlock: 'editor_code_block',
  editorComment: 'editor_comment',
  editorDistributeHorizontal: 'editorDistributeHorizontal',
  editorDistributeVertical: 'editorDistributeVertical',
  editorHeading: 'editor_heading',
  editorItalic: 'editor_italic',
  editorItemAlignLeft: 'editorItemAlignLeft',
  editorItemAlignBottom: 'editorItemAlignBottom',
  editorItemAlignCenter: 'editorItemAlignCenter',
  editorItemAlignMiddle: 'editorItemAlignMiddle',
  editorItemAlignRight: 'editorItemAlignRight',
  editorItemAlignTop: 'editorItemAlignTop',
  editorLink: 'editor_link',
  editorOrderedList: 'editor_ordered_list',
  editorPositionBottomLeft: 'editorPositionBottomLeft',
  editorPositionBottomRight: 'editorPositionBottomRight',
  editorPositionTopLeft: 'editorPositionTopLeft',
  editorPositionTopRight: 'editorPositionTopRight',
  editorRedo: 'editor_redo',
  editorStrike: 'editor_strike',
  editorTable: 'editor_table',
  editorUnderline: 'editor_underline',
  editorUndo: 'editor_undo',
  editorUnorderedList: 'editor_unordered_list',
  email: 'email',
  empty: 'empty',
  exit: 'exit',
  expand: 'expand',
  expandMini: 'expandMini',
  exportAction: 'export',
  eye: 'eye',
  eyeClosed: 'eye_closed',
  faceHappy: 'face_happy',
  faceNeutral: 'faceNeutral',
  faceSad: 'face_sad',
  filter: 'filter',
  flag: 'flag',
  fold: 'fold',
  folderCheck: 'folder_check',
  folderClosed: 'folder_closed',
  folderExclamation: 'folder_exclamation',
  folderOpen: 'folder_open',
  fullScreen: 'full_screen',
  gear: 'gear',
  glasses: 'glasses',
  globe: 'globe',
  grab: 'grab',
  grabHorizontal: 'grab_horizontal',
  grid: 'grid',
  heart: 'heart',
  heatmap: 'heatmap',
  help: 'help',
  home: 'home',
  iInCircle: 'iInCircle',
  image: 'image',
  importAction: 'import',
  indexClose: 'index_close',
  indexEdit: 'index_edit',
  indexFlush: 'index_flush',
  indexMapping: 'index_mapping',
  indexOpen: 'index_open',
  indexSettings: 'index_settings',
  inputOutput: 'inputOutput',
  inspect: 'inspect',
  invert: 'invert',
  ip: 'ip',
  keyboardShortcut: 'keyboard_shortcut',
  qryField: 'qry_field',
  qryFunction: 'qry_function',
  qryOperand: 'qry_operand',
  qrySelector: 'qry_selector',
  qryValue: 'qry_value',
  link: 'link',
  list: 'list',
  listAdd: 'list_add',
  lock: 'lock',
  lockOpen: 'lockOpen',
  logoAerospike: 'logo_aerospike',
  logoApache: 'logo_apache',
  logoAWS: 'logo_aws',
  logoAWSMono: 'logo_aws_mono',
  logoAzure: 'logo_azure',
  logoAzureMono: 'logo_azure_mono',
  logoCeph: 'logo_ceph',
  logoCodesandbox: 'logo_codesandbox',
  logoCouchbase: 'logo_couchbase',
  logoDocker: 'logo_docker',
  logoDropwizard: 'logo_dropwizard',
  logoWazuh: 'logo_wazuh',
  logoEtcd: 'logo_etcd',
  logoGCP: 'logo_gcp',
  logoGCPMono: 'logo_gcp_mono',
  logoGithub: 'logo_github',
  logoGmail: 'logo_gmail',
  logoGolang: 'logo_golang',
  logoGoogleG: 'logo_google_g',
  logoHAproxy: 'logo_haproxy',
  logoIBM: 'logo_ibm',
  logoIBMMono: 'logo_ibm_mono',
  logoKafka: 'logo_kafka',
  logoKubernetes: 'logo_kubernetes',
  logoMemcached: 'logo_memcached',
  logoMongodb: 'logo_mongodb',
  logoMySQL: 'logo_mysql',
  logoNginx: 'logo_nginx',
  logoOsquery: 'logo_osquery',
  logoPhp: 'logo_php',
  logoPostgres: 'logo_postgres',
  logoPrometheus: 'logo_prometheus',
  logoRabbitmq: 'logo_rabbitmq',
  logoRedis: 'logo_redis',
  logoSketch: 'logo_sketch',
  logoSlack: 'logo_slack',
  logoUptime: 'logo_uptime',
  logoWebhook: 'logo_webhook',
  logoWindows: 'logo_windows',
  logstashFilter: 'logstash_filter',
  logstashIf: 'logstash_if',
  logstashInput: 'logstash_input',
  logstashOutput: 'logstash_output',
  logstashQueue: 'logstash_queue',
  magnet: 'magnet',
  magnifyWithMinus: 'magnifyWithMinus',
  magnifyWithPlus: 'magnifyWithPlus',
  mapMarker: 'map_marker',
  memory: 'memory',
  menu: 'menu',
  menuLeft: 'menuLeft',
  menuRight: 'menuRight',
  merge: 'merge',
  minimize: 'minimize',
  minusInCircle: 'minus_in_circle',
  minusInCircleFilled: 'minus_in_circle_filled',
  moon: 'moon',
  nested: 'nested',
  node: 'node',
  number: 'number',
  offline: 'offline',
  online: 'online',
  package: 'package',
  pageSelect: 'pageSelect',
  pagesSelect: 'pagesSelect',
  partial: 'partial',
  paperClip: 'paper_clip',
  pause: 'pause',
  pencil: 'pencil',
  pin: 'pin',
  pinFilled: 'pin_filled',
  play: 'play',
  plusInCircle: 'plus_in_circle',
  plusInCircleFilled: 'plus_in_circle_filled',
  popout: 'popout',
  push: 'push',
  questionInCircle: 'question_in_circle',
  quote: 'quote',
  refresh: 'refresh',
  reporter: 'reporter',
  returnKey: 'return_key',
  save: 'save',
  scale: 'scale',
  search: 'search',
  securitySignal: 'securitySignal',
  securitySignalDetected: 'securitySignalDetected',
  securitySignalResolved: 'securitySignalResolved',
  shard: 'shard',
  share: 'share',
  snowflake: 'snowflake',
  sortable: 'sortable',
  sortDown: 'sort_down',
  sortLeft: 'sortLeft',
  sortRight: 'sortRight',
  sortUp: 'sort_up',
  starEmpty: 'star_empty',
  starEmptySpace: 'star_empty_space',
  starFilled: 'star_filled',
  starFilledSpace: 'star_filled_space',
  starMinusEmpty: 'star_minus_empty',
  starMinusFilled: 'star_minus_filled',
  starPlusEmpty: 'starPlusEmpty',
  starPlusFilled: 'starPlusFilled',
  stats: 'stats',
  stop: 'stop',
  stopFilled: 'stop_filled',
  stopSlash: 'stop_slash',
  storage: 'storage',
  string: 'string',
  submodule: 'submodule',
  swatchInput: 'swatch_input', // Undocumented on purpose. Has an extra stroke for WuiColorPicker
  symlink: 'symlink',
  tableOfContents: 'tableOfContents',
  tableDensityExpanded: 'table_density_expanded',
  tableDensityCompact: 'table_density_compact',
  tableDensityNormal: 'table_density_normal',
  tag: 'tag',
  tear: 'tear',
  temperature: 'temperature',
  timeline: 'timeline',
  training: 'training',
  trash: 'trash',
  unfold: 'unfold',
  unlink: 'unlink',
  user: 'user',
  users: 'users',
  vector: 'vector',
  videoPlayer: 'videoPlayer',
  visArea: 'vis_area',
  visAreaStacked: 'vis_area_stacked',
  visBarHorizontal: 'vis_bar_horizontal',
  visBarHorizontalStacked: 'vis_bar_horizontal_stacked',
  visBarVertical: 'vis_bar_vertical',
  visBarVerticalStacked: 'vis_bar_vertical_stacked',
  visGauge: 'vis_gauge',
  visGoal: 'vis_goal',
  visLine: 'vis_line',
  visMapCoordinate: 'vis_map_coordinate',
  visMapRegion: 'vis_map_region',
  visMetric: 'vis_metric',
  visPie: 'vis_pie',
  visTable: 'vis_table',
  visTagCloud: 'vis_tag_cloud',
  visText: 'vis_text',
  wrench: 'wrench',
  // Token Icon Imports
  tokenClass: 'tokens/tokenClass',
  tokenProperty: 'tokens/tokenProperty',
  tokenEnum: 'tokens/tokenEnum',
  tokenVariable: 'tokens/tokenVariable',
  tokenMethod: 'tokens/tokenMethod',
  tokenAnnotation: 'tokens/tokenAnnotation',
  tokenException: 'tokens/tokenException',
  tokenInterface: 'tokens/tokenInterface',
  tokenParameter: 'tokens/tokenParameter',
  tokenField: 'tokens/tokenField',
  tokenElement: 'tokens/tokenElement',
  tokenFunction: 'tokens/tokenFunction',
  tokenBoolean: 'tokens/tokenBoolean',
  tokenString: 'tokens/tokenString',
  tokenArray: 'tokens/tokenArray',
  tokenNumber: 'tokens/tokenNumber',
  tokenConstant: 'tokens/tokenConstant',
  tokenObject: 'tokens/tokenObject',
  tokenEvent: 'tokens/tokenEvent',
  tokenKey: 'tokens/tokenKey',
  tokenNull: 'tokens/tokenNull',
  tokenStruct: 'tokens/tokenStruct',
  tokenPackage: 'tokens/tokenPackage',
  tokenOperator: 'tokens/tokenOperator',
  tokenEnumMember: 'tokens/tokenEnumMember',
  tokenRepo: 'tokens/tokenRepo',
  tokenSymbol: 'tokens/tokenSymbol',
  tokenFile: 'tokens/tokenFile',
  tokenModule: 'tokens/tokenModule',
  tokenNamespace: 'tokens/tokenNamespace',
  tokenDate: 'tokens/tokenDate',
  tokenIP: 'tokens/tokenIP',
  tokenNested: 'tokens/tokenNested',
  tokenAlias: 'tokens/tokenAlias',
  tokenShape: 'tokens/tokenShape',
  tokenGeo: 'tokens/tokenGeo',
  tokenRange: 'tokens/tokenRange',
  tokenBinary: 'tokens/tokenBinary',
  tokenJoin: 'tokens/tokenJoin',
  tokenPercolator: 'tokens/tokenPercolator',
  tokenFlattened: 'tokens/tokenFlattened',
  tokenRankFeature: 'tokens/tokenRankFeature',
  tokenRankFeatures: 'tokens/tokenRankFeatures',
  tokenKeyword: 'tokens/tokenKeyword',
  tokenCompletionSuggester: 'tokens/tokenCompletionSuggester',
  tokenDenseVector: 'tokens/tokenDenseVector',
  tokenText: 'tokens/tokenText',
  tokenTokenCount: 'tokens/tokenTokenCount',
  tokenSearchType: 'tokens/tokenSearchType',
  tokenHistogram: 'tokens/tokenHistogram',
};

export const TYPES = keysOf(typeToPathMap);

export type WuiIconType = keyof typeof typeToPathMap;

export type IconType = WuiIconType | string | ComponentType;

const colorToClassMap = {
  default: null,
  primary: 'wuiIcon--primary',
  secondary: 'wuiIcon--secondary',
  success: 'wuiIcon--success',
  accent: 'wuiIcon--accent',
  warning: 'wuiIcon--warning',
  danger: 'wuiIcon--danger',
  text: 'wuiIcon--text',
  subdued: 'wuiIcon--subdued',
  ghost: 'wuiIcon--ghost',
};

export const COLORS: NamedColor[] = keysOf(colorToClassMap);

type NamedColor = keyof typeof colorToClassMap;

function isNamedColor(name: string): name is NamedColor {
  return colorToClassMap.hasOwnProperty(name);
}

// We accept arbitrary color strings, which are impossible to type.
export type IconColor = string | NamedColor;

const sizeToClassNameMap = {
  original: null,
  s: 'wuiIcon--small',
  m: 'wuiIcon--medium',
  l: 'wuiIcon--large',
  xl: 'wuiIcon--xLarge',
  xxl: 'wuiIcon--xxLarge',
};

export const SIZES: IconSize[] = keysOf(sizeToClassNameMap);

export type IconSize = keyof typeof sizeToClassNameMap;

export type WuiIconProps = CommonProps &
  Omit<SVGAttributes<SVGElement>, 'type' | 'color' | 'size'> & {
    /**
     * `Enum` is any of the named icons listed in the docs, `string` is usually a URL to an SVG file, and `elementType` is any React SVG component
     */
    type: IconType;
    /**
     * One of WUI's color palette or a valid CSS color value https://developer.mozilla.org/en-US/docs/Web/CSS/color_value.
     * Note that coloring only works if your SVG is removed of fill attributes.
     */
    color?: IconColor;
    /**
     * Note that every size other than `original` assumes the provided SVG sits on a square viewbox.
     */
    size?: IconSize;
    /**
     * Descriptive title for naming the icon based on its use
     */
    title?: string;
    /**
     * A unique identifier for the title element
     */
    titleId?: string;
    /**
     * Its value should be one or more element IDs
     */
    'aria-labelledby'?: string;
    /**
     * Callback when the icon has been loaded & rendered
     */
    onIconLoad?: () => void;
  };

interface State {
  icon: undefined | ComponentType | string;
  iconTitle: undefined | string;
  isLoading: boolean;
  neededLoading: boolean; // controls the fade-in animation, cached icons are immediately rendered
}

function isWuiIconType(x: WuiIconProps['type']): x is WuiIconType {
  return typeof x === 'string' && typeToPathMap.hasOwnProperty(x);
}

function getInitialIcon(icon: WuiIconProps['type']) {
  if (icon == null) {
    return undefined;
  }
  if (isWuiIconType(icon)) {
    if (iconComponentCache.hasOwnProperty(icon)) {
      return iconComponentCache[icon];
    }
    return undefined;
  }

  return icon;
}

const generateId = htmlIdGenerator();

let iconComponentCache: { [iconType: string]: ComponentType } = {};

export const clearIconComponentCache = (iconType?: WuiIconType) => {
  if (iconType != null) {
    delete iconComponentCache[iconType];
  } else {
    iconComponentCache = {};
  }
};

export const appendIconComponentCache = (iconTypeToIconComponentMap: {
  [iconType: string]: ComponentType;
}) => {
  for (const iconType in iconTypeToIconComponentMap) {
    if (iconTypeToIconComponentMap.hasOwnProperty(iconType)) {
      iconComponentCache[iconType] = iconTypeToIconComponentMap[iconType];
    }
  }
};

export class WuiIcon extends PureComponent<WuiIconProps, State> {
  isMounted = true;
  constructor(props: WuiIconProps) {
    super(props);

    const { type } = props;
    const initialIcon = getInitialIcon(type);
    let isLoading = false;

    if (isWuiIconType(type) && initialIcon == null) {
      isLoading = true;
      this.loadIconComponent(type);
    } else {
      this.onIconLoad();
    }

    this.state = {
      icon: initialIcon,
      iconTitle: undefined,
      isLoading,
      neededLoading: isLoading,
    };
  }

  componentDidUpdate(prevProps: WuiIconProps) {
    const { type } = this.props;
    if (type !== prevProps.type) {
      if (isWuiIconType(type)) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          neededLoading: iconComponentCache.hasOwnProperty(type),
          isLoading: true,
        });
        this.loadIconComponent(type);
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          icon: type,
          neededLoading: true,
          isLoading: false,
        });
      }
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  loadIconComponent = (iconType: WuiIconType) => {
    if (iconComponentCache.hasOwnProperty(iconType)) {
      // exists in cache
      this.setState({
        isLoading: false,
        neededLoading: false,
        icon: iconComponentCache[iconType],
      });
      this.onIconLoad();
      return;
    }

    import(
      /* webpackChunkName: "icon.[request]" */
      // It's important that we don't use a template string here, it
      // stops webpack from building a dynamic require context.
      // eslint-disable-next-line prefer-template
      './assets/' + typeToPathMap[iconType] + '.js'
    ).then(({ icon }) => {
      iconComponentCache[iconType] = icon;
      enqueueStateChange(() => {
        if (this.isMounted && this.props.type === iconType) {
          this.setState(
            {
              icon,
              iconTitle: iconType,
              isLoading: false,
            },
            this.onIconLoad
          );
        }
      });
    });
  };

  onIconLoad = () => {
    const { onIconLoad } = this.props;
    if (onIconLoad) {
      onIconLoad();
    }
  };

  render() {
    const {
      type,
      size = 'm',
      color,
      className,
      tabIndex,
      title,
      onIconLoad,
      ...rest
    } = this.props;

    const { isLoading, neededLoading } = this.state;

    let optionalColorClass = null;
    let optionalCustomStyles: any = null;

    if (color) {
      if (isNamedColor(color)) {
        optionalColorClass = colorToClassMap[color];
      } else {
        optionalCustomStyles = { fill: color };
      }
    }

    // These icons are a little special and get some extra CSS flexibility
    const isAppIcon =
      type &&
      typeof type === 'string' &&
      (/.+App$/.test(type) || /.+Job$/.test(type) || type === 'dataVisualizer');

    const classes = classNames(
      'wuiIcon',
      sizeToClassNameMap[size],
      optionalColorClass,
      {
        'wuiIcon--app': isAppIcon,
        'wuiIcon-isLoading': isLoading,
        'wuiIcon-isLoaded': !isLoading && neededLoading,
      },
      className
    );

    const icon = this.state.icon || (empty as ComponentType);

    // This is a fix for IE and Edge, which ignores tabindex="-1" on an SVG, but respects
    // focusable="false".
    //   - If there's no tab index specified, we'll default the icon to not be focusable,
    //     which is how SVGs behave in Chrome, Safari, and FF.
    //   - If tab index is -1, then the consumer wants the icon to not be focusable.
    //   - For all other values, the consumer wants the icon to be focusable.
    const focusable = tabIndex == null || tabIndex === -1 ? 'false' : 'true';

    if (typeof icon === 'string') {
      return (
        <img
          alt={title ? title : ''}
          src={icon}
          className={classes}
          tabIndex={tabIndex}
          {...(rest as HTMLAttributes<HTMLImageElement>)}
        />
      );
    } else {
      const Svg = icon;

      // If it's an empty icon, or if there is no aria-label, aria-labelledby, or title it gets aria-hidden true
      const isAriaHidden =
        icon === empty ||
        !(
          this.props['aria-label'] ||
          this.props['aria-labelledby'] ||
          this.props.title
        );
      const hideIconEmpty = isAriaHidden && { 'aria-hidden': true };

      let titleId: any;

      // If no aria-label or aria-labelledby is provided but there's a title, a titleId is generated
      //  The svg aria-labelledby attribute gets this titleId
      //  The svg title element gets this titleId as an id
      if (
        !this.props['aria-label'] &&
        !this.props['aria-labelledby'] &&
        title
      ) {
        titleId = { titleId: generateId() };
      }

      return (
        <Svg
          className={classes}
          style={optionalCustomStyles}
          tabIndex={tabIndex}
          focusable={focusable}
          role="img"
          title={title}
          {...titleId}
          {...rest}
          {...hideIconEmpty}
        />
      );
    }
  }
}
