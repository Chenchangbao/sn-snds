import retryDialog from './retryDialog'
import logDialog from './logDialog'
import review from './review'
import moment from 'moment'

let MyServicesCtrl = ($scope, DialogService, SndsService, $rootScope, $q, $state, CtrlInit, CtrlRefresh, CtrlTablePage) => {
    let vm = $scope

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

    vm.search = () => {
        let params = {
            pageNumber: 1,
            pageSize: vm.pageSize,
            serviceStatus: vm.serviceStatus,
            envType: vm.envType,
            // systemName: vm.systemName,
        }
        if (vm.systemName) {
            params.systemName = vm.systemName
        }
        SndsService.getMyServicesList(params).then(d => {
            vm.systemExDatas = d.results;
            vm.pageCtrl.pageNumber = d.page.index
            vm.pageCtrl.pageSize = d.page.size
            vm.pageCtrl.pageTotal = d.page.records
        });
    }

    $scope.newInstance = function () {
        $state.go('Portal.InstanceNew', {}, {
            reload: true
        })
    }

    vm.retryDialog = (id) => {
        DialogService.modal({
            key: 'dialogDemo',
            url: 'business/components/template/myServices/retryDialog.html',
            accept: (result) => {
                SndsService.myServiceRetry(id).then(d => {

                });
            },
            refuse: (reason) => {
                console.log(reason);
            }
        }, {
                key: 'dialogDemo',
                data: { msg: 'this is data from modalCtrl!' }
            });
    };
    vm.logDialog = (id) => {
        // SndsService.getSystemExLog(id).then(d => {
        //     d
        // });
        DialogService.modal({
            key: 'dialogDemo',
            url: 'business/components/template/myServices/logDialog.html',
            accept: (result) => {
                console.log(result);
            },
            refuse: (reason) => {
                console.log(reason);
            }
        }, {
                key: 'dialogDemo',
                data: { id }
            });
    };

    //面包屑
    $scope.crumbIconData = [
        { href: "#/overview", title: "控制台", disable: "true", pre: '<span class="fa fa-home"></span>' },
        { href: "", title: "我的服务", pre: '<span class="fa fa-tasks"></span>' }
    ];

    //显示日志
    $scope.showData = function (exName) {

        DialogService.modal({
            key: 'data',
            url: 'business/components/template/manager/log/log.html',
            accept: function (result) {
                console.log(result);
            },
            refuse: function (reason) {
                console.log(reason);
            }
        }, {
                key: 'data',
                data: { "msg": "日志", "exName": exName }
            });
    }
}

MyServicesCtrl.$inject = ['$scope', 'DialogService', 'SndsService', '$rootScope', '$q', '$state', 'CtrlInit', 'CtrlRefresh', 'CtrlTablePage'];
export default app => {
    app.controller('MyServicesCtrl', MyServicesCtrl);
    INCLUDE_ALL_MODULES([logDialog, retryDialog, review], app);
}