import {Inject} from 'business/decorator/decorator'

@Inject
class Status {
    constructor($scope, $timeout) {
        let vm = $scope;
        vm.a = 1
    }
}

export default Status;