import {
    Inject
} from 'business/decorator/decorator'

@Inject
class Privilegebox {
    constructor($scope, DialogService) {
        let vm = $scope;
        vm.tabs = {
            global: {

            },
            db: {

            },
            view: 0
        }

        vm.data = [{
            name: 'a',
            checked: true
        }, {
            name: 'b',
            checked: false
        }, {
            name: 'c',
            checked: true
        }]

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

export default Privilegebox;