let PortalCtrl = function ($scope, SndsService, $rootScope) {
  let vm = $scope;
      vm.user = $rootScope.user;
      vm.now = new Date();
      
}

PortalCtrl.$inject = ['$scope','SndsService','$rootScope'];
export default app => app.controller('PortalCtrl', PortalCtrl);
