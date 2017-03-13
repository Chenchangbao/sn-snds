import {
    Inject
} from 'business/decorator/decorator'

@Inject
class Paramsall {
    constructor($scope, $timeout, SndsService, CtrlInit, CtrlTablePage, HttpService, DialogService, bulkHttp) {
        let vm = $scope;
        vm.buttonView = 'edit'

        vm.pageNumber = 1
        vm.pageSize = 10
        vm.pageCtrl = CtrlTablePage()

        // SndsService.getTypeStatus().then(datas => {
        //     // vm.type = datas.type;
        //     vm.status = datas;
        // });

        SndsService.newInstanceMySystem().then(d => {
            vm.status = d;
        });
        SndsService.newInstanceEnvs().then(d => {
            vm.type = d;
        });

        vm.search = d => {
            bulkHttp.get('/batch/param/batch/' + d).then(e => {
                vm.data = e
                // vm.data = [{
                //     mysqlVersion: 'MySQL 5.6',
                //     type: '基础参数',
                //     name: 'autocommit',
                //     applyImmediately: 'Yes',
                // }]
            })
        }

        vm.searchhost = () => {
            DialogService.modal({
                key: 'dialogDemo',
                url: 'business/components/template/bulk/paramsall/searchhost/searchhost.html',
                accept: (result) => {

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
        vm.psedit = () => {
            bulkHttp.post('/batch/params/' + vm.sysName + '/' + vm.sysAlias + '/' + vm.env, {
                param: '',
                value: '',
                operator: ''
            }).then(e => {
                vm.buttonView = 'log'
                vm.changeId = e
            })
            DialogService.modal({
                key: 'dialogDemo',
                url: 'business/components/template/bulk/paramsall/pslogbox/pslogbox.html',
                accept: (result) => {

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
        vm.pslogbox = () => {
            DialogService.modal({
                key: 'dialogDemo',
                url: 'business/components/template/bulk/paramsall/pslogbox/pslogbox.html',
                accept: (result) => {

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

export default Paramsall;