import angular from "angular";

import snCommon from "common/snCommon";

import appConfiguration from 'config/config';
import appRouter from 'config/router';
import business from 'business/business';
import {
  permission,
  uiPermission
} from 'angular-permission';

import "business/style/uxc.less";

let app = angular.module('app', ['ui.router', permission, uiPermission, 'ui.router.state.events', 'ngSanitize', snCommon.name]);

// 如果是工程开发，请使用注释掉的部分。打包production工程时，mock不会生效
// if(ENVIRONMENT == 'development'){
//   Mock.mockjax(app);
// }

// 本项目为纯粹前端项目，数据直接由mockData.js提供，所以需要mock一直生效
Mock.mockjax(app);

appConfiguration(app);
appRouter(app);
business(app);

app.filter('paging', function () {
  return function (items, index, pageSize) {
    if (!items)
      return [];
    var offset = (index - 1) * pageSize;
    return items.slice(offset, offset + pageSize);
  }
})

import permFn from 'business/permission/permission'

app.run(permFn);


export default app;