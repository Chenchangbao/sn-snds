let PortalCtrl = function ($scope, SndsService, $rootScope, $window, SndsUser) {
  let vm = $scope;
  vm.user = $rootScope.user;
  vm.now = new Date();

  vm.doLogout = function () {
    if (location.hostname.match('sit')) {
      $window.location.href = 'http://ssosit.cnsuning.com/ids/logout?service=' + encodeURIComponent(window.location.href)
    } else {
      $window.location.href = 'http://sso.cnsuning.com/ids/logout?service=http://snds.cnsuning.com/'
    }
    // if (ENVIRONMENT == 'development') {
    //   $window.location.href = 'http://ssosit.cnsuning.com/ids/logout?service=http://sndssit.cnsuning.com:' + PORT + '/'
    // } else if (ENVIRONMENT == 'sit') {
    //   $window.location.href = 'http://ssosit.cnsuning.com/ids/logout?service=http://sndssit.cnsuning.com/'
    // } else {
    //   $window.location.href = 'http://sso.cnsuning.com/ids/logout?service=http://snds.cnsuning.com/'
    // }
  }
}

PortalCtrl.$inject = ['$scope', 'SndsService', '$rootScope', '$window', 'SndsUser'];
export default app => app.controller('PortalCtrl', PortalCtrl);