export default app => {
  app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/overview');
    $stateProvider
      .state('Portal', {
        abstract: true,
        templateUrl: 'business/components/portal/portal.html',
        controller: 'PortalCtrl',
      })
      .state('Portal.Overview', {
        url: '/overview',
        templateUrl: 'business/components/template/overview/overview.html',
        controller: 'OverviewCtrl'
      })
      .state('Portal.Instances', {
        url: '/instances',
        templateUrl: 'business/components/template/instances/instances.html',
        controller: 'InstancesCtrl'
      })
      .state('Portal.InstanceDetail', {
        url: '/instance-detail/:id',
        templateUrl: 'business/components/template/instanceDetail/instanceDetail.html',
        controller: 'InstanceDetailCtrl'
      })
      .state('Portal.Manager', {
        url: '/manager',
        templateUrl: 'business/components/template/manager/manager.html',
        controller: 'ManagerCtrl'
      })
      .state('Portal.Update', {
        url: '/update',
        templateUrl: 'business/components/template/update/update.html',
        controller: 'UpdateCtrl'
      })
      .state('LoginForLoad', {
        url: '/loginForLoad',
        templateUrl: 'business/components/template/manager/load/loginForLoad.html',
        controller: 'LoginForLoadCtrl'
      })
      // .state('Requirement', {
      //   url: '/requirement',
      //   templateUrl: 'business/components/template/requirement.html',
      //   controller: 'GeneralTableCtrl'
      // })
      ;
  }]);
}
