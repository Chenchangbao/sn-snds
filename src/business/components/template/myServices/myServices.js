import retryDialog from './retryDialog'
import logDialog from './logDialog'

let MyServicesCtrl = ($scope, DialogService, SndsService, $rootScope, $q, $state) => {

    $scope.user = $rootScope.user;
    $scope.systemExDatas = [];
    $scope.page = 1;
    $scope.pageSize = 9;
    $scope.total = 0;
    $scope.exData = null;


    getSystemExDatas();

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


    // SndsService.getUserInfo()
    //     .then( datas => {
    //         $scope.user.userName = datas.userName; 
    //         $scope.user.userId = datas.userId;   
    //         getSystemExDatas();
    //     });

    //面包屑
    $scope.crumbIconData = [
        { href: "#/overview", title: "控制台", disable: "true", pre: '<span class="fa fa-home"></span>' },
        { href: "", title: "我的服务", pre: '<span class="fa fa-tasks"></span>' }
    ];
    //加载数据实例（升级完毕）
    function getSystemExDatas() {
        SndsService.getMyServicesList({ "userId": $scope.user.userId })
            .then(datas => {
                $scope.systemExDatas = datas.list;
                $scope.total = $scope.systemExDatas.length;
            });
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
    INCLUDE_ALL_MODULES([logDialog, retryDialog], app);
}