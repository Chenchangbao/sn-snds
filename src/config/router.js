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
        url: '/instanceslist',
        templateUrl: 'business/components/template/instances/instances.html',
        controller: 'InstancesCtrl'
      })
      .state('Portal.InstanceNew', {
        url: '/instance-new',
        templateUrl: 'business/components/template/instanceNew/instanceNew.html',
        controller: 'InstanceNewCtrl'
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
      .state('Portal.MyServices', {
        url: '/myservices',
        templateUrl: 'business/components/template/myServices/myServices.html',
        controller: 'MyServicesCtrl'
      })
      .state('Portal.InstanceDetail', {
        url: '/instance-detail/:name',
        templateUrl: 'business/components/template/instanceDetail/instanceDetail.html',
        controller: 'InstanceDetailCtrl'
      })
      .state('Portal.Review', {
        url: '/review/:code',
        templateUrl: 'business/components/template/myServices/review.html',
        controller: 'Review'
      })
      // .state('Requirement', {
      //   url: '/requirement',
      //   templateUrl: 'business/components/template/requirement.html',
      //   controller: 'GeneralTableCtrl'
      // })
      ;
  }]);
}
