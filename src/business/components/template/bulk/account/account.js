import {
    Inject
} from 'business/decorator/decorator'

@Inject
class Account {
    constructor($scope, $timeout, SndsService, CtrlInit, CtrlTablePage, HttpService, DialogService, bulkHttp, SndsUser) {
        let vm = $scope;
        vm.a = 1

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

            vm.inputData.systemCode = 'SMC160803000002'
            SndsService.newInstanceEnvs(vm.inputData.systemCode).then(d => {
                vm.modelSelect.envs = d;
            });
        }

        vm.search = d => {
            if (!vm.systemObj) return vm.errorTxt = '请选择系统名称！'
            if (!vm.env) return vm.errorTxt = '请选择环境类型！'
            
            bulkHttp.get('/batch/auth/' + vm.sysName.name + '/' + vm.sysName.sysAlias + '/' + vm.env).then(e => {
                vm.data = e
            })

            //
            vm.data = [{
                systemName: '苏宁云数据库(snds)',
                env: 'snds_PRD',
                manager: '魏一凡',
                ip: '192.168.100.1',
                user: 'test1@10.37.64.41',
            }]
        }

        vm.editUser = d => {
            DialogService.modal({
                key: 'dialogDemo',
                url: 'business/components/template/bulk/account/userbox/userbox.html',
                accept: (result) => {
                    bulkHttp.post('/batch/auth/' + d.ip + '/user', {
                        oldUser: d.user,
                        newUser: result,
                        operator: ''
                    }).then(e => {
                        e
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

        vm.editPassword = d => {
            DialogService.modal({
                key: 'dialogDemo',
                url: 'business/components/template/bulk/account/passwordbox/passwordbox.html',
                accept: (result) => {
                    bulkHttp.post('/batch/auth/' + d.ip + '/password', {
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

        vm.editPrivilege = d => {
            DialogService.modal({
                key: 'dialogDemo',
                url: 'business/components/template/bulk/account/privilegebox/privilegebox.html',
                accept: (result) => {
                    if (result.view === 'gb') {
                        bulkHttp.post('/batch/auth/' + d.ip + '/privilege/' + d.user, {
                            privileges: d.data,
                            operator: ''
                        }).then(e => {
                            e
                        })
                    } else {
                        bulkHttp.post('/batch/auth/' + d.ip + '/privilege/' + d.db, {
                            privileges: d.data,
                            operator: ''
                        }).then(e => {
                            e
                        })
                    }

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

        vm.log = d => {
            DialogService.modal({
                key: 'dialogDemo',
                url: 'business/components/template/bulk/account/logbox/logbox.html',
                accept: (result) => {
                    // bulkHttp.post('/batch/auth/log' + d.ip).then(e => {
                    //     if (e.data) {

                    //     }
                    // })
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

export default Account;