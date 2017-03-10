import {
    Inject
} from 'business/decorator/decorator'

@Inject
class Params {
    constructor($scope, $timeout, SndsService, CtrlInit, CtrlTablePage, HttpService, DialogService) {
        let vm = $scope;
        vm.data = [{
            mysqlVersion: 'MySQL 5.6',
            type: '基础参数',
            name: 'autocommit',
            applyImmediately: 'Yes',
            value: 'ON',
        }, {
            mysqlVersion: 'MySQL 5.6',
            type: '固定参数',
            name: 'autocommit',
            applyImmediately: 'Yes',
            value: 'ON',
        }]

        vm.pageNumber = 1
        vm.pageSize = 10
        vm.pageCtrl = CtrlTablePage()

        vm.search = d => {
            HttpService.get('/batch/cluster/' + d + '/status').then(e => {
                if (e.data) {

                }
            })

            //
            vm.data = [{
                systemName: '苏宁云数据库(snds)',
                env: 'snds_PRD',
                manager: '魏一凡',
                master: '192.168.100.1',
                slave1: '192.168.100.2',
                slave2: '192.168.100.3'
            }]
            document.querySelector('.table-border-mine.hidden.batch-cluster-status').classList.remove('hidden')
        }

        vm.editParam = d => {
            d.isEdit = true
        }
        vm.saveParam = d => {
            d.isEdit = false
        }

        vm.log = d => {
            DialogService.modal({
                key: 'dialogDemo',
                url: 'business/components/template/bulk/account/logbox/logbox.html',
                accept: (result) => {
                    HttpService.post('/auth/' + d.ip + '/password', {
                        oldPassword: d.user,
                        newPassword: result,
                        operator: ''
                    }).then(e => {
                        if (e.data) {

                        }
                    })
                },
                refuse: (reason) => {
                    console.log(reason);
                }
            }, {
                key: 'dialogDemo',
                data: {
                    msg: 'this is data from modalCtrl!'
                }
            });
        }
    }
}

export default Params;