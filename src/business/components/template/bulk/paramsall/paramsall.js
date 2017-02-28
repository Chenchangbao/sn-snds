import {
    Inject
} from 'business/decorator/decorator'

@Inject
class Paramsall {
    constructor($scope, $timeout, SndsService, CtrlInit, CtrlTablePage, HttpService) {
        let vm = $scope;
        vm.step0 = vm.step1 = vm.step2 = vm.step3 = vm.step4 = false

        vm.pageNumber = 1
        vm.pageSize = 10
        vm.pageCtrl = CtrlTablePage()

        vm.search = d => {
            HttpService.get('/batch/cluster/' + d + '/status').then(e => {
                if (e.data) {
                    vm.step0 = true
                }
            })

            //
            vm.step0 = true
            vm.data = [{
                mysqlVersion: 'MySQL 5.6',
                type: '基础参数',
                name: 'autocommit',
                applyImmediately: 'Yes',
            }]
        }
    }
}

export default Paramsall;