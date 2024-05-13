// specifically polyfill Object.entries for IE11 support (used by @wazuh/charts)
import 'core-js/modules/es7.object.entries';
import 'core-js/modules/es6.number.is-finite';

import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router';

import configureStore, { history } from './store/configure_store';

import { AppContainer } from './views/app_container';
import { HomeView } from './views/home/home_view';
import { NotFoundView } from './views/not_found/not_found_view';
import { registerTheme } from './services';

import Routes from './routes';
import themeLight from './theme_light.scss';
import themeDark from './theme_dark.scss';
import themeWazuhLight from './theme_wazuh_light.scss';
import themeWazuhDark from './theme_wazuh_dark.scss';
import { ThemeProvider } from './components/with_theme/theme_context';
import ScrollToHash from './components/scroll_to_hash';

registerTheme('light', [themeLight]);
registerTheme('dark', [themeDark]);
registerTheme('wazuh-light', [themeWazuhLight]);
registerTheme('wazuh-dark', [themeWazuhDark]);

// Set up app

const store = configureStore();

const childRoutes = [].concat(Routes.getAppRoutes());
childRoutes.push({
  path: '*',
  component: NotFoundView,
  name: 'Page Not Found',
});

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'Wazuh UI',
  },
  ...childRoutes,
];

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <Router history={history}>
        <ScrollToHash />
        <Switch>
          {routes.map(
            ({ name, path, sections, isNew, component, from, to }, i) => {
              const mainComponent = () => (
                <Route
                  key={i}
                  path={`/${path}`}
                  render={props => {
                    const { location } = props;
                    // prevents encoded urls with a section id to fail
                    if (location.pathname.includes('%23')) {
                      const url = decodeURIComponent(location.pathname);
                      return <Redirect push to={url} />;
                    } else {
                      return (
                        <AppContainer
                          currentRoute={{ name, path, sections, isNew }}>
                          {createElement(component, {})}
                        </AppContainer>
                      );
                    }
                  }}
                />
              );

              if (from)
                return [
                  mainComponent(),
                  <Route exact path={`/${from}`}>
                    <Redirect to={`/${to}`} />
                  </Route>,
                ];
              else if (component) return [mainComponent()];
              return null;
            }
          )}
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('guide')
);
