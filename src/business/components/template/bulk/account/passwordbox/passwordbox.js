import {
    Inject
} from 'business/decorator/decorator'

@Inject
class Passwordbox {
    constructor($scope, DialogService) {
        let vm = $scope;
        vm.user = ''
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

export default Passwordbox;