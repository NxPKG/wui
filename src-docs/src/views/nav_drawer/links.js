const faveExtraAction = {
  color: 'subdued',
  iconType: 'starEmpty',
  iconSize: 's',
  'aria-label': 'Add to favorites',
};

const pinExtraAction = {
  color: 'subdued',
  iconType: 'pin',
  iconSize: 's',
};

const pinExtraActionFn = val => {
  pinExtraAction['aria-label'] = `Pin ${val} to top`;
  return pinExtraAction;
};

const topLinks = [
  {
    label: 'Recently viewed',
    iconType: 'clock',
    flyoutMenu: {
      title: 'Recent items',
      listItems: [
        {
          label: 'My dashboard',
          href: '#/layout/nav-drawer',
          iconType: 'dashboardApp',
          extraAction: faveExtraAction,
        },
        {
          label: 'Workpad with title that wraps',
          href: '#/layout/nav-drawer',
          iconType: 'canvasApp',
          extraAction: faveExtraAction,
        },
        {
          label: 'My logs',
          href: '#/layout/nav-drawer',
          iconType: 'logsApp',
          'aria-label': 'This is an alternate aria-label',
          extraAction: faveExtraAction,
        },
      ],
    },
  },
  {
    label: 'Favorites',
    iconType: 'starEmpty',
    flyoutMenu: {
      title: 'Favorite items',
      listItems: [
        {
          label: 'My workpad',
          href: '#/layout/nav-drawer',
          iconType: 'canvasApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starFilled',
            iconSize: 's',
            'aria-label': 'Remove from favorites',
            alwaysShow: true,
          },
        },
        {
          label: 'My logs',
          href: '#/layout/nav-drawer',
          iconType: 'logsApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starFilled',
            iconSize: 's',
            'aria-label': 'Remove from favorites',
            alwaysShow: true,
          },
        },
      ],
    },
  },
];
const adminLinks = [
  {
    label: 'Admin soy un texto muy largo',
    iconType: 'managementApp',
    flyoutMenu: {
      title: 'Tools and settings',
      listItems: [
        {
          label: 'Dev tools',
          href: '#/layout/nav-drawer',
          iconType: 'devToolsApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starEmpty',
            iconSize: 's',
            'aria-label': 'Add to Tools and Settings to favorites',
          },
        },
        {
          label: 'Stack Monitoring',
          href: '#/layout/nav-drawer',
          iconType: 'monitoringApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starEmpty',
            iconSize: 's',
            'aria-label': 'Add Stack Monitoring to favorites',
          },
        },
        {
          label: 'Stack Management',
          href: '#/layout/nav-drawer',
          iconType: 'managementApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starEmpty',
            iconSize: 's',
            'aria-label': 'Add Stack Management to favorites',
          },
        },
      ],
    },
  },
];
const analyzeLinks = [
  {
    label: 'Analyze',
    iconType: 'logoBusinessAnalytics',
    href: '#/layout/nav-drawer',
  },
];
const securityLinks = [
  {
    label: 'Security',
    iconType: 'logoSecurity',
    flyoutMenu: {
      title: 'Security',
      listItems: [
        {
          label: 'SIEM',
          href: '#/layout/nav-drawer',
          iconType: 'securityApp',
          extraAction: { ...pinExtraActionFn('SIEM') },
        },
        {
          label: 'Endpoints',
          href: '#/layout/nav-drawer',
          iconType: 'securityAnalyticsApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starEmpty',
            iconSize: 's',
            'aria-label': 'Add SIEM to favorites',
          },
        },
      ],
    },
  },
];
const searchLinks = [
  {
    label: 'Enterprise Search',
    iconType: 'logoAppSearch',
    isActive: true,
    flyoutMenu: {
      title: 'Enterprise search',
      listItems: [
        {
          label: 'Site search',
          href: '#/layout/nav-drawer',
          iconType: 'searchProfilerApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starEmpty',
            iconSize: 's',
            'aria-label': 'Add Enterprise search to favorites',
          },
        },
        {
          label: 'App search',
          href: '#/layout/nav-drawer',
          iconType: 'searchProfilerApp',
          isActive: true,
          extraAction: {
            color: 'subdued',
            iconType: 'starEmpty',
            iconSize: 's',
            'aria-label': 'Add App Search to favorites',
          },
        },
        {
          label: 'Workplace search',
          href: '#/layout/nav-drawer',
          iconType: 'searchProfilerApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starEmpty',
            iconSize: 's',
            'aria-label': 'Add Workplace Search to favorites',
          },
        },
      ],
    },
  },
];
const observabilityLinks = [
  {
    label: 'Observability',
    iconType: 'logoMetrics',
    flyoutMenu: {
      title: 'Observe your operations',
      listItems: [
        {
          label: 'Logs',
          href: '#/layout/nav-drawer',
          iconType: 'logsApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starEmpty',
            iconSize: 's',
            'aria-label': 'Add Logs to favorites',
          },
        },
        {
          label: 'Metrics',
          href: '#/layout/nav-drawer',
          iconType: 'metricsApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starEmpty',
            iconSize: 's',
            'aria-label': 'Add Metrics to favorites',
          },
        },
        {
          label: 'APM',
          href: '#/layout/nav-drawer',
          iconType: 'apmApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starEmpty',
            iconSize: 's',
            'aria-label': 'Add APM to favorites',
          },
        },
        {
          label: 'Uptime',
          href: '#/layout/nav-drawer',
          iconType: 'uptimeApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starEmpty',
            iconSize: 's',
            'aria-label': 'Add Uptime to favorites',
          },
        },
      ],
    },
  },
];
export {
  topLinks,
  adminLinks,
  analyzeLinks,
  securityLinks,
  searchLinks,
  observabilityLinks,
};
