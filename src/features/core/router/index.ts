import { partialRight } from 'lodash';
import { parse, stringify } from 'qs';
import Router, { RouteConfig } from 'vue-router';

export function createRouter(routes: RouteConfig[]): Router {
  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
      return savedPosition || { x: 0, y: 0 };
    },
    parseQuery: partialRight(parse, {
      allowDots: true,
      ignoreQueryPrefix: true,
    }),
    stringifyQuery: partialRight(stringify, {
      addQueryPrefix: true,
      allowDots: true,
      skipNulls: true,
    }),
  });
}
