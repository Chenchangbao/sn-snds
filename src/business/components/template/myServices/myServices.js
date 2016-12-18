import retryDialog from './retryDialog'
import logDialog from './logDialog'
import review from './review'

let MyServicesCtrl = ($scope, DialogService, SndsService, $rootScope, $q, $state) => {
    let vm = $scope
    $scope.user = $rootScope.user;
    $scope.systemExDatas = [];
    $scope.pageNumber = 1;
    $scope.pageSize = 9;
    $scope.total = 0;
    $scope.exData = null;


    getSystemExDatas();
    getTypeStatus()

    $scope.newInstance = function () {
        $state.go('Portal.InstanceNew', {}, {
            reload: true
        })
    }

    $scope.retryDialog = () => {
        DialogService.modal({
            key: 'dialogDemo',
            url: 'business/components/template/myServices/retryDialog.html',
            accept: (result) => {
                console.log(result);
            },
            refuse: (reason) => {
                console.log(reason);
            }
        }, {
                key: 'dialogDemo',
                data: { msg: 'this is data from modalCtrl!' }
            });
    };
    $scope.logDialog = () => {
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
                data: { msg: 'this is data from modalCtrl!' }
            });
    };


    //面包屑
    $scope.crumbIconData = [
        { href: "#/overview", title: "控制台", disable: "true", pre: '<span class="fa fa-home"></span>' },
        { href: "", title: "我的服务", pre: '<span class="fa fa-tasks"></span>' }
    ];
    //加载数据实例（升级完毕）
    function getSystemExDatas() {
        SndsService.getMyServicesList({
            pageNumber: vm.pageNumber,
            pageSize: vm.pageSize,
            serviceStatus: vm.serviceStatus,
            envType: vm.envType,
            systemName: vm.systemName,
        }).then(d => {
            $scope.systemExDatas = d.list;
            vm.pageNumber = d.pageNumber
            vm.pageSize = d.pageSize
            vm.pageTotal = d.pageTotal
        });
    }

    function getTypeStatus() {
        SndsService.getTypeStatus().then(datas => {
            vm.type = datas.type;
            vm.status = datas.status;
        });
    }

    vm.changePage = (pageNumber) => {
        vm.pageNumber = pageNumber
        getSystemExDatas()
    }

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

MyServicesCtrl.$inject = ['$scope', 'DialogService', 'SndsService', '$rootScope', '$q', '$state'];
export default app => {
    app.controller('MyServicesCtrl', MyServicesCtrl);
    INCLUDE_ALL_MODULES([logDialog, retryDialog, review], app);
}