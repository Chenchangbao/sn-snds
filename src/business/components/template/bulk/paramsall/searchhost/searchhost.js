import {
    Inject
} from 'business/decorator/decorator'

@Inject
class searchhost {
    constructor($scope, DialogService, HttpService) {
        let vm = $scope;
        vm.user = ''
        HttpService.get('/batch/cluster/' + '/status').then(e => {
            if (e.data) {
                vm.step0 = true
            }
        })
        vm.close = () => {
            // way 1:
            DialogService.dismiss(vm.key);

            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };

        vm.commit = () => {
            DialogService.accept(vm.key, vm.user);
        };
    }
}

export default searchhost;