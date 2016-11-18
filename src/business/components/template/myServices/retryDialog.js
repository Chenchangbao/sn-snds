let retryDialog = ($scope, DialogService) => {
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

retryDialog.$inject = ['$scope', 'DialogService'];

export default app => app.controller('retryDialog', retryDialog);