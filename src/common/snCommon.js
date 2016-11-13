// 基础组件部分，一般都需要加载
import angular from 'angular';
import core from './core';
import http from './httpServer/httpServer';
import modal from './modal/modal';

// 功能组件部分，根据需要确认是否加载
import contextmenu from './contextmenu/contextmenu';
import dateRangePicker from './dateRangePicker/dateRangePicker';
import draggable from './draggable/draggable';
import dropdown from './dropdown/dropdown';
import echarts from './echarts/echarts';
import inputMask from './inputMask/inputMask';
import markdown from './markdown/markdown';
import menu from './menu/menu';
import pager from './pager/pager';
import preview from './preview/preview';
import select2 from './select2/select2';
import tabs from './tabs/tabs';
import tooltip from './tooltip/tooltip';
import tree from './tree/tree';
import breadcrumb from './breadcrumb';
import wizard from './wizard';

let app = angular.module("sn.common", []);

INCLUDE_ALL_MODULES(
  [
    core, 
    http, 
    modal,

    contextmenu,
    dateRangePicker, 
    draggable,
    dropdown, 
    echarts, 
    inputMask, 
    markdown,
    menu,
    pager,
    preview, 
    select2, 
    tabs,
    tooltip,
    tree, 
    breadcrumb,
    wizard
  ], 
  app);

export default app;