let logDialog = ($scope, DialogService, SndsService) => {
  let vm = $scope;
  SndsService.myServiceLog(vm.data.id).then(d => {
    vm.msg = d
  });
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

logDialog.$inject = ['$scope', 'DialogService', 'SndsService'];

export default app => app.controller('logDialog', logDialog);