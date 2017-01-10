let review = ($scope, SndsService, $stateParams) => {
  let vm = $scope;
  SndsService.newInstanceDetail($stateParams.code).then(d => {
    vm.ajaxData = d;
  });
};

review.$inject = ['$scope', 'SndsService', '$stateParams'];

export default app => app.controller('Review', review);