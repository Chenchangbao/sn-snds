import {
    Inject
} from 'business/decorator/decorator'

@Inject
class Account {
    constructor($scope, $timeout, SndsService, CtrlInit, CtrlTablePage, HttpService, DialogService) {
        let vm = $scope;
        vm.a = 1

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
                ip: '192.168.100.1',
                user: 'test1@10.37.64.41',
            }]
        }

        vm.editUser = d => {
            DialogService.modal({
                key: 'dialogDemo',
                url: 'business/components/template/bulk/account/userbox/userbox.html',
                accept: (result) => {
                    HttpService.post('/auth/' + d.ip + '/user', {
                        oldUser: d.user,
                        newUser: result,
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

        vm.editPassword = d => {
            DialogService.modal({
                key: 'dialogDemo',
                url: 'business/components/template/bulk/account/passwordbox/passwordbox.html',
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

        vm.editPrivilege = d => {
            DialogService.modal({
                key: 'dialogDemo',
                url: 'business/components/template/bulk/account/privilegebox/privilegebox.html',
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

export default Account;