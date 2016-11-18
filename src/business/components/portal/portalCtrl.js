let PortalCtrl = function ($scope, SndsService, $rootScope, $window) {
  let vm = $scope;
  vm.user = $rootScope.user;
  vm.now = new Date();

  vm.doLogout = function () {
    $window.location.href = '/login.html'
  }
}

PortalCtrl.$inject = ['$scope', 'SndsService', '$rootScope', '$window'];
export default app => app.controller('PortalCtrl', PortalCtrl);
