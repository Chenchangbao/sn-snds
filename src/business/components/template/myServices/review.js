let review = ($scope, DialogService) => {
  let vm = $scope;
  vm.close = () => {
    // way 1:
    DialogService.dismiss(vm.key);

    // or
    DialogService.refuse(vm.key, 'dialog refuse! cancel!');
  };

  vm.commit = () => {
    DialogService.accept(vm.key, 'dialog accept!');
  };
};

review.$inject = ['$scope', 'DialogService'];

export default app => app.controller('Review', review);