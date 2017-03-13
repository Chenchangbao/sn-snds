import {
    Inject
} from 'business/decorator/decorator'

@Inject
class pslogbox {
    constructor($scope, DialogService, bulkHttp) {
        let vm = $scope;
        bulkHttp.post('/batch/params/batch/log/' + vm.changeId).then(e => {
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

export default pslogbox;