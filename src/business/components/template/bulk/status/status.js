import {
    Inject
} from 'business/decorator/decorator'

@Inject
class Status {
    constructor($scope, $timeout, SndsService, CtrlInit, CtrlTablePage) {
        let vm = $scope;
        vm.a = 1

        vm.pageNumber = 1
        vm.pageSize = 10
        vm.pageCtrl = CtrlTablePage()

        CtrlInit(function () {
            SndsService.getMyServicesList({
                pageNumber: vm.pageCtrl.pageNumber,
                pageSize: vm.pageCtrl.pageSize,
                serviceStatus: vm.serviceStatus,
                envType: vm.envType,
                systemName: vm.systemName,
            }).then(d => {
                d.results.forEach((el) => {
                    el.requestTime = moment(el.requestTime).format('YYYY-MM-DD HH:mm:ss')
                })
                vm.systemExDatas = d.results;
                vm.pageCtrl.pageNumber = d.page.index
                vm.pageCtrl.pageSize = d.page.size
                vm.pageCtrl.pageTotal = d.page.records || 1
            });
            SndsService.getTypeStatus().then(datas => {
                // vm.type = datas.type;
                vm.status = datas;
            });
        })
    }
}

export default Status;