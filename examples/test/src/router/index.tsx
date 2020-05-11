import React from 'react';
import { Switch, Router } from 'react-router-dom';

import { ExtendedRouter } from '../../src/reactRouterAdvance';
import { HomePage } from '../pages/home-page';
import { IndependentPage } from '../pages/independent-page';
import { TabPage } from '../pages/tab-page';

import { StaticChild } from '../pages/tab-page/static-child-page';
import { SecondStaticChild } from '../pages/tab-page/second-static-child-page';
import { DynamicPathChildPage } from '../pages/tab-page/dynamic-path-child-page';
import { DynamicParentStaticChild } from '../pages/tab-page/dynamic-path-child-page/static-child';
import { DynamicParentSecondStaticChild } from '../pages/tab-page/dynamic-path-child-page/second-static-child';
import { ShouldNeverSee } from '../pages/tab-page/dynamic-path-child-page/should-never-see';

import { MockDataResolver } from '../resolvers/mock-data.resolver';
import { MockGuard } from '../guards/mock.guard';

import { history } from './history';
import { PageWithRedirectOnStaticChild } from '../pages/page-with-redirect-on-child';
import { FirstTargetPage } from '../pages/page-with-redirect-on-child/first-target-page';
import { DynamicTargetChild } from '../pages/page-with-redirect-on-dynamic-child/first-target-page';

export const Routes = () => (
  <Router history={history}>
    <Switch>
      <ExtendedRouter path="/" exact={true} component={HomePage} />
      <ExtendedRouter
        path="/page-with-redirect"
        guards={[new MockGuard(false)]}
        redirectUrl="/"
        exact={true}
        component={HomePage}
      />
      <ExtendedRouter exact={true} path="/independant-page" component={IndependentPage} />
      <ExtendedRouter
        path="/page-with-redirect-on-static-child"
        component={PageWithRedirectOnStaticChild}
        redirectToChild="/page-with-redirect-on-static-child/static-child"
        childs={[
          {
            component: FirstTargetPage,
            path: '/page-with-redirect-on-static-child/static-child',
          },
          {
            path: '/page-with-redirect-on-static-child/second-static-child',
            component: SecondStaticChild,
          },
        ]}
      />
      <ExtendedRouter
        path="/page-with-redirect-on-dynamic-child/:id"
        component={PageWithRedirectOnStaticChild}
        redirectToChild="/page-with-redirect-on-dynamic-child/:id/dynamic-child"
        childs={[
          {
            component: DynamicTargetChild,
            path: '/page-with-redirect-on-dynamic-child/:id/dynamic-child',
          },
          {
            path: '/page-with-redirect-on-dynamic-child/:id/second-dynamic-child',
            component: SecondStaticChild,
          },
        ]}
      />
      <ExtendedRouter
        path="/tab-page"
        component={TabPage}
        childs={[
          {
            component: StaticChild,
            path: '/tab-page/static-child',
            resolvers: {
              mockUserData: new MockDataResolver({ name: 'Joy', lastName: 'Doy' }),
              mockUiData: new MockDataResolver({ color: 'blue' }),
            },
          },
          {
            path: '/tab-page/second-static-child',
            component: SecondStaticChild,
          },
          {
            path: '/tab-page/dynamic-path-child-page/:id',
            component: DynamicPathChildPage,
            childs: [
              {
                path: '/tab-page/dynamic-path-child-page/:id/static-child',
                component: DynamicParentStaticChild,
              },
              {
                path: '/tab-page/dynamic-path-child-page/:id/second-static-child',
                component: DynamicParentSecondStaticChild,
              },
              {
                path: '/tab-page/dynamic-path-child-page/:id/should-never-see',
                component: ShouldNeverSee,
                guards: [new MockGuard(false)],
                redirectUrl: '/login',
              },
            ],
          },
        ]}
      />
    </Switch>
  </Router>
);
