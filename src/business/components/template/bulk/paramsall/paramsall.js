import {
    Inject
} from 'business/decorator/decorator'

@Inject
class Paramsall {
    constructor($scope, $timeout, SndsService, CtrlInit, CtrlTablePage, HttpService, DialogService, bulkHttp, IpTest, SndsUser) {
        let vm = $scope;
        vm.buttonView = 'edit'

        vm.pageNumber = 1
        vm.pageSize = 10
        vm.pageCtrl = CtrlTablePage()

        // SndsService.getTypeStatus().then(datas => {
        //     // vm.type = datas.type;
        //     vm.status = datas;
        // });
        SndsUser.then(() => {
            vm.inputData = {

            }
        })

        SndsService.newInstanceMySystem().then(d => {
            vm.status = d;
        });

        vm.changeSystem = () => {
            if (!vm.systemObj) return
            vm.inputData.system = vm.systemObj.name
            vm.inputData.systemCode = vm.systemObj.code
            vm.inputData.systemAlias = vm.systemObj.nameEn

            // vm.inputData.systemCode = 'SMC160803000002'
            SndsService.newInstanceEnvs(vm.inputData.systemCode).then(d => {
                vm.modelSelect.envs = d;
            });
        }


        vm.search = d => {
            vm.errorTxt = ''
            if (!d) {
                return vm.errorTxt = '输入参数不合法!'
            }
            bulkHttp.get('/batch/param/batch/' + d).then(e => {
                if (e === undefined || e.mysqlParam === undefined) {
                    vm.errorTxt = '未搜索到该参数，请核实后重新输入！'
                }
                vm.data = e.mysqlParam
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