import {
    Inject
} from 'business/decorator/decorator'

@Inject
class searchhost {
    constructor($scope, DialogService, bulkHttp) {
        let vm = $scope;
        vm.user = ''
        bulkHttp.post('/batch/param/batch/instances/' + vm.sysName + '/' + vm.sysAlias + '/' + vm.env).then(e => {
            vm.data = e
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