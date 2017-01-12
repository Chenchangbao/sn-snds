export default app => {
  app.service('ComponentService', ['HttpService', HttpService => {
    return {
      'getHttpDemo': params => HttpService.get('getHttpDemo.htm', params)
    }
  }]);

  app.service('SndsUser', ['$state', '$rootScope', 'SndsService',
    function ($state, $rootScope, SndsService) {
      $rootScope.user = { userName: '', userId: '' };
      return SndsService.presentUser().then(d => {
        $rootScope.user.userName = '';
        $rootScope.user.userId = d;
      });
    }
  ]);
}