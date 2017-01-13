export default app => {
  app.service('ComponentService', ['HttpService', HttpService => {
    return {
      'getHttpDemo': params => HttpService.get('getHttpDemo.htm', params)
    }
  }]);

  app.service('SndsUser', ['$state', '$rootScope', 'SndsService', '$q',
    function ($state, $rootScope, SndsService, $q) {
      var deferred = $q.defer()

      $rootScope.user = { userName: '', userId: '' };
      SndsService.presentUser().then(d => {
        $rootScope.user.userName = '';
        $rootScope.user.userId = d;
        deferred.resolve()
      });

      return deferred.promise
    }
  ]);
}