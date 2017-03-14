import {
    Inject
} from 'business/decorator/decorator'

@Inject
class Params {
    constructor($scope, $timeout, SndsService, CtrlInit, CtrlTablePage, HttpService, DialogService, bulkHttp, IpTest) {
        let vm = $scope;
        // vm.data = [{
        //     mysqlVersion: 'MySQL 5.6',
        //     type: '基础参数',
        //     name: 'autocommit',
        //     applyImmediately: 'Yes',
        //     value: 'ON',
        // }, {
        //     mysqlVersion: 'MySQL 5.6',
        //     type: '固定参数',
        //     name: 'autocommit',
        //     applyImmediately: 'Yes',
        //     value: 'ON',
        // }]

        vm.pageNumber = 1
        vm.pageSize = 10
        vm.pageCtrl = CtrlTablePage()

        vm.search = d => {
            vm.errorTxt = ''
            if (!vm.ip || !vm.param) return vm.errorTxt = '输入参数不合法!'

            IpTest(vm.ip, vm, () => {
                bulkHttp.get('/batch/param/' + vm.ip, {
                    param: vm.param,
                    index: 1,
                    size: 10,
                }).then(e => {
                    if (e === undefined || e.length === undefined) {
                        vm.errorTxt = '错误信息：未搜索到该IP，请核实后重新输入！'
                    }
                    vm.data = e
                })
            })


            //
            // vm.data = [{
            //     systemName: '苏宁云数据库(snds)',
            //     env: 'snds_PRD',
            //     manager: '魏一凡',
            //     master: '192.168.100.1',
            //     slave1: '192.168.100.2',
            //     slave2: '192.168.100.3'
            // }]
            // document.querySelector('.table-border-mine.hidden.batch-cluster-status').classList.remove('hidden')
        }

        vm.editParam = d => {
            d.isEdit = true
        }
        vm.saveParam = d => {
            bulkHttp.get('/batch/param/' + vm.ip, {
                name: d.name,
                value: d.value_edit,
                operator: vm.userId,
            }).then(e => {
                d.isEdit = false
            })
        }

        vm.log = d => {
            DialogService.modal({
                key: 'dialogDemo',
                url: 'business/components/template/bulk/params/logbox/logbox.html',
                accept: (result) => {

                },
                refuse: (reason) => {
                    console.log(reason);
                }
            }, {
                key: 'dialogDemo',
                data: d.name
            });
        }
    }
}

export default Params;